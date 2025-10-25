import { PrismaClient } from "@prisma/client";
import cloudinary from "../lib/cloudinary.js";
const Prisma = new PrismaClient();

export const ProfileDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ msg: "No user id found!" });
    }
    const profile = await Prisma.user.findUnique({
      where: { id: userId },

      select: {
        id: true,
        fullName: true,
        email: true,
        institute: true,
        degree: true,
        year: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            profilepic: true,
            bio: true,
            linkedin: true,
            github: true,
          },
        },
      },
    });
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "No profile found for given user id" });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    console.error("Error in ProfileDetails", error);
    return res.status(500).json({ msg: "Error in ProfileDetails", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, degree, year, profilepic, bio, linkedin, github } =
      req.body;
    if (!userId) {
      return res.status(400).json({ msg: "No user id found!" });
    }

    const profileDataToUpdate = {
      bio,
      linkedin,
      github,
    };

    if (profilepic && profilepic.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(profilepic, {
        resource_type: "auto",
        folder : "StudentMarketplace"
      });

      profileDataToUpdate.profilepic = uploadResponse.secure_url;
    }

    const updatedUser = await Prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        degree,
        year,
        profile: {
          update: profileDataToUpdate,
        },
      },
    });

    return res.status(200).json({ msg: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error in editProfile", error);
    return res.status(500).json({ msg: "Error in editProfile", error });
  }
};

export const ProfileByUserId = async (req, res) => {
  try {
    
  const {id} = req.params;
  
    if (!id) {
      return res.status(400).json({ msg: "No user id found!" });
    }
    const profile = await Prisma.user.findUnique({
      where: { id },

      select: {
        id: true,
        fullName: true,
        email: true,
        institute: true,
        degree: true,
        year: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            profilepic: true,
            bio: true,
            linkedin: true,
            github: true,
          },
        },
      },
    });
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "No profile found for given user id" });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    console.error("Error in ProfileDetails", error);
    return res.status(500).json({ msg: "Error in ProfileDetails", error });
  }
};