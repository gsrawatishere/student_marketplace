import React, { useState } from "react";
import img from "../assets/img.jpeg";

const ListingListCard = () => {
  const [listing, setListing] = useState({
  "id": "c9d8e7f6-a5b4-3210-fedc-0987654321ab",
  "type": "SERVICE",
  "title": "Math Tutoring - Calculus & Algebra",
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
    <div className="flex w-full md:w-[80%] lg:w-[60%] mx-auto justify-between cursor-pointer px-3 py-6 gap-4 
                bg-white rounded-xl   hover:scale-[1.02] transition-all duration-300">
      {/* Product image section*/}
 <div  className=" flex-shrink-0 w-[30vw] sm:w-[25vw] md:w-[20vw] lg:w-[15vw] xl:w-[12vw] ">
  <img
    src={listing.images[0].url}
    alt={listing.title}
    className="w-full h-auto rounded-xs object-contain"
  />
</div> 

      {/* Product detail section */}
      <div className="flex flex-col gap-1 pr-2 flex-grow w-[60vw]  ">
        <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-600 overflow-x-auto whitespace-nowrap">
          {listing.title}
        </h2>
        <div className="flex justify-between items-center">
          <div className="text-lg sm:text-xl font-bold text-indigo-600">
            ₹{listing.price}
          </div>
          
        </div>
        <div className="  overflow-x-auto text-slate-500 whitespace-nowrap " >
            {listing.description}
        </div>
        <div className="flex justify-between pt-1 ">
          <div className="font-light text-slate-500 text-sm text-right " >
            {new Date(listing.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
            })}
          </div>
          <div className=" text-xs font-medium bg-indigo-100 text-indigo-700 px-1 py-0.5 rounded-sm  ">{listing.type}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingListCard;
