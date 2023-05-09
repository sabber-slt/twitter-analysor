# Twitter Chatgpt Analysor

[![Build Status](https://travis-ci.com/chrisvxd/puppeteer-social-image.svg?branch=master)](https://travis-ci.com/chrisvxd/puppeteer-social-image) [![NPM](https://img.shields.io/npm/v/puppeteer-social-image.svg)](https://www.npmjs.com/package/puppeteer-social-image) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

Create a bot that reads the tweets of a given username and analyzes the user's personality using artificial intelligence..

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
