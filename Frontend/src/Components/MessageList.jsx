import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, currentUserId }) => {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isOwn={msg.senderId === currentUserId}
        />
      ))}
    </div>
  );
};

export default MessageList;