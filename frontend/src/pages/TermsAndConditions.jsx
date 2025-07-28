import React from 'react';
import { ArrowLeft, FileText, Shield, User, AlertTriangle } from 'lucide-react';

const TermsAndConditions = () => {
  const handleBack = () => {
    window.history.back();
  };

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: "By accessing or using Cvortex, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, you may not use the service."
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Eligibility",
      content: "You must be at least 13 years old to use Cvortex. By using the service, you represent that you meet this requirement."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "User Accounts",
      content: [
        "You may sign in using your Google account.",
        "You are responsible for maintaining the confidentiality of your login credentials.",
        "You agree not to share your account or access with others."
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Use of the Service",
      content: [
        "Cvortex provides tools to build, preview, and analyze resumes.",
        "You agree not to misuse the platform for any unlawful purpose.",
        "You are responsible for the content you create and upload."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out 0.2s forwards;
          transform: scale(0);
        }
      `}</style>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-10 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="h-6 border-l border-gray-300"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-scale-in">
            <FileText className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            📝 Terms and Conditions for <span className="text-indigo-600">Cvortex</span>
          </h2>
          <p className="text-gray-600 text-lg">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-blue-800">
              Welcome to <strong>Cvortex</strong> – an AI-powered ATS Resume Checker and Resume Builder web application. 
              By accessing or using our website, you agree to the following terms and conditions. Please read them carefully.
            </p>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {/* Quick Access Sections */}
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {index + 1}. {section.title}
                    </h3>
                    {Array.isArray(section.content) ? (
                      <ul className="space-y-2">
                        {section.content.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 leading-relaxed">{section.content}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Additional Terms */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">5</span>
              Intellectual Property
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                All content, branding, and source code of Cvortex are protected by copyright and intellectual property laws.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                You may not copy, modify, or distribute any part of Cvortex without permission.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">6</span>
              Limitation of Liability
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We strive for accurate results, but Cvortex does not guarantee job placement or success. We are not liable for any loss resulting from the use of our service.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">7</span>
              Modifications to the Service
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Cvortex reserves the right to update or discontinue any part of the service at any time without prior notice.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">8</span>
              Termination
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We may suspend or terminate your access if you violate these Terms, misuse the service, or for any reason at our sole discretion.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">9</span>
              Privacy Policy
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Please refer to our Privacy Policy to understand how we collect, use, and protect your personal information.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">10</span>
              Governing Law
            </h3>
            <p className="text-gray-600 leading-relaxed">
              These terms are governed by and construed in accordance with the laws of India.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <h3 className="text-2xl font-bold mb-4">Questions about our Terms?</h3>
          <p className="text-indigo-100 mb-6">
            If you have any questions regarding these Terms and Conditions, feel free to contact us.
          </p>
          <a
            href="mailto:support@cvortex.com"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            📧 support@cvortex.com
          </a>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
          <p>© 2024 Cvortex. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;