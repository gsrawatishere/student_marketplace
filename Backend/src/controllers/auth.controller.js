import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import swot from "swot-node";
import { generateAccessToken, generateRefreshToken } from "../lib/utils.js";

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
        .status(401)
        .json({ msg: "User already exists! Please Login " });
    }

    const isAcademic = await swot.isAcademic(email);

    if (!isAcademic) {
      return res
        .status(401)
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
        },
      },
    });
    console.log(newUser);
    return res
      .status(200)
      .json({ msg: "User registration successful, Please Login" });
  } catch (error) {
    console.error("Error in register route", error);
    res.status(200).json({ msg: "Error in user registration", error });
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

    res.status(200).json({ msg: "Login Success!" });
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
