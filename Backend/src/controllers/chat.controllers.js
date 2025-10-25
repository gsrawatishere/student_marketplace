import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {io,connectedUsers} from "../lib/socket.js"


// get all chats
export const getUserChats = async (req, res) => {
  const userId = req.user.id;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: { updatedAt: "desc" },
      include: {
         lastMessage : true, 
        sender: { select: { id: true, fullName: true, email: true, profile : {
          select : {
            profilepic : true
          }
        } } },
        receiver: { select: { id: true, fullName: true, email: true , profile : {
          select : {
            profilepic : true
          }
        }} },
        lastMessage: true,
      },
    });
    res.status(200).json({ chats });
  } catch (error) {
    console.error("Failed to get user chats : ", error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};


// get all messages of a specific chat
export const getChatMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: { select: { id: true, fullName: true } },
        receiver: { select: { id: true, fullName: true } },
      },
    });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// create or get chat

export const createOrGetChat = async (req, res) => {
  const userId = req.user.id;
  const { sellerId } = req.body;

  if (userId === sellerId) {
    return res.status(400).json({ msg: "You cannot chat with yourself" });
  }
  if (!sellerId) {
    return res.status(400).json({ msg: "Seller Id not found" });
  }

  try {
    let chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId: sellerId },
          { senderId: sellerId, receiverId: userId },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: {
              select: {
                profilepic: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: { select: { profilepic: true } }, 
          },
        },
        lastMessage: true,
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          senderId: userId,
          receiverId: sellerId,
        },
        include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: {
              select: {
                profilepic: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile : { select: { profilepic: true } }, 
          },
        },
        lastMessage: true,
      },
      });
    }

    res.status(200).json({ chat });
  } catch (error) {
    console.error("Failed to create or get chat:", error);
    res.status(500).json({ error: "Failed to create or get chat" });
  }
};


//send message 

export const sendMessage = async (req,res)=>{
   try {
          const senderId = req.user.id;
          const {chatId, receiverId, text} = req.body;

      if (!chatId || !receiverId || !text) {
      return res.status(400).json({ error: "chatId, receiverId, and text are required." });
    }
     
    const chat = await prisma.chat.findUnique({
      where : {id : chatId}
    })

    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }

    const message = await prisma.message.create({
      data : {
        chatId,
        senderId,
        receiverId,
        text
      },
      include : {
        sender: { select: { id: true, fullName: true, profile: true } },
        receiver: { select: { id: true, fullName: true, profile: true } },
      }
    })        

    await prisma.chat.update({
      where: { id: chatId },
      data: {
        lastMessageId: message.id,
        updatedAt: new Date(),
      },
    });
     
    
    const receiverSocketId = connectedUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", message);
    }
    console.log(receiverSocketId)
    const senderSocketId = connectedUsers.get(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messageSent", message);
    }

   res.status(201).json(message);

   } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).json({ error: "Failed to send message: " });
   }
}