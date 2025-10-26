import React, { useEffect, useState } from 'react';
import ListingDetail from '../Components/ListingView';
import axiosInstance from '../api/AxiosInstance';
import Loader from '../Components/Loader'
import { useParams} from "react-router-dom";
import ListingListCard from '../Components/ListingListCard';


const AllListingsBy = () => {
    const [listings, setListings] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const {id} = useParams();

    const get = async () => {
        try {
            const response = await axiosInstance.get(`listing/get-listingsbyCat/${id}`);
            setListings(response.data.listings);
        } catch (error) {
            console.error("Failed to fetch listings :", error);
        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        get();
    }, [id]);

    
    if (loading) {
        return(
            <Loader/>
        )
    }

    if (listings.length === 0) {
        return <div className="flex justify-center items-center h-screen">No Listings Found!</div>;
    }
    
    return (
        <div className='pt-34 md:pt-24'>
           {listings.map((listing)=>(<ListingListCard listing={listing}/>))}
        </div>
    );
};

export default AllListingsBy;