import express from "express";
import { Router } from "express";
import {sendRequest} from "../controllers/chatControllers.js";

const router = Router();

router.post("/ask", sendRequest)


export default router