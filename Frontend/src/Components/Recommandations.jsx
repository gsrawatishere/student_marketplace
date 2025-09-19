import React from 'react'
import { useState } from 'react';
import ListingCard from './ListingCard'
import img from "../assets/img.jpeg";



const Recommandations = () => {
     const [listings, setListings] = useState([
  {
    id: "srv-001",
    type: "SERVICE",
    title: "Math Tutoring - Calculus & Algebra",
    price: 500.0,
    description: "Experienced tutor offering 1-on-1 sessions for Calculus, Algebra, and Engineering Math.",
    institute: "Delhi University",
    subCategoryId: "subcat-tutoring",
    categoryId: "cat-education",
    status: "ACTIVE",
    images: [{ id: "img1", url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df" }],
    condition: null,
    quantity: null,
    availability: {
      days: ["Monday", "Wednesday", "Saturday"],
      timeSlots: ["5pm-7pm", "7pm-9pm"]
    },
    durationHr: 2.0,
    location: "Delhi University Library",
    createdAt: "2025-08-30T15:00:00.000Z",
    sellerId: "user-101",
    wishlistlisting: [],
    subcategory: { id: "subcat-tutoring", name: "Tutoring" },
    category: { id: "cat-education", name: "Education" }
  },
  {
    id: "srv-002",
    type: "SERVICE",
    title: "Guitar Lessons - Beginner to Intermediate",
    price: 800.0,
    description: "Learn acoustic and electric guitar with structured lessons.",
    institute: "IIT Delhi",
    subCategoryId: "subcat-music",
    categoryId: "cat-education",
    status: "ACTIVE",
    images: [{ id: "img2", url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d" }],
    condition: null,
    quantity: null,
    availability: {
      days: ["Tuesday", "Thursday"],
      timeSlots: ["6pm-8pm"]
    },
    durationHr: 2.0,
    location: "IIT Delhi Hostel Common Room",
    createdAt: "2025-08-28T13:00:00.000Z",
    sellerId: "user-102",
    wishlistlisting: [],
    subcategory: { id: "subcat-music", name: "Music Lessons" },
    category: { id: "cat-education", name: "Education" }
  },
  {
    id: "prd-001",
    type: "PRODUCT",
    title: "Used Engineering Drawing Book",
    price: 250.0,
    description: "Good condition engineering drawing book, useful for 1st-year students.",
    institute: "BITS Pilani",
    subCategoryId: "subcat-books",
    categoryId: "cat-study",
    status: "ACTIVE",
    images: [{ id: "img3", url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" }],
    condition: "USED",
    quantity: 1,
    availability: null,
    durationHr: null,
    location: "BITS Pilani Hostel",
    createdAt: "2025-08-25T10:00:00.000Z",
    sellerId: "user-103",
    wishlistlisting: [],
    subcategory: { id: "subcat-books", name: "Books" },
    category: { id: "cat-study", name: "Study Material" }
  },
  
  {
    id: "srv-003",
    type: "SERVICE",
    title: "Assignment Help - Programming in Java & Python",
    price: 1000.0,
    description: "Get expert help in completing Java and Python assignments quickly.",
    institute: "IIT Bombay",
    subCategoryId: "subcat-programming",
    categoryId: "cat-education",
    status: "ACTIVE",
    images: [{ id: "img5", url: "https://images.unsplash.com/photo-1518770660439-4636190af475" }],
    condition: null,
    quantity: null,
    availability: {
      days: ["Friday", "Sunday"],
      timeSlots: ["4pm-6pm"]
    },
    durationHr: 2.0,
    location: "IIT Bombay Library",
    createdAt: "2025-08-29T18:00:00.000Z",
    sellerId: "user-105",
    wishlistlisting: [],
    subcategory: { id: "subcat-programming", name: "Programming Help" },
    category: { id: "cat-education", name: "Education" }
  },
  {
    id: "prd-003",
    type: "PRODUCT",
    title: "Second-hand Laptop - Dell Inspiron i5",
    price: 25000.0,
    description: "Dell Inspiron i5, 8GB RAM, 512GB SSD, very good condition.",
    institute: "JNU Delhi",
    subCategoryId: "subcat-laptops",
    categoryId: "cat-gadgets",
    status: "ACTIVE",
    images: [{ id: "img6", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" }],
    condition: "USED",
    quantity: 1,
    availability: null,
    durationHr: null,
    location: "JNU Campus Coffee Shop",
    createdAt: "2025-08-20T16:00:00.000Z",
    sellerId: "user-106",
    wishlistlisting: [],
    subcategory: { id: "subcat-laptops", name: "Laptops" },
    category: { id: "cat-gadgets", name: "Gadgets" }
  },
 
  {
    id: "srv-004",
    type: "SERVICE",
    title: "Photography Service - Event Coverage",
    price: 3000.0,
    description: "Professional event photography for college fests and seminars.",
    institute: "SRCC Delhi",
    subCategoryId: "subcat-photography",
    categoryId: "cat-services",
    status: "ACTIVE",
    images: [{ id: "img8", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba" }],
    condition: null,
    quantity: null,
    availability: {
      days: ["Saturday", "Sunday"],
      timeSlots: ["10am-5pm"]
    },
    durationHr: 5.0,
    location: "SRCC Auditorium",
    createdAt: "2025-08-22T11:00:00.000Z",
    sellerId: "user-108",
    wishlistlisting: [],
    subcategory: { id: "subcat-photography", name: "Photography" },
    category: { id: "cat-services", name: "Services" }
  },
  {
    id: "prd-005",
    type: "PRODUCT",
    title: "Hostel Study Table - Wooden",
    price: 1500.0,
    description: "Strong wooden study table, perfect for hostel rooms.",
    institute: "DU North Campus",
    subCategoryId: "subcat-furniture",
    categoryId: "cat-hostel",
    status: "ACTIVE",
    images: [{ id: "img9", url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4" }],
    condition: "USED",
    quantity: 1,
    availability: null,
    durationHr: null,
    location: "Delhi University Hostel",
    createdAt: "2025-08-18T08:00:00.000Z",
    sellerId: "user-109",
    wishlistlisting: [],
    subcategory: { id: "subcat-furniture", name: "Furniture" },
    category: { id: "cat-hostel", name: "Hostel Essentials" }
  },
  {
    id: "srv-005",
    type: "SERVICE",
    title: "Fitness Training - Personal Coaching",
    price: 2000.0,
    description: "Certified fitness trainer offering personalized coaching.",
    institute: "Jamia Millia Islamia",
    subCategoryId: "subcat-fitness",
    categoryId: "cat-services",
    status: "ACTIVE",
    images: [{ id: "img10", url: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1" }],
    condition: null,
    quantity: null,
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      timeSlots: ["6am-8am", "6pm-8pm"]
    },
    durationHr: 2.0,
    location: "Jamia Sports Complex",
    createdAt: "2025-08-21T07:00:00.000Z",
    sellerId: "user-110",
    wishlistlisting: [],
    subcategory: { id: "subcat-fitness", name: "Fitness" },
    category: { id: "cat-services", name: "Services" }
  }
]);

  return (
   <div className='pt-3 sm:pt-4 md:pt-6  px-4 lg:px-12'>
      
         <div className='py-2 sm:py-3 md:py-4 font-semibold text-xl sm:text-2xl md:text-3xl'>Fresh Recommendations</div>
      

     <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  '>
        {listings.map((listing)=>{
           return  <ListingCard listing={listing} />
        })}
     </div>

     <div className='flex justify-center items-center py-2 sm:py-4 md:py-6 ' ><button className='font-medium text-lg sm:text-xl md:text-2xl bg-indigo-500 rounded-sm px-2 py-1 md:px-3 text-white cursor-pointer hover:bg-indigo-600' >Load More</button></div>
  
   </div>
  )
}

export default Recommandations