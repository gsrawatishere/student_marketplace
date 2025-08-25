import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();

export const checkInWishlist = async (req,res) =>{
    try {
        const userId = req.user.id;
        const {listingId} = req.params.id;

        if(!listingId){
            return res.status(400).json({msg : "Listing Id not found!"})
        }
        const wishlist = await Prisma.wishlist.findUnique({
            where : {userId : userId}
        })


        const inWishlist = await Prisma.wishlist_Listing.findUnique({
             where : {
               wishlistId : wishlist.id,
               listingId : listingId
            }
        } )
        
        if(inWishlist){
            return res.status(200).json({exists : true});
        }
        else{
            return res.status(200).json({exists : false});
        }

        
    } catch (error) {
          console.error("Error in  checkInWishlist : ",error);
          return res.status(500).json({msg : "Error in checkInWishlist ",error});
    }
}

export const addToWishlist = async (req,res) =>{
    try {
        const userId = req.user.id;
        const {listingId} = req.params.id;
   
         if(!listingId){
            return res.status(400).json({msg : "Listing Id not found!"})
        }

        const wishlist = await Prisma.wishlist.findUnique({
            where : {userId : userId}
        })

        const exixting = await Prisma.wishlist_Listing.findFirst({
            where : {
                wishlistId : wishlist.id,
                listingId : listingId
            }
        })

        if(exixting){
            return res.status(400).json({msg : "Product already in added in wishlist"})
        }

        const wishlistItem = await Prisma.wishlist_Listing.create({
            data : {
                wishlistId : wishlist.id,
                listingId : listingId
            }
        })
     
         return res.status(200).json({msg : "Listing added to wishlist",wishlistItem});
  
    } catch (error) {
         console.error("Error in addToWishlist",error);
         return res.status(500).json({msg : "Error in addToWishlist",error});
    }
}

 
export const deleteFromWishlist = async (req,res) =>{
    try {
        const userId = req.user.id;
        const {listingId} = req.params.id;

          if(!listingId){
            return res.status(400).json({msg : "Listing Id not found!"})
        }

        const wishlist = await Prisma.wishlist.findUnique({
            where : {userId : userId}
        })
        
        const deleteFromWishlist = await Prisma.wishlist_Listing.delete({
            where : {
                wishlistId : wishlist.id,
                listingId : listingId
            }
        })

        return res.status(200).json({msg : "Listing removed from wishlist "})

    } catch (error) {
         console.error("Error indeleteFromWishlist",error);
         return res.status(500).json({msg : "Error in deleteFromWishlist",error});
    }
}

const getWishlist = async (req,res) =>{
    try {
        const userId = req.user.id;
        
        if(!userId){
            return res.status(200).json({msg : "No userid found"})
        }
        const wishlist = await Prisma.wishlist.findUnique({
            where : { userId : userId}
        })

        const listings = await Prisma.wishlist_Listing.findMany();

        return res.status(200).json({listings});


    } catch (error) {
         console.error("Error in getWishlist",error);
         return res.status(500).json({msg : "Error in getWishlist",error});
    }
}