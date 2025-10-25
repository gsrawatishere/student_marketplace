import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function OTPVerification({ email, onSubmit, onClose }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(600);

  // countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // format timer mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // handle input
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // ✅ FIXED: Backspace clears only previous box, not all
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        document.getElementById(`otp-${index - 1}`).focus();
      }
      setOtp(newOtp);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return toast.error("Please enter a valid 6-digit OTP");
    onSubmit(otpValue);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-lg p-6 relative">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-blue-600 text-xl font-semibold cursor-pointer"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">
          OTP Verification
        </h2>
        <p className="text-gray-600 text-center mb-6">
          OTP sent to <span className="font-medium text-blue-600">{email}</span>
        </p>

        {/* OTP Input Boxes */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
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
              />
            ))}
          </div>

          {/* Timer */}
          <p className="text-sm text-gray-500">
            OTP expires in <span className="text-blue-600 font-medium">{formatTime(timer)}</span>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-lg px-6 py-2 text-sm font-semibold transition-all"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}