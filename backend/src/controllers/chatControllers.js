import { model } from "mongoose";
import Prompt from "../models/prompt";
import { encrypt, decrypt } from "../utils/encryptor";
import axios from "axios";


const sendRequest = async()=>{
      const {userInput} = req.body;
      try {
            const encryptedText = encrypt(userInput);
            const openAiRes = await axios.get("https://api.openai.com/v1/chat/completions",
                  {model:"gpt-3.5-turbo",
                  messages:[{role:"user", content:userInput}]
                  },
                 {
                  headers: {
                        "Authorization":`Bearer ${process.env.OPENAPI_KEY}`,
                        "Content-Type":"application/json"
                  }
                 }
            );
            const rawOutput= openAiRes.data.choices[0].messages.content;
            const encryptedResponse = encrypt(rawOutput);
      
            const prompt = new Prompt({encryptedText, encryptedResponse});
            await prompt.save();
      
            res.json({
                  message:rawOutput
            })
      } catch (error) {
            res.status(500).json({
                  error:"Server error"
            })
      }

}

export default sendRequest