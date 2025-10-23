import React from 'react'
import ChatCard from '../Components/ChatCard'
import { useState } from 'react'
import axiosInstance from '../Api/AxiosInstance';
import Loader from '../Components/Loader'
import { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import PageHeader from '../Components/PageHeader'


const ChatList = () => {
    const [allChats,setAllChats] = useState([]);
    const [isloading,setLoading] = useState(true);

    const {user,loading} = useAuth();
    
    const getAllChats = async ()=>{
      setLoading(true);
        try {
            const response = await axiosInstance.get('chat/all-chats');
            if(response.status == 200){
                setAllChats(response.data.chats);
            }
        } catch (error) {
            console.error("failed to load chats :", error);
        }finally{
          setLoading(false);
        }
    }
 
    const onChatClick = ()=>{

    }

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

      if (!allChats || allChats.length === 0) {
    return (
      <div>
         <PageHeader name="All Chats"/>
        <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        No chats yet. Start a conversation!
      </div>
      </div>
      
    );
  }
     
    return (
   <div>
    <PageHeader name="All Chats"/>

     <div className="flex flex-col gap-1 w-full max-w-md mx-auto pt-14 md:pt-18 ">
      {allChats.map((chat) => (
        <ChatCard
          key={chat.id}
          chat={chat}
          currentUserId={user.id}
          onClick={() => onChatClick(chat)}
        />
      ))}
    </div>
   </div>
  );
}

export default ChatList