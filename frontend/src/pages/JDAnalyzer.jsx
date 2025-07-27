import React, { useState } from 'react';
import { 
  Search, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Target, 
  Lightbulb,
  FileText,
  Star,
  ArrowRight,
  ArrowLeft,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JDAnalyzer = () => {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeJD = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description');
      return;
    }

    if (jobDescription.trim().length < 50) {
      setError('Job description is too short. Please provide more details.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('🚀 Sending request to backend...');
      
      const response = await fetch('http://localhost:5000/api/jd/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription: jobDescription.trim(),
          jobTitle: jobTitle.trim()
        }),
      });

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 Analysis result:', data);

      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        setError(data.message || 'Failed to analyze job description');
      }
    } catch (err) {
      console.error('❌ Analysis error:', err);
      setError('Failed to connect to analysis service. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setJobDescription('');
    setJobTitle('');
    setError('');
  };

  const goBackToHome = () => {
    navigate('/');
  };

  const goToResumeBuilder = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Public Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <button 
                onClick={goBackToHome}
                className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold text-xl">ATS Resume Tool</span>
              </button>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={goBackToHome}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={goToResumeBuilder}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Resume Builder
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Job Description Analyzer
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Paste any job description to get AI-powered insights and optimization tips for your resume
            </p>
          </div>

          {!analysis ? (
            /* Input Section */
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="space-y-6">
                {/* Job Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Software Engineer, Data Scientist..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Job Description Textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the complete job description here..."
                    rows="12"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {jobDescription.length} characters (minimum 50 required)
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                    <span className="text-red-700">{error}</span>
                  </div>
                )}

                {/* Analyze Button */}
                <button
                  onClick={analyzeJD}
                  disabled={loading || jobDescription.trim().length < 50}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5 mr-2" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Analyze Job Description
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-8">
              {/* Header with Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
                    <p className="text-gray-600 mt-1">
                      Job: {analysis.job_title} • {analysis.company_type} • {analysis.experience_level} Level
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={resetAnalysis}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Analyze New Job
                    </button>
                    <button
                      onClick={goToResumeBuilder}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Build Resume Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Critical Keywords */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Critical Keywords</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Exact Match Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.critical_keywords?.exact_match?.map((keyword, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      )) || <span className="text-gray-500">No keywords found</span>}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Action Verbs</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.critical_keywords?.action_verbs?.map((verb, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {verb}
                        </span>
                      )) || <span className="text-gray-500">No action verbs found</span>}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Keyword Variations</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.critical_keywords?.variations?.map((variation, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {variation}
                        </span>
                      )) || <span className="text-gray-500">No variations found</span>}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Industry Terms</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.critical_keywords?.industry_terms?.map((term, index) => (
                        <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          {term}
                        </span>
                      )) || <span className="text-gray-500">No industry terms found</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Requirements */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Key Requirements</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Must-Have Skills</h4>
                    <ul className="space-y-2">
                      {analysis.key_requirements?.must_have_skills?.map((skill, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                          {skill}
                        </li>
                      )) || <li className="text-gray-500 text-sm">No must-have skills found</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Preferred Skills</h4>
                    <ul className="space-y-2">
                      {analysis.key_requirements?.preferred_skills?.map((skill, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <ArrowRight className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          {skill}
                        </li>
                      )) || <li className="text-gray-500 text-sm">No preferred skills found</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Soft Skills</h4>
                    <ul className="space-y-2">
                      {analysis.key_requirements?.soft_skills?.map((skill, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {skill}
                        </li>
                      )) || <li className="text-gray-500 text-sm">No soft skills found</li>}
                    </ul>
                  </div>
                </div>
                
                {analysis.key_requirements?.certifications?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Recommended Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.key_requirements.certifications.map((cert, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {analysis.key_requirements?.experience_requirements && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Experience Requirements</h4>
                    <p className="text-gray-700">{analysis.key_requirements.experience_requirements}</p>
                  </div>
                )}
              </div>

              {/* Resume Optimization */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-6 h-6 text-orange-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Resume Optimization Tips</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Summary Focus</h4>
                    <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                      {analysis.resume_optimization?.summary_focus || "No summary focus available"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Skills to Prioritize</h4>
                    <ul className="space-y-2">
                      {analysis.resume_optimization?.skills_prioritization?.map((skill, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {skill}
                        </li>
                      )) || <li className="text-gray-500 text-sm">No skills prioritization available</li>}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Experience Highlights</h4>
                    <ul className="space-y-2">
                      {analysis.resume_optimization?.experience_highlights?.map((highlight, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {highlight}
                        </li>
                      )) || <li className="text-gray-500 text-sm">No experience highlights available</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Achievement Metrics</h4>
                    <ul className="space-y-2">
                      {analysis.resume_optimization?.achievement_metrics?.map((metric, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {metric}
                        </li>
                      )) || <li className="text-gray-500 text-sm">No achievement metrics available</li>}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ATS Insights */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-6 h-6 text-red-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">ATS Optimization</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Formatting Tips</h4>
                    <ul className="space-y-2">
                      {analysis.ats_insights?.formatting_tips?.map((tip, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          • {tip}
                        </li>
                      )) || <li className="text-gray-500 text-sm">No formatting tips available</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Section Priorities</h4>
                    <ol className="space-y-2">
                      {analysis.ats_insights?.section_priorities?.map((section, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {index + 1}. {section}
                        </li>
                      )) || <li className="text-gray-500 text-sm">No section priorities available</li>}
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Avoid These Mistakes</h4>
                    <ul className="space-y-2">
                      {analysis.ats_insights?.common_mistakes?.map((mistake, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          ❌ {mistake}
                        </li>
                      )) || <li className="text-gray-500 text-sm">No common mistakes available</li>}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Improvement Areas */}
              {analysis.improvement_areas?.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Common Improvement Areas</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.improvement_areas.map((area, index) => (
                      <div key={index} className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                        <p className="text-sm text-gray-700">{area}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Competitive Edge */}
              {analysis.competitive_edge?.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Competitive Edge</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.competitive_edge.map((edge, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-green-400">
                        <p className="text-sm text-gray-700">{edge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Build Your Optimized Resume?</h3>
                <p className="text-blue-100 mb-6">
                  Use these insights to create a job-specific resume that gets past ATS systems and lands interviews.
                </p>
                <button
                  onClick={goToResumeBuilder}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Start Building Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JDAnalyzer;