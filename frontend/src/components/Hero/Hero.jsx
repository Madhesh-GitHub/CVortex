import React from 'react'
import { assets } from '../../assets/assets'

const Hero = () => {
  return (
    <div className="flex justify-between items-center px-[80px] py-[60px] bg-[#fff6ef] gap-[40px]">
      <div className="flex-1 max-w-[55%]">
        <div className="mb-[25px]">
          <h1 className="text-[45px] font-bold text-[#5c4d7d] mb-[15px]">
            Optimize Your Resume for ATS Success
          </h1>
          <p className="text-[16px] text-[#5c4d7d] leading-[1.6]">
            Get your resume past the Applicant Tracking Systems and into the hands of hiring managers. Our AI-powered tool analyzes and improves your resume for maximum visibility
          </p>
        </div>

        <div className="flex gap-[20px]">
          <button className="px-[18px] py-[10px] text-[14px] font-medium bg-[#6c6690a8] text-[#f3f2f4] rounded-[6px] hover:bg-[#6c6690] transition-all duration-300">
            Upload Your Resume
          </button>
          <button className="px-[18px] py-[10px] text-[14px] font-medium bg-[#a19ad9] text-white rounded-[6px] hover:bg-[#493f8a] transition-all duration-300">
            Build ATS-Ready Resume
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <img
          src={assets.hero}
          alt="ATS Optimization Visual"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  )
}

export default Hero

