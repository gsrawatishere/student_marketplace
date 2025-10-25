import React from 'react'
import ChatCard from '../Components/ChatCard'
import { useState } from 'react'
import axiosInstance from '../Api/AxiosInstance';
import Loader from '../Components/Loader'
import { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import ChatContainer from '../Components/ChatContainer';
import { useLocation } from "react-router-dom";


const ChatList = () => {
    const [allChats,setAllChats] = useState([]);
    const [isloading,setLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState(null);
    const {user,loading} = useAuth();
    const location = useLocation();
    
    const getAllChats = async ()=>{
      setLoading(true);
        try {
            const response = await axiosInstance.get('chat/all-chats');
            if(response.status == 200){
                setAllChats(response.data.chats);
                console.log(response.data.chats)
            }
        } catch (error) {
            console.error("failed to load chats :", error);
        }finally{
          setLoading(false);
        }
    }
    useEffect(() => {
  if (allChats.length > 0 && location.state?.selectedChatId) {
    const foundChat = allChats.find(c => c.id === location.state.selectedChatId);
    if (foundChat) {
      setSelectedChat(foundChat);
    }
  }
}, [allChats, location.state]);
 

    useEffect(()=>{
      getAllChats();
    },[])
  
    if(isloading || loading){
      return(
        <div>
          <Loader/>
        </div>
      )
    }



  return (
  <div className="flex w-full h-[99vh] md:h-screen bg-gray-100 overflow-hidden">
    {/* LEFT SIDE - Chat List */}
    <div
      className={`${
        selectedChat ? "hidden md:flex" : "flex"
      } flex-col w-full md:w-[35%] lg:w-[30%] bg-white border-r border-gray-200 overflow-y-auto`}
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-blue-600">Messages</h2>
        
      </div>

      {loading ? (
        <p className="p-4 text-gray-500"><Loader/></p>
      ) : allChats.length === 0 ? (
        <p className="p-4 text-gray-500">  No chats yet. Start a conversation!</p>
      ) : (
        allChats.map((chat) => (
          <ChatCard
            key={chat.id}
            chat={chat}
            currentUserId={user?.id}
            onClick={() => setSelectedChat(chat)}
          />
        ))
      )}
    </div>

    {/* RIGHT SIDE - Chat Container */}
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } md:flex flex-1 flex-col w-full md:w-[65%] lg:w-[70%]`}
    >
      {selectedChat ? (
        <ChatContainer 
        chat={selectedChat}
        demoMessage={location.state?.demoMessage} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 text-center">
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Welcome to Chat
            </h2>
            <p className="text-gray-400">
              Select a conversation to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default ChatList