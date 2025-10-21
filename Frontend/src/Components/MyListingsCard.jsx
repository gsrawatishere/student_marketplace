import { Trash, Edit } from "lucide-react"; // 1. Import the Edit icon

const MyListingsCard = ({ listing, removeFromWishlist, editItem }) => { 
  return (
    <div
      className="flex w-full md:w-[80%] lg:w-[60%] justify-center cursor-pointer mx-auto px-3 py-3 gap-4 my-2 sm:my-3 md:my-4
                 rounded-xl hover:scale-[1.02] transition-all duration-300 bg-white"
    >
      {/* Product image section */}
      <div className="flex-shrink-0 w-[30vw] sm:w-[25vw] md:w-[20vw] lg:w-[15vw] xl:w-[12vw]">
        <img
          src={listing.images[0].url}
          alt={listing.title}
          className="w-full h-auto rounded-xs object-contain"
        />
        
      </div>

      {/* Product detail section */}
      <div className="flex flex-col gap-1 pr-2 flex-grow w-full">
        <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-600 line-clamp-1 w-full">
          {listing.title}
        </h2>

       
        
        <div className="flex justify-between items-center">
          <div className="text-lg sm:text-xl font-bold text-indigo-600">
            ₹{listing.price}
          </div>
           <div className="flex justify-end  " >
            {/* Edit Button */}
            <div
              onClick={() => editItem(listing.id)}
              className="text-xs font-medium text-indigo-700 px-1 py-0.5 rounded-sm hover:text-blue-700"
            >
              <Edit size={18} />
            </div>
        </div>
        </div>

        <div className="flex justify-between pt-1">
          <div className="font-light text-slate-500 text-sm">
            {new Date(listing.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
            })}
          </div>

          {/* 3. Create a container for both buttons */}
          <div className="flex flex-col items-center gap-2">
            

            {/* Delete Button */}
            <div
              onClick={() => removeFromWishlist(listing.id)}
              className="text-xs font-medium text-indigo-700 px-1 py-0.5 rounded-sm hover:text-red-700"
            >
              <Trash size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListingsCard;