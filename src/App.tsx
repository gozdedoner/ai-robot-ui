// src/App.tsx

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { MessageType } from "./types/message";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const now = new Date().toISOString();

    const userMessage: MessageType = {
      id: uuidv4(),
      sender: "user",
      text: input,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: input },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const aiText =
        data.choices?.[0]?.message?.content || "AI cevap veremedi 😢";

      const aiMessage: MessageType = {
        id: uuidv4(),
        sender: "ai",
        text: aiText,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("API hatası:", error);
      const errorMessage: MessageType = {
        id: uuidv4(),
        sender: "ai",
        text: "⚠️ AI cevap verirken bir hata oluştu.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🤖 AI Robot Chat</h2>

      <div
        className="border rounded p-3 mb-3"
        style={{ height: "400px", overflowY: "auto" }}
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </div>

      <ChatInput input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
}

export default App;
