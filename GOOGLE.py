import requests
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("API_KEY")
CSE_ID = os.getenv("CSE_ID")

def search_google_image(query):
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "q": f"{query} photo",  # Add 'photo' to bias toward natural, general photos
        "key": API_KEY,
        "cx": CSE_ID,
        "searchType": "image",
        "num": 1,
        "safe": "high",         # 'high' instead of 'active' to enforce more reliable sources
        # "imgType": "photo",     # Biases the result toward actual photos
        "imgSize": "large",    # Avoids thumbnails or gigantic images (more reliable)
        "fileType": "jpg",      # Restricts to jpgs, which are most compatible
        "filter": "1"           # Filters out duplicate and low-quality results
    }

    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        if "items" in data and len(data["items"]) > 0:
            return data["items"][0]["link"]
        else:
            print("No image found in Google response.")
            return None
    else:
        print("Google API error:", response.text)
        return None
