import React, { useEffect, useState } from 'react';
import ListingDetail from '../components/ListingView';
import axiosInstance from '../api/axiosinstance';
import Loader from '../components/Loader'
import { useParams} from "react-router-dom";


const GetListingDetails = () => {
    // Initialize state with null instead of undefined for clarity
    const [listing, setListing] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const {id} = useParams();

    const get = async () => {
        try {
            const response = await axiosInstance.get(`/listing/get-listing/${id}`);
            setListing(response.data.listings);
        } catch (error) {
            console.error("Failed to fetch listing:", error);
        } finally {
            // Set loading to false whether the call succeeds or fails
            setLoading(false);
        }
    };

    useEffect(() => {
        get();
    }, [id]);

    // --- SOLUTION ---
    // Show a loading message while fetching data
    if (loading) {
        return(
            <Loader/>
        )
    }

    // Handle case where listing could not be fetched
    if (!listing) {
        return <div className="flex justify-center items-center h-screen">Could not load listing data.</div>;
    }
    
    // Only render the detail component when listing data exists
    return (
        <div className='pt-34 md:pt-24'>
            <ListingDetail listing={listing} />
        </div>
    );
};

export default GetListingDetails;