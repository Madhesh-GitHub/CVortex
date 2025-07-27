import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useResumeBuilder } from '../../contexts/ResumeBuilderContext';

const CertificatePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { saveStepData, loading } = useResumeBuilder();

  const [certificates, setCertificates] = useState([
    {
      title: 'UI/UX Design Mastery',
      issuer: 'Graphic Design Institute',
      issueDate: 'May 2022',
      expiryDate: 'May 2025',
      description: 'Validates expertise in designing user-centered digital products.',
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'AWS',
      issueDate: 'January 2023',
      expiryDate: 'No Expiration',
      description: 'Certification for designing and building data processing systems on AWS.',
    },
    {
      title: 'Data Science & Analytics',
      issuer: 'HP Life',
      issueDate: 'August 2021',
      expiryDate: 'August 2023',
      description: 'Demonstrates knowledge of data science principles and analytics techniques.',
    },
  ]);

  const handleNext = async () => {
    // Save certificates data to backend
    const success = await saveStepData('certificates', certificates);
    
    if (success) {
      console.log('✅ Certificates saved, navigating to preview...');
      navigate('/builder/resume-preview');
    } else {
      alert('Failed to save certificates. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/builder/languages');
  };

  const removeCertificate = (index) => {
    if (certificates.length > 1) {
      setCertificates(certificates.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 w-full p-6">
      {/* Main Certificate Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#6366F1]">Certificates</h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Add professional certifications to showcase your specialized knowledge and skills.
            </p>
          </div>
          <button 
            onClick={() => navigate('/builder/AddCertificatePage')}
            className="bg-[#6366F1] text-white px-4 py-2 rounded hover:bg-[#4F46E5] transition"
          >
            Add Certificate
          </button>
        </div>

        {/* Certificate Cards */}
        <div className="space-y-4 mb-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-4 shadow-sm relative"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#1F2937]">{cert.title}</h2>
                  <p className="text-sm text-[#6B7280]">{cert.issuer}</p>
                  <div className="flex items-center text-sm text-[#6B7280] mt-1">
                    <FaCalendarAlt className="mr-2 text-[#6B7280]" />
                    <span>
                      Issued: {cert.issueDate} &nbsp;•&nbsp; Expires: {cert.expiryDate}
                    </span>
                  </div>
                  <p className="text-sm text-[#1F2937] mt-2">{cert.description}</p>
                </div>
                
                {/* Remove button */}
                {certificates.length > 1 && (
                  <button
                    onClick={() => removeCertificate(index)}
                    className="text-red-500 hover:text-red-700 ml-4 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {/* Add more certificates option */}
          <button
            onClick={() => navigate('/builder/AddCertificatePage')}
            className="w-full py-3 border-2 border-dashed border-[#6366F1] rounded-lg text-[#6366F1] hover:bg-[#6366F1] hover:text-white transition-colors"
          >
            + Add Another Certificate
          </button>
        </div>

        {/* ATS Optimization Tip */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <h3 className="font-semibold text-blue-800">ATS Optimization Tip</h3>
          <p className="text-blue-700 text-sm">
            Include relevant certifications with full official names. ATS systems recognize industry-standard certifications and can boost your ranking for relevant positions.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <button
            onClick={handleBack}
            className="px-6 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            ← Back: Languages
          </button>
          
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-6 py-2 bg-[#6366F1] text-white rounded-md hover:bg-[#4F46E5] transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Preview Resume →'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-[#6B7280] mt-10">
        © 2025 ATS Resume Checker. All rights reserved.
      </div>
    </div>
  );
};

export default CertificatePage;
