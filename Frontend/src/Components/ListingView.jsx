import React, { useState, useEffect } from "react";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// A sub-component to display listing details. This keeps the main component cleaner.
const ListingInfo = ({ listing }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm space-y-4">
      {/* Type and Status Badges */}
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
            listing.type === 'PRODUCT' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {listing.type}
        </span>
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
          {listing.status}
        </span>
      </div>

      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight">
        {listing.title}
      </h2>

      <p className="text-2xl lg:text-3xl text-blue-600 font-light py-1">
        ₹{listing.price}
      </p>

      {listing.type === 'PRODUCT' && listing.quantity > 0 && listing.quantity < 10 && (
        <p className="text-orange-600 font-semibold">{listing.quantity} items left!</p>
      )}

      {/* Details Section */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-gray-500 font-semibold text-lg mb-3">
          Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          {listing.type === 'PRODUCT' && (
            <>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-500">Condition</span>
                <span>{listing.condition}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-500">Quantity</span>
                <span>{listing.quantity}</span>
              </div>
            </>
          )}
          {listing.type === 'SERVICE' && (
            <>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-500">Availability</span>
                <span className="capitalize">{listing.availability}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-500">Duration</span>
                <span>{listing.durationHr} hours</span>
              </div>
            </>
          )}
          <div className="flex flex-col sm:col-span-2">
            <span className="font-semibold text-gray-500">Location</span>
            <span>{listing.location}</span>
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="border-t pt-4 mt-4">
         <h3 className="text-gray-500 font-semibold text-lg mb-2">
          Description
        </h3>
        <p className="text-gray-600 text-base lg:text-lg leading-relaxed whitespace-pre-line">
          {listing.description}
        </p>
      </div>

      <p className="text-gray-600 text-sm lg:text-base pt-4">
        <strong className="text-gray-800">Institute:</strong> {listing.institute}
      </p>
    </div>
  );
};


const ListingView = ({ listing }) => {
  // Note: The parent component should handle the main loading state.
  // This component expects 'listing' to be a valid object.
  if (!listing || !listing.images || listing.images.length === 0) {
    return <p className="text-center text-gray-500 p-10">Listing data is not available.</p>;
  }

  // The first image is selected by default, or null if no images.
  const [selectedImage, setSelectedImage] = useState(listing.images[0]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Syncs the Swiper carousel when a thumbnail is clicked
  useEffect(() => {
    if (swiperInstance && listing.images) {
      const selectedIndex = listing.images.findIndex(img => img.id === selectedImage.id);
      if (selectedIndex !== -1 && swiperInstance.activeIndex !== selectedIndex) {
        swiperInstance.slideTo(selectedIndex);
      }
    }
  }, [selectedImage, listing.images, swiperInstance]);
  
  // A placeholder function for handling button clicks.
  // You can replace this with your actual logic (e.g., API calls, navigation).
  const handleContactSeller = () => {
    alert("Contacting seller...");
    // Example: navigate(`/chat/${listing.sellerId}`);
  };

  const handleSaveForLater = () => {
    alert("Saving for later...");
    // Example: addToWishlist(listing.id);
  };

  const isOutOfStock = listing.type === 'PRODUCT' && (!listing.quantity || listing.quantity <= 0);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 relative bg-gray-50 min-h-screen p-4">
      
      {/* Thumbnails for large screens (lg) */}
      <div className="hidden lg:flex flex-col gap-4">
        {listing.images.map((imageObj) => (
          <img
            key={imageObj.id}
            src={imageObj.url}
            alt={`Thumbnail for ${listing.title}`}
            onClick={() => setSelectedImage(imageObj)}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 p-1 transition-all ${
              selectedImage.id === imageObj.id
                ? "border-blue-500 shadow-md"
                : "border-gray-300 hover:border-blue-400"
            }`}
          />
        ))}
      </div>

      {/* Main Image Carousel + Desktop Buttons */}
      <div className="flex-1 flex flex-col items-center  top-4 h-max">
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            setSelectedImage(listing.images[swiper.activeIndex]);
          }}
          className="w-full max-w-lg rounded-lg shadow-lg"
          spaceBetween={10}
          slidesPerView={1}
        >
          {listing.images.map((imageObj) => (
            <SwiperSlide key={imageObj.id}>
              <img
                src={imageObj.url}
                alt={`Image of ${listing.title}`}
                className="w-full  object-contain "
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnails for mobile (visible below carousel) */}
        <div className="flex lg:hidden gap-2 mt-4 overflow-x-auto p-2 w-full max-w-lg">
          {listing.images.map((imageObj) => (
            <img
              key={imageObj.id}
              src={imageObj.url}
              alt={`Mobile Thumbnail for ${listing.title}`}
              onClick={() => setSelectedImage(imageObj)}
              className={`w-16 h-16 object-cover rounded cursor-pointer border-2 flex-shrink-0 transition-all ${
                selectedImage.id === imageObj.id
                  ? "border-blue-500 shadow-md"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Buttons for large screens */}
        <div className="hidden lg:flex gap-4 mt-6 w-full max-w-lg">
          <button
            type="button"
            onClick={handleContactSeller}
            disabled={isOutOfStock}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isOutOfStock ? "Out of Stock" : "Contact Seller"}
          </button>
          <button
            type="button"
            onClick={handleSaveForLater}
            className="w-full py-3 bg-white text-blue-600 font-bold border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Save For Later
          </button>
        </div>

        {/* Product Info for mobile */}
        <div className="lg:hidden mt-6 w-full">
          <ListingInfo listing={listing} />
          <div className="h-24" /> {/* Spacer for fixed bottom bar */}
        </div>
      </div>

      {/* Listing Info for large screens */}
      <div className="hidden lg:block w-full lg:w-2/5 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <ListingInfo listing={listing} />
      </div>

      {/* Fixed Buttons for mobile screens */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white flex justify-around p-3 border-t border-gray-200 shadow-up z-50">
        <button
          type="button"
          onClick={handleSaveForLater}
          className="w-[48%] py-3 text-sm font-bold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          SAVE FOR LATER
        </button>
        <button
          type="button"
          onClick={handleContactSeller}
          disabled={isOutOfStock}
          className="w-[48%] py-3 text-sm font-bold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {isOutOfStock ? "OUT OF STOCK" : "CONTACT SELLER"}
        </button>
      </div>
    </div>
  );
};

export default ListingView;