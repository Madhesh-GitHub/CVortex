import React, { useState, useEffect, useRef } from 'react';
import { Download, FileText, Loader2, AlertCircle, RefreshCw, CheckCircle, ZoomIn, ZoomOut, Maximize2, Eye, EyeOff } from 'lucide-react';

export default function ResumePreview() {
  const [atsResumeHTML, setAtsResumeHTML] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generationSuccess, setGenerationSuccess] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(50); // Start at 50% for better fit
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-generate on component mount
  useEffect(() => {
    generateATSResume();
  }, []);

  const generateATSResume = async () => {
    setLoading(true);
    setError('');
    setGenerationSuccess(false);
    
    try {
      console.log('🎯 Generating ATS resume from form data...');
      
      const response = await fetch('http://localhost:5000/api/resume-builder/generate-ats-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAtsResumeHTML(data.html);
        setResumeData(data.jsonData);
        setGenerationSuccess(true);
        console.log('✅ ATS resume generated successfully');
      } else {
        throw new Error(data.message || 'Failed to generate ATS resume');
      }
      
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message || 'Failed to generate ATS resume');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const printContent = document.getElementById('ats-resume-preview');
    if (!printContent) {
      alert('Resume content not found');
      return;
    }

    const newWindow = window.open('', '_blank');
    
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ATS Resume - ${resumeData?.personalInfo?.firstName || 'Resume'} ${resumeData?.personalInfo?.lastName || ''}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 20px; 
              background: white; 
            }
            @media print { 
              body { margin: 0; padding: 10px; } 
              @page { margin: 0.5in; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    newWindow.document.close();
    setTimeout(() => {
      newWindow.print();
    }, 500);
  };

  const downloadHTML = () => {
    if (!atsResumeHTML) {
      alert('No resume content to download');
      return;
    }

    const blob = new Blob([atsResumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ATS_Resume_${resumeData?.personalInfo?.firstName || 'Resume'}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Generating Your ATS Resume</h2>
          <p className="text-gray-600">Converting your data to JSON and creating ATS-optimized format...</p>
          <p className="text-sm text-gray-500 mt-2">This may take 10-15 seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-4">Generation Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={generateATSResume}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'} bg-gray-200 flex flex-col`}>
      {/* Compact Header Bar */}
      <div className="flex-shrink-0 bg-white border-b border-gray-300 shadow-sm">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              {generationSuccess && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              <div>
                <h1 className="text-lg font-bold text-gray-900">Resume Preview</h1>
                <p className="text-xs text-gray-600">ATS-optimized • A4 Format</p>
              </div>
            </div>
            
            {/* Center - Zoom Controls */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-white rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3 h-3 text-gray-600" />
              </button>
              <span className="text-xs font-medium text-gray-700 min-w-[50px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-white rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3 h-3 text-gray-600" />
              </button>
            </div>
            
            {/* Right Section - Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                <Maximize2 className="w-4 h-4 text-gray-600" />
              </button>
              
              <div className="h-4 w-px bg-gray-300"></div>
              
              <button
                onClick={downloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <Download className="w-3 h-3" />
                PDF
              </button>
              <button
                onClick={downloadHTML}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <FileText className="w-3 h-3" />
                HTML
              </button>
              <button
                onClick={generateATSResume}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* A4 Paper Viewer Area */}
      <div className="flex-1 overflow-auto bg-gray-300 p-6">
        <div className="flex justify-center">
          {/* A4 Paper Container */}
          <div 
            className="bg-white shadow-2xl transition-all duration-300 relative"
            style={{ 
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              width: '210mm', // A4 width
              minHeight: '297mm', // A4 height
              maxWidth: 'none' // Allow full A4 width
            }}
          >
            {/* Paper Border Effect */}
            <div className="absolute inset-0 border border-gray-300 pointer-events-none"></div>
            
            {/* Resume Content */}
            <div 
              id="ats-resume-preview" 
              className="a4-resume-content"
              dangerouslySetInnerHTML={{ __html: atsResumeHTML }}
            />
            
            {/* Paper Corner Shadow */}
            <div className="absolute top-0 right-0 w-4 h-4 bg-gray-400 opacity-20 transform rotate-45 translate-x-2 -translate-y-2"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-gray-400 opacity-20 transform rotate-45 -translate-x-2 translate-y-2"></div>
          </div>
        </div>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-md">
        <span className="text-sm font-medium text-gray-700">
          {zoomLevel}% • A4 Format
        </span>
      </div>

      {/* Enhanced CSS for A4 Resume */}
      <style jsx>{`
        .a4-resume-content {
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          font-family: Arial, sans-serif;
          font-size: 11pt;
          line-height: 1.6;
          color: #333;
          background: white;
          box-sizing: border-box;
          overflow: hidden;
        }

        .a4-resume-content * {
          font-family: Arial, sans-serif !important;
          box-sizing: border-box;
        }

        /* Header Section */
        .a4-resume-content .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
        }

        .a4-resume-content .name,
        .a4-resume-content h1 {
          font-size: 28px !important;
          font-weight: bold !important;
          margin-bottom: 10px !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          color: #333 !important;
        }

        .a4-resume-content .headline {
          font-size: 16px !important;
          color: #666 !important;
          margin-bottom: 15px !important;
          font-style: italic !important;
        }

        .a4-resume-content .contact-info {
          display: flex !important;
          justify-content: center !important;
          flex-wrap: wrap !important;
          gap: 20px !important;
          font-size: 14px !important;
          color: #333 !important;
        }

        /* Section Titles */
        .a4-resume-content .section-title {
          font-size: 18px !important;
          font-weight: bold !important;
          text-transform: uppercase !important;
          border-bottom: 1px solid #ccc !important;
          padding-bottom: 5px !important;
          margin-bottom: 15px !important;
          letter-spacing: 0.5px !important;
          color: #333 !important;
        }

        /* Section Items */
        .a4-resume-content .section {
          margin-bottom: 25px !important;
        }

        .a4-resume-content .experience-item,
        .a4-resume-content .education-item,
        .a4-resume-content .certificate-item {
          margin-bottom: 20px !important;
          padding-left: 10px !important;
        }

        .a4-resume-content .job-title,
        .a4-resume-content .degree-title,
        .a4-resume-content .cert-title {
          font-size: 16px !important;
          font-weight: bold !important;
          margin-bottom: 5px !important;
          color: #333 !important;
        }

        .a4-resume-content .company,
        .a4-resume-content .institution,
        .a4-resume-content .issuer {
          font-size: 14px !important;
          color: #666 !important;
          margin-bottom: 5px !important;
        }

        .a4-resume-content .duration,
        .a4-resume-content .dates {
          font-size: 13px !important;
          color: #888 !important;
          margin-bottom: 10px !important;
        }

        .a4-resume-content .description,
        .a4-resume-content .responsibilities {
          font-size: 14px !important;
          line-height: 1.6 !important;
          margin-bottom: 10px !important;
          color: #333 !important;
        }

        /* Skills Section */
        .a4-resume-content .skills-section {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 15px !important;
        }

        .a4-resume-content .skills-category {
          margin-bottom: 15px !important;
        }

        .a4-resume-content .skills-category-title {
          font-weight: bold !important;
          margin-bottom: 8px !important;
          color: #333 !important;
          font-size: 14px !important;
        }

        .a4-resume-content .skills-list {
          font-size: 14px !important;
          line-height: 1.5 !important;
          color: #333 !important;
        }

        /* Achievements */
        .a4-resume-content .achievement-item {
          margin-bottom: 15px !important;
          padding-left: 20px !important;
          position: relative !important;
          font-size: 14px !important;
          color: #333 !important;
        }

        .a4-resume-content .achievement-item:before {
          content: "•" !important;
          position: absolute !important;
          left: 0 !important;
          font-weight: bold !important;
          color: #333 !important;
        }

        /* Languages */
        .a4-resume-content .languages-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
          gap: 15px !important;
        }

        .a4-resume-content .language-item {
          font-size: 14px !important;
          padding: 8px !important;
          background: #f9f9f9 !important;
          border-radius: 4px !important;
          color: #333 !important;
        }

        /* Print optimization */
        @media print {
          .a4-resume-content {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 15mm !important;
            font-size: 12px !important;
          }
          
          .a4-resume-content .name {
            font-size: 24px !important;
          }
          
          .a4-resume-content .section-title {
            font-size: 16px !important;
          }
        }

        /* Smooth scrolling */
        .overflow-auto {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f1f5f9;
        }

        .overflow-auto::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .overflow-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .overflow-auto::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 4px;
        }

        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}