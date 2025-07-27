import React from 'react'
import { Routes, Route } from "react-router"
import LandingPage from "./pages/LandingPage"
import Navbar from './Nav/Navbar'
import UploadResume from './pages/UploadResume'
import ImproveResume from './pages/ImproveResume'
import ResumeScore from './pages/ResumeScore'
import ResumeBuilderNavBar from './Resume Builder Nav/ResumeBuilderNavBar'
import CertificatePage from './pages/DeepikaA/CertificatePage'
import AddCertificatePage from './pages/DeepikaA/AddCertificatePage'
import SignUp from './pages/SignUp'
import Skills from './pages/Skills'
import Language from './pages/Language'
import WorkExperience from './pages/WorkExperience'
import LostPage from "./pages/LostPage"
import ResumePreview from "./pages/ResumePreview"
import Achievements from "./pages/Achievements"
import Settings from "./pages/Settings"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import PersonalInformation from './pages/PersonalInformation'
import Education from './pages/Education'
import Contributors from './pages/Contributors'
import BlogPage from './pages/BlogPage'
import ATSResumeTips from './pages/ATSResumeTips'
import GenerateAtsResume from './pages/GenerateAtsResume'
import ResumeTemplates from './pages/ResumeTemplates'
import ForgotPassword from './pages/ForgotPassword'
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import ResumeGuide from './pages/ResumeGuide'
import JDAnalyzer from './pages/JDAnalyzer'
import UserBlogDashboard from './pages/UserBlogDashboard';
import Help from './pages/Help';
import Setting from './pages/Setting'
import { Navigate } from "react-router-dom";
import { ResumeBuilderProvider } from './contexts/ResumeBuilderContext';


const App = () => {
  return (
    <>
    <ResumeBuilderProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="blog" element={<BlogPage />} />
        <Route path="ats-tips" element = {<ATSResumeTips />} />
        <Route path="contributors" element={<Contributors />} />
        <Route path="*" element={<LostPage />} />
        <Route path="demo-templates" element={<ResumeTemplates />} />
        <Route path="resume-guide" element={<ResumeGuide />} />
        <Route path="jd-analyzer" element={<JDAnalyzer />} />

        {/* Navbar Routes */}
        <Route path="/app" element={<Navbar />}>
        <Route index element={<Navigate to="/app/upload" />} /> 
          <Route path="upload" element={<Dashboard />} />
          <Route path="score" element={<ResumeScore />} />
          <Route path="improve" element={<ImproveResume />} />
          <Route path="generate-ats-resume" element={<GenerateAtsResume />} />
          <Route path="help" element={<Help/>}/>
          <Route path="settings" element={<Setting/>}/>
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

  {/* ✅ Fixed: now it's relative to /builder */}
  
</Route>
<Route path="/dashboard/blogs" element={<UserBlogDashboard />} />
      </Routes>
      </ResumeBuilderProvider>
    </>
  )
}

export default App
