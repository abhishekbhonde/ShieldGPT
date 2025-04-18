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
            password:hashedPass
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

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                message: "User not found"
            });
        }

        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) {
            return res.json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);

        res.json({
            message: "User logged in successfully",
            token
        });
    } catch (error) {
        res.json({
            message: "Failed to login",
            error: error.message
        });
    }
};


export  {registerUser, loginUser}