import express from "express";
import { listQuestions } from "../controllers/question.controller.js";

const router = express.Router();

router.get("/", listQuestions);

export default router;
