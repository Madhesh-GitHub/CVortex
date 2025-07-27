import React from 'react';
import { Search, Target, Lightbulb, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JDAnalysisSection = () => {
  const navigate = useNavigate();

  const handleAnalyzeClick = () => {
    navigate('/jd-analyzer'); // ✅ This should work now
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Job Description Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Paste any job description and get instant insights on what keywords, skills, 
            and experiences you need to highlight in your resume for maximum ATS compatibility.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Keyword Extraction</h3>
            <p className="text-sm text-gray-600">Identifies critical keywords and phrases from job postings</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Skills Mapping</h3>
            <p className="text-sm text-gray-600">Maps required skills to optimize your resume content</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Suggestions</h3>
            <p className="text-sm text-gray-600">Provides tailored recommendations for resume improvement</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">ATS Optimization</h3>
            <p className="text-sm text-gray-600">Ensures your resume passes automated screening systems</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Optimize Your Resume?
          </h3>
          <p className="text-gray-600 mb-6">
            Paste your target job description and get instant AI-powered insights to boost your chances of getting hired.
          </p>
          <button
            onClick={handleAnalyzeClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Analyze Job Description Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default JDAnalysisSection;