import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-10 py-2.5 bg-[#1F2937] border-b-[3px] border-[#6366F1] ">
      <div className="flex items-center font-bold text-[18px] text-[#6366F1]">
        <span className="mr-1"></span>
        <h4>ATS Tool</h4>
      </div>

      <div>
        <ul className="flex gap-[25px] list-none m-0 p-0">
          <li className="text-[14px] text-[#6366F1] hover:text-[#6366F1] cursor-pointer font-medium">Home</li>
          <li className="text-[14px] text-[#6366F1] hover:text-[#6366F1] cursor-pointer font-medium">Features</li>
          <li className="text-[14px] text-[#6366F1] hover:text-[#6366F1] cursor-pointer font-medium">Login</li>
          <li 
            className="text-[14px] text-[#6366F1] hover:text-[#6366F1] cursor-pointer font-medium"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header

