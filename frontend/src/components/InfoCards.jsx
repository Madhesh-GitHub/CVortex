import React from "react";
import { COLORS } from "../styles/colors";
import "./Dashboard.css";

export default function InfoCards() {
  return (
    <div className="info-cards">
      <div className="info-card">
        <h4 style={{ color: COLORS.primary }}>What We'll Check</h4>
        <ul>
          <li>ATS compatibility and parsing accuracy</li>
          <li>Industry-specific keywords and phrases</li>
          <li>Formatting and structure optimization</li>
          <li>Skills matching with job requirements</li>
          <li>Experience and education relevance</li>
        </ul>
      </div>
      <div className="info-card">
        <h4 style={{ color: COLORS.primary }}>Tips for Better Results</h4>
        <ul>
          <li>Use a clean, simple format without tables or columns</li>
          <li>Include relevant keywords from the job description</li>
          <li>Quantify achievements with numbers when possible</li>
          <li>Ensure contact information is at the top</li>
          <li>Use standard section headings (Experience, Education)</li>
        </ul>
      </div>
    </div>
  );
}