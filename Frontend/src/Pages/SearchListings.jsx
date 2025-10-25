import React, { useEffect, useState } from 'react';
import axiosInstance from '../Api/AxiosInstance';
import Loader from '../Components/Loader'
import { useSearchParams } from 'react-router-dom';
import ListingListCard from '../Components/ListingListCard';


const SearchListings = () => {
    const [listings, setListings] = useState(null); 
    const [loading, setLoading] = useState(true); 

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const get = async () => {
        try {
            const response = await axiosInstance.get(`listing/search?query=${encodeURIComponent(query)}`);
            setListings(response.data);
        } catch (error) {
            console.error("Failed to fetch listings :", error);
        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        get();
    }, [query]);

    
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
           {listings.map((listing)=>(<ListingListCard listing={listing} key={listing.id}/>))}
        </div>
    );
};

export default SearchListings;