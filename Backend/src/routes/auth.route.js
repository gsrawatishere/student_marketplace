import express from "express";
const router = express.Router();
import { login, register } from "../controllers/auth.controller.js";
import { updateAccessToken } from "../lib/utils.js";


router.post("/register",register);
router.post("/login",login);
router.post("/refresh-token",updateAccessToken);

export default router;