import React from 'react';
import heroImage from '../../assets/hero-image.png';
import { useNavigate } from 'react-router';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between items-center p-5 bg-white gap-[40px] min-h-[90vh] ">
      {/* Left Content */}
      <div className="flex-1 w-full max-w-full lg:max-w-[55%] text-center lg:text-left ps-0 lg:ps-10 ">
        <div className="mb-[25px]">
          <h1 className="text-[28px] sm:text-[32px] lg:text-[38px] font-bold text-[#1F2937] mb-[15px]">
            Optimize Your Resume for ATS Success
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#6B7280] leading-[1.6] px-2 sm:px-4 lg:px-0">
            Get your resume past the Applicant Tracking Systems and into the hands of hiring managers. Our AI-powered tool analyzes and improves your resume for maximum visibility.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-[20px]">
          <button
            className="bg-[#6366F1] text-white px-5 py-3 rounded-md hover:bg-[#4F46E5] transition-all duration-300"
            onClick={() => navigate('/app')}
          >
            Upload Your Resume
          </button>
          <button
            className="bg-[#0EA5E9] text-white px-5 py-3 rounded-md hover:bg-[#0284C7] transition-all duration-300"
            onClick={() => navigate('/builder')}
          >
            Build ATS Ready Resume
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 w-full flex justify-center items-center">
        <img
          src='hero.png'
          alt="ATS Optimization Visual"
          className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;

