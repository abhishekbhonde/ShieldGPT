import express from "express"
import authRoutes from "./routes/authRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import cors from "cors"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api", chatRoutes)


connectDB().then(() => {
    app.listen(3000, () => {
      console.log(`🚀 Server running at http://localhost:3000`);
    });
  });