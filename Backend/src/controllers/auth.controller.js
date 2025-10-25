import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import swot from "swot-node";
import { generateAccessToken, generateOTP, generateRefreshToken } from "../lib/utils.js";
import { sendEmail } from "../lib/sendEmail.js";

const prisma = new PrismaClient();

// register

export const register = async (req, res) => {
  try {
    const { email, fullName, password, degree, year } = req.body;

    const existUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existUser) {
      return res
        .status(400)
        .json({ msg: "User already exists! Please Login " });
    }

    const isAcademic = await swot.isAcademic(email);

    if (!isAcademic) {
      return res
        .status(400)
        .json({ msg: "Please register using an academic email" });
    }
    let institute = null;
    institute = await swot.getSchoolName(email);

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        institute,
        degree,
        year,
        profile: {
          create: {},
        }
      },
    });

   await prisma.wishlist.create({
  data: {
    userId: newUser.id, 
  },
});
    const otpRecord = await generateOTP(newUser.id);

     const emailSent = await sendEmail({
      to: newUser.email,
      subject: "Your OTP Verification Code",
      text: `Your OTP is ${otpRecord.otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP is <strong>${otpRecord.otp}</strong>. It will expire in 10 minutes.</p>`,
    });

    if (!emailSent) return res.status(500).json({ msg: "Failed to send OTP email" }); 

    return res
      .status(200)
      .json({ msg: "User created! Please check your email for the OTP.", userId: newUser.id });
  } catch (error) {
    console.error("Error in register route", error);
    res.status(500).json({ msg: "Error in user registration", error });
  }
};

//login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existUser) {
      return res.status(400).json({ msg: "User does not Exist!" });
    }
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password!" });
    }
    generateAccessToken(existUser.id, res);

    const refreshToken = generateRefreshToken(existUser.id, res);

    const updated = await prisma.user.update({
      where: { id: existUser.id },
      data: {
        refreshtokens: {
          create: {
            refreshtoken: refreshToken,
            expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
          },
        },
      },
    });

      
     if(!existUser.isVerified){
      const otpRecord = await generateOTP(existUser.id);

     const emailSent = await sendEmail({
      to: existUser.email,
      subject: "Your OTP Verification Code",
      text: `Your OTP is ${otpRecord.otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP is <strong>${otpRecord.otp}</strong>. It will expire in 10 minutes.</p>`,
    });
       if (!emailSent)
        return res.status(500).json({ msg: "Failed to send OTP email" });
        console.log(existUser.id)
      return res.status(202).json({
        msg: "Please verify your email!",
        userId: existUser.id,
      });
    }
     return res.status(200).json({ msg: "Login Success!" });
  } catch (error) {
    console.error("Error in login router", error);
    res.status(500).json({ msg: "Error in user Login", error });
  }
};

//logout

export const logout = async (req, res) => {
  try {
    res.cookie("refreshToken", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: true,
    });

    res.cookie("accessToken", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: true,
    });

    return res.status(200).json({ msg: "Logged out successfully!" });
  } catch (error) {
    console.error("Error in logout", error);
    res.status(500).json({ msg: "Error in logout", error });
  }
};


//verify otp

export const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    console.log(req.body);

    if (!userId || !otp) {
      return res.status(400).json({ msg: "Missing userId or OTP" });
    }

    const otpRecord = await prisma.oTP.findFirst({
      where: {
        userId,
        otp,
        isUsed: false,
        expiresAt: { gte: new Date() },
      },
    });

    if (!otpRecord) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    // Mark OTP as used
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { isUsed: true },
    });

    // Mark user as verified
    await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });

    res.status(200).json({ msg: "OTP verified successfully! Please Login" });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ msg: "Failed to verify OTP", error });
  }
};


//forget password

export const sendOtp = async (req,res) =>{
  try {
    const {email} = req.body;
    const existUser = await prisma.user.findUnique({
      where : {email : email }
    })
    
    if(!existUser){
      return res.status(400).json({msg : "User not found !"})
    }
    const otpRecord = await generateOTP(existUser.id);
    const emailSent = await sendEmail({
      to: existUser.email,
      subject: "Your OTP Verification Code",
      text: `Your OTP is ${otpRecord.otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP is <strong>${otpRecord.otp}</strong>. It will expire in 10 minutes.</p>`,
    });
       if (!emailSent){
          return res.status(500).json({ msg: "Failed to send OTP email" });
       }

      return res.status(200).json({
        msg: "Please check your email for the OTP ",
        userId: existUser.id,
      });    


  } catch (error) {
    console.error("Failed to send OTP :", error);
    res.status(500).json({ msg: "Failed to send OTP", error });
  }
}

//reset password

export const resetPassword = async (req, res) => {
  try { 
    const { id, otp, newPassword } = req.body;
     console.log(req.body);
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters long" });
    }

    const existUser = await prisma.user.findUnique({ where: { id } });
    if (!existUser) return res.status(400).json({ msg: "User not found!" });

    const otpRecord = await prisma.oTP.findFirst({
      where: {
        userId: id,
        otp,
        isUsed: false,
        expiresAt: { gte: new Date() },
      },
    });

    if (!otpRecord) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { isUsed: true },
    });

    
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("Failed to reset password:", error);
    res.status(500).json({ msg: "Failed to reset password", error });
  }
};