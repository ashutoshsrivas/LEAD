import express from "express";
import { createSession, listSessions, getSession, getSessionByToken } from "../controllers/session.controller.js";

const router = express.Router();

router.post("/", createSession);
router.get("/", listSessions);
router.get("/:session_id", getSession);
router.get("/link/:token", getSessionByToken);

export default router;
