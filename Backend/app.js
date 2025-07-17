import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./Routes/userRoute.js";
import { connectDB } from "./Configure/db.js";
import config from "./Configure/config.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoute);

// Connect to MongoDB and then runnning the server
connectDB().then(() => {
    app.listen(config.port, () => {
    console.log(`🚀 Server is running on port ${config.port}`);
});
}
)