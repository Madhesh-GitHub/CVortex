import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-between items-center px-10 py-2.5 bg-[#FFF2E0] border-b-[3px] border-[#c2b2d4] font-['Roboto']">
      <div className="flex items-center font-bold text-[18px] text-[#898AC4]">
        <span className="mr-1">▪️</span>
        <img src="" alt="" />
      </div>

      <div>
        <ul className="flex gap-[25px] list-none m-0 p-0">
          <li className="text-[14px] text-[#898AC4] hover:text-[#7d63a9] cursor-pointer">Home</li>
          <li className="text-[14px] text-[#898AC4] hover:text-[#7d63a9] cursor-pointer">Features</li>
          <li className="text-[14px] text-[#898AC4] hover:text-[#7d63a9] cursor-pointer font-medium">Login</li>
          <li className="text-[14px] text-[#d6d3e0] font-medium cursor-not-allowed">Sign Up</li>
        </ul>
      </div>
    </div>
  )
}

export default Header
