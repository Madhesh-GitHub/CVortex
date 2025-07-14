import React from "react";
import { COLORS } from "../styles/colors";
import "./Dashboard.css";

const sidebarItems = [
  { icon: "🏠", label: "Home" },
  { icon: "⬆️", label: "Upload Resume" },
  { icon: "📊", label: "Resume Score" },
  { icon: "🛠️", label: "Improve Resume" },
  { icon: "✨", label: "Features" },
  { icon: "🔑", label: "Login" },
  { icon: "📝", label: "Sign Up" },
  { icon: "⚙️", label: "Settings" },
  { icon: "❓", label: "Help & Support" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar" style={{ background: COLORS.background }}>
      <div className="sidebar-header">
        <span className="sidebar-logo" style={{ color: COLORS.primary }}>📄</span>
        <span className="sidebar-title" style={{ color: COLORS.primary }}>ATS Resume Checker</span>
      </div>
      <nav className="sidebar-nav">
        {sidebarItems.map((item, idx) => (
          <div className="sidebar-item" key={idx}>
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}