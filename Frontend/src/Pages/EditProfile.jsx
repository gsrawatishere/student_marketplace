import React, { useState, useEffect } from "react";
import {
  User,
  GraduationCap,
  Calendar,
  BookText,
  Linkedin,
  Github,
  Camera,
  X,
} from "lucide-react";
import axiosInstance from "../Api/AxiosInstance";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import avatar from "../../public/avatar.png";

export const EditProfile = ({ initialData, onClose, getData}) => {
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
    "Ph.D": 3,
    Diploma: 2,
    Other: 1,
  };

  const [formData, setFormData] = useState({
    fullName: "",
    degree: "",
    year: "",
    bio: "",
    linkedin: "",
    github: "",
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [yearOptions, setYearOptions] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        degree: initialData.degree || "",
        year: initialData.year || "",
        bio: initialData.bio || "",
        linkedin: initialData.linkedin || "",
        github: initialData.github || "",
      });

      setProfilePicPreview(initialData.profilepic || null);
      updateYearOptions(initialData.degree);
    }
  }, [initialData]);

  const updateYearOptions = (degree) => {
    const duration = degrees[degree];
    if (duration) {
      setYearOptions(Array.from({ length: duration }, (_, i) => String(i + 1)));
    } else {
      setYearOptions([]);
    }
  };

  const handleDegreeChange = (e) => {
    const newDegree = e.target.value;
    setFormData((prev) => ({ ...prev, degree: newDegree, year: "" }));
    updateYearOptions(newDegree);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
   
  const maxSizeInMB = 5; 
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    toast.error('Invalid image format. Please upload JPG, PNG, or WEBP only.');
    return;
  }

  if (file.size > maxSizeInBytes) {
    toast.error("Image too large! Max allowed size is ${maxSizeInMB}MB.")
    return;
  }

    if (file) {
      setProfilePicPreview(URL.createObjectURL(file));
    }
    const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    
      setProfilePicFile(base64Image)
      
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axiosInstance.post("/profile/update", {
        fullName: formData.fullName,
        degree: formData.degree,
        year: formData.year,
        profilepic: profilePicFile,
        bio: formData.bio,
        linkedin: formData.linkedin,
        github: formData.github,
      });
      if (response.status == 200) {
        toast.success(response.data.msg);
        getData();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // --- CHANGE: Defined the shared input styles in a variable for consistency ---
  const inputStyles =
    "block w-full pl-10 py-2.5 border border-gray-300 bg-white shadow-sm transition-all duration-200 focus:border-[#5039f6] focus:ring-2 focus:ring-[#5039f6]/50 focus:shadow-lg focus:shadow-[#5039f6]/20";
  const disabledInputStyles =
    "disabled:bg-gray-100 disabled:cursor-not-allowed";

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 p-4 bg-slate-50">
      {loading && <Loader />}
      <div className="bg-[#f9fafb] p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-md shadow-slate-300 ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={profilePicPreview || avatar}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
              />
              <label
                htmlFor="profile-pic-upload"
                className="absolute bottom-0 right-0 bg-[#5039f6] text-white p-2 rounded-full cursor-pointer hover:bg-[#402dbf]"
              >
                <Camera size={20} />
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 border-t pt-8">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                {/* --- CHANGE: Applied new styles --- */}
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={inputStyles}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="degree"
                className="block text-sm font-semibold text-gray-700"
              >
                Degree
              </label>
              <div className="relative mt-1">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                {/* --- CHANGE: Applied new styles --- */}
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleDegreeChange}
                  className={inputStyles}
                >
                  <option value="">Select Degree</option>
                  {Object.keys(degrees).map((deg) => (
                    <option key={deg} value={deg}>
                      {deg}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-semibold text-gray-700"
              >
                Year of Study
              </label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                {/* --- CHANGE: Applied new styles --- */}
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  disabled={!formData.degree}
                  className={`${inputStyles} ${disabledInputStyles}`}
                >
                  <option value="">Select Year</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="bio"
                className="block text-sm font-semibold text-gray-700"
              >
                Bio
              </label>
              <div className="relative mt-1">
                <BookText className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                {/* --- CHANGE: Applied new styles --- */}
                <textarea
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className={inputStyles}
                ></textarea>
              </div>
            </div>
            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-semibold text-gray-700"
              >
                LinkedIn URL
              </label>
              <div className="relative mt-1">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                {/* --- CHANGE: Applied new styles --- */}
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className={inputStyles}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="github"
                className="block text-sm font-semibold text-gray-700"
              >
                GitHub URL
              </label>
              <div className="relative mt-1">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                {/* --- CHANGE: Applied new styles --- */}
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className={inputStyles}
                />
              </div>
            </div>
          </div>
          <div className="pt-6 border-t flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-6 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-8 border border-transparent text-sm font-medium text-white bg-[#5039f6] hover:bg-[#402dbf] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
