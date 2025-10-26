import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosinstance'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const [category,setCategory] = useState([])
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    
    const getCategories = async ()=>{
      setLoading(true);
      try {
         const response = await axiosInstance.get('/listing/get-categories');
         if(response.status == 200){
          setCategory(response.data);
         }
      } catch (error) {
        console.error("Failed to get categories :",error);
      }finally{
        setLoading(false);
      }
    }
  
    useEffect(()=>{
      getCategories();
    },[])
     
  return (
    <div>
       {loading &&  <Loader/>}
   <div className="overflow-x-auto py-4 px-4 sm:flex sm:justify-center sm:items-center pt-34 md:pt-24">
  <div className="flex space-x-6 md:space-x-8 lg:space-x-10">
    {category.map((cat) => (
      <div
        key={cat.id}
        onClick={() => navigate(`/all/${cat.id}`)}
        className="flex flex-col items-center text-center cursor-pointer hover:scale-110 transition-all min-w-[80px]"
      >
        <div className="flex justify-center items-start">
          <img
            src={cat.image}
            alt={cat.name}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full shadow-md object-cover"
          />
        </div>
        <div className="text-sm text-black mt-2 break-words min-h-[2.5rem]">
          {cat.name}
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  )
}

export default Categories