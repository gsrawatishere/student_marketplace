import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  try {
    const { name,image } = req.body;
    if (!name || !image ) {
      return res.status(400).json({ msg: "Category name and image url is required" });
    }
    const exists = await prisma.category.findFirst({
      where : {name}
    })
    if(exists){
      return res.status(400).json({msg : "Category already exists"})
    }
    const category = await prisma.category.create({
      data: { name , image },
    });
    res.status(201).json({ msg: "Category created successfully", category });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ msg: "Failed to create category", error });
  }
};

export const createSubCategory = async (req,res) => {
    try {
           const {name,categoryId,image} = req.body;
           if (!name || !categoryId || !image) {
      return res.status(400).json({ msg: "Name, image and categoryId are required" });
    }
      const category = await prisma.category.findUnique({
        where : {id : categoryId}
      })

      if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
      
    const exists = await prisma.subCategory.findFirst({
      where : {name}
    })
    if(exists){
      return res.status(400).json({msg : "SubCategory already exists"})
    }
      
     const subcategory = await prisma.subCategory.create({
        data : {name, categoryId, image},
        select : {
            id : true,
            name : true,
            category : true
        }
     })
      res.status(201).json({ msg: "SubCategory created successfully", subcategory });

    } catch (error) {
            console.error("Error creating subcategory:", error);
    res.status(500).json({ msg: "Failed to create subcategory", error });
    }
}

export const getCategories = async (req,res) => {
    try {
        const categoies = await prisma.category.findMany({
            include : {subcategories : true}
        })
        res.status(200).json(categoies);
    } catch (error) {
        console.error("Error fetching categories:", error);
    res.status(500).json({ msg: "Failed to fetch categories", error });
    }
}

export const getSubCategoriesByCategory = async (req,res) => {
    try {
        const {categoryId} = req.body;

    const subcategories = await prisma.subCategory.findMany({
      where: { categoryId },
    });

    res.status(200).json(subcategories);
        
    } catch (error) {
         console.error("Error fetching subcategories:", error);
    res.status(500).json({ msg: "Failed to fetch subcategories", error });
    }
}

export const createListing = async (req, res) => {
  try {
    const {
      type,
      title,
      price,
      description,
      subCategoryId,
      categoryId,
      images,
      condition,
      quantity,
      availability,
      durationHr,
      location,
    } = req.body;

    if (!type || !title || !price || !description || !subCategoryId || !categoryId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    if (type === "PRODUCT" && (!condition || !quantity)) {
      return res
        .status(400)
        .json({ msg: "Product requires condition and quantity" });
    }

    if (type === "SERVICE" && (!availability || !durationHr)) {
      return res
        .status(400)
        .json({ msg: "Service requires availability and durationHr" });
    }

    const listing = await prisma.listing.create({
      data: {
        type,
        title,
        price,
        description,
        location,
        condition: type === "PRODUCT" ? condition : null,
        quantity: type === "PRODUCT" ? quantity : null,
        availability: type === "SERVICE" ? availability : null,
        durationHr: type === "SERVICE" ? durationHr : null,
        seller: { connect: { id: req.user.id } },
        subcategory: { connect: { id: subCategoryId } },
        category : {connect : {id : categoryId}},
        institute: req.user.institute,
        images: {
          create: images.map((url) => ({ url })),
        },
      },
      include: { images: true, subcategory: true },
    });

    return res
      .status(200)
      .json({ msg: `${type} listed successfully`, listing });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ msg: "Failed to create listing", error });
  }
};

export const getListingById = async (req,res) =>{
  try {
        const id = req.params.id;
        if(!id){
          return res.status(400).json({msg : "Listing Id not found!"})
        }
        const listings = await prisma.listing.findUnique({
          where : {id}
        })

        if(!listings) {
          return res.status(400).json({msg : "No Listings found!"})
        }
        
        res.status(200).json({listings});

  } catch (error) {
     console.error("Error in getListing by Id :" , error);
    res.status(500).json({ msg: "Failed to get listing", error });
  }
}

export const getListingByCat = async (req,res) =>{
  try {
    const catId = req.params.id;
    if(!catId){
      return res.status(400).json({msg : "Category Id not found!"})
    }
    const listings = await prisma.listing.findMany({
      where : { 
        categoryId : catId,
        institute : req.user.institute

      } 
    })

    
    res.status(200).json({listings});
    
  } catch (error) {
    console.error("Error in get listings by Category :" , error);
    res.status(500).json({ msg: "Failed to get listings by Category", error });
  }
}

export const getListingBySubCat = async (req,res) => {
  try {
    const subCatid = req.params.id;
    if(!subCatid){
      return res.status(400).json({msg : "Sub Category Id not found!"})
    }
    const listings = await prisma.listing.findMany({
      where : {
        subCategoryId : subCatid,
         institute : req.user.institute
      }
    })
    
    if(!listings) {
          return res.status(400).json({msg : "No Listings found!"})
        }
    res.status(200).json({listings});
    

  } catch (error) {
       console.error("Error in get listings by Sub Category :" , error);
    res.status(500).json({ msg: "Failed to get listings by Sub Category", error });
  } 
}

export const getMyListings = async (req,res)=>{
  try {
    const userId = req.user.id;
    if(!userId){
      return res.status(400).json({msg : "User id not found!"})
    }

    const myListings = await prisma.listing.findMany({
      where : {sellerId : userId}
    })

    if(!myListings) {
          return res.status(400).json({msg : "No Listings found!"})
        }
       return res.status(200).json({myListings}) 
    
  } catch (error) {
    console.error("Error in getMyListings ",error);
    res.status(500).json({msg : "Failed to get my Listings!",error});
  }
}

export const deleteListing = async (req,res)=>{
  try {
    const listingId = req.params.id;
    if(!listingId){
      return res.status(400).json({msg : "Listing id not found!"})
    }
     await prisma.listing.delete({
      where : {id : listingId,
        sellerId : req.user.id
      }
    })
    res.status(200).json({msg : "Listing deleted successfully! "})
    
  } catch (error) {
    console.error("Error in deleteListing ",error);
    res.status(500).json({msg : "Failed to delete Listing! ",error});
  }
}

export const editListing = async (req,res) =>{
  try {
    const {listingId,title,price,description} = req.body;
  } catch (error) {
    console.error("Error in editListing ",error);
    res.status(500).json({msg : "Failed to edit Listing! ",error});
  }
}


export const getRecentListings = async (req,res) =>{
  try {
    const allListings = await prisma.listing.findMany({
      where : {
        institute : req.user.institute
      }
    });
    if(!allListings) {
          return res.status(400).json({msg : "No Listings found!"})
        }
    res.status(200).json({allListings})
    
  } catch (error) {
    console.error("Error in  getRecentListings ",error);
    res.status(500).json({msg : "Failed to  getRecentListings! ",error});
  }
}