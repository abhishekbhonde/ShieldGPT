import express from "express"
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();


app.use(express.json());

app.use("/api/auth", authRoutes)



connectDB().then(() => {
    app.listen(3000, () => {
      console.log(`🚀 Server running at http://localhost:3000`);
    });
  });