import React from "react";
import ProfileDropdown from "../components/ProfileDropdown";

const TopNav = ({ isSidebarOpen }) => {
  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-40"
      style={{ paddingLeft: isSidebarOpen ? "220px" : "60px" }}
    >
      {/* Left Section - Title */}
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-900">ATS Resume Tool</h1>
      </div>

      {/* Right Section - Profile Only */}
      <div className="flex items-center">
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default TopNav;