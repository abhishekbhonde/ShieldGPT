import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    encryptedInput: { type: String, required: true },
    encryptedResponse: { type: String },
    model: { 
        type: String, 
        enum: ['openai', 'deepseek'],
        required: true 
    },
    timestamp: { type: Date, default: Date.now },
});

const Prompt = mongoose.model('Prompt', promptSchema);

export default Prompt;


