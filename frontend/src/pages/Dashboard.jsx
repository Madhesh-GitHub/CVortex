import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UploadResume from "../components/UploadResume";
import InfoCards from "../components/InfoCards";
import HowItWorks from "../components/HowItWorks";
import "../components/Dashboard.css";

export default function Dashboard() {
  return (
    <motion.div
      className="dashboard-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Sidebar />
      <div className="dashboard-main">
        <Topbar />
        <motion.div
          className="dashboard-content"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
        >
          <UploadResume />
          <InfoCards />
          <HowItWorks />
        </motion.div>
      </div>
    </motion.div>
  );
}