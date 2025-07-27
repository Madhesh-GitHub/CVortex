import express from 'express';
import { signup, login, verifyOTP, resetPassword } from '../Controllers/userController.js';
import { googleLogin } from "../Controllers/userController.js";
import { forgotPassword } from '../Controllers/userController.js';

const router = express.Router();

// POST /api/users/signup
router.post('/signup', signup);

// POST /api/users/login
router.post('/login', login);

router.post("/google-login", googleLogin);

router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post("/reset-password", resetPassword);

export default router;