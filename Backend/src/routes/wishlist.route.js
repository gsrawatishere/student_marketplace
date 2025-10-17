import express from "express";
import { verifyUser } from "../middleware/verify.js";
import { addToWishlist, checkInWishlist, deleteFromWishlist, getWishlist } from "../controllers/wishlist.controller.js";
const router = express.Router();

router.get("/get",verifyUser,getWishlist);
router.get("/exists/:id",verifyUser,checkInWishlist);
router.get("/add/:id",verifyUser,addToWishlist);
router.delete("/delete/:id",verifyUser,deleteFromWishlist);

export default router;