import { useState, useEffect, useRef } from "react";
import { Send, ImageIcon, X, Sparkles } from "lucide-react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const formData = new FormData();

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateParallax = (strength = 20) => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    const x = (window.innerWidth / 2 - mousePosition.x) / strength;
    const y = (window.innerHeight / 2 - mousePosition.y) / strength;
    return { x, y };
  };

  const parallax = calculateParallax();

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
      formData.append("image", uploadedImage);
    }

    // Add placeholder message
    const loadingMessage = {
      role: "ai",
      content: "Generating your vision...",
      isLoading: true
    };

    // Temporarily append loading message and store its index
    setMessages((prev) => [...prev, loadingMessage]);
    const loadingIndex = updatedMessages.length;

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
        content: "Sorry, I couldn't process your request.",
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
      setUploadedImage(file);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative">
      {/* Animated background gradient circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20"
          style={{
            transform: `translate(${parallax.x * 2}px, ${parallax.y * 2}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20"
          style={{
            transform: `translate(${-parallax.x * 2}px, ${-parallax.y * 2}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-10"
          style={{
            transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 z-0"></div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        {/* Chat Container */}
        <div className={`w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl border border-gray-700 bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-md flex flex-col transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Chat Header */}
          <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center relative z-10">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-md opacity-50 scale-110 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Pictora</h2>
                <p className="text-xs text-gray-400">AI Vision Assistant</p>
              </div>
            </div>

            {/* Options Button - Optional */}
            <button
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              onClick={() => {
                window.location.href = "/settings"; // Redirect to the /settings page
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>

          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-6 bg-gray-800 bg-opacity-30">
            {messages.length === 0 ? (
              <div className={`h-full flex flex-col items-center justify-center text-center p-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center mb-6 animate-gradient-x relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full filter blur-md opacity-50 scale-110 animate-pulse"></div>
                  <Sparkles className="h-10 w-10 text-white relative z-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Welcome to Pictora</h3>
                <p className="text-gray-300 max-w-md leading-relaxed">
                  Where every image tells a story. Send a message or upload an image to start creating with our AI-powered visual assistant.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                    } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transition: 'all 0.5s ease', transitionDelay: `${0.1 * index}s` }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/20"
                        : "bg-gray-800 border border-gray-700 text-white shadow-lg shadow-blue-900/10"
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      {msg.role === "ai" && (
                        <div className="relative">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center relative z-10">
                            <Sparkles size={16} className="text-white" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full filter blur-sm opacity-50 scale-110"></div>
                        </div>
                      )}
                      <div className="space-y-3">
                        {msg.image && (
                          <div className="relative rounded-lg overflow-hidden">
                            <img
                              src={URL.createObjectURL(msg.image)}
                              alt="Uploaded"
                              className="max-w-full max-h-64 object-contain rounded-lg"
                            />
                          </div>
                        )}
                        {msg.isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="text-sm">{msg.content}</div>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></div>
                              <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-150"></div>
                              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-300"></div>
                            </div>
                          </div>
                        ) : msg.content?.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i) ? (
                          <img
                            src={msg.content}
                            alt="Generated"
                            className="max-w-full max-h-64 object-contain rounded-lg"
                          />
                        ) : (
                          <div className="text-sm">{msg.content}</div>
                        )}
                      </div>
                      {msg.role === "user" && (
                        <div className="relative">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white flex items-center justify-center text-xs font-semibold relative z-10">
                            You
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-500 rounded-full filter blur-sm opacity-50 scale-110"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            {/* Preview of Uploaded Image */}
            {uploadedImage && (
              <div className="mb-3 relative inline-block">
                <div className="rounded-lg overflow-hidden border border-gray-700">
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Upload preview"
                    className="max-h-20 object-cover"
                  />
                </div>
                <button
                  onClick={clearUploadedImage}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-gray-800 border border-gray-700 shadow hover:bg-red-900 hover:border-red-700 transition-all"
                  title="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Input & Send Button */}
            <div className="flex items-center gap-2 relative">
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
                className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all"
                title="Upload Image"
              >
                <ImageIcon size={20} />
              </button>

              {/* Input Field */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full py-3 px-4 bg-gray-700 text-white placeholder-gray-400 rounded-full outline-none border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="Describe what you want to see..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-focus-within:opacity-30 filter blur-md transition-opacity"></div>
              </div>

              {/* Send Button */}
              <button
                onClick={sendMessage}
                disabled={!input.trim() && !uploadedImage}
                className={`p-3 rounded-full flex items-center justify-center ${!input.trim() && !uploadedImage
                    ? "bg-gray-700 text-gray-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                  } transition-all active:scale-95`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;