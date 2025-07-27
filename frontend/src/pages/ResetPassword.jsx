import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isLengthValid = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      alert("Email not found. Please verify OTP again.");
      navigate("/forgot-password");
      return;
    }

    if (password === confirmPassword && isLengthValid && hasSpecialChar) {
      try {
        const response = await axios.post("http://localhost:5000/api/users/reset-password", {
          email,
          newPassword: password,
        });

        if (response.data.success) {
          alert("Password reset successful");
          localStorage.removeItem("resetEmail");
          navigate("/login");
        } else {
          alert(response.data.message || "Reset failed");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Try again.");
      }
    } else {
      alert("Password validation failed.");
    }
  };

  return (
    <div className="reset-password min-h-screen bg-white">
      <div className="w-full">
        <Header />
      </div>
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 space-y-6 border rounded-md shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Set a new password</h2>
          <p className="text-gray-500 text-sm mt-3">
            Your new password must be different from previously used passwords
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm password</label>
            <input
              type="password"
              className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <img src="../../public/tick.png" alt="tick" className="w-4 h-4" />
              <span className={isLengthValid ? "text-green-600" : ""}>
                Must be at least 8 characters
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img src="../../public/tick.png" alt="tick" className="w-4 h-4" />
              <span className={hasSpecialChar ? "text-green-600" : ""}>
                Must contain one special character
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Reset password
          </button>
        </form>
        <div
          className="text-center text-sm text-blue-600 mt-4 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          ← Back to login
        </div>
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;
