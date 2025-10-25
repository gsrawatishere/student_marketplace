import React, { useState } from "react";

const MessageInput = ({ onSendMessage}) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 bg-white border-t border-gray-200"
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className={`px-4 py-2 rounded-full transition ${
          text.trim()
            ? "bg-[#4f39f6] text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
