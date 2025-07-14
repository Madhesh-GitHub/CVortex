import React from "react";
import { COLORS } from "../styles/colors";
import "./Dashboard.css";

export default function Topbar() {
  return (
    <header className="topbar" style={{ background: COLORS.background }}>
      <input
        className="topbar-search"
        placeholder="Search for resume templates, tips, or keywords..."
        style={{ borderColor: COLORS.primary }}
      />
      <div className="topbar-actions">
        {/* <button className="topbar-btn">Butto</button>
        <button className="topbar-btn">Butto</button>
        <button className="topbar-btn">Butto</button> */}
        {/* <span className="topbar-user">Jyothsna</span> */}
        <img
          //src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="User"
          className="topbar-avatar"
        />
      </div>
    </header>
  );
}