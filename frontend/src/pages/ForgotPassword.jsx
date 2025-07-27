import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header/Header";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5000/api/users/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("resetEmail", email); // ✅ Save email here
      alert(data.message);
      navigate("/verify-email");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="forgot min-h-screen bg-white">
      <div className="w-full">
        <Header />
      </div>

      <div className="flex items-center justify-center w-full px-4 mt-[100px]">
        <div className="max-w-md w-full space-y-8 text-center border border-gray-200 rounded-xl shadow-sm p-8">
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">
            Forgot your password?
          </h2>
          <p className="text-sm text-gray-500">
            A code will be sent to your email to help reset password
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Reset password
            </button>
          </form>

          <div className="text-sm text-blue-600 hover:underline mt-4">
            <a href="/login">← Back to login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
