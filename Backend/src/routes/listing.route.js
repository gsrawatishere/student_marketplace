import express from "express";
import { createCategory, createListing, createSubCategory, deleteListing, getCategories, getListingByCat, getListingById, getListingBySubCat, getMyListings, getRecentListings, getSubCategoriesByCategory } from "../controllers/listing.controller.js";
import { verifyUser } from "../middleware/verify.js";
const router = express.Router();

router.post("/create-listing",verifyUser,createListing);
router.post("/add-category",verifyUser,createCategory);
router.post("/add-subcategory",verifyUser,createSubCategory);
router.get("/get-categories",verifyUser,getCategories);
router.post("/get-subBy-catid",verifyUser,getSubCategoriesByCategory);
router.get("/get-listing/:id",verifyUser,getListingById);
router.get("/get-listingsbyCat/:id",verifyUser,getListingByCat);
router.get("/get-listingsbySubCat/:id",verifyUser,getListingBySubCat);
router.get("/get-mylistings",verifyUser,getMyListings);
router.delete("/delete-mylisting/:id",verifyUser,deleteListing);
router.get("/getRecentListings",verifyUser,getRecentListings)

export default router;

