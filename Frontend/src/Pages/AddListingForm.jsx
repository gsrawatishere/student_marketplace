import React, { useState } from 'react';
import { Package, Wrench, Image as ImageIcon, X } from 'lucide-react';

// --- MOCK DATA (Replace with API calls) ---
const categories = [
  { id: 'cat1', name: 'Electronics' },
  { id: 'cat2', name: 'Books' },
  { id: 'cat3', name: 'Tutoring' },
];

const subcategories = {
  cat1: [{ id: 'sub1', name: 'Mobile Phones' }, { id: 'sub2', name: 'Laptops' }],
  cat2: [{ id: 'sub3', name: 'Textbooks' }, { id: 'sub4', name: 'Fiction' }],
  cat3: [{ id: 'sub5', name: 'Math' }, { id: 'sub6', name: 'Physics' }],
};
// ---------------------------------------------


const AddListingForm = () => {
  const [listingType, setListingType] = useState('PRODUCT');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // This would be your main form state
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setFormData(prev => ({
      ...prev,
      categoryId: categoryId,
      subCategoryId: '' // Reset subcategory when category changes
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }
    setImages(prev => [...prev, ...files]);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
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
    const finalData = {
      type: listingType,
      images: images.map(img => img.name),
      ...formData,
    };
    console.log("Form Submitted:", finalData);
    alert("Listing submitted! Check the console for the form data.");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Listing</h1>
        <p className="text-gray-500 mb-8">Fill out the details below to post your item or service.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* --- Listing Type Selection --- */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Type</label>
            <div className="flex gap-4 bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setListingType('PRODUCT')}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium transition-all ${listingType === 'PRODUCT' ? 'bg-white shadow text-[#5039f6]' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                <Package size={16} /> Product
              </button>
              <button
                type="button"
                onClick={() => setListingType('SERVICE')}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium transition-all ${listingType === 'SERVICE' ? 'bg-white shadow text-[#5039f6]' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                <Wrench size={16} /> Service
              </button>
            </div>
          </div>
          
          {/* --- Main Details Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 border-t pt-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
              <input type="text" name="title" id="title" required className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" placeholder={listingType === 'PRODUCT' ? "e.g., Used iPhone 13 Pro" : "e.g., Mathematics Tutoring for Beginners"} onChange={handleInputChange} />
            </div>

            {/* Category & Subcategory */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700">Category</label>
              <select name="categoryId" id="categoryId" required className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select a Category</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="subCategoryId" className="block text-sm font-semibold text-gray-700">Subcategory</label>
              <select name="subCategoryId" id="subCategoryId" required disabled={!selectedCategory} className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6] disabled:bg-gray-100" onChange={handleInputChange}>
                <option value="">Select a Subcategory</option>
                {selectedCategory && subcategories[selectedCategory]?.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
              <textarea name="description" id="description" rows="4" required className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" placeholder="Provide details about your listing..."></textarea>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Location</label>
              <input type="text" name="location" id="location" className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" placeholder="e.g., Campus Library" onChange={handleInputChange} />
            </div>

             {/* Price */}
             <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price (₹)</label>
              <input type="number" name="price" id="price" required min="0" className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" placeholder="Enter amount in INR" onChange={handleInputChange} />
            </div>
          </div>
          
          {/* --- Conditional Fields Section --- */}
          <div className="border-t pt-6">
            {listingType === 'PRODUCT' ? (
              // --- PRODUCT FIELDS ---
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="condition" className="block text-sm font-semibold text-gray-700">Condition</label>
                  <select name="condition" id="condition" required className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" onChange={handleInputChange}>
                    <option value="NEW">New</option>
                    <option value="LIKE_NEW">Like New</option>
                    <option value="GOOD">Good</option>
                    <option value="FAIR">Fair</option>
                    <option value="POOR">Poor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700">Quantity</label>
                  <input type="number" name="quantity" id="quantity" required min="1" defaultValue="1" className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" onChange={handleInputChange}/>
                </div>
              </div>
            ) : (
              // --- SERVICE FIELDS ---
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="availability" className="block text-sm font-semibold text-gray-700">Availability</label>
                  <input type="text" name="availability" id="availability" required className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" placeholder="e.g., Weekdays, 5-7 PM" onChange={handleInputChange}/>
                </div>
                <div>
                  <label htmlFor="durationHr" className="block text-sm font-semibold text-gray-700">Duration (hours)</label>
                  <input type="number" name="durationHr" id="durationHr" required min="0.5" step="0.5" className="mt-1 block w-full border-gray-300 shadow-sm focus:border-[#5039f6] focus:ring-[#5039f6]" placeholder="e.g., 1.5" onChange={handleInputChange}/>
                </div>
              </div>
            )}
          </div>

          {/* --- Image Uploader --- */}
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
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* --- Form Submission --- */}
          <div className="pt-6 border-t flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium text-white bg-[#5039f6] hover:bg-[#402dbf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5039f6]"
            >
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingForm;