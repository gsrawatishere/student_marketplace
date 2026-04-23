import { Link } from 'react-router-dom'; // Assuming you use React Router

// A default placeholder image URL
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';

const ListingListCard = ({ listing }) => {
  // Defensive check for image to prevent crashes
  const imageUrl = listing.images?.[0]?.url || PLACEHOLDER_IMAGE;

  return (
    // 1. Wrapped with Link for better accessibility and navigation
    <Link 
      to={`/listing/${listing.id}`} // Example link destination
      className="flex w-full md:w-[80%] lg:w-[60%] justify-center mx-auto px-2 py-6 gap-4 
                 bg-white rounded-xl hover:scale-[1.02] transition-all duration-300 "
    >
      {/* Product image section */}
      {/* 4. Switched to fixed width for more predictable sizing */}
      <div className="flex-shrink-0 w-28 sm:w-32 md:w-40">
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-full rounded-md object-cover" // Using object-cover for a cleaner look
        />
      </div>

      {/* Product detail section */}
      {/* 4. Removed explicit width (w-[60vw]) to let flex-grow manage space */}
      <div className="flex flex-col gap-1 pr-2 flex-grow overflow-hidden">
        {/* 2. Used `truncate` for a clean single-line title */}
        <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-700 truncate">
          {listing.title}
        </h2>
        <div className="flex justify-between items-center">
          <div className="text-lg sm:text-xl font-bold text-indigo-600">
            ₹{listing.price}
          </div>
        </div>
        {/* 2. Used `truncate` here, but for multi-line consider the line-clamp plugin */}
        <div className="text-sm text-slate-500 truncate">
          {listing.description}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="font-light text-slate-500 text-sm">
            {new Date(listing.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
            })}
          </div>
          <div className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">
            {listing.type}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingListCard;