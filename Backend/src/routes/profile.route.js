import express from "express";
import {verifyUser}  from "../middleware/verify.js"
import { ProfileDetails, updateProfile } from "../controllers/profile.controller.js";
const router = express.Router();

router.get("/me",verifyUser,ProfileDetails);
router.post("/update",verifyUser,updateProfile);




export default router;