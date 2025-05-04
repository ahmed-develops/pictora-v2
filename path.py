# import os
# print(os.path.exists("dataset/animals"))  
# print(os.listdir("dataset/animals"))  


# import os

# image_folder = "dataset/animals"

# for root, _, files in os.walk(image_folder):
#     print(f"Folder: {root} -> {len(files)} images found")

import pickle

test_data = {"test": "data"}
with open("test.pkl", "wb") as f:
    pickle.dump(test_data, f)

print("Pickle file created successfully.")
