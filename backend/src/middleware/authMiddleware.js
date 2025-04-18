import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message:"Invalid token"
        })     
    }

}