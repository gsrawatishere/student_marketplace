
const ListingCard = ({listing}) => {
    
 return (
  <div className="flex-shrink-0 cursor-pointer w-36 sm:w-44 md:w-52 rounded-lg text-center pb-4 relative duration-300 hover:scale-105 transition-all p-1 m-3">
    {/* Listing Image */}
    <div className="relative w-full h-32 sm:h-36 md:h-40 overflow-hidden rounded-md">
      <img
        className="w-full h-full object-cover"
        src={listing.images[0].url}
        alt={listing.title}
      />
    </div>

    {/* Product Details */}
    <div className="flex flex-col gap-1  mt-2">
      <div className="text-lg sm:text-xl font-bold text-indigo-600 text-center">
        ₹{listing.price}
      </div>
      <h2 className="text-xs sm:text-sm font-medium text-slate-500 line-clamp-2">
        {listing.title}
      </h2>

      <div className="flex justify-between items-center pt-2">
        <div className="font-light text-slate-500 text-[10px] md:text-[12px]">
          {new Date(listing.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
          })}
        </div>
        <div className="text-[10px] md:text-[12px] font-medium  text-indigo-700 px-1 py-0.5 rounded-sm">
          {listing.type}
        </div>
      </div>
    </div>
  </div>
);
}

export default ListingCard