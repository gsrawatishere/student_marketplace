import React from "react";
import avatar from "../../public/avatar.png";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ chat, currentUserId }) => {
  const otherUser =
    chat.senderId === currentUserId ? chat.receiver : chat.sender;

  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#4f39f6] text-white shadow ">
      <img
       onClick={()=>{navigate(`/profiledata/${otherUser.id}`)}}
        src={otherUser?.profile?.profilepic || avatar}
        alt={otherUser?.fullName}
        className="w-10 h-10 rounded-full object-cover border border-white cursor-pointer"
      />
      <div>
        <p className="font-semibold">{otherUser?.fullName}</p>
        {/* <p className="text-xs text-blue-100">Online</p> */}
      </div>
    </div>
  );
};

export default ChatHeader;