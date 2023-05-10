# Twitter Analyzer with FastAPI


## Requirements
- python 3.8 or higher

## Installation

```sh
git clone https://github.com/sabber-slt/twitter-analysor
cd twitter-analysor/python

[linux] pip3 install -r requirements.txt
[win] pip install -r requirements.txt
```

## Usage

- Rename `.env.sample` to `.env`.
- Put your openai api key in .env file and follow these step.
    ### Run in Two Ways:
    1. Run in development:

        Just run file `run_dev.py` in your IDE to have debugging options.

    2. Run in production:
        Execute this command in this directory:

        `uvicorn main:app`

## Comparison
| Feature            | NodeJs version             | Python version                         |   |   |
|--------------------|----------------------------|----------------------------------------|---|---|
| Speed              | Excellent                  | Good                                   |   |   |
| Prompt description | -                          | Carl Jung's psychology Analysis method |   |   |
| Input              | Every text in profile page | Just tweets                            |   |   |
