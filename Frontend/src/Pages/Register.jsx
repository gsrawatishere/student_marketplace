import { useState } from "react";
import { School, Mail, Key, User, GraduationCap, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosinstance";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../components/OTPVerification";

const Register = () => {
  const degrees = {
    "B.Tech / B.E.": 4,
    "M.Tech / M.E.": 2,
    "B.Sc": 3,
    "M.Sc": 2,
    "B.Com": 3,
    "M.Com": 2,
    "B.A.": 3,
    "M.A.": 2,
    BBA: 3,
    "MBA / PGDM": 2,
    LLB: 3,
    LLM: 2,
    MBBS: 5,
    "MD / MS": 3,
    BDS: 5,
    MDS: 3,
    BCA: 3,
    MCA: 2,
    "B.Ed": 2,
    "M.Ed": 2,
    "B.Des / B.Arch": 4,
    "M.Des / M.Arch": 2,
    "B.Pharm": 4,
    "M.Pharm / Pharm.D": 2,
    "B.Sc Agriculture / B.V.Sc": 4,
    "M.Sc Agriculture / M.V.Sc": 2,
    "Nursing & Paramedical (B.Sc Nursing, BPT, BOT etc.)": 4,
    "Fine Arts / Performing Arts (BFA, MFA, BPA, MPA)": 3,
    "Media & Journalism (BJMC, MJMC)": 3,
    "Hotel Management & Tourism (BHM, MHM, BTTM, MTTM)": 3,
    "Ph.D": 3, // can vary
    Diploma: 2,
    Other: 1,
  };

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", {
        email,
        fullName,
        password,
        degree: selectedDegree,
        year: selectedYear,
      });

      if (response.status === 200) {
        toast.success(response.data.msg);
        setUserId(response.data.userId);
        setShowOtpForm(true);
        // Clear all fields on success
        // setEmail("");
        setFullName("");
        setPassword("");
        setSelectedYear("");
        setSelectedDegree("");
        setYears([]);
        
      }
    } catch (error) {
      console.error("Failed to Register:", error);
      const errorMessage = error.response?.data?.msg || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //submit otp
  const handleSubmitOtp = async (otpValue)=>{
     try {
       const response = await axiosInstance.post("/auth/verify-otp",{
            otp : otpValue,
              userId
       })
       if(response.status == 200){
         toast.success(response.data.msg);
         setEmail("");
         setShowOtpForm(false);
         navigate("/login");
       }
     } catch (error) {
      console.error("Failed to verify OTP:", error);
      const errorMessage = error.response?.data?.msg || "Failed to verify OTP";
      toast.error(errorMessage);
     }
  }
  //close fn
  const handleClose = async ()=>{
    setEmail("");
    setShowOtpForm(false);
  }

  const handleDegree = (degree) => {
    setSelectedDegree(degree);
    setSelectedYear("");

    const duration = degrees[degree];
    if (duration) {
      const yr = Array.from({ length: Math.ceil(duration) }, (_, i) => i + 1);
      setYears(yr);
    } else {
      setYears([]);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {showOtpForm && (
        <OTPVerification
          email={email}
          onSubmit={handleSubmitOtp}
          onClose={handleClose}
        />
      )}
      <div className="min-h-screen flex flex-col justify-center items-center w-full">
        <div className="flex flex-col items-center w-full p-6 sm:p-12">
          <div className="w-full max-w-md">
            {/* Logo section */}
            <div className="flex flex-col items-center gap-2">
              <div className="size-12 bg-indigo-200 rounded-xl flex items-center justify-center hover:bg-indigo-300 transition-colors">
                <School className="text-primary size-6" />
              </div>
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-s text-slate-400">
                Get started with your new account
              </p>
            </div>

            {/* input form */}
            <div className="flex flex-col items-center py-6">
              <form onSubmit={handleRegister} className="w-full">
                <div className="mb-6">
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                      type="text"
                      className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your academic mail"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Degree
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <GraduationCap className="w-5 h-5 text-gray-400" />
                    </div>
                    <select
                      value={selectedDegree}
                      className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => handleDegree(e.target.value)}
                      required
                    >
                      <option value="">Select your degree</option>
                      {Object.keys(degrees).map((degree, index) => (
                        <option key={index} value={degree}>
                          {degree}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Year of Study
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      disabled={!selectedDegree}
                      className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">Select year</option>
                      {years.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <Key className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="******"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2 transition-all cursor-pointer"
                >
                  Register
                </button>
              </form>

              <div>
                <p className="text-slate-700 font-md pt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-900 underline">
                    Login
                  </Link>{" "}
                  {/* ✅ FIX */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
