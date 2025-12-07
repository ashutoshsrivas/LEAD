import express from "express";
import { processParticipant } from "../controllers/process.controller.js";

const router = express.Router();

router.post("/:participant_id", processParticipant);

export default router;
