import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
console.log("🔐 API KEY:", process.env.OPENAI_API_KEY);

const app = express();
app.use(cors()); // 👈 Bu satır önemli!
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).send({ error: "Something went wrong on the server" });
  }
});

app.listen(3001, () => {
  console.log("🚀 OpenAI proxy server running at http://localhost:3001");
});
