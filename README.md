# Twitter Chatgpt Analysor

[![Build Status](https://travis-ci.com/chrisvxd/puppeteer-social-image.svg?branch=master)](https://travis-ci.com/chrisvxd/puppeteer-social-image) [![NPM](https://img.shields.io/npm/v/puppeteer-social-image.svg)](https://www.npmjs.com/package/puppeteer-social-image)

This analyzer bot is written in Python and JavaScript separately. It utilizes Selenium for Python and Puppeteer for JavaScript.
The functionality of this robot is as follows: it retrieves the Twitter username from the user and navigates to their page. Here, you have the option to determine the scrolling depth of the page. The greater the scrolling depth, the longer the analysis process will take. It can even read all of the user's tweets.
After extracting the data, it filters the text and analyzes it using the parameters we have set for ChatGPT in order to determine the user's personality.

## Installation

```sh
git clone https://github.com/sabber-slt/twitter-analysor
cd twitter-analysor
yarn
```

## Usage

### Put your openai api key in .env file and Write your appropriate promt

```js
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
```

### You can change the scroll amount to any desired number

```js
await page.evaluate(() => {
  window.scrollBy(0, 1000);
});
```

## API

### u can get openai api key from here <https://platform.openai.com/account/api-keys>
