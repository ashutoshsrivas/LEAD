import express from "express";
import { createSession, listSessions, getSession, getSessionByToken, updateSession, exportSession } from "../controllers/session.controller.js";

const router = express.Router();

router.post("/", createSession);
router.get("/", listSessions);
router.get("/:session_id", getSession);
router.get("/link/:token", getSessionByToken);
router.put("/:session_id", updateSession);
router.get("/:session_id/export", exportSession);

export default router;
