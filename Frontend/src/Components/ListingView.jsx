import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axiosInstance from "../Api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'


const ListingInfo = React.memo(({ listing }) => {
  const isProduct = listing.type === "PRODUCT";
  const isService = listing.type === "SERVICE";

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm space-y-4">
      {/* Type & Status */}
      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${
            isProduct
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {listing.type}
        </span>
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
          {listing.status}
        </span>
      </div>

      {/* Title & Price */}
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight">
        {listing.title}
      </h2>
      <p className="text-2xl lg:text-3xl text-blue-600 font-light py-1">
        ₹{listing.price}
      </p>

      {/* Details */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-gray-500 font-semibold text-lg mb-3">Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          {isProduct && (
            <>
              <InfoItem label="Condition" value={listing.condition} />
              <InfoItem label="Quantity" value={listing.quantity} />
            </>
          )}
          {isService && (
            <>
              <InfoItem
                label="Availability"
                value={listing.availability?.toLowerCase()}
              />
              <InfoItem
                label="Duration"
                value={`${listing.durationHr} hours`}
              />
            </>
          )}
          <div className="flex flex-col sm:col-span-2">
            <span className="font-semibold text-gray-500">Location</span>
            <span>{listing.location}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-gray-500 font-semibold text-lg mb-2">
          Description
        </h3>
        <p className="text-gray-600 text-base lg:text-lg leading-relaxed whitespace-pre-line">
          {listing.description}
        </p>
      </div>

      <p className="text-gray-600 text-sm lg:text-base pt-4">
        <strong className="text-gray-800">Institute:</strong>{" "}
        {listing.institute}
      </p>
    </div>
  );
});

// Reusable field helper component
const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="font-semibold text-gray-500">{label}</span>
    <span>{value}</span>
  </div>
);

// Reusable Button Component
const ActionButton = ({
  label,
  onClick,
  disabled,
  primary,
  outline,
  small,
}) => {
  const base =
    "font-bold rounded-md transition-colors w-full mx-1 " +
    (small ? "py-3 text-sm" : "py-3 text-base");

  if (primary)
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`${base} bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer`}
      >
        {label}
      </button>
    );

  if (outline)
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 cursor-pointer`}
      >
        {label}
      </button>
    );

  return null;
};

const ListingView = ({ listing }) => {
  // ✅ RULE 1: Call all hooks at the top level, unconditionally.
  const [selectedImage, setSelectedImage] = useState(
    listing?.images?.[0] || null
  );
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [inWishlist, setInwishlist] = useState(false);
  const navigate = useNavigate();

  const isOutOfStock = useMemo(
    () =>
      listing?.type === "PRODUCT" &&
      (!listing?.quantity || listing.quantity <= 0),
    [listing]
  );

  useEffect(() => {
    if (listing?.id) {
      const checkForWishlist = async () => {
        try {
          const response = await axiosInstance.get(
            `/wishlist/exists/${listing.id}`
          );
          if (response.status === 200) {
            setInwishlist(response.data.exists);
          }
        } catch (error) {
          console.error("Failed to checkForWishlist : ", error);
        }
      };
      checkForWishlist();
    }
  }, [listing?.id]);

  useEffect(() => {
    if (swiperInstance && listing?.images && selectedImage) {
      const idx = listing.images.findIndex(
        (img) => img.id === selectedImage.id
      );
      if (idx !== -1) swiperInstance.slideTo(idx);
    }
  }, [selectedImage, swiperInstance, listing?.images]);

  if (!listing || !listing.images?.length || !selectedImage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-center text-gray-500 p-10">
          Listing data is not available.
        </p>
      </div>
    );
  }

  const handleContactSeller = async () => {
    try {
      const resposne = await axiosInstance.post('/chat/create-chat',{
        sellerId : listing.sellerId
      })
      if(resposne.status == 200){
        navigate('/all-chats');
      }
    } catch (error) {
      console.error("Failed to contact seller :",error);
      const errorMsg = error.response?.data.msg || "Failed to contact seller"
      toast.error(errorMsg);
    }
  };

  const handleSaveForLater = async () => {
    try {
       const response =await axiosInstance.get(`/wishlist/add/${listing.id}`);
       if(response.status == 200){
         setInwishlist(true);
       }
    } catch (error) {
      console.log("failed to add in wishlist : ",error);
    }
  };

  const ImageThumbnail = ({ imageObj, size = "md" }) => (
    <img
      key={imageObj.id}
      src={imageObj.url}
      alt={`Thumbnail for ${listing.title}`}
      loading="lazy"
      onClick={() => setSelectedImage(imageObj)}
      className={`object-cover rounded-md cursor-pointer border-2 p-1 transition-all ${
        selectedImage?.id === imageObj.id
          ? "border-blue-500 shadow-md"
          : "border-gray-300 hover:border-blue-400"
      } ${size === "lg" ? "w-20 h-20" : "w-16 h-16 flex-shrink-0"}`}
    />
  );

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 bg-gray-50 min-h-screen p-4">
      {/* Left Thumbnails (Desktop) */}
      <div className="hidden lg:flex flex-col gap-4 ">
        {listing.images.map((img) => (
          <ImageThumbnail key={img.id} imageObj={img} size="lg" />
        ))}
      </div>

      {/* Main Carousel */}
      <div className="flex-1 flex flex-col items-center">
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) =>
            setSelectedImage(listing.images[swiper.activeIndex])
          }
          className="w-full max-w-lg rounded-lg shadow-lg"
          spaceBetween={10}
          slidesPerView={1}
        >
          {listing.images.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={img.url}
                alt={`Image of ${listing.title}`}
                className="w-full object-contain"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile Thumbnails */}
        <div className="flex lg:hidden gap-2 mt-4 overflow-x-auto p-2 w-full max-w-lg items-center justify-center">
          {listing.images.map((img) => (
            <ImageThumbnail key={img.id} imageObj={img} size="sm" />
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-4 mt-6 w-full max-w-lg">
          <ActionButton
            label={isOutOfStock ? "Out of Stock" : "Contact Seller"}
            onClick={handleContactSeller}
            disabled={isOutOfStock}
            primary
          />
          <ActionButton
            label={inWishlist ? "View in Wishlist" : "Add to Wishlist"}
            onClick={() => {
              inWishlist ? navigate("/wishlist") : handleSaveForLater();
            }}
            outline
          />
        </div>

        {/* Mobile Info */}
        <div className="lg:hidden mt-6 w-full">
          <ListingInfo listing={listing} />
          <div className="h-24" /> {/* Spacer for the mobile bottom bar */}
        </div>
      </div>

      {/* Desktop Info */}
      <div className="hidden lg:block w-full lg:w-2/5 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <ListingInfo listing={listing} />
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white flex justify-around p-3 border-t border-gray-200 shadow-up z-50">
        <ActionButton
            label={isOutOfStock ? "Out of Stock" : "Contact Seller"}
            onClick={handleContactSeller}
            disabled={isOutOfStock}
            primary
          />
          <ActionButton
            label={inWishlist ? "View in Wishlist" : "Add to Wishlist"}
            onClick={() => {
              inWishlist ? navigate("/wishlist") : handleSaveForLater();
            }}
            outline
          />
      </div>
    </div>
  );
};

export default ListingView;
