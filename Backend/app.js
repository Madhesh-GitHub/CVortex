import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./Routes/userRoute.js";
import { connectDB } from "./Configure/db.js";
import config from "./Configure/config.js";
import uploadRoutes from "./Routes/uploadRoute.js";

import blogRoute from "./Routes/blogRoute.js";
import resumeRoute from "./Routes/resumeRoute.js"; // ← Handles all resume operations
import resumeBuilderRoutes from "./Routes/resumeBuilderRoutes.js";
import jdRoutes from './Routes/jdRoutes.js'; // Make sure this is imported

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Get directory paths

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, "uploads/data.txt");

// Middlewares

app.use(cors({
  origin: [
    'http://localhost:5173', // Development
    'http://localhost:3000', // Development
    'https://thecvortex.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use("/api/uploads", uploadRoutes);
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api", resumeRoute); // ← Handles /api/resume/score, /api/latest, /api/generate-ats-resume
app.use('/api/resume-builder', resumeBuilderRoutes);
app.use('/api/jd', jdRoutes); // Add this route if not already present

// Save route (from main branch)

app.post("/save", (req, res) => {
  const { step, data } = req.body;

  if (!step || !data) {
    return res.status(400).send("Missing 'step' or 'data' in request body");
  }

  const formatted = `\n=== ${step.toUpperCase()} DATA ===\n` +

    Object.entries(data)
      .map(([key, val]) => {
        if (Array.isArray(val)) {
          return `${key}: ${val
            .map(item => typeof item === "object" ? JSON.stringify(item) : item)
            .join(", ")}`;
        } else if (typeof val === "object") {
          return `${key}: ${JSON.stringify(val)}`;
        } else {
          return `${key}: ${val}`;
        }
      })
      .join("\n");


  fs.appendFile(filePath, formatted + "\n", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Failed to save");
    }
    res.send("Data saved successfully to TXT");
  });
});


// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});


// Start server after DB connection


const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
