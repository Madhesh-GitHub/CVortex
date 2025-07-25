import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js';
import { OAuth2Client } from 'google-auth-library';
import { sendMail } from "../Utils/mailer.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d',
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during signup', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Invalid Google data' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: null, // Optional: consider generating a random password
        isGoogle: true,
      });
      await user.save();
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Google login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Google Login Error:', error);
    res.status(500).json({ success: false, message: 'Google login failed', error: error.message });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 mins

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = expiry;
    await user.save();

    await sendMail(email, "Your OTP for Password Reset", `Your OTP is: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.verifyOtp !== otp ||
      Date.now() > user.verifyOtpExpireAt
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified", success: true }); // ✅ Important!
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Optionally remove OTP fields
    user.verifyOtp = undefined;
    user.verifyOtpExpireAt = undefined;

    await user.save();
    res.status(200).json({ message: "Password reset successful", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
