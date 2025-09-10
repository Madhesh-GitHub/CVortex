import express from "express";
import { upload, parseResume } from "../Controllers/resumeParser.js";

const router = express.Router();

// Use upload.fields to handle the 'resume' field name
router.post("/", upload.fields([{ name: "resume", maxCount: 1 }]), parseResume);

export default router;
