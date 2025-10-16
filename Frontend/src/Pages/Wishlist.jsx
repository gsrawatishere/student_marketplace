import React from 'react'
import WishListCard from '../Components/WishListCard'
import { useState } from 'react';
import PageHeader from '../Components/PageHeader';


const Wishlist = () => {
    const [listings, setListings] = useState([

  {
    "id": "3",
    "type": "SERVICE",
    "title": "Math Tutoring - Calculus & Algebra",
    "price": 500.00,
    "description": "Experienced tutor for Calculus, Algebra and Engineering Math. Available evenings and weekends.",
    "institute": "Delhi University",
    "subCategoryId": "subcat-tutoring",
    "categoryId": "cat-education",
    "status": "ACTIVE",
    "images": [{ "id": "img3", "url": "https://images.unsplash.com/photo-1588072432836-e10032774350" }],
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
  },
  {
    "id": "4",
    "type": "PRODUCT",
    "title": "Second-hand Physics Textbook - HC Verma",
    "price": 350.00,
    "description": "HC Verma Part 1 Physics, gently used, with no marks inside.",
    "institute": "JNU",
    "subCategoryId": "subcat-books",
    "categoryId": "cat-study",
    "status": "ACTIVE",
    "images": [{ "id": "img4", "url": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" }],
    "condition": "USED",
    "quantity": 1,
    "availability": null,
    "durationHr": null,
    "location": "JNU Hostel",
    "createdAt": "2025-08-15T09:00:00.000Z",
    "sellerId": "user-103",
    "wishlistlisting": [],
    "subcategory": { "id": "subcat-books", "name": "Books" },
    "category": { "id": "cat-study", "name": "Study Material" }
  },
  {
    "id": "5",
    "type": "PRODUCT",
    "title": "Cycle - Hero Sprint (Good Condition)",
    "price": 2500.00,
    "description": "Hero Sprint cycle, well maintained, ideal for campus commute.",
    "institute": "Delhi University",
    "subCategoryId": "subcat-cycle",
    "categoryId": "cat-transport",
    "status": "ACTIVE",
    "images": [{ "id": "img5", "url": "https://images.unsplash.com/photo-1588072432836-e10032774350" }],
    "condition": "USED",
    "quantity": 1,
    "availability": null,
    "durationHr": null,
    "location": "Delhi University Hostel",
    "createdAt": "2025-08-10T17:00:00.000Z",
    "sellerId": "user-104",
    "wishlistlisting": [],
    "subcategory": { "id": "subcat-cycle", "name": "Cycles" },
    "category": { "id": "cat-transport", "name": "Transport" }
  },
  {
    "id": "6",
    "type": "SERVICE",
    "title": "Guitar Lessons for Beginners",
    "price": 400.00,
    "description": "Offering beginner guitar lessons on weekends, 1 hour per session.",
    "institute": "IIT Delhi",
    "subCategoryId": "subcat-music",
    "categoryId": "cat-education",
    "status": "ACTIVE",
    "images": [{ "id": "img6", "url": "https://images.unsplash.com/photo-1511379938547-c1f69419868d" }],
    "condition": null,
    "quantity": null,
    "availability": { "days": ["Saturday", "Sunday"], "timeSlots": ["10am-12pm"] },
    "durationHr": 1.00,
    "location": "IIT Delhi Campus",
    "createdAt": "2025-08-28T11:00:00.000Z",
    "sellerId": "user-105",
    "wishlistlisting": [],
    "subcategory": { "id": "subcat-music", "name": "Music" },
    "category": { "id": "cat-education", "name": "Education" }
  },
  {
    "id": "7",
    "type": "PRODUCT",
    "title": "Used Headphones - JBL Tune",
    "price": 1200.00,
    "description": "JBL Tune wireless headphones, good battery life, minor scratches.",
    "institute": "Delhi University",
    "subCategoryId": "subcat-electronics",
    "categoryId": "cat-gadgets",
    "status": "ACTIVE",
    "images": [{ "id": "img7", "url": "https://images.unsplash.com/photo-1588072432836-e10032774350" }],
    "condition": "USED",
    "quantity": 1,
    "availability": null,
    "durationHr": null,
    "location": "Delhi University Hostel",
    "createdAt": "2025-08-12T14:00:00.000Z",
    "sellerId": "user-106",
    "wishlistlisting": [],
    "subcategory": { "id": "subcat-electronics", "name": "Electronics" },
    "category": { "id": "cat-gadgets", "name": "Gadgets" }
  },
  {
    "id": "8",
    "type": "PRODUCT",
    "title": "Second-hand Cricket Bat - SG",
    "price": 900.00,
    "description": "SG cricket bat, lightly used, perfect for campus matches.",
    "institute": "JNU",
    "subCategoryId": "subcat-sports",
    "categoryId": "cat-sports",
    "status": "ACTIVE",
    "images": [{ "id": "img8", "url": "https://images.unsplash.com/photo-1588072432836-e10032774350" }],
    "condition": "USED",
    "quantity": 1,
    "availability": null,
    "durationHr": null,
    "location": "JNU Playground",
    "createdAt": "2025-08-05T18:00:00.000Z",
    "sellerId": "user-107",
    "wishlistlisting": [],
    "subcategory": { "id": "subcat-sports", "name": "Sports" },
    "category": { "id": "cat-sports", "name": "Sports" }
  },
  {
    "id": "9",
    "type": "SERVICE",
    "title": "Resume Review & Career Guidance",
    "price": 300.00,
    "description": "Helping students improve resumes and career profiles. 30 min session.",
    "institute": "Delhi University",
    "subCategoryId": "subcat-career",
    "categoryId": "cat-services",
    "status": "ACTIVE",
    "images": [{ "id": "img9", "url": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b" }],
    "condition": null,
    "quantity": null,
    "availability": { "days": ["Friday"], "timeSlots": ["6pm-9pm"] },
    "durationHr": 0.5,
    "location": "Delhi University Library",
    "createdAt": "2025-08-29T20:00:00.000Z",
    "sellerId": "user-108",
    "wishlistlisting": [],
    "subcategory": { "id": "subcat-career", "name": "Career" },
    "category": { "id": "cat-services", "name": "Services" }
  },
  {
    "id": "10",
    "type": "PRODUCT",
    "title": "Second-hand Desk Lamp",
    "price": 450.00,
    "description": "LED desk lamp, bright and energy efficient, great for study tables.",
    "institute": "IIT Delhi",
    "subCategoryId": "subcat-hostel",
    "categoryId": "cat-hostel",
    "status": "ACTIVE",
    "images": [{ "id": "img10", "url": "https://images.unsplash.com/photo-1524758631624-e2822e304c36" }],
    "condition": "USED",
    "quantity": 1,
    "availability": null,
    "durationHr": null,
    "location": "IIT Delhi Hostel",
    "createdAt": "2025-08-22T08:00:00.000Z",
    "sellerId": "user-109",
    "wishlistlisting": [],
    "subcategory": { "id": "subcat-hostel", "name": "Hostel Items" },
    "category": { "id": "cat-hostel", "name": "Hostel Items" }
  }
]);
  return (
   <div> 
        <PageHeader  name="Wishlist" />
    <div className='pt-14 md:pt-18'>
        {listings.map((listing)=>{
        return <WishListCard listing={listing}/>
    })}
    </div>
   </div>
  )
}

export default Wishlist