import { model } from "mongoose";
import Prompt from "../models/prompt.js";
import { encrypt, decrypt } from "../utils/encryptor.js";
import axios from "axios";

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to make OpenAI request with retries
const makeOpenAIRequest = async (userInput, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: userInput }]
                },
                {
                    headers: {
                        "Authorization": `Bearer ${process.env.OPENAPI_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            return response;
        } catch (error) {
            if (error.response?.status === 429 && attempt < maxRetries) {
                // If rate limited, wait before retrying
                const retryAfter = error.response.headers['retry-after'] || 20;
                console.log(`Rate limited. Waiting ${retryAfter} seconds before retry ${attempt}/${maxRetries}`);
                await delay(retryAfter * 1000);
                continue;
            }
            throw error;
        }
    }
};

const sendRequest = async (req, res) => {
    const { userInput } = req.body;
    
    if (!userInput) {
        return res.status(400).json({ error: "User input is required" });
    }

    try {
        // Encrypt the user input
        const encryptedText = encrypt(userInput);
        if (!encryptedText) {
            throw new Error("Encryption failed");
        }

        // Make request to OpenAI with retry logic
        const openAiRes = await makeOpenAIRequest(userInput);
        const rawOutput = openAiRes.data.choices[0].message.content;
        
        // Encrypt the response
        const encryptedResponse = encrypt(rawOutput);
        if (!encryptedResponse) {
            throw new Error("Response encryption failed");
        }

        // Save to database
        const prompt = new Prompt({
            encryptedInput: encryptedText,
            encryptedResponse: encryptedResponse
        });
        await prompt.save();

        res.json({
            message: rawOutput
        });
    } catch (error) {
        console.error("Chat error:", error);
        
        // Handle specific error cases
        if (error.response?.status === 429) {
            return res.status(429).json({
                error: "Rate limit exceeded",
                details: "Please try again in a few minutes",
                retryAfter: error.response.headers['retry-after'] || 20
            });
        }
        
        if (error.response?.status === 401) {
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