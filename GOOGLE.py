import requests
from dotenv import load_dotenv
from urllib.parse import urlparse, urlunparse
import os

load_dotenv()

API_KEY = os.getenv("API_KEY")
CSE_ID = os.getenv("CSE_ID")

BLACKLISTED_DOMAINS = ['britannica.com', 'gettyimages.com', 'shutterstock.com', 'alamy.com', 'dreamstime.com']

def is_valid_image_url(url):
    try:
        r = requests.head(url, timeout=5)
        return r.status_code == 200 and "image" in r.headers.get("Content-Type", "")
    except:
        return False

def clean_url(url):
    parsed = urlparse(url)
    return urlunparse(parsed._replace(query=""))

def is_blacklisted(url):
    return any(domain in url for domain in BLACKLISTED_DOMAINS)

def search_google_image(query):
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "q": f"{query} photo",
        "key": API_KEY,
        "cx": CSE_ID,
        "searchType": "image",
        "num": 5,
        "safe": "high",
        "imgType": "photo",
        "imgSize": "large",
        "fileType": "jpg",
        "filter": "1"
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        for item in data.get("items", []):
            image_url = item.get("link")
            if not image_url:
                continue
            if is_blacklisted(image_url):
                continue

            # Remove crop/query strings from URL
            cleaned_url = clean_url(image_url)

            # Try a HEAD request to check if image loads
            if is_valid_image_url(cleaned_url):
                return cleaned_url

        # ✅ Fallback image (generic placeholder)
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"

    except Exception as e:
        print("Error fetching from Google:", e)
        # ✅ Return fallback image even if API fails
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
