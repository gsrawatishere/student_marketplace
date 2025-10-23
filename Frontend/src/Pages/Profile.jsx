import React, { useEffect, useState } from "react";
import Button from "../Components/ProfileButton";
import { Card, CardContent } from "../Components/ProfileCards";
import avatar from "../../public/avatar.png";
import PageHeader from "../Components/PageHeader";
import { EditProfile } from "./EditProfile";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  School,
  BookOpen,
  Edit,
  Package,
  Heart,
  Plus,
  LogOut,
  Linkedin,
  Github,
} from "lucide-react";
import axiosInstance from "../Api/AxiosInstance";

import Loader from "../Components/Loader";
import toast from "react-hot-toast";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const navigate = useNavigate();

  async function getData() {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/profile/me");
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to get Profile data: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    console.log("clicked");
    try {
      const response = await axiosInstance.get("/auth/logout");
      if (response.status == 200) {
        toast.success(response.data.msg);
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to logout :", error);
      const errorMsg = error.response?.data?.msg || "Failed to logout";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // data for edit profile
  const initailData = {
    fullName: userData.profile.fullName,
    profilepic: userData.profile.profile?.profilepic || avatar,
    bio: userData.profile.profile?.bio,
    linkedin: userData.profile.profile?.linkedin,
    github: userData.profile.profile?.github,
    degree: userData.profile.degree,
    year: userData.profile.year,
  };

  if (!userData || !userData.profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Could not load profile data.</p>
      </div>
    );
  }

  const formattedJoinDate = new Date(
    userData.profile.createdAt
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <PageHeader name="Profile" />
      {editProfile && (
        <EditProfile
          onClose={() => {
            setEditProfile(false);
          }}
          initialData={initailData}
          getData={getData}
        />
      )}
      <div className="min-h-screen pt-14 md:pt-16">
        <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-8">
          {/* Hero Section */}
          <Card>
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Profile Picture */}
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-[#5039f6] to-[#8880ca] rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <img
                    src={userData.profile.profile?.profilepic || avatar}
                    alt={userData.profile.fullName}
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                </div>

                {/* Name & Bio */}
                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r text-[#5039f6] bg-clip-text ">
                    {userData.profile.fullName}
                  </h1>
                  <p className="text-gray-500 text-base md:text-lg max-w-2xl">
                    {userData.profile.profile?.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {userData.profile.profile?.linkedin && (
                    <a
                      href={userData.profile.profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}

                  {userData.profile.profile?.github && (
                    <a
                      href={userData.profile.profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-3 text-gray-800">
                  <User className="w-5 h-5 text-[#5039f6]" />
                  Contact Information
                </h2>
                <div className="space-y-3 pt-2 border-t">
                  <div className="flex items-center gap-3 text-gray-500">
                    <Mail className="w-4 h-4" />

                    <span className="text-sm">{userData.profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <Calendar className="w-4 h-4" />

                    <span className="text-sm">Joined {formattedJoinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Info */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-3 text-gray-800">
                  <GraduationCap className="w-5 h-5 text-[#5039f6]" />
                  Academic Details
                </h2>
                <div className="space-y-3 pt-2 border-t">
                  <div className="flex items-center gap-3 text-gray-500">
                    <School className="w-4 h-4" />

                    <span className="text-sm">
                      {userData.profile.institute}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <BookOpen className="w-4 h-4" />

                    <span className="text-sm">{userData.profile.degree}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <Calendar className="w-4 h-4" />

                    <span className="text-sm">{userData.profile.year}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Action Buttons */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/my-listings");
                  }}
                >
                  <Package className="w-6 h-6" />
                  <span className="text-xs md:text-sm font-semibold">
                    My Listings
                  </span>
                </Button>
                <Button
                 onClick={() => {
                      navigate("/addlisting");
                    }}
                variant="default">
                  <Plus
                    className="w-6 h-6"
                   
                  />
                  <span className="text-xs md:text-sm font-semibold">
                    Create New Listing
                  </span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setEditProfile(true);
                  }}
                >
                  <Edit className="w-6 h-6" />
                  <span className="text-xs md:text-sm font-semibold">
                    Edit Profile
                  </span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/wishlist");
                  }}
                >
                  <Heart className="w-6 h-6" />
                  <span className="text-xs md:text-sm font-semibold">
                    Wishlist
                  </span>
                </Button>

                <Button 
                onClick={handleLogout}
                variant="ghost">
                  <LogOut className="w-6 h-6"  />
                  <span className="text-xs md:text-sm font-semibold">
                    Logout
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
