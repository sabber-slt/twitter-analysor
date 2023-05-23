from dotenv import load_dotenv
from pathlib import Path
from crawl import get_tweets
import os
import openai
from fastapi import FastAPI, HTTPException, status
from models import TwitterInput
import logging
from config import *

# config logging
logging.basicConfig(level=logging.INFO,filename='app.log', filemode='a', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
logging.info('started')
# load .env file
dotenv_path = Path('.env')
load_dotenv(dotenv_path=dotenv_path)

# config openai key
openai.api_key = os.getenv("OPENAI_API_KEY")


# instanciate fastapi
app = FastAPI()

@app.post('/twitter')
def get_twitter_analysis(input: TwitterInput):
    try:
        username=input.data.name
        if not username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="username must be filled!")

        tweets = get_tweets(username)

        promp_initial=os.getenv('PROMPT_INITIAL')
        messages = [
            {
                "role": "user",
                "content": f'{promp_initial}: \n ${tweets}',
            },
        ]

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        content=response.choices[0].message.content
        return {"data": content}
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail='Error occured in server. Please contact admin')

