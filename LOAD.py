import torch
import clip
from PIL import Image
import os
import numpy as np
import pickle

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

def load_database(image_folder="dataset"):
    image_embeddings = {}
    image_count = 0
    
    for root, _, files in os.walk(image_folder):  
        for filename in files:
            if filename.lower().endswith((".png", ".jpg", ".jpeg")): 
                image_path = os.path.join(root, filename)
                print(f"Processing: {image_path}")
                
                try:
                    image = Image.open(image_path).convert("RGB")
                    image_input = preprocess(image).unsqueeze(0).to(device)

                    with torch.no_grad():
                        image_features = model.encode_image(image_input)
                        image_features /= image_features.norm(dim=-1, keepdim=True)

                    if image_features is None:
                        print(f"Error: image_features is None for {image_path}")
                        continue
                    
                    image_embeddings[image_path] = image_features.cpu().numpy()
                    image_count += 1
                
                except Exception as e:
                    print(f"Error processing {image_path}: {e}")
    
    if image_embeddings:
        print(f"Total images processed: {image_count}")
        with open("image_embeddings.pkl", "wb") as f:
            pickle.dump(image_embeddings, f)
        print("Pickle file saved successfully.")
    else:
        print("No images processed. Check dataset path and formats.")

if __name__ == "__main__":
    load_database()
