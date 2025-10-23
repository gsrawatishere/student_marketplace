import React, { useEffect, useState } from 'react';
import axiosInstance from '../Api/AxiosInstance';
import toast from 'react-hot-toast';
import Loader from './Loader';

// Renamed to better describe its function as a modal
const EditListingModal = ({ initialData, onCancel, onUpdateSuccess }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    location: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id : initialData.id || '',
        title: initialData.title || '',
        price: initialData.price || '',
        description: initialData.description || '',
        location: initialData.location || '',
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!initialData?.id) {
      toast.error("Listing ID is missing. Cannot update.");
      return;
    }
    setIsSaving(true);
    
    try {
      const response = await axiosInstance.post(`/listing/edit-listing`,{
        listingId : formData.id,
        title : formData.title,
        price : formData.price,
        description : formData.description,
        location : formData.location
      });
      if (response.status === 200) {
        toast.success("Listing updated successfully!");
        onUpdateSuccess(true);
        onCancel();
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to update listing.");
    } finally {
      setIsSaving(false);
    }
  };

  
  return (
    // <!-- 1. Modal Wrapper: Covers the screen with a blur effect -->
    <div 
      onClick={onCancel} // Close modal if background is clicked
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
    >
      {isSaving && <Loader />}
      
      {/* <!-- 2. Form Container: Stop clicks from closing the modal --> */}
      <div 
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside the form
        className="max-w-4xl w-full mx-4 bg-white shadow-lg rounded-lg p-6 sm:p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Your Listing</h1>
        <p className="text-gray-500 mb-8">Update the details for your item or service below.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
              <input type="text" name="title" id="title" required value={formData.title} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6] rounded-md px-2" onChange={handleInputChange} />
            </div>
            
            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
              <textarea name="description" id="description" rows="4" required value={formData.description} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6] rounded-md px-2" onChange={handleInputChange}></textarea>
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Location</label>
              <input type="text" name="location" id="location" value={formData.location} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6] rounded-md px-2" onChange={handleInputChange} />
            </div>
            
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price (₹)</label>
              <input type="number" name="price" id="price" required min="0" value={formData.price} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6] rounded-md px-2" onChange={handleInputChange} />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="pt-6 border-t flex justify-center items-center gap-4">
            <button type="button" onClick={onCancel} className="inline-flex justify-center py-2 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={isSaving} className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#5039f6] hover:bg-[#402dbf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5039f6] disabled:opacity-50 cursor-pointer">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListingModal;
