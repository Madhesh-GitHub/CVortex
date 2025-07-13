import React, { useState } from "react";

const WorkExperience = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    responsibilities: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    // Add backend or localStorage save logic here
  };

  const handleDelete = () => {
    setFormData({
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      responsibilities: "",
    });
  };

  return (
    <div className="p-8 bg-[#f9f9fb] min-h-screen text-[#333]">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#4338ca]">Work Experience</h1>
          <div className="space-x-2">
            <button className="bg-[#ede9fe] text-[#6d28d9] px-4 py-2 rounded-md font-medium">
              Previous: Personal Info
            </button>
            <button className="bg-[#ede9fe] text-[#6d28d9] px-4 py-2 rounded-md font-medium">
              Next: Education
            </button>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-[#4b5563]">Your Work History</h2>
        <p className="mb-4 text-sm text-gray-600">Add your most recent positions first.</p>

        {/* Completion status bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "33%" }}></div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Job Title*</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Project Manager"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Company Name*</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Acme Corporation"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Start Date*</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date*</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              disabled={formData.isCurrent}
            />
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                name="isCurrent"
                checked={formData.isCurrent}
                onChange={handleChange}
                className="mr-2"
              />
              Current Job
            </label>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Key Responsibilities & Achievements*</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="Describe your key responsibilities, achievements, and projects..."
            rows="5"
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">
            Tip: Use bullet points and action verbs to highlight your achievements
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-md font-medium"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-6 py-2 rounded-md font-semibold"
          >
            Save Position
          </button>
        </div>

        {/* ATS Optimization Tips */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">ATS Optimization Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-blue-700">Use Keywords from Job Description</h4>
              <p className="text-sm mt-1">
                Include relevant keywords to increase chances of passing ATS filters.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-blue-700">Use Standard Job Titles</h4>
              <p className="text-sm mt-1">
                Use industry-standard titles so ATS systems recognize your role.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-blue-700">Quantify Your Achievements</h4>
              <p className="text-sm mt-1">
                Use numbers and metrics to highlight the impact of your work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
