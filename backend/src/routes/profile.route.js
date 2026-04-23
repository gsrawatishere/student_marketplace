import express from "express";
import {verifyUser}  from "../middleware/verify.js"
import { ProfileByUserId, ProfileDetails, updateProfile } from "../controllers/profile.controller.js";
const router = express.Router();

router.get("/me",verifyUser,ProfileDetails);
router.post("/update",verifyUser,updateProfile);
router.get("/getbyid/:id",verifyUser,ProfileByUserId);


export default router;