import express from "express";
import { addParticipant, listParticipants } from "../controllers/participant.controller.js";

const router = express.Router();

router.post("/", addParticipant);
router.get("/:session_id", listParticipants);

export default router;
