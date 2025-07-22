import React from "react";
import type { MessageType } from "../types/message";

type Props = {
  message: MessageType;
};

const ChatBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`d-flex ${
        isUser ? "justify-content-end" : "justify-content-start"
      } mb-2`}
    >
      <div
        className={`p-3 rounded-3 ${
          isUser ? "bg-primary text-white" : "bg-light"
        }`}
        style={{ maxWidth: "75%" }}
      >
        <div className="mb-1">{message.text}</div>
        <small
          className="d-block text-muted text-end"
          style={{ fontSize: "0.75rem" }}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
};

export default ChatBubble;
