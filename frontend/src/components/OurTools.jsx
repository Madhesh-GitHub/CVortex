import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DocumentMagnifyingGlassIcon, 
  BriefcaseIcon, 
  PencilSquareIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';

const OurTools = () => {
  const navigate = useNavigate();

  // Auth check function similar to Hero component
  const handleToolClick = (toolLink) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate(toolLink);
    } else {
      navigate("/login", { state: { redirectTo: toolLink } });
    }
  };

  const tools = [
    {
      id: 1,
      title: "AI Resume Analyzer",
      description: "Get instant ATS-friendly resume analysis with AI-powered scoring and improvement suggestions.",
      icon: DocumentMagnifyingGlassIcon,
      status: "Ready",
      statusColor: "bg-green-100 text-green-800",
      link: "/app/upload",
      features: ["ATS Compatibility Check", "Instant Scoring", "Detailed Feedback"],
      isReady: true
    },
    {
      id: 2,
      title: "Job Description Analyzer",
      description: "Analyze job descriptions to understand key requirements and optimize your applications.",
      icon: BriefcaseIcon,
      status: "Ready", 
      statusColor: "bg-green-100 text-green-800",
      link: "/jd-analyzer",
      features: ["Keyword Extraction", "Skills Matching", "Requirements Analysis"],
      isReady: true
    },
    {
      id: 3,
      title: "Career Blogs & Tips",
      description: "Access expert articles, career advice, and industry insights to boost your professional growth.",
      icon: PencilSquareIcon,
      status: "Ready",
      statusColor: "bg-green-100 text-green-800", 
      link: "/blog",
      features: ["Expert Articles", "Career Tips", "Industry Insights"],
      isReady: true,
      requiresAuth: false // Blog doesn't need auth
    },
    {
      id: 4,
      title: "Resume Builder",
      description: "Create professional, ATS-optimized resumes with our intelligent resume builder tool.",
      icon: WrenchScrewdriverIcon,
      status: "90% Ready - Beta",
      statusColor: "bg-yellow-100 text-yellow-800",
      link: "/builder/personal",
      features: ["Multiple Templates", "Real-time Preview", "ATS Optimization"],
      isReady: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Tools for Your Career Success
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            CVortex provides 4 essential tools to accelerate your job search. 
            <span className="font-semibold text-blue-600"> 3 tools are fully ready</span>, 
            and we're continuously improving based on user feedback.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`relative bg-white rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                tool.isReady 
                  ? 'border-blue-200 hover:border-blue-400' 
                  : 'border-yellow-200 hover:border-yellow-400'
              }`}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${tool.statusColor}`}>
                  {tool.status}
                </span>
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                tool.isReady ? 'bg-blue-100' : 'bg-yellow-100'
              }`}>
                <tool.icon className={`w-6 h-6 ${
                  tool.isReady ? 'text-blue-600' : 'text-yellow-600'
                }`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {tool.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 min-h-[40px]">
                {tool.description}
              </p>

              {/* Features */}
              <ul className="space-y-1 mb-6">
                {tool.features.map((feature, index) => (
                  <li key={index} className="text-xs text-gray-500 flex items-center">
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      tool.isReady ? 'bg-green-400' : 'bg-yellow-400'
                    }`}></span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button with Auth Check */}
              <button
                onClick={() => {
                  // Blog doesn't require authentication
                  if (tool.requiresAuth === false) {
                    navigate(tool.link);
                  } else {
                    handleToolClick(tool.link);
                  }
                }}
                className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  tool.isReady
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                {tool.isReady ? 'Try Now' : 'Try Beta'}
              </button>

              {/* Beta Note for Resume Builder */}
              {!tool.isReady && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  <span className="font-medium">Note:</span> We improve based on your feedback!
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA with Auth Checks */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to Boost Your Career?
            </h3>
            <p className="text-gray-600 mb-6">
              Start with our AI Resume Analyzer and get instant insights into your resume's ATS compatibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleToolClick("/app/upload")}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Analyze My Resume
              </button>
              <button
                onClick={() => handleToolClick("/jd-analyzer")}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Analyze Job Description
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTools;