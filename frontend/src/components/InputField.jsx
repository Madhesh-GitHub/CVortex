import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ label, icon: Icon, type = 'text', name, value, onChange, placeholder, showToggle, onToggle, showPassword }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-[#1F2937]">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type={showToggle ? (showPassword ? 'text' : 'password') : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full pl-10 pr-10 py-2 border rounded-md outline-none text-[#1F2937] placeholder-gray-500 focus:ring-2 focus:ring-emerald-500"
        />
        {showToggle && (
          <span onClick={onToggle} className="absolute right-3 top-3 text-gray-400 cursor-pointer">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
      </div>
    </div>
  );
};
export default InputField;