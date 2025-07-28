import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, UserCheck, AlertCircle, Database, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  const handleBack = () => {
    window.history.back();
  };

  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal Information: When you create an account or log in using Google, we collect your name, email address, and profile picture.",
        "Resume Data: Any information you enter in the resume builder or upload for analysis (skills, experience, etc.).",
        "Usage Data: Information about how you interact with the site (e.g., visited pages, features used).",
        "Device Info: Browser type, IP address, device type, and general location (non-specific)."
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Provide and improve our resume-building and ATS analysis tools.",
        "Personalize your user experience.",
        "Respond to your inquiries and provide customer support.",
        "Send important updates or feature notifications.",
        "Maintain security and prevent fraud."
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Google Authentication",
      content: "If you choose to sign in with Google, we only access the basic profile information (name, email, profile picture) allowed under your permission scope. We do NOT access your contacts, drive, or any other private data."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Data Sharing and Disclosure",
      content: [
        "We do NOT sell, rent, or share your personal data with third parties for marketing purposes.",
        "We may share your data only to comply with legal obligations, enforce our terms of service, or with trusted service providers that help us operate Cvortex (e.g., secure hosting, analytics)."
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
              Privacy Policy
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-scale-in">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🔒 Privacy Policy for <span className="text-indigo-600">Cvortex</span>
          </h2>
          <p className="text-gray-600 text-lg">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-green-800">
              Your privacy is important to us. This Privacy Policy explains how <strong>Cvortex</strong> ("we", "our", or "us") collects, uses, and protects your personal information when you use our web application.
            </p>
          </div>
        </div>

        {/* Privacy Sections */}
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

          {/* Additional Privacy Terms */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">5</span>
              Cookies and Tracking
            </h3>
            <div className="text-gray-600 space-y-2">
              <p className="mb-2">We may use cookies or similar technologies to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  Maintain your login session.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  Understand user behavior for improving features.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  Measure traffic and performance.
                </li>
              </ul>
              <p className="mt-3 text-sm bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                You can disable cookies in your browser settings, but some features may not work properly.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">6</span>
              Data Security
            </h3>
            <div className="text-gray-600 space-y-2">
              <p className="mb-2">We use secure methods to protect your personal information, including:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  Encrypted connections (HTTPS)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  Secure authentication tokens
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  Limited access to sensitive data
                </li>
              </ul>
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-sm">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  However, no system is 100% secure. Use strong passwords and be mindful when sharing your information.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">7</span>
              Your Rights
            </h3>
            <div className="text-gray-600">
              <p className="mb-3">You have the right to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  View and update your account information.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  Request deletion of your data.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  Withdraw consent at any time by deleting your account.
                </li>
              </ul>
              <p className="mt-3 text-sm">
                Contact us at <a href="mailto:support@cvortex.com" className="text-indigo-600 hover:underline font-semibold">support@cvortex.com</a> to make such requests.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">8</span>
              Changes to This Policy
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy as our services evolve. If we make significant changes, we'll notify you via email or app notification.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <h3 className="text-2xl font-bold mb-4">Questions about our Privacy Policy?</h3>
          <p className="text-indigo-100 mb-6">
            For any questions regarding this Privacy Policy, feel free to contact us.
          </p>
          <a
            href="mailto:support@cvortex.com"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            📧 support@cvortex.com
          </a>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <p>© 2024 Cvortex. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;