from flask import Flask, request, jsonify
# from pathlib import Path
import os
from dotenv import load_dotenv
import io
from PIL import Image
import google.generativeai as PictoraAPI
# from SEARCH import search_image
from flask_cors import CORS
from GOOGLE import search_google_image
from pymongo import MongoClient
from werkzeug import Request
Request.max_form_parts = 5000 # or whatever your max form size!
import markdown2

load_dotenv()

pictora = Flask(__name__)

# CORS(pictora, origins=["http://localhost:5173"],)
# CORS(pictora, resources={r"/*": {"origins": "*"}})
CORS(pictora, resources={r"/v2/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

client = MongoClient(os.getenv("MONGODB_URI"))
db = client['pictora']

def format_response(text):
    """Format the response with proper markdown styling"""
    # Convert markdown to HTML
    html = markdown2.markdown(text)
    
    # Add custom styling
    styled_html = f"""
    <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #e2e8f0;
        line-height: 1.6;
    ">
        {html}
    </div>
    """
    return styled_html

@pictora.route("/v2/pictora/respond-to-prompt", methods=["POST"])
def generate_response_on_user_prompt():
    try:
        prompt = request.form.get("prompt")
        image = request.files.get("image")

        if image is None:
            print("Image is None:", image)
            if not prompt:
                return jsonify({"error": "No search term provided"}), 400

            image_url = search_google_image(prompt)

            if not image_url:
                return jsonify({"error": "No image found"}), 404

            return jsonify({"image_url": image_url})
        else:
            PictoraAPI.configure(api_key=os.getenv("PICTORA_API_KEY"))
            model = PictoraAPI.GenerativeModel(os.getenv("PICTORA_MODEL"))

            if image is None or image.filename == "":
                return jsonify({"error": "No image uploaded"}), 400

            image_bytes = image.read()
            pil_image = Image.open(io.BytesIO(image_bytes))
            formatted_prompt = f"""
            Analyze this image and provide a detailed response to: {prompt}
            
            Format your response with:
            - Clear headings in **bold**
            - Proper paragraph breaks
            - Bullet points for lists
            - Emphasis on important terms
            - Well-structured markdown formatting
            
            Ensure the response is:
            - Comprehensive but concise
            - Well-organized
            - Easy to read
            - Visually appealing when rendered
            """
            
            response = model.generate_content([formatted_prompt, pil_image])
            formatted_response = format_response(response.text)
            return jsonify({"response": formatted_response})
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@pictora.route("/v2/pictora/login", methods=["POST"])
def login_process():   
    try:
        collection = db['users']
        
        username = request.form.get("username")
        password = request.form.get("password")

        if not username or not password:
            return jsonify({"error": "Username or password not provided"}), 400

        user_data_list = list(collection.find({"username": username,
                                               "password": password}, {"_id": 0}))
        
        if not user_data_list:
            return jsonify({"status": False})
        
        return jsonify({"status": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@pictora.route("/v2/pictora/register", methods=["POST"])
def register_user():
    try:
        collection = db['users']

        # Get JSON data
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return jsonify({"status": False, "message": "All fields are required"}), 400

        # Check if user already exists
        if collection.find_one({"$or": [{"username": username}, {"email": email}]}):
            return jsonify({"status": False, "message": "Username or email already exists"}), 409

        # Save user to MongoDB
        collection.insert_one({
            "username": username,
            "email": email,
            "password": password  # In production, hash this!
        })

        return jsonify({"status": True, "message": "User registered successfully"}), 200

    except Exception as e:
        return jsonify({"status": False, "message": str(e)}), 500

@pictora.route("/v2/pictora/get-user", methods=["GET"])
def get_user_info():
    try:
        collection = db['users']
        username = request.args.get("username")

        if not username:
            return jsonify({"status": False, "message": "Username is required"}), 400

        user = collection.find_one({"username": username}, {"_id": 0, "username": 1, "email": 1})
        if not user:
            return jsonify({"status": False, "message": "User not found"}), 404

        return jsonify({"status": True, "user": user})
    except Exception as e:
        return jsonify({"status": False, "message": str(e)}), 500


if __name__ == "__main__":
    pictora.run(debug=True)