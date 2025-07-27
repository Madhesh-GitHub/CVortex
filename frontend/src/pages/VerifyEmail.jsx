import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const [email] = useState(localStorage.getItem("resetEmail"));

  const handleChange = (element, index) => {
    const newOtp = [...otp];
    const value = element.value.replace(/[^0-9]/g, "");
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }

    if (
      index === otp.length - 1 &&
      newOtp.every((digit) => digit.trim() !== "")
    ) {
      handleNext(newOtp);
    }
  };

  const handleNext = async (currentOtp) => {
    const isFilled = currentOtp.every((digit) => digit.trim() !== "");
    if (!isFilled) {
      alert("Please fill all fields.");
      return;
    }

    const otpValue = currentOtp.join("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/verify-otp",
        {
          email,
          otp: otpValue,
        }
      );

      console.log("Email from localStorage:", email);

      if (response.data.success) {
        console.log("OTP verified. Navigating to /reset-password...");
        navigate("/reset-password");
      } else {
        alert("Invalid or expired OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="verify-email min-h-screen bg-white">
      <div className="w-full">
        <Header />
      </div>

      <div className="flex items-center justify-center w-full px-4 mt-[100px]">
        <div className="max-w-md w-full text-center border border-gray-200 rounded-xl shadow-sm p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Check your email
          </h2>
          <p className="text-sm text-gray-500">
            Input the code that was sent to{" "}
            <span className="font-medium">{email}</span>
          </p>

          <div className="flex justify-center gap-3 mt-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className={`w-12 h-12 text-center text-xl border rounded-lg focus:outline-none ${
                  data.trim() === "" ? "border-blue-500" : "border-green-500"
                }`}
                required
              />
            ))}
          </div>

          <button
            onClick={() => handleNext(otp)}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md mt-6 hover:bg-blue-700 transition"
          >
            Next
          </button>

          <div className="text-sm text-blue-600 hover:underline mt-4">
            <a href="/login">← Back to login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
