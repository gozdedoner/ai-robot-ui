// src/components/ChatInput.tsx

import React from "react";

type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isLoading?: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  onSend,
  isLoading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="d-flex">
      <input
        className="form-control me-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        placeholder={isLoading ? "Yanıt bekleniyor..." : "Mesajınızı yazın..."}
      />
      <button
        className="btn btn-success"
        onClick={onSend}
        disabled={isLoading || !input.trim()}
      >
        {isLoading ? "Gönderiliyor..." : "Gönder"}
      </button>
    </div>
  );
};

export default ChatInput;
