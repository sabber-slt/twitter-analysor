import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  let { username } = req.body;

  if (username.includes("@")) {
    username = username.replace("@", "");
  }

  const url = `https://nitter.net/${username}/${process.env.NITTER_FIlter}`;

  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const parsed = new Readability(doc).parse();
  const cleanText = parsed?.textContent
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\d/g, "")
    .replace(/\n+(\s*\n)*/g, "\n");

  if (cleanText.length > 600) {
    const response1 = await fetch(process.env.OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: process.env.PROMPT,
          },
          {
            role: "user",
            content: `${cleanText.slice(0, 600)}`,
          },
        ],
      }),
    });
    const result = await response1.json();

    res.status(200).json({ message: result.choices[0].message.content });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
