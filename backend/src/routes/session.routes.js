import express from "express";
import { createSession, listSessions, getSession } from "../controllers/session.controller.js";

const router = express.Router();

router.post("/", createSession);
router.get("/", listSessions);
router.get("/:session_id", getSession);

export default router;
