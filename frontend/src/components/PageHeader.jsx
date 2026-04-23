import React from 'react'
import { School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const PageHeader = ({ name }) => {
    const navigate = useNavigate();
  return (
  <header className="fixed top-0 left-0 w-full bg-white z-50 pt-1 ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left - Logo + Name */}
        <div className="flex items-center gap-2">
          <div onClick={()=>(navigate("/"))} className="size-9 md:size-11 bg-indigo-600 rounded-md flex items-center justify-center  transition-colors cursor-pointer">
                            <School className=" md:size-7 size-6 text-indigo-100" />
                          </div>
          <span className="text-xl font-bold text-indigo-600">{name}</span>
        </div>
      </div>
    </div>
  </header>
);
};

export default PageHeader;

