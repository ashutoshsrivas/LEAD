import express from "express";
import { listResults, getResult } from "../controllers/result.controller.js";

const router = express.Router();

router.get("/", listResults);
router.get("/:participant_id", getResult);

export default router;
