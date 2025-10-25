import React from "react";
import { formatDistanceToNow } from "date-fns";
import avatar from '../../public/avatar.png';

const ChatCard = ({ chat, currentUserId, onClick }) => {
  const otherUser = chat.senderId === currentUserId ? chat.receiver : chat.sender;

  const lastMessageObj = chat?.lastMessage;
  const lastMessageText = lastMessageObj?.text || "No messages";

  const updatedAt = formatDistanceToNow(new Date(chat.updatedAt), {
    addSuffix: true,
  });

  // Determine if last message is unread for current user
  const isUnread =
    lastMessageObj &&
    !lastMessageObj.read &&
    lastMessageObj.receiverId === currentUserId;

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between w-full p-4 rounded-md shadow-sm transition-all duration-300 cursor-pointer
        ${isUnread ? "bg-blue-50 font-semibold" : "bg-white hover:bg-gray-50 hover:shadow-md"}`}
    >
      {/* Left Section: Avatar + Info */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Profile Picture */}
        <img
          src={otherUser?.profile?.profilepic || avatar}
          alt={otherUser?.fullName}
          className={`w-12 h-12 rounded-full object-cover border flex-shrink-0
            ${isUnread ? "border-blue-500" : "border-blue-200"}`}
        />

        {/* Receiver Info */}
        <div className="flex flex-col min-w-0">
          <span
            className={`text-base truncate ${isUnread ? "text-gray-900" : "text-gray-800"}`}
          >
            {otherUser?.fullName}
          </span>
          <span
            className={`text-sm truncate ${isUnread ? "text-gray-800" : "text-gray-500"}`}
          >
            {lastMessageText}
          </span>
        </div>
      </div>

      {/* Right Section: Time */}
      <div
        className={`text-xs ml-3 flex-shrink-0 hidden sm:block ${
          isUnread ? "text-gray-700" : "text-gray-400"
        }`}
      >
        {updatedAt}
      </div>
    </div>
  );
};

export default ChatCard;