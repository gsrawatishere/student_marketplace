import express from "express";
import { createCategory, createListing, createSubCategory, deleteListing, editListing, getCategories, getListingByCat, getListingById, getListingBySubCat, getMyListings, getRecentListings, getSearchResults, getSubCategoriesByCategory } from "../controllers/listing.controller.js";
import { verifyAdmin, verifyUser } from "../middleware/verify.js";
const router = express.Router();

router.post("/create-listing",verifyUser,createListing);
router.get("/get-categories",verifyUser,getCategories);
router.get("/get-subBy-catid",verifyUser,getSubCategoriesByCategory);
router.get("/get-listing/:id",verifyUser,getListingById);
router.get("/get-listingsbyCat/:id",verifyUser,getListingByCat);
router.get("/get-listingsbySubCat/:id",verifyUser,getListingBySubCat);
router.get("/get-mylistings",verifyUser,getMyListings);
router.delete("/delete-mylisting/:id",verifyUser,deleteListing);
router.get("/getRecentListings",verifyUser,getRecentListings);
router.post("/edit-listing",verifyUser,editListing);
router.get("/search",verifyUser,getSearchResults);
//admin
router.post("/add-category",verifyAdmin,createCategory);
router.post("/add-subcategory",verifyAdmin,createSubCategory);
router.get("/get-categories-admin",verifyAdmin,getCategories);
router.get("/get-categories-admin",verifyAdmin,getCategories);
router.get("/get-subBy-catid-admin",verifyAdmin,getSubCategoriesByCategory);



export default router;

