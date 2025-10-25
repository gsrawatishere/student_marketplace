import React, { useState } from "react";
import { Link } from "react-router-dom";
import { School, Mail, Key } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../Api/AxiosInstance";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../Components/OTPVerification";
import ResetPasswordEmail from "../Components/ResetPasswordEmail";
import ResetPasswordInput from "../Components/ResetPasswordInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userId, setUserId] = useState("");
  const [showForgetPassword, setshowForgetPassword] = useState(false);
  const [showResetInput, setshowResetInput] = useState(false);
  

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 202) {
        toast.error(response.data.msg);
        setUserId(response.data.userId);
        setShowOtpForm(true);
        setPassword("");
      }

      if (response.status === 200) {
        toast.success(response.data.msg);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to Login:", error);
      const errorMessage = error.response?.data?.msg || "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //submit otp
  const handleSubmitOtp = async (otpValue) => {
    try {
      const response = await axiosInstance.post("/auth/verify-otp", {
        otp: otpValue,
        userId,
      });
      if (response.status == 200) {
        toast.success("Email verified successfully");
        setEmail("");
        setShowOtpForm(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      const errorMessage = error.response?.data?.msg || "Failed to verify OTP";
      toast.error(errorMessage);
    }
  };
  //close fn
  const handleClose = async () => {
    setEmail("");
    setShowOtpForm(false);
  };

//reset pass continue fn
const handleContinue = async (email)=>{
  setLoading(true);
   try {
          const response  = await axiosInstance.post('/auth/send-otp',{
            email
          })
          if(response.status == 200){
            toast.success(response.data.msg);
            setUserId(response.data.userId);
           setshowForgetPassword(false);
            setshowResetInput(true);
          }
   } catch (error) {
     console.error("Failed to send otp for foregt password ",error);
     const errorMsg = error.response?.data?.msg || "Failed to send otp forget password ";
     toast.error(errorMsg);
   }finally{
      setLoading(false);
   }
}

const handleResetPassword = async (otpValue,newPassword)=>{
     try {
        const response = await axiosInstance.post('/auth/reset-password',{
          id: userId,
          otp : otpValue,
          newPassword
        })
        if(response.status == 200){
          toast.success(response.data.msg);
          setshowResetInput(false);
        }
     } catch (error) {
      console.error("Failed to foregt password ",error);
     const errorMsg = error.response?.data?.msg || "Failed to forget password ";
     toast.error(errorMsg);
     }
}

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
      {showForgetPassword && (
        <ResetPasswordEmail onClose={()=>{setshowForgetPassword(false)}} onContinue={handleContinue} />
      )}
       {showResetInput && (
        <ResetPasswordInput
          onSubmit={handleResetPassword}
          onClose={()=>{setshowResetInput(false)}}
        />
      )}

      <div className="min-h-screen flex flex-col justify-center items-center w-full ">
        <div className="flex flex-col items-center w-full p-6 sm:p-12  ">
          <div className="w-full max-w-md ">
            {/* Logo section */}
            <div className="flex flex-col items-center gap-2 ">
              <div className="size-12 bg-indigo-200 rounded-xl flex items-center justify-center hover:bg-indigo-300 transition-colors">
                <School className="text-primary size-6" />
              </div>
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-s text-slate-400 ">Login to your account</p>
            </div>

            {/* input form */}
            <div className="flex flex-col items-center py-6 ">
              <form onSubmit={handleLogin} className="w-full ">
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
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="you@example.com"
                      required
                    />
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
                  className=" w-full cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2  transition-all"
                >
                  Login
                </button>
              </form>

              <div className="flex gap-9 md:gap-20">
                <p className="text-slate-700 font-md pt-4">
                  Create Account{" "}
                  <Link to="/register" className="text-blue-900 underline">
                    Register
                  </Link>
                </p>
                <p className="text-slate-700 font-md pt-4">
                  {" "}
                   <button
                    className="underline text-blue-900 cursor-pointer"
                    onClick={()=>{setshowForgetPassword(true)}}
                   >
                     Forget Password
                   </button>
                   
                 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
