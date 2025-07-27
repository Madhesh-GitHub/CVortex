import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeBuilder } from '../contexts/ResumeBuilderContext';

const PersonalInformation = () => {
  const navigate = useNavigate();
  const { saveStepData, formData, loading } = useResumeBuilder();
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedIn: '',
    portfolio: '',
    headline: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    remote: false,
    relocate: false
  });

  // Load existing data if available
  useEffect(() => {
    if (formData.personalInfo) {
      setPersonalInfo(formData.personalInfo);
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = async () => {
    // Validate required fields
    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email) {
      alert('Please fill in all required fields (First Name, Last Name, Email)');
      return;
    }

    // Save data to backend
    const success = await saveStepData('personalInfo', personalInfo);
    
    if (success) {
      navigate('/builder/experience'); // This matches your existing route
    } else {
      alert('Failed to save personal information. Please try again.');
    }
  };

  return (
    // Remove the sidebar wrapper - use only the main content
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
      <p className="text-gray-600 mb-6">Complete your contact details to help recruiters reach you easily.</p>
      
      {/* ATS Tip */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="font-semibold text-blue-800">ATS Optimization Tip</h3>
        <p className="text-blue-700 text-sm">
          Use your legal name and provide complete contact information. ATS systems scan for these details first to match you with the right position.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedIn"
              value={personalInfo.linkedIn}
              onChange={handleInputChange}
              placeholder="linkedin.com/in/yourprofile"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Portfolio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Portfolio/Website
            </label>
            <input
              type="url"
              name="portfolio"
              value={personalInfo.portfolio}
              onChange={handleInputChange}
              placeholder="yourwebsite.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Professional Headline */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Headline
          </label>
          <input
            type="text"
            name="headline"
            value={personalInfo.headline}
            onChange={handleInputChange}
            placeholder="e.g., Senior Marketing Manager"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address Information */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={personalInfo.street}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apartment/Suite
              </label>
              <input
                type="text"
                name="apartment"
                value={personalInfo.apartment}
                onChange={handleInputChange}
                placeholder="Apt 4B"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={personalInfo.city}
                onChange={handleInputChange}
                placeholder="New York"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                name="state"
                value={personalInfo.state}
                onChange={handleInputChange}
                placeholder="NY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                name="zip"
                value={personalInfo.zip}
                onChange={handleInputChange}
                placeholder="10001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={personalInfo.country}
                onChange={handleInputChange}
                placeholder="United States"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Work Preferences */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remote"
                checked={personalInfo.remote}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Open to remote work
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="relocate"
                checked={personalInfo.relocate}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Willing to relocate
              </label>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            onClick={() => navigate('/builder')}
            className="px-6 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Dashboard
          </button>
          
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Next: Work Experience →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
