from flask import Flask, request, jsonify
from pathlib import Path
import os
from dotenv import load_dotenv
import io
from PIL import Image
import google.generativeai as PictoraAPI
from SEARCH import search_image
from flask_cors import CORS
from GOOGLE import search_google_image

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/v2/pictora/respond-to-prompt", methods=["POST"])
def generate_response_on_user_prompt():
    try:
        prompt = request.form.get("prompt")
        # mode = request.form.get("mode")
        image = request.files.get("image")
        print(image)

        # if mode == "tti":
        if image is None:
        #     print('Prompt sent by the user: ', prompt)
        #     if not prompt:
        #         return jsonify({"error": "Prompt text is required"}), 400

        #     image_path = search_image(prompt)

        #     if not image_path:
        #         return jsonify({"error": "No matching image found"}), 404

        #     if isinstance(image_path, str) and image_path.startswith("http"):
        #         return jsonify({"image_url": image_path})

        #     image_url = f"/static/retrieved_images/{Path(image_path).name}"
        #     return jsonify({"image_url": image_url})
            if not prompt:
                return jsonify({"error": "No search term provided"}), 400

            image_url = search_google_image(prompt)

            if not image_url:
                return jsonify({"error": "No image found"}), 404

            return jsonify({"image_url": image_url})
        else:
            # [NOTE] You should load this from environment securely
            PictoraAPI.configure(api_key=os.getenv("PICTORA_API_KEY"))
            model = PictoraAPI.GenerativeModel(os.getenv("PICTORA_MODEL"))

            if image is None or image.filename == "":
                return jsonify({"error": "No image uploaded"}), 400

            image_bytes = image.read()
            pil_image = Image.open(io.BytesIO(image_bytes))

            response = model.generate_content([prompt, pil_image])
            return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
