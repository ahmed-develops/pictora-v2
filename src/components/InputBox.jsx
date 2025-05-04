import { useState } from "react";
import { db, auth, storage } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Send, Image as ImageIcon, X } from "lucide-react"; // Icons for better UI

function InputBox() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Send Message with Image
  const sendMessage = async () => {
    if (!message.trim() && !image) return; // Prevent empty submissions

    setIsUploading(true);
    let imageUrl = null;

    try {
      // If an image is uploaded, store it in Firebase Storage
      if (image) {
        const imageRef = ref(storage, `messages/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Save message to Firestore
      await addDoc(collection(db, "messages"), {
        text: message,
        imageUrl, // Store image URL if available
        sender: auth.currentUser ? auth.currentUser.uid : "guest",
        timestamp: serverTimestamp(),
      });

      // Reset fields
      setMessage("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white/10 border-t border-white/20 backdrop-blur-lg flex flex-col gap-3 rounded-b-2xl shadow-md">
      {/* Image Preview (If Selected) */}
      {imagePreview && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          <button
            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black"
            onClick={() => {
              setImage(null);
              setImagePreview(null);
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Chat Input & Upload Button */}
      <div className="flex items-center gap-3">
        {/* Upload Image Button */}
        <label className="cursor-pointer flex items-center gap-2 p-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all">
          <ImageIcon size={20} />
          <span>Upload</span>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        {/* Chat Input Field */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 bg-white/10 text-white placeholder-gray-400 rounded-lg outline-none border border-white/20 focus:ring-2 focus:ring-[var(--secondary)] transition-all"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Send Button */}
        <button
          className={`ml-3 px-5 py-3 rounded-full shadow-md flex items-center gap-2 transition-all active:scale-95 
    ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700 text-white"}
  `}
          onClick={sendMessage}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : <><Send size={20} /> Send</>}
        </button>

      </div>
    </div>
  );
}

export default InputBox;
