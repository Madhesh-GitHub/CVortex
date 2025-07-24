import React, { useState, useEffect } from 'react';
import { Download, FileText, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const GenerateAtsResume = () => {
  const [resumeHTML, setResumeHTML] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [latestFilename, setLatestFilename] = useState('');

  useEffect(() => {
    fetchLatestResumeAndGenerate();
  }, []);

  const fetchLatestResumeAndGenerate = async () => {
    setLoading(true);
    setError('');
    
    try {
      // First, get the latest resume filename
      console.log('🔍 Fetching latest resume...');
      const latestResponse = await fetch('http://localhost:5000/api/latest');
      const latestData = await latestResponse.json();
      
      if (!latestData.success) {
        throw new Error(latestData.message || 'No resume found');
      }
      
      const filename = latestData.filename;
      setLatestFilename(filename);
      console.log('📄 Latest resume:', filename);
      
      // Then generate ATS resume
      console.log('🎯 Generating ATS resume...');
      const response = await fetch(`http://localhost:5000/api/generate-ats-resume/${filename}`);
      const data = await response.json();
      
      if (data.success) {
        setResumeHTML(data.html);
        setResumeData(data.data);
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
    const newWindow = window.open('', '_blank');
    
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ATS Resume - ${resumeData?.name || 'Resume'}</title>
          <script src="https://cdn.tailwindcss.com"></script>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Generating your ATS-friendly resume...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-4">Generation Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={fetchLatestResumeAndGenerate}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <p className="text-sm text-gray-500">
              Make sure you have uploaded a resume first.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ATS-Friendly Resume
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your resume has been optimized for Applicant Tracking Systems with clean formatting and proper structure.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={downloadPDF}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={fetchLatestResumeAndGenerate}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Regenerate
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Source: {latestFilename}
          </p>
        </div>

        {/* Resume Preview */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center gap-2 text-green-600">
              <FileText className="w-5 h-5" />
              <span className="font-medium">ATS-Optimized Resume Generated</span>
            </div>
          </div>

          <div 
            id="ats-resume-preview" 
            className="p-8"
            dangerouslySetInnerHTML={{ __html: resumeHTML }}
          />
        </div>

        {/* Debug Info (Development only) */}
        {process.env.NODE_ENV === 'development' && resumeData && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <details>
              <summary className="cursor-pointer font-medium text-yellow-800">
                Debug: View JSON Data
              </summary>
              <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-auto max-h-64">
                {JSON.stringify(resumeData, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateAtsResume;