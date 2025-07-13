import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeAnalysis from './pages/ResumeAnalysis'; // ✅ make sure this file exists
import CertificatePage from './pages/CertificatePage'; // ✅ make sure this file exists
import AddCertificatePage from './pages/AddCertificatePage'; // ✅ make sure this file exists
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ResumeAnalysis" element={<ResumeAnalysis />} />
        <Route path="/CertificatePage" element={<CertificatePage />} />
        <Route path="/AddCertificatePage" element={<AddCertificatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
