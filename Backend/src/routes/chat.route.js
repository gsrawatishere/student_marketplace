import express from "express";
import {verifyUser}  from "../middleware/verify.js"
import { createOrGetChat, getChatMessages, getUserChats } from "../controllers/chat.controllers.js";
const router = express.Router();


router.post("/create-chat",verifyUser,createOrGetChat);
router.get('/all-chats',verifyUser,getUserChats);
router.get('/messages/:chatId',verifyUser,getChatMessages);


export default router;