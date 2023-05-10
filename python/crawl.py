from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from random import randint


options = Options()
# options.add_argument("--headless")
options.add_argument("window-size=700,700")
options.add_argument('--no-sandbox')
tweet_text_path='.//*[@data-testid="tweetText"]'
# you need to fine-tune this in different usecases
tweet_iterations=1

# todo: optimize this
# for installing driver first time
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),chrome_options=options)
driver.close()



def get_elem(elem,xpath,default=None,attribute=None):
    try:
        text=None
        if attribute:
            found_elem=elem.find_element(By.XPATH,xpath)
            text=found_elem.get_attribute(attribute)
        else:
            text=elem.find_element(By.XPATH,xpath).text

        if default!=None and not text:
            return default
        else:
            return text
    except NoSuchElementException:  #spelling error making this code not work as expected
        return None
    except Exception as e:
        print(e)
        return None


def get_tweets(username):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),chrome_options=options)
    # driver.get(f"https://twitter.com/{username}/with_replies")
    driver.get(f"https://twitter.com/{username}")

    state = ""
    while state != "complete":
        print("loading not complete")
        time.sleep(randint(3, 5))
        state = driver.execute_script("return document.readyState")
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="tweet"]')))
    out=[]
    for i in range(tweet_iterations):
        tweets = driver.find_elements(By.CSS_SELECTOR, '[data-testid="tweet"]')
        for tweet in tweets:
            tweet_text=get_elem(tweet,tweet_text_path)
            if tweet_text not in out:
                out.append(tweet_text)
        total_height = int(driver.execute_script("return document.body.scrollHeight"))
        driver.execute_script("window.scrollTo(0, {});".format(total_height))
        
    return out


