import { model } from "mongoose";
import Prompt from "../models/prompt.js";
import { encrypt, decrypt } from "../utils/encryptor.js";
import OpenAI from "openai";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['OPENAI_API_KEY', 'DEEPSEEK_API_KEY', 'ENCRYPTION_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// Initialize OpenAI clients
const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const deepseekClient = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
});

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to make OpenAI request with retries
const makeOpenAIRequest = async (userInput, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const completion = await openaiClient.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userInput }
                ]
            });
            return completion;
        } catch (error) {
            if (error.status === 429 && attempt < maxRetries) {
                const retryAfter = error.headers?.['retry-after'] || 20;
                console.log(`OpenAI rate limited. Waiting ${retryAfter} seconds before retry ${attempt}/${maxRetries}`);
                await delay(retryAfter * 1000);
                continue;
            }
            throw error;
        }
    }
};

// Helper function to make DeepSeek request with retries
const makeDeepSeekRequest = async (userInput, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const completion = await deepseekClient.chat.completions.create({
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userInput }
                ]
            });
            return completion;
        } catch (error) {
            if (error.status === 429 && attempt < maxRetries) {
                const retryAfter = error.headers?.['retry-after'] || 20;
                console.log(`DeepSeek rate limited. Waiting ${retryAfter} seconds before retry ${attempt}/${maxRetries}`);
                await delay(retryAfter * 1000);
                continue;
            }
            throw error;
        }
    }
};

const sendRequest = async (req, res) => {
    const { userInput, preferredModel = 'openai' } = req.body;
    
    if (!userInput) {
        return res.status(400).json({ error: "User input is required" });
    }

    try {
        // Encrypt the user input
        const encryptedText = encrypt(userInput);
        if (!encryptedText) {
            throw new Error("Encryption failed");
        }

        let completion;
        let usedModel = preferredModel;

        // Try the preferred model first
        try {
            if (preferredModel === 'openai') {
                completion = await makeOpenAIRequest(userInput);
            } else {
                completion = await makeDeepSeekRequest(userInput);
            }
        } catch (error) {
            // If preferred model fails, try the other model
            console.log(`Primary model (${preferredModel}) failed, trying fallback...`);
            try {
                if (preferredModel === 'openai') {
                    completion = await makeDeepSeekRequest(userInput);
                    usedModel = 'deepseek';
                } else {
                    completion = await makeOpenAIRequest(userInput);
                    usedModel = 'openai';
                }
            } catch (fallbackError) {
                throw new Error(`Both models failed: ${error.message} | ${fallbackError.message}`);
            }
        }

        const rawOutput = completion.choices[0].message.content;
        
        // Encrypt the response
        const encryptedResponse = encrypt(rawOutput);
        if (!encryptedResponse) {
            throw new Error("Response encryption failed");
        }

        // Save to database with model information
        const prompt = new Prompt({
            encryptedInput: encryptedText,
            encryptedResponse: encryptedResponse,
            model: usedModel
        });
        await prompt.save();

        res.json({
            message: rawOutput,
            model: usedModel
        });
    } catch (error) {
        console.error("Chat error:", error);
        
        // Handle specific error cases
        if (error.status === 429) {
            return res.status(429).json({
                error: "Rate limit exceeded",
                details: "Please try again in a few minutes",
                retryAfter: error.headers?.['retry-after'] || 20
            });
        }
        
        if (error.status === 401) {
            return res.status(401).json({
                error: "Authentication failed",
                details: "Invalid API key"
            });
        }

        res.status(500).json({
            error: "Failed to process chat request",
            details: error.message
        });
    }
};

export { sendRequest };