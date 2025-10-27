import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordInput({ onSubmit, onClose }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [timer, setTimer] = useState(600); // 10 minutes

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Handle OTP input
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("").trim();

    if (!otpValue) {
      toast.error("OTP is required!");
      return;
    }

    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP!");
      return;
    }

    if (!newPassword.trim()) {
      toast.error("Password is required!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    onSubmit(otpValue, newPassword);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-blue-600 text-xl font-semibold cursor-pointer"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">
          Reset Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter the OTP sent to{" "}
          <span className="font-medium text-blue-600">Email</span> and your
          new password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          {/* OTP Input */}
          <div className="flex gap-2 justify-center">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                maxLength="1"
                className="w-10 h-12 text-center border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 text-lg font-semibold text-gray-800"
                required
              />
            ))}
          </div>

          {/* New Password */}
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-blue-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm"
            required
            minLength={6}
          />

          {/* Timer */}
          <p className="text-sm text-gray-500">
            OTP expires in{" "}
            <span className="text-blue-600 font-medium">
              {formatTime(timer)}
            </span>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-lg px-6 py-2 text-sm font-semibold transition-all w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}