import express from "express";
import { adminLogin, Adminlogout } from "../controllers/admin.controller.js";
const router = express.Router();

router.post('/login',adminLogin);
router.get('/logout',Adminlogout);


export default router;