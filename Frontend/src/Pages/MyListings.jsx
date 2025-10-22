import React, { useEffect } from "react";
import MyListingsCard from "../Components/MyListingsCard";
import { useState } from "react";
import PageHeader from "../Components/PageHeader";
import axiosInstance from "../Api/AxiosInstance";
import Loader from "../Components/Loader";
import DeleteWarningModal from "../Components/DeleteWarningModel";
import toast from 'react-hot-toast'


const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDelete,setShowdelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);


  const myListings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/listing/get-mylistings");
      if (response.status == 200) {
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

  const handleDelete = async(id,title)=>{
    setItemToDelete({ id, title });
       setShowdelete(true)
       
  }
const handleConfirmDelete = async () => {
    if (!itemToDelete) return; 

    try {
      
     const response =  await axiosInstance.delete(`/listing/delete-mylisting/${itemToDelete.id}`);

      if(response.status == 200){
        setListings((currentListings) =>
        currentListings.filter((listing) => listing.id !== itemToDelete.id)
      );
      toast.success("Listing deleted successfully");
      }
      

    } catch (error) {
      console.error("Failed to delete listing:", error);
      toast.error("There was an error deleting the listing");
    } finally {
      setShowdelete(false);
      setItemToDelete(null);
    }
  };

  useEffect(() => {
    myListings();
  }, []);

  return (
    <div>
      <PageHeader name="MyListings" />
      {loading && <Loader />}
      {showDelete && <DeleteWarningModal onConfirmDelete={handleConfirmDelete} listingTitle={itemToDelete?.title} onCancel={()=>(setShowdelete(false))} />}
      <div className="pt-14 md:pt-18">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <MyListingsCard
              key={listing.id}
              removeListing={handleDelete}
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
