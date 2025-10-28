import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const prisma = new PrismaClient();

//generate accesstoken

export const generateAccessToken = (id, res) => {
  try {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "15m",
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
        secure: true,
    });
    return accessToken;
  } catch (error) {
    console.error("Error in generateAccessToken Route", error);
    res.status(500).json({ msg: "Failed to Generate Access Token!" });
  }
};

//generate refreshtoken
export const generateRefreshToken = (id, res) => {
  try {
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
        secure: true,
    });
    return refreshToken;
  } catch (error) {
    console.error("Error in generateRefreshToken Route", error);
    res.status(500).json({ msg: "Failed to Generate Refresh Token!" });
  }
};

//update accesstoken

export const updateAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;
    if (!incomingRefreshToken) {
      return res.status(403).json({ msg: "No Refresh Token Found!" });
    }

    let data;
    try {
      data = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      return res.status(403).json({ msg: "Invalid or Expired Refresh Token!" });
    }

    const id = data.id;
    const userData = await prisma.user.findUnique({
      where: { id },
      select: { 
        refreshtokens : {
          select : {refreshtoken: true, expiry: true}
        }
       },
    });

    if (!userData) {
      return res.status(403).json({ msg: "User not found!" });
    }

    const token = userData.refreshtokens.find(
      (t) => t.refreshtoken === incomingRefreshToken
    );

    if (!token) {
      return res.status(403).json({ msg: "Refresh Token mismatch!" });
    }

    if (new Date() > token.expiry) {
      return res.status(403).json({ msg: "Refresh Token expired!" });
    }

    const newAccessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "15m",
    });

    res.cookie("accessToken", newAccessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
        secure: true,
    });

    return res.status(200).json({ msg: "Access token updated" });
  } catch (error) {
    console.error("Error in updateAccessToken route:", error);
    res.status(500).json({ msg: "Unable to update access token", error });
  }
};


// generate otp 


// export const generateOTP = async (userId) => {
//   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//   const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

//   const otpRecord = await prisma.oTP.create({
//     data: {
//       userId,
//       otp,
//       expiresAt,
//     },
//   });

//   return otpRecord;
// };

export const generateOTP = async (userId) => {
  await prisma.$connect(); // ensures DB ready after Railway sleep

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const otpRecord = await prisma.oTP.create({
    data: {
      userId,
      otp,
      expiresAt,
    },
  });

  return otpRecord;
};