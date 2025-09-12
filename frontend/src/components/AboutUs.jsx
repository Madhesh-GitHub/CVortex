import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About CVortex Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            CVortex was started on <span className="font-semibold text-blue-600">July 8, 2025</span> by 
            <span className="font-semibold text-purple-600"> 13 passionate students</span> from various states across India. 
            We came together with a shared vision to revolutionize career development and make job searching easier for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarDaysIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">July 8, 2025</h3>
            <p className="text-gray-600">Project Started</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UsersIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">13 Students</h3>
            <p className="text-gray-600">Team Members</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Multiple States</h3>
            <p className="text-gray-600">Across India</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Meet Our Amazing Team
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            From different states, different backgrounds, but united by one mission - 
            to help job seekers succeed. Discover the talented individuals who brought CVortex to life.
          </p>
          
          <button
            onClick={() => navigate('/contributors')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Meet the Team →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;