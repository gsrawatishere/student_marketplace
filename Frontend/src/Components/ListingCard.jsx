import React from 'react'
import img from "../assets/img.jpeg";
import { useState } from 'react';

const ListingCard = () => {
    const [listing, setListing] = useState({
      "id": "c9d8e7f6-a5b4-3210-fedc-0987654321ab",
      "type": "SERVICE",
      "title": "Math Tutoring - Calculus & Algebra Math Tutoring - Calculus & Algebra",
      "price": 500.00,
      "description": "Experienced tutor offering 1-on-1 sessions for Calculus, Algebra, and Engineering Math. Available evenings and weekends.",
      "institute": "Delhi University",
      "subCategoryId": "subcat-tutoring",
      "categoryId": "cat-education",
      "status": "ACTIVE",
      "images": [
        { "id": "img3", "url":img }
      ],
      "condition": null,
      "quantity": null,
      "availability": {
        "days": ["Monday", "Wednesday", "Saturday"],
        "timeSlots": ["5pm-7pm", "7pm-9pm"]
      },
      "durationHr": 2.00,
      "location": "Delhi University Library",
      "createdAt": "2025-08-30T15:00:00.000Z",
      "sellerId": "user-456",
      "wishlistlisting": [],
      "subcategory": { "id": "subcat-tutoring", "name": "Tutoring" },
      "category": { "id": "cat-education", "name": "Education" }
    });
  return (
    <div className='flex-shrink-0 cursor-pointer w-36 sm:w-44 md:w-52 bg-white rounded-lg text-center pb-6 relative duration-300 p-3 hover:scale-105 transition-all  '>
        {/* Listing Image */}
        <div className='relative  ' >
            <img
            className='flex-shrink-0 w-[30vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] xl:w-[12vw] rounded-sm'
            src={listing.images[0].url} alt={listing.title} />
            
        </div>
        {/* Product Details */}
        <div className='flex flex-col gap-0.5' >
            <div className="flex justify-center items-center">
          <div className="text-lg sm:text-xl font-bold text-indigo-600">
            ₹{listing.price}
          </div>
        </div>
         <h2 className=" text-xs sm:text-sm font-medium text-slate-500  line-clamp-2  ">
          {listing.title}
        </h2>
        <div className="flex justify-between pt-2 md:pt-3">
          <div className="font-light text-slate-500 text-[10px] text-right md:text-[12px] " >
            {new Date(listing.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
            })}
          </div>
          <div className=" text-[10px] md:text-[12px] font-medium bg-indigo-100 text-indigo-700 px-1 py-0.5 rounded-sm  ">{listing.type}</div>
        </div>
        </div>
         
    </div>
  )
}

export default ListingCard