import React, { useEffect } from 'react'
import WishListCard from '../Components/WishListCard'
import { useState } from 'react';
import PageHeader from '../Components/PageHeader';
import axiosInstance from '../Api/AxiosInstance';
import Loader from '../Components/Loader';
import toast from 'react-hot-toast';


const Wishlist = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
   
    //remove item from wishlist
   const handleRemove = async (listingId)=>{
    try {
      const response = await axiosInstance.delete(`/wishlist/delete/${listingId}`);
      if(response.status == 200){
        setListings(prevListings => prevListings.filter(item => item.id !== listingId));
        toast.success(response.data.msg);
      }
    } catch (error) {
      console.error("Failed to remove item form wishlist :",error);
      const errorMsg = error.response?.data?.msg || "Failed to Delete form Wishlist"
      toast.error(errorMsg);
    }
   }

    //get wishlist items
    const getWishlist = async ()=>{
      setLoading(true);
      try {
        const response = await axiosInstance.get('/wishlist/get');
        if(response.status == 200){
          setListings(response.data.listings);
        }
      } catch (error) {
        console.error("Failed to get wishlist items : ",error);
      }finally{
        setLoading(false);
      }
    }
    
   useEffect(()=>{
    getWishlist();
   },[]) 

  return (
      <div> 
        <PageHeader name="Wishlist" />
        {loading && <Loader/>}
        <div className='pt-14 md:pt-18'>
          {listings.length > 0 ? (
            listings.map((listing) => (
              <WishListCard key={listing.id} listing={listing} removeFromWishlist={handleRemove} />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-20">
              <p>Your wishlist is empty.</p>
              <p className="text-sm">Start adding items you love!</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default Wishlist