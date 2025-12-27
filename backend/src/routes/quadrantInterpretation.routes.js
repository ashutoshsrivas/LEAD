import express from "express";
import { getQuadrantInterpretation } from "../controllers/quadrantInterpretation.controller.js";

const router = express.Router();

router.post("/lookup", getQuadrantInterpretation);

export default router;
