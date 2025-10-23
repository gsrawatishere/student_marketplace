import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// get all chats
export const getUserChats = async (req,res) =>{
    const userId = req.user.id;

    try {
        const chats = await prisma.chat.findMany({
            where : {
                OR : [
                    {senderId : userId},
                    {receiverId : userId}
                ]
            },
            orderBy : {updatedAt : "desc"},
            include : {
                sender : {select : {id : true, fullName : true, email : true}},
                receiver : {select : {id : true, fullName : true, email : true}},
                lastMessage : true,
            }
        })

        res.status(200).json({chats});
        
    } catch (error) {
        console.error("Failed to get user chats : ",error);
        res.status(500).json({ error: "Failed to fetch chats" });
    }
}


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