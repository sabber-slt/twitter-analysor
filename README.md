# Twitter Chatgpt Analysor

This analyzer bot is written in Python and JavaScript separately. It utilizes Selenium for Python and Puppeteer for JavaScript.
The functionality of this robot is as follows: it retrieves the Twitter username from the user and navigates to their page. Here, you have the option to determine the scrolling depth of the page. The greater the scrolling depth, the longer the analysis process will take. It can even read all of the user's tweets.
After extracting the data, it filters the text and analyzes it using the parameters we have set for ChatGPT in order to determine the user's personality.

## Features

- Fetch and process user data from Nitter.
- Clean and format the fetched text.
- Integrate with OpenAI's GPT-3.5-turbo model for advanced text processing.

## Installation

In order to use it, you must first acquire an API key from the OpenAI website. OpenAI API

```sh
git clone https://github.com/sabber-slt/twitter-analysor
cd twitter-analysor
yarn
```

## Enviroment variables

```sh
PORT=[Your preferred port]
OPENAI_API_KEY=[Your OpenAI API key]
OPENAI_URL=[OpenAI API URL]
NITTER_FILTER=[Your Nitter filter settings]
```
