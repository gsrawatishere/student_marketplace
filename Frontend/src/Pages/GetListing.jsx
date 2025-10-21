import React, { useEffect, useState } from 'react';
import ListingDetail from '../Components/ListingView';
import axiosInstance from '../Api/AxiosInstance';

const GetListing = () => {
    // Initialize state with null instead of undefined for clarity
    const [listing, setListing] = useState(null); 
    const [loading, setLoading] = useState(true); // Add a loading state

    const get = async () => {
        try {
            const response = await axiosInstance.get('/listing/get-listing/66968045-d1da-46ac-a2b9-2a2b3a79618a');
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
    }, []);

    // --- SOLUTION ---
    // Show a loading message while fetching data
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
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

export default GetListing;