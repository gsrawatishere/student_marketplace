import React, { useEffect } from "react";
import MyListingsCard from "../Components/MyListingsCard";
import { useState } from "react";
import PageHeader from "../Components/PageHeader";
import axiosInstance from "../Api/AxiosInstance";
import Loader from "../Components/Loader";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const myListings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/listing/get-mylistings");
      if (response.status == 200) {
        console.log(response.data);
        setListings(response.data.myListings);
      }
    } catch (error) {
      console.error("Failed to get myListings :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    //todo
  };

  useEffect(() => {
    myListings();
  }, []);

  return (
    <div>
      <PageHeader name="MyListings" />
      {loading && <Loader />}
      <div className="pt-14 md:pt-18">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <MyListingsCard
              key={listing.id}
              listing={listing}
              editItem={handleEdit}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <p className="font-semibold text-lg">
              You haven't created any listings yet.
            </p>
            <p className="text-sm">
              Click "Create New Listing" to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
