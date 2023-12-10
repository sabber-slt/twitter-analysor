import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const { username } = req.body;
  const sanitizedUsername = username.replace(/@/g, "");
  const url = `https://nitter.net/${sanitizedUsername}/${process.env.NITTER_FIlter}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const parsed = new Readability(dom.window.document).parse();

    let cleanText = parsed?.textContent || "";
    cleanText = cleanText
      .trim()
      .replace(/(\n){4,}/g, "\n\n\n")
      .replace(/\n\n/g, " ")
      .replace(/ {3,}/g, "  ")
      .replace(/\t/g, "")
      .replace(/\d/g, "")
      .replace(/\n+(\s*\n)*/g, "\n");

    if (cleanText.length > 600) {
      const response = await fetch(process.env.OPENAI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: process.env.PROMPT },
            { role: "user", content: cleanText.slice(0, 600) },
          ],
        }),
      });

      const result = await response.json();
      res.status(200).json({ message: result.choices[0].message.content });
    } else {
      res
        .status(404)
        .json({ message: "User not found or insufficient content" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
