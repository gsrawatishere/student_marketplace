import React from 'react'
import { School,Heart,CircleUserRound,Search,Plus,MessageSquare } from 'lucide-react'
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full fixed z-10 bg-white  pt-4 px-6 lg:px-12 '>
          <div className='flex justify-between items-center m-1'>
                {/* Left items */}
                <div className='flex  items-center gap-2'>
                     <div onClick={()=>(navigate("/"))} className="size-9 md:size-11 bg-indigo-600 rounded-md flex items-center justify-center  transition-colors cursor-pointer">
                            <School className=" md:size-7 size-6 text-indigo-100" />
                          </div>
                <div className='font-semibold text-lg sm:text-xl md:text-2xl'>CampusX</div>
                </div>

            {/* Logic of search bar */}
               <div className='hidden md:flex flex-1 px-6 justify-center w-full '>
                     <form className='flex w-full max-w-4xl' >
                        <input type="text"
                          placeholder='Search...'
                          className='border rounded-l-md flex-grow px-3 py-2 border-gray-300 outline-none '
                        />
                        <button className='px-4 py-2 bg-indigo-600 text-white rounded-r-md cursor-pointer hover:bg-indigo-700'>
                           <Search />
                        </button>
                     </form>
               </div>

                {/* Right items */}
                <div className='flex items-center gap-5 text-xl md:text-2xl md:gap-6  '>
                      <MessageSquare onClick={()=>(navigate("/all-chats"))} className='size-5 md:size-6 lg:size-7 hover:text-indigo-600 cursor-pointer'/>
                         <Heart onClick={()=>(navigate("/wishlist"))} className='size-5 md:size-6 lg:size-7 hover:text-indigo-600 cursor-pointer'/>
                      <CircleUserRound onClick={()=>(navigate("/profile"))} className='size-6 md:size-7 lg;size-8 hover:text-indigo-600 cursor-pointer' />
                     <button 
                       onClick={()=>{navigate('/addlisting')}}
                     className='hidden md:flex justify-center items-center rounded-md  px-4 py-1 text-lg font-semibold bg-indigo-600 outline-none hover:bg-indigo-700 text-white cursor-pointer' ><Plus className='mr-1'/> SELL</button>
                </div>

          </div>
          {/* search bar in mobile */}
          <div className="md:hidden my-4">
            <form className='w-full flex'>
                <input 
                placeholder='Search...'
                className='border rounded-l-md flex-grow px-3 py-1.5 border-gray-300 outline-none'
                type="text" />
                <button className='px-3 py-2 bg-indigo-600 text-white rounded-r-md cursor-pointer'>
                           <Search />
                        </button>

            </form>

          </div>
    </div>
  )
}

export default Navbar