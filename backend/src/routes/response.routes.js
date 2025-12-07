import express from "express";
import { saveResponses } from "../controllers/response.controller.js";

const router = express.Router();

router.post("/", saveResponses);

export default router;
