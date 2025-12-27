import express from "express";
import { getLeadershipType } from "../controllers/leadershipType.controller.js";

const router = express.Router();

router.post("/lookup", getLeadershipType);

export default router;
