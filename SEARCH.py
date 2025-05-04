import pickle
import torch
import clip
import numpy as np
import os
import requests
from dotenv import load_dotenv

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

try:
    with open("image_embeddings.pkl", "rb") as f:
        image_embeddings = pickle.load(f)
    print("Loaded image embeddings successfully!")
except Exception as e:
    print(f"Error loading image embeddings: {e}")
    image_embeddings = {}

UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")

def search_image(query):
    """Find the best matching image for a text query (local or web)."""
    if not image_embeddings:
        print("No embeddings found. Searching online...")
        return fetch_unsplash_image(query)

    try:
        text_input = clip.tokenize([query]).to(device)
        with torch.no_grad():
            text_features = model.encode_text(text_input)
            text_features /= text_features.norm(dim=-1, keepdim=True)

        similarities = {}
        for image_path, image_features in image_embeddings.items():
            similarity = np.dot(text_features.cpu().numpy(), image_features.T)
            similarities[image_path] = similarity

        best_match = max(similarities, key=similarities.get)
        best_score = similarities[best_match]

        print(f"Best local match: {best_match} (Confidence: {best_score})")

        if best_score < 0.25:
            print(f"Low confidence ({best_score}), fetching from Unsplash instead...")
            return fetch_unsplash_image(query)

        return best_match

    except Exception as e:
        print(f"Error during search: {e}")
        return fetch_unsplash_image(query)

def fetch_unsplash_image(query):
    """Fetch an image from Unsplash API based on user query."""
    url = f"https://api.unsplash.com/search/photos?query={query}&client_id={UNSPLASH_ACCESS_KEY}&per_page=1"

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data["results"]:
            print("Fetched image from Unsplash!")
            return data["results"][0]["urls"]["regular"]

    print("No image found on Unsplash.")
    return None
