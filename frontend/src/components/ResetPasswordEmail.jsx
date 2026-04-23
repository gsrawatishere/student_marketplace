import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordEmail({ onClose, onContinue }) {
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    if (!email.trim()) return toast.error("Please enter your email");
    onContinue(email);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-lg p-6 relative">
        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
          Reset Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email to reset password
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-white border cursor-pointer border-blue-500 text-blue-600 rounded-lg px-4 py-2 hover:bg-blue-50 transition"
          >
            Close
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}