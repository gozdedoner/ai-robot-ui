// src/components/ChatWindow.tsx

import React from "react";
import type { MessageType } from "../types/message";
import ChatBubble from "./ChatBubble";

type ChatWindowProps = {
  messages: MessageType[];
};

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div
      className="border rounded p-3 mb-3"
      style={{ height: "400px", overflowY: "auto" }}
    >
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default ChatWindow;
