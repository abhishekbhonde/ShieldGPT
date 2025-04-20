import mongoose from "mongoose";
const promptSchema = new mongoose.Schema({
  encryptedInput: { type: String, required: true },
  encryptedResponse: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Prompt = mongoose.model('Prompt', promptSchema);

export default Prompt