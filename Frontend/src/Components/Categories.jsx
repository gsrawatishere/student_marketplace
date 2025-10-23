import React, { useEffect, useState } from 'react'
import axiosInstance from '../Api/AxiosInstance'
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
      <div className='overflow-x-auto py-4 px-4 sm:flex sm:justify-center sm:items-center pt-34 md:pt-24' >

         <div className='flex space-x-4 md:space-x-6 lg:space-x-8'>
             {category.map((cat)=>(
                <div
                 key={cat.id}
                 onClick={()=>{navigate(`/all/${cat.id}`)}}
                 className='flex flex-col justify-center items-center text-center  cursor-pointer hover:scale-110 transition-all pr-1'>
                     <img src={cat.image} alt={cat.name} 
                      className='w-10 h-10 sm:h-12 sm:w-12 md:w-14 md:h-14 rounded-md shadow-md '
                     />
                     <div className='text-sm text-black break-words mt-1 line-clamp-2'>
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