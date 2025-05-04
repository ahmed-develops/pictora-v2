import os
import torch
import clip
from PIL import Image
import faiss
import numpy as np

# Load CLIP Model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
