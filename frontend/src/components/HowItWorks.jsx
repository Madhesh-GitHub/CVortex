import React from "react";
import { COLORS } from "../styles/colors";
import "./Dashboard.css";

export default function HowItWorks() {
  return (
    <div className="howitworks-card">
      <h4 style={{ color: COLORS.primary }}>How It Works</h4>
      <div className="howitworks-steps">
        <div>
          <div className="howitworks-icon">📤</div>
          <div className="howitworks-title">1. Upload</div>
          <div className="howitworks-desc">Upload your resume in PDF or DOCX format</div>
        </div>
        <div>
          <div className="howitworks-icon">🤖</div>
          <div className="howitworks-title">2. Analyze</div>
          <div className="howitworks-desc">Our AI analyzes your resume against ATS criteria</div>
        </div>
        <div>
          <div className="howitworks-icon">📈</div>
          <div className="howitworks-title">3. Results</div>
          <div className="howitworks-desc">Get detailed feedback and improvement suggestions</div>
        </div>
      </div>
    </div>
  );
}