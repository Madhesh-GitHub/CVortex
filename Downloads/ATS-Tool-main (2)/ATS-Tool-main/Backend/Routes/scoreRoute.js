import express from "express";
import { scoreResume } from "../Controllers/resumeScorer.js";

const router = express.Router();
router.post("/score", scoreResume);

export default router;
