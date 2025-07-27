import React, { useState, useEffect, useRef } from 'react';
import { Download, FileText, Loader2, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';

export default function ResumePreview() {
  const [atsResumeHTML, setAtsResumeHTML] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generationSuccess, setGenerationSuccess] = useState(false);

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

  if (loading) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
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
      <div className="h-full bg-gray-50 flex items-center justify-center p-6">
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
          <p className="text-sm text-gray-500 mt-3">
            Make sure you have completed all sections of the resume builder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Floating Header Bar */}
      <div className="flex-shrink-0 bg-gray-50 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {generationSuccess && <CheckCircle className="w-6 h-6 text-green-500" />}
            <div>
              <h1 className="text-xl font-bold text-gray-900">ATS-Optimized Resume Preview</h1>
              <p className="text-sm text-gray-600">Clean structure, proper formatting, and keyword optimization included.</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={downloadPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={downloadHTML}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Download HTML
            </button>
            <button
              onClick={generateATSResume}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>
          </div>
        </div>
      </div>

      {/* Full Content Resume - NO CARD WRAPPER */}
      <div className="flex-1 overflow-auto bg-white">
        <div 
          id="ats-resume-preview" 
          className="w-full h-full p-8"
          dangerouslySetInnerHTML={{ __html: atsResumeHTML }}
        />
      </div>
    </div>
  );
}