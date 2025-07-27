import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/LandingPage";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import BlogPage from './pages/BlogPage';
import ATSResumeTips from './pages/ATSResumeTips';
import Contributors from './pages/Contributors';
import ResumeTemplates from './pages/ResumeTemplates';
import ResumeGuide from './pages/ResumeGuide';
import LostPage from "./pages/LostPage";

// Dashboard Pages
import Navbar from './Nav/Navbar';
import UploadResume from './pages/UploadResume';
import ImproveResume from './pages/ImproveResume';
import ResumeScore from './pages/ResumeScore';
import GenerateAtsResume from './pages/GenerateAtsResume';
import Dashboard from './pages/Dashboard';

// Resume Builder Pages
import ResumeBuilderNavBar from './Resume Builder Nav/ResumeBuilderNavBar';
import PersonalInformation from './pages/PersonalInformation';
import Education from './pages/Education';
import CertificatePage from './pages/DeepikaA/CertificatePage';
import AddCertificatePage from './pages/DeepikaA/AddCertificatePage';
import WorkExperience from './pages/WorkExperience';
import Language from './pages/Language';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import ResumePreview from "./pages/ResumePreview";
import Skills from './pages/Skills';

// User Blog Dashboard
import UserBlogDashboard from './pages/UserBlogDashboard';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/ats-tips" element={<ATSResumeTips />} />
      <Route path="/contributors" element={<Contributors />} />
      <Route path="/demo-templates" element={<ResumeTemplates />} />
      <Route path="/resume-guide" element={<ResumeGuide />} />
      <Route path="*" element={<LostPage />} />

      {/* Navbar Routes */}
      <Route path="/app" element={<Navbar />}>
        <Route index element={<Navigate to="/app/upload" />} />
        <Route path="upload" element={<Dashboard />} />
        <Route path="score" element={<ResumeScore />} />
        <Route path="improve" element={<ImproveResume />} />
        <Route path="generate-ats-resume" element={<GenerateAtsResume />} />
      </Route>

      {/* Resume Builder Routes */}
      <Route path="/builder" element={<ResumeBuilderNavBar />}>
        <Route path="education" element={<Education />} />
        <Route path="personal" element={<PersonalInformation />} />
        <Route path="CertificatePage" element={<CertificatePage />} />
        <Route path="AddCertificatePage" element={<AddCertificatePage />} />
        <Route path="experience" element={<WorkExperience />} />
        <Route path="languages" element={<Language />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="settings" element={<Settings />} />
        <Route path="resume-preview" element={<ResumePreview />} />
        <Route path="skills" element={<Skills />} />
      </Route>

      {/* User's Blog Dashboard */}
      <Route path="/dashboard/blogs" element={<UserBlogDashboard />} />
    </Routes>
  );
};

export default App;
