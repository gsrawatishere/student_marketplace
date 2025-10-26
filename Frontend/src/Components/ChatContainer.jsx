import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useAuth } from "../Context/AuthContext";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useSocket } from "../Context/SocketContetx";

const ChatContainer = ({ chat }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);
  const socket = useSocket();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/chat/messages/${chat.id}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };
    if (chat?.id) fetchMessages();
  }, [chat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // sockets

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      if (message.chatId === chat.id) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, chat]);


   const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const messageData = {
      chatId: chat.id,
      senderId: user.id,
      receiverId: chat.senderId === user.id ? chat.receiverId : chat.senderId,
      text,
    };

    // Emit via WebSocket
    socket?.emit("sendMessage", messageData);

    // Optimistically add message to UI
    setMessages((prev) => [
      ...prev,
      {
        ...messageData,
        sender: { id: user.id, fullName: user.fullName, profile: user.profile },
        receiver: {
          id: messageData.receiverId,
        },
        createdAt: new Date().toISOString(),
      },
    ]);

    // Optionally still send via axios to ensure DB save
    try {
      await axiosInstance.post("/chat/send", messageData);
    } catch (error) {
      console.error("Failed to save message via API:", error);
    }
  };


  if (!chat)
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full bg-white shadow-md overflow-hidden">
      <ChatHeader chat={chat} currentUserId={user?.id} />
      <div className="flex-1 overflow-y-auto p-4 bg-blue-50">
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length > 0 ? (
          <MessageList messages={messages} currentUserId={user?.id} />
        ) : (
          <p className="text-center text-gray-500">No messages yet</p>
        )}
        <div ref={bottomRef}></div>
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;