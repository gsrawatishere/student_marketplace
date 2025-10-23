import React from "react";
import { formatDistanceToNow } from "date-fns";
import avatar from '../../public/avatar.png'

const ChatCard = ({ chat, currentUserId, onClick }) => {
  
  const otherUser =
    chat.senderId === currentUserId ? chat.receiver : chat.sender;

  const lastMessage = chat?.lastMessage?.text || "No messages yet";
  const updatedAt = formatDistanceToNow(new Date(chat.updatedAt), {
    addSuffix: true,
  });

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 bg-white rounded-sm shadow-xs hover:bg-blue-50 hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      {/* Left Section: Avatar + Info */}
      <div className="flex items-center gap-4">
        {/* Profile Picture */}
        <img
          src={
            otherUser?.profile?.profilepic ||
            avatar
          }
          alt={otherUser?.fullName}
          className="w-12 h-12 rounded-full object-cover border border-blue-200"
        />

        {/* Receiver Info */}
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-800">
            {otherUser?.fullName}
          </span>
          <span className="text-sm text-gray-500 truncate max-w-[180px]">
            {lastMessage}
          </span>
        </div>
      </div>

      {/* Right Section: Time */}
      <div className="text-xs text-gray-400 self-end">{updatedAt}</div>
    </div>
  );
};

export default ChatCard;