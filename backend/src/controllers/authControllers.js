import User from "../models/user.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const registerUser= async (req, res)=>{
    const {email, password} = req.body;

    try {
        const existing = await User.findOne({email});
        if(existing){
            res.json({
                message:"user aleady exist"
            })
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            hashedPass
        })
    
        res.json({
            message:"User created successfully"
        })
    } catch (error) {
        res.json({
            message:"Failed to create user " + error
        })
    }
}

export default registerUser