export type MessageType = {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
};