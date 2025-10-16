import React from 'react';
import Button from "../Components/ProfileButton"
import {Card,CardContent} from "../Components/ProfileCards"
import avatar from "../../public/avatar.png"
import PageHeader from '../Components/PageHeader';
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
  Github
} from "lucide-react";



const Profile = () => {
  const user = {
    fullName: "Alex Johnson",
    email: "alex.johnson@university.edu",
    institute: "University of Technology",
    degree: "Computer Science",
    year: "3rd Year",
    createdAt: "January 2024",
    profilePic: "",
    bio: "Passionate about technology and innovation. Building the future one project at a time.",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson"
  };

  return (
    <div>
         <PageHeader name="Profile"/>
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
                  src={user.profilePic || avatar} 
                  alt={user.fullName}
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>

              {/* Name & Bio */}
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r text-[#5039f6] bg-clip-text ">
                  {user.fullName}
                </h1>
                <p className="text-gray-500 text-base md:text-lg max-w-2xl">
                  {user.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {user.linkedin && (
                  <a 
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {user.github && (
                  <a 
                    href={user.github}
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
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Joined {user.createdAt}</span>
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
                  <span className="text-sm">{user.institute}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">{user.degree}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{user.year}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Action Buttons */}
        <Card>
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              
              <Button variant="outline">
                <Package className="w-6 h-6" />
                <span className="text-xs md:text-sm font-semibold">My Listings</span>
              </Button>

              <Button variant="outline">
                <Edit className="w-6 h-6" />
                <span className="text-xs md:text-sm font-semibold">Edit Profile</span>
              </Button>
              
              <Button variant="outline">
                <Heart className="w-6 h-6" />
                <span className="text-xs md:text-sm font-semibold">Wishlist</span>
              </Button>
              
               <Button variant="outline">
                <Plus className="w-6 h-6" />
                <span className="text-xs md:text-sm font-semibold">Create New Listing</span>
              </Button>

               <Button variant="ghost">
                <LogOut className="w-6 h-6" />
                <span className="text-xs md:text-sm font-semibold">Logout</span>
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