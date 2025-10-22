import React, { useEffect, useState } from 'react';
import { Package, Wrench, Image as ImageIcon, X } from 'lucide-react';
import axiosInstance from '../Api/AxiosInstance';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader'; 
import { useNavigate } from 'react-router-dom';

const AddListingForm = () => {
  const [listingType, setListingType] = useState('PRODUCT');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    subCategoryId: '',
    categoryId: '',
    condition: 'NEW',
    quantity: 1,
    availability: '',
    durationHr: '',
    location: '',
  });
  
  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get('/listing/get-categories');
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Failed to get categories:", error);
      }
    };
    getCategories();
  }, []);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    const getSubcategories = async () => {
      if (!formData.categoryId) {
        setSubcategories([]);
        return;
      }
      try {
        const response = await axiosInstance.get(`/listing/get-subBy-catid?categoryId=${formData.categoryId}`);
        if (response.status === 200) {
          setSubcategories(response.data);
        }
      } catch (error) {
        console.error("Failed to get subcategories:", error);
      }
    };
    getSubcategories();
  }, [formData.categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData(prev => ({
      ...prev,
      categoryId: categoryId,
      subCategoryId: '' 
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 5;
    if (images.length + files.length > maxImages) {
      toast.error(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const newBase64Images = [];
    const newPreviews = [];
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`'${file.name}' has an invalid format.`);
        continue;
      }
      if (file.size > maxSizeInBytes) {
        toast.error(`'${file.name}' is too large! Max size is ${maxSizeInMB}MB.`);
        continue;
      }
      try {
        newPreviews.push(URL.createObjectURL(file));
        const base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
        newBase64Images.push(base64Image);
      } catch (error) {
        toast.error(`Could not process file '${file.name}' ${error}`);
      }
    }
    if (newBase64Images.length > 0) {
      setImages(prev => [...prev, ...newBase64Images]);
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews(prev => {
      const newPreviews = prev.filter((_, index) => index !== indexToRemove);
      URL.revokeObjectURL(prev[indexToRemove]);
      return newPreviews;
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalData = {
      type: listingType,
      images: images, 
      ...formData,
    };
    
    try {
      const response = await axiosInstance.post('/listing/create-listing', finalData);
      if (response.status === 200) {
        toast.success("Listing created successfully!");
         navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to create listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      {loading && <Loader />}
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Listing</h1>
        <p className="text-gray-500 mb-8">Fill out the details below to post your item or service.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Type</label>
            <div className="flex gap-4 bg-gray-100 p-1">
              <button type="button" onClick={() => setListingType('PRODUCT')} className={`w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium transition-all ${listingType === 'PRODUCT' ? 'bg-white shadow text-[#5039f6]' : 'text-gray-600 hover:bg-gray-200'}`}><Package size={16} /> Product</button>
              <button type="button" onClick={() => setListingType('SERVICE')} className={`w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium transition-all ${listingType === 'SERVICE' ? 'bg-white shadow text-[#5039f6]' : 'text-gray-600 hover:bg-gray-200'}`}><Wrench size={16} /> Service</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 border-t pt-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
              
              <input type="text" name="title" id="title" required value={formData.title} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6] px-2" placeholder={listingType === 'PRODUCT' ? "e.g., Used iPhone 13 Pro" : "e.g., Mathematics Tutoring for Beginners"} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700">Category</label>
              
              <select name="categoryId" id="categoryId" required value={formData.categoryId} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" onChange={handleCategoryChange}>
                <option value="">Select a Category</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="subCategoryId" className="block text-sm font-semibold text-gray-700">Subcategory</label>
              
              <select name="subCategoryId" id="subCategoryId" required value={formData.subCategoryId} disabled={!formData.categoryId} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6] disabled:bg-gray-100" onChange={handleInputChange}>
                <option value="">Select a Subcategory</option>
                {subcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
              
              <textarea name="description" id="description" rows="4" required value={formData.description} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6] px-2" placeholder="Provide details about your listing..." onChange={handleInputChange}></textarea>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Location</label>
              
              <input type="text" name="location" id="location" value={formData.location} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6] px-2" placeholder="e.g., Campus Library" onChange={handleInputChange} />
            </div>
             <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price (₹)</label>
              
              <input type="number" name="price" id="price" required min="0" value={formData.price} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]  px-2" placeholder="Enter amount in INR" onChange={handleInputChange} />
            </div>
          </div>
          <div className="border-t pt-6">
            {listingType === 'PRODUCT' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="condition" className="block text-sm font-semibold text-gray-700">Condition</label>
                  {/* --- FIX: Added value prop --- */}
                  <select name="condition" id="condition" required value={formData.condition} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" onChange={handleInputChange}>
                    <option value="NEW">New</option>
                    <option value="LIKE_NEW">Like New</option>
                    <option value="GOOD">Good</option>
                    <option value="FAIR">Fair</option>
                    <option value="POOR">Poor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700">Quantity</label>
                  {/* --- FIX: Added value prop --- */}
                  <input type="number" name="quantity" id="quantity" required min="1" value={formData.quantity} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6] px-2" onChange={handleInputChange}/>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="availability" className="block text-sm font-semibold text-gray-700">Availability</label>
                  {/* --- FIX: Added value prop --- */}
                  <input type="text" name="availability" id="availability" required value={formData.availability} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" placeholder="e.g., Weekdays, 5-7 PM" onChange={handleInputChange}/>
                </div>
                <div>
                  <label htmlFor="durationHr" className="block text-sm font-semibold text-gray-700">Duration (hours)</label>
                  {/* --- FIX: Added value prop --- */}
                  <input type="number" name="durationHr" id="durationHr" required min="0.5" step="0.5" value={formData.durationHr} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" placeholder="e.g., 1.5" onChange={handleInputChange}/>
                </div>
              </div>
            )}
          </div>
          <div className="border-t pt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Images (up to 5)</label>
            <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed">
              <div className="space-y-1 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white font-medium text-[#5039f6] hover:text-[#402dbf] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#5039f6]">
                    <span>Upload files</span>
                    <input id="file-upload" name="images" type="file" multiple accept="image/*" className="sr-only" onChange={handleImageChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <img src={preview} alt={`preview ${index}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"><X size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pt-6 border-t flex justify-center">
            <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium text-white bg-[#5039f6] hover:bg-[#402dbf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5039f6] disabled:opacity-50">
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingForm;