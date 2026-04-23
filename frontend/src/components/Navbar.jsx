import React from "react";
import { useState } from "react";

import {
  School,
  Heart,
  CircleUserRound,
  Search,
  Plus,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    
  };

  return (
    <div className="w-full fixed z-10 bg-white  pt-4 px-6 lg:px-12 ">
      <div className="flex justify-between items-center m-1">
        {/* Left items */}
        <div className="flex  items-center gap-2">
          <div
            onClick={() => navigate("/")}
            className="size-9 md:size-11 bg-indigo-600 rounded-md flex items-center justify-center  transition-colors cursor-pointer"
          >
            <School className=" md:size-7 size-6 text-indigo-100" />
          </div>
          <div className="font-semibold text-lg sm:text-xl md:text-2xl">
            campusKart
          </div>
        </div>

        {/* Logic of search bar */}
        <div className="hidden md:flex flex-1 px-6 justify-center w-full ">
          <form onSubmit={handleSearch} className="flex w-full max-w-4xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="border rounded-l-md flex-grow px-3 py-2 border-gray-300 outline-none "
            />
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className={`px-4 py-2 rounded-r-md transition-all duration-200 flex items-center justify-center
    ${
      searchQuery.trim()
        ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
        : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-not-allowed "
    }`}
            >
              <Search
                className={`transition-transform duration-200 ${
                  searchQuery.trim() ? "scale-100" : "scale-90 opacity-60"
                }`}
              />
            </button>
          </form>
        </div>

        {/* Right items */}
        <div className="flex items-center gap-5 text-xl md:text-2xl md:gap-6  ">
          <MessageSquare
            onClick={() => navigate("/all-chats")}
            className="size-5 md:size-6 lg:size-7 hover:text-indigo-600 cursor-pointer"
          />
          <Heart
            onClick={() => navigate("/wishlist")}
            className="size-5 md:size-6 lg:size-7 hover:text-indigo-600 cursor-pointer"
          />
          <CircleUserRound
            onClick={() => navigate("/profile")}
            className="size-6 md:size-7 lg;size-8 hover:text-indigo-600 cursor-pointer"
          />
          <button
            onClick={() => {
              navigate("/addlisting");
            }}
            className="hidden md:flex justify-center items-center rounded-md  px-4 py-1 text-lg font-semibold bg-indigo-600 outline-none hover:bg-indigo-700 text-white cursor-pointer"
          >
            <Plus className="mr-1" /> SELL
          </button>
        </div>
      </div>
      {/* search bar in mobile */}
      <div className="md:hidden my-4">
        <form onSubmit={handleSearch} className="w-full flex">
          <input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-l-md flex-grow px-3 py-1.5 border-gray-300 outline-none"
            type="text"
          />
           <button
              type="submit"
              disabled={!searchQuery.trim()}
              className={`px-4 py-2 rounded-r-md transition-all duration-200 flex items-center justify-center
    ${
      searchQuery.trim()
        ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
        : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-not-allowed "
    }`}
            >
              <Search
                className={`transition-transform duration-200 ${
                  searchQuery.trim() ? "scale-100" : "scale-90 opacity-60"
                }`}
              />
            </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
