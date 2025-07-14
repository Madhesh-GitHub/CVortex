import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "../styles/colors";
import "./Login.css";

function Login() {
  return (
    <motion.div
      className="login-root"
      style={{ background: COLORS.background }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="login-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
      >
        <h1 style={{ color: COLORS.primary }}>Welcome Back</h1>
        <p style={{ color: COLORS.textMuted }}>
          Log in to your account to access your resume tools and continue building your professional profile.
        </p>
        <img
          src="/image1.png"
          alt="Person at desk"
          className="login-illustration"
        />
      </motion.div>
      <motion.div
        className="login-right"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
      >
        <div className="login-header">
          <span className="login-logo" style={{ color: COLORS.primary }}>📄</span>
          <span className="login-title" style={{ color: COLORS.primary, fontWeight: 700 }}>CVortex</span>
        </div>
        <h2 style={{ color: COLORS.primary }}>Login to your account</h2>
        <form className="login-form">
          <label style={{ color: COLORS.textPrimary }}>Email</label>
          <input type="email" placeholder="Enter your email" />
          <label style={{ color: COLORS.textPrimary }}>Password</label>
          <input type="password" placeholder="Enter your password" />
          <div className="login-forgot">
            <a href="#" style={{ color: COLORS.secondary }}>Forgot Password?</a>
          </div>
          <motion.button
            type="submit"
            className="login-btn"
            style={{ background: COLORS.primary }}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 24px rgba(99,102,241,0.15)" }}
            whileTap={{ scale: 0.97 }}
          >
            Login
          </motion.button>
        </form>
        <div className="login-divider">
          <span>or</span>
        </div>
        <motion.button
          className="login-google"
          style={{ borderColor: COLORS.secondary, color: COLORS.secondary }}
          whileHover={{ scale: 1.03, background: "#E0F2FE" }}
          whileTap={{ scale: 0.97 }}
        >
          Continue with Google
        </motion.button>
        <div className="login-signup">
          <span style={{ color: COLORS.textMuted }}>Don't have an account?</span>
          <a href="#" style={{ color: COLORS.secondary }}>Sign up</a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login;