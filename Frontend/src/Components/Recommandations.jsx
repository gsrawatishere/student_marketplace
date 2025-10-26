import React, { useCallback, useEffect, useRef, useState } from "react";
import ListingCard from "./ListingCard";
import axiosInstance from "../api/AxiosInstance";
import Loader from "../Components/Loader"; // Make sure you have a Loader component
import useIntersectionObserver from "../Hooks/IntersectionObserver";

const Recommandations = () => {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  
  const initialFetchRef = useRef(false);
  
  const fetchListings = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/listing/getRecentListings?page=${page}&limit=20`
      );
      const { listings: newListings, totalPages, currentPage } = response.data;

      if (newListings && newListings.length > 0) {
        setListings((prevListings) => [...prevListings, ...newListings]);
        setPage((prevPage) => prevPage + 1);
      }
      
      // Stop fetching if we've reached the last page or if no new listings are returned
      if (currentPage >= totalPages || newListings.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch listings on Home page ", error);
    } finally {
      // FIX 3: Ensure loading is always set back to false
      setLoading(false);
    }
  }, [loading, hasMore, page]); // Dependency array is now correct

  // FIX 4: Corrected useEffect to prevent double initial fetch
  useEffect(() => {
    // This check ensures the initial fetch only happens once
    if (!initialFetchRef.current) {
      initialFetchRef.current = true;
      fetchListings();
    }
  }, [fetchListings]); // fetchListings is now a stable dependency

  // FIX 5: Use the intersection observer to trigger more fetches
  const lastElementRef = useIntersectionObserver(fetchListings);

  // Show a message or a skeleton loader instead of an empty div
  if (listings.length === 0 && !loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        No recommendations found.
      </div>
    );
  }

  return (
    <div className="pt-3 sm:pt-4 md:pt-6 px-4 lg:px-12">
      <div className="py-2 sm:py-3 md:py-4 font-semibold text-xl sm:text-2xl md:text-3xl">
        Fresh Recommendations
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {listings.map((listing) => (
          // Remember to always use a unique key
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      
      {/* Infinite Scroll Trigger & Status Indicators */}
      <div className="h-20 flex justify-center items-center">
        {/* The invisible div that triggers the next fetch */}
        {hasMore && <div ref={lastElementRef} />}
        {loading && <Loader />}
        {!hasMore && !loading && listings.length > 0 && (
          <p className="text-[#5039f6] text-xl font-bold">You've seen it all! 🎉</p>
        )}
      </div>
    </div>
  );
};

export default Recommandations;