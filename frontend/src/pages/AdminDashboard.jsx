import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosinstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryImage, setSubCategoryImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Fetch categories
  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/listing/get-categories-admin");
      setCategories(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
       toast.error("Failed to load categories ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // 🔹 Create Category
  const handleAddCategory = async () => {
    if (!categoryName.trim() || !categoryImage.trim())
      return alert("Please enter category name and image URL");

    try {
      const res = await axiosInstance.post("/listing/add-category", {
        name: categoryName,
        image: categoryImage,
      });
       toast.success(res.data.msg);
      setCategoryName("");
      setCategoryImage("");
      getCategories();
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Failed to create subcategory"
        toast.error(errorMsg);
        console.error("Failed to add category :",error);
    }
  };

  // 🔹 Create Subcategory
  const handleAddSubCategory = async () => {
    if (!selectedCategory || !subCategoryName.trim() || !subCategoryImage.trim())
      return alert("Please select category and enter all fields");

    try {
      const res = await axiosInstance.post("/listing/add-subcategory", {
        name: subCategoryName,
        image: subCategoryImage,
        categoryId: selectedCategory,
      });
      toast.success(res.data.msg);
      setSubCategoryName("");
      setSubCategoryImage("");
      getCategories();
    } catch (error) {
        const errorMsg = error.response?.data?.msg || "Failed to create subcategory"
        toast.error(errorMsg);
        console.error("Failed to add sub category :",error);
    }
  };

  const handleLogout = async ()=>{
    try {
        const res = await axiosInstance.get('/admin/logout');
        if(res.status == 200){
            toast.success(res.data.msg);
            navigate('/admin-login');
        }
    } catch (error) {
         const errorMsg = error.response?.data?.msg || "Failed to Logout"
        toast.error(errorMsg);
        console.error("Failed to Logout:",error);
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 flex flex-col items-center p-6">
      {/* Header */}
     <header className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-4 mb-6 text-center flex justify-between items-center">
  <div className="flex flex-col text-center w-full">
    <h1 className="text-2xl font-bold text-blue-700">Admin Dashboard</h1>
    <p className="text-sm text-gray-500">Manage Categories & Subcategories</p>
  </div>

  <button
    onClick={handleLogout}
    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all cursor-pointer"
  >
    Logout
  </button>
</header>
      {/* Add Category */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Add Category</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="flex-1 border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={categoryImage}
            onChange={(e) => setCategoryImage(e.target.value)}
            className="flex-1 border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Add Subcategory */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Add Subcategory
        </h2>
        <div className="flex flex-col md:flex-row gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Subcategory name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            className="flex-1 border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Subcategory image URL"
            value={subCategoryImage}
            onChange={(e) => setSubCategoryImage(e.target.value)}
            className="flex-1 border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddSubCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Category Display */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          All Categories
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="space-y-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="border border-blue-200 rounded-lg p-4 bg-blue-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-12 h-12 rounded-lg object-cover border border-blue-200"
                  />
                  <h3 className="text-lg font-semibold text-blue-700">
                    {cat.name}
                  </h3>
                </div>

                {cat.subcategories?.length ? (
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                    {cat.subcategories.map((sub) => (
                      <li key={sub.id} className="flex items-center gap-2">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-6 h-6 rounded object-cover"
                        />
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">
                    No subcategories yet.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}