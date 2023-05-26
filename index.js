import express from "express";
import pupeteer from "puppeteer";
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

const configuration = new Configuration({
  apiKey: `${process.env.OPENAI_API_KEY}`,
});
const MAX_RESPONSE_TOKENS = 1000;

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 9000;
// post /twitter
app.post("/twitter", async (req, res) => {
  // data that include username of twitter user
  const { data } = req.body;
  console.log(data.name);
  const browser = await pupeteer.launch({
    headless: false,
    defaultViewport: null,
    // this is required for linux server
    executablePath: "/usr/bin/chromium-browser",
    // for MacOS with M1 chip: chromium does not work, use google chrome instead. Active this line
    // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(`https://twitter.com/${data.name}`);
  await page.waitForTimeout(5000);
  // scroll down to load more tweets
  await page.evaluate(() => {
    window.scrollBy(0, 1000);
  });
  await page.waitForTimeout(2000);

  const text = await page.$$eval("div.css-901oao span", (links) =>
    links.map((link) => link.textContent.trim())
  );

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          // write your prompt here
          content: ` : \n ${text}`,
        },
      ],
      max_tokens: MAX_RESPONSE_TOKENS,
    });
    const { message } = response.data.choices[0];
    const { content } = message;
    console.log(content);
    res.status(200).json({ data: content });
  } catch (error) {
    const openAIError = error.response?.data?.error?.message;
    console.log(openAIError);
    const errorMessage = openAIError || "Something went wrong";
    res.status(500).json({ errorMessage });
  }

  await browser.close();
});

app.listen(PORT, () => {
  console.log("Running on http://localhost:" + PORT);
});
