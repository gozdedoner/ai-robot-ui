import { useState, useRef, useEffect } from "react";
import "./index.css";
import ChatInput from "./components/ChatInput";
import TypingIndicator from "./components/TypingIndicator";
import Header from "./components/Header";

type Message = {
  sender: "user" | "ai";
  content: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simüle edilmiş yanıt
    setTimeout(() => {
      const botResponse: Message = {
        sender: "ai",
        content: `Merhaba! Şunu söylediniz: "${userMessage.content}"`,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1200);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app-container">
      <Header />
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble ${msg.sender}`}>
            {msg.content}
          </div>
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
