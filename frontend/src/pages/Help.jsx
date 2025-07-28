import React, { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  FileText,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

const topics = [
  {
    icon: <FileText className="w-6 h-6 text-indigo-600" />,
    title: "Resume Checker",
    desc: "Understand how we analyze your resume for better job targeting.",
  },
  {
    icon: <UploadCloud className="w-6 h-6 text-indigo-600" />,
    title: "Supported File Types",
    desc: "Learn which resume formats are accepted for upload and parsing.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
    title: "Privacy & Security",
    desc: "Know how we handle your data and ensure your privacy.",
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
    title: "Still need help?",
    desc: "Reach out to our support team. We’re here to help!",
  },
];

export default function HelpPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white px-6 py-16 text-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <HelpCircle className="mx-auto text-indigo-600 w-10 h-10 mb-4" />
          <h1 className="text-4xl font-bold tracking-tight">Help & Support</h1>
          <p className="mt-2 text-gray-600 text-base">
            Find answers to your questions and make the most of our platform.
          </p>
        </div>

        {/* Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-50 rounded-md">{topic.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{topic.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-20">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500">Didn’t find what you’re looking for?</p>
            <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto grid grid-cols-1 gap-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <textarea
              placeholder="Your Message"
              required
              className="p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
