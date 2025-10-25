import express from "express";
const router = express.Router();
import { login, logout, register, resetPassword, sendOtp, verifyOTP } from "../controllers/auth.controller.js";
import { updateAccessToken } from "../lib/utils.js";


router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/refresh-token",updateAccessToken);
router.post("/verify-otp",verifyOTP);
router.post("/send-otp",sendOtp)
router.post("/reset-password",resetPassword);

export default router;