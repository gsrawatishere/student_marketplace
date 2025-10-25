import React from "react";
import { format } from "date-fns";

const MessageItem = ({ message, isOwn }) => {
  const time = format(new Date(message.createdAt), "hh:mm a");

  return (
    <div
      className={`flex ${isOwn ? "justify-end" : "justify-start"} items-end`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
          isOwn
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none"
        }`}
      >
        <p>{message.text}</p>
        <span
          className={`text-[10px] mt-1 block text-right ${
            isOwn ? "text-blue-100" : "text-gray-400"
          }`}
        >
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;