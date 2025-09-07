import React, { useState } from 'react'

const Categories = () => {
    const [category,setCategory] = useState([
  {
    "id": 1,
    "name": "Books & Notes",
    "img": "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": 2,
    "name": "Lab Instruments",
    "img": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": 3,
    "name": "Sports Equipment",
    "img": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": 4,
    "name": "Movie Tickets",
    "img": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": 5,
    "name": "Tutoring & Services",
    "img": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80"
  },
  {
    "id": 6,
    "name": "Music & Hobbies",
    "img": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80"
  }
])

  return (
    <div className='overflow-x-auto py-4 px-4 sm:flex sm:justify-center sm:items-center pt-34 md:pt-24' >
         <div className='flex space-x-4 md:space-x-6 lg:space-x-8'>
             {category.map((cat)=>(
                <div className='flex flex-col justify-center items-center text-center  cursor-pointer hover:scale-110 transition-all pr-1'>
                     <img src={cat.img} alt={cat.name} 
                      className='w-10 h-10 sm:h-12 sm:w-12 md:w-14 md:h-14 rounded-md shadow-md '
                     />
                     <div className='text-sm text-black break-words mt-1 line-clamp-2'>
                        {cat.name}
                     </div>

                </div>
             ))}
         </div>
    </div>
  )
}

export default Categories