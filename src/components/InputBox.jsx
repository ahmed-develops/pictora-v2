import { useState, useRef } from "react";
import { Send, Image, X, Loader } from "lucide-react";

function InputBox() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Send Message with Image
  const sendMessage = async () => {
    if (!message.trim() && !image) return; // Prevent empty submissions

    setIsUploading(true);
    
    // Simulate Firebase upload with timeout
    setTimeout(() => {
      // Reset fields
      setMessage("");
      setImage(null);
      setImagePreview(null);
      setIsUploading(false);
      
      console.log("Message sent:", {
        text: message,
        image: image ? image.name : null,
        timestamp: new Date()
      });
    }, 1500);
  };

  // Clear selected image
  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle key press (Enter to send)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4 bg-purple-50 border-t border-purple-200 rounded-b-2xl shadow-md transition-all duration-300">
      {/* Image Preview (If Selected) */}
      {imagePreview && (
        <div className="mb-3 flex justify-start">
          <div className="relative rounded-lg overflow-hidden shadow-md border border-purple-200 bg-white p-1 transition-all duration-300 transform hover:scale-[1.02]">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="h-24 object-cover rounded-md"
            />
            <button
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-all duration-200 transform hover:scale-110 border border-purple-100"
              onClick={clearImage}
              aria-label="Remove image"
            >
              <X size={16} className="text-red-500" />
            </button>
          </div>
        </div>
      )}

      {/* Input Container */}
      <div className="flex items-center gap-3 relative">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Upload Image Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm"
          disabled={isUploading}
          aria-label="Upload image"
        >
          <Image size={20} />
        </button>

        {/* Chat Input Field */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 bg-white text-gray-800 placeholder-purple-300 rounded-lg outline-none border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 shadow-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isUploading}
        />

        {/* Send Button */}
        <button
          className={`px-5 py-3 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            isUploading || (!message.trim() && !image)
              ? "bg-purple-300 text-purple-100 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
          onClick={sendMessage}
          disabled={isUploading || (!message.trim() && !image)}
        >
          {isUploading ? (
            <>
              <Loader size={18} className="animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Send</span>
            </>
          )}
        </button>
      </div>

      {/* Upload Status Indicator */}
      {isUploading && (
        <div className="mt-2 flex items-center justify-center">
          <div className="h-1 bg-purple-100 rounded-full w-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
        </div>
      )}
    </div>
  );
}

// Demo component showing the input box in context
export default function InputBoxDemo() {
  return (
    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-hidden border border-purple-100">
      {/* Messages Container - Just for demo context */}
      <div className="bg-white p-4 max-h-96 overflow-y-auto">
        <div className="text-center text-purple-300 py-8">
          <p className="text-sm">Your messages will appear here</p>
        </div>
      </div>
      
      {/* Our enhanced input box */}
      <InputBox />
    </div>
  );
}