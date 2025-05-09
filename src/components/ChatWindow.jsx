import { useState, useEffect, useRef } from "react";
import { Send, ImageIcon, X, ChevronDown } from "lucide-react"; // Modern icons

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("CLIP Vision");
  const [selectedAction, setSelectedAction] = useState("text-to-image");
  const [uploadedImage, setUploadedImage] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const formData = new FormData();

  const sendMessage = async () => {
    if (!input.trim() && !uploadedImage) return;
  
    const userMessage = {
      role: "user",
      content: input,
      image: uploadedImage,
    };
  
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setUploadedImage(null);
  
    formData.append("prompt", input);
    if (uploadedImage) {
      formData.append("image", uploadedImage);  // Ensure you're sending the file object here
    }
  
    // Add placeholder message
    const loadingMessage = {
      role: "ai",
      content: "Please wait while I generate response for your prompt.",
    };
  
    // Temporarily append loading message and store its index
    setMessages((prev) => [...prev, loadingMessage]);
    const loadingIndex = updatedMessages.length; // last one
  
    try {
      const req = await fetch(
        "http://127.0.0.1:5000/v2/pictora/respond-to-prompt",
        {
          method: "POST",
          body: formData,
        }
      );
  
      const res = await req.json();
      console.log(res);
  
      // Prepare actual message
      const responseMessage = {
        role: "ai",
        content: res.image_url
          ? `${res.image_url}`
          : res.response || res.error || "Something went wrong.",
      };
  
      // Replace the loading message
      setMessages((prev) => {
        const updated = [...prev];
        updated[loadingIndex] = responseMessage;
        return updated;
      });
    } catch (err) {
      console.error(err);
      const errorMessage = {
        role: "ai",
        content: "Something went wrong.",
      };
      setMessages((prev) => {
        const updated = [...prev];
        updated[loadingIndex] = errorMessage;
        return updated;
      });
    }
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);  // Store the file object directly
    }
  };
  
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 items-center justify-center p-4">
      {/* Chat Container */}
      <div className="w-full max-w-4xl h-[85vh] rounded-xl overflow-hidden shadow-xl flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {/* Chat Header */}
        <div className="p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold">Pictora Bot</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500 dark:text-slate-400">Model:</span>
            <span className="font-medium">{selectedModel}</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 dark:text-slate-500">
              <div className="w-12 h-12 rounded-full bg-gray/10 flex items-center justify-center mb-4">
                <ChevronDown className="h-6 w-6 text-gray" />
              </div>
              <p className="mb-2">No messages yet</p>
              <p className="text-sm">
                Select a model and action type, then start chatting
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === "user"
                      ? "bg-gray-500 text-white" // User messages: Blue background, white text
                      : "bg-slate-100 dark:bg-slate-700 text-black dark:text-white" // AI messages
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {msg.role === "ai" && (
                      <div className="h-8 w-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs font-semibold">
                        PV
                      </div>
                    )}
                    <div className="space-y-2">
                      {msg.image && (
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(msg.image)}
                            alt="Uploaded"
                            className="max-w-full max-h-64 object-contain rounded-lg"
                          />
                        </div>
                      )}
                      {msg.content?.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i) ? (
  <img
    src={msg.content} // Assuming msg.content is a URL to the image
    alt="Generated"
    className="max-w-full max-h-64 object-contain rounded-lg"
  />
) : (
  <div className="text-sm">{msg.content}</div>
)}
                    </div>
                    {msg.role === "user" && (
                      <div className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-semibold">
                        You
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input and Options */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-4">
          {/* Model & Action Selection */}
          {/* <div className="flex gap-3">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="flex-1 p-2.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg outline-none border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-gray/50 transition-all"
            >
              <option value="CLIP">CLIP</option>
              <option value="DeepSeek">DeepSeek</option>
              <option value="My Model">My Model</option>
            </select>

            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="flex-1 p-2.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg outline-none border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-gray/50 transition-all"
            >
              <option value="text-to-image">Text to Image</option>
              <option value="image-to-text">Image to Text</option>
              <option value="image-to-image">Image to Image</option>
            </select>
          </div> */}

          {/* Input & Send Button */}
          {/* Input, Upload & Send Button */}
<div className="flex items-center gap-3 relative">
  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    ref={fileInputRef}
    onChange={handleImageUpload}
  />

  {/* Upload Image Button */}
  <button
    onClick={() => fileInputRef.current?.click()}
    className="p-3 bg-gray-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-slate-600 transition-all"
    title="Upload Image"
  >
    <ImageIcon size={20} />
  </button>

  {/* Input Field */}
  <input
    type="text"
    className="flex-1 p-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg outline-none border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-gray/50 transition-all"
    placeholder="Type a message..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyDown}
  />

  {/* Send Button */}
  <button
    onClick={sendMessage}
    className="px-5 py-3 bg-gray-800 text-white rounded-lg shadow-md flex items-center gap-2 hover:bg-gray-700 transition-all active:scale-95"
  >
    <Send size={18} /> Send
  </button>
</div>

{/* Preview of Uploaded Image */}
{uploadedImage && (
  <div className="mt-2 relative max-w-xs">
    <img src={URL.createObjectURL(uploadedImage)} />

    <button
      onClick={clearUploadedImage}
      className="absolute top-1 right-1 p-1 rounded-full bg-white dark:bg-slate-900 border dark:border-slate-600 shadow hover:bg-red-500 hover:text-white transition-all"
      title="Remove image"
    >
      <X size={16} />
    </button>
  </div>
)}

        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
