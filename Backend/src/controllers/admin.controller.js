import dotenv from "dotenv";
import { generateRefreshToken } from "../lib/utils.js"; 
dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; 

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    generateRefreshToken(ADMIN_EMAIL, res);

    res.status(200).json({ msg: "Admin Login Success!" });
  } catch (error) {
    console.error("Error in admin login router", error);
    res.status(500).json({ msg: "Error in admin login", error });
  }
};


export const Adminlogout = async (req, res) => {
  try {
    res.cookie("refreshToken", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: true,
    });


    return res.status(200).json({ msg: "Admin Logged out successfully!" });
  } catch (error) {
    console.error("Error in admin logout", error);
    res.status(500).json({ msg: "Error in admin logout", error });
  }
};