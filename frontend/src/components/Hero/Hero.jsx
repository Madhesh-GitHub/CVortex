import React from 'react'
import heroImage from '../../assets/hero-image.png'
import { useNavigate } from 'react-router'

const Hero = () => {
  const navigate=useNavigate();
  return (
    <div className="flex justify-between items-center px-[80px] py-[60px] bg-[#fff6ef] gap-[40px]">
      <div className="flex-1 max-w-[55%]">
        <div className="mb-[25px]">
          <h1 className="text-[38px] font-bold text-[#5c4d7d] mb-[15px]">
            Optimize Your Resume for ATS Success
          </h1>
          <p className="text-[16px] text-[#5c4d7d] leading-[1.6]">
            Get your resume past the Applicant Tracking Systems and into the hands of hiring managers. Our AI-powered tool analyzes and improves your resume for maximum visibility
          </p>
        </div>

        <div className="flex gap-[20px]">
          <button className="bg-[#dcd9f4] text-[#5c4d7d] px-5 py-3 rounded-md hover:bg-[#c2bbf0] transition-all duration-300" onClick={()=>navigate('/app')} > Upload Your Resume </button>
          <button className="bg-[#b9b4e2]  text-white px-5 py-3 rounded-md  hover:bg-[#a59ce0] transition-all duration-300" onClick={() => navigate('/builder')}> Build ATS Ready Resume </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <img
          src={heroImage}
          alt="ATS Optimization Visual"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  )
}

export default Hero

