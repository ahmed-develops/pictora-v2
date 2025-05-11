import { User, Sparkles } from "lucide-react";

function MessageBubble({ text, sender, timestamp, image }) {
  // Determine style classes based on sender
  const containerClasses = sender === "self" 
    ? "flex justify-end mb-4" 
    : "flex justify-start mb-4";
  
  const bubbleClasses = sender === "self"
    ? "bg-purple-600 text-white rounded-2xl rounded-tr-none shadow-sm max-w-xs lg:max-w-md"
    : "bg-purple-100 text-gray-800 rounded-2xl rounded-tl-none border border-purple-200 shadow-sm max-w-xs lg:max-w-md";
  
  // Format timestamp if available
  const formattedTime = timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Determine if the text is an image URL
  const isImageUrl = text?.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i);
  
  return (
    <div className={containerClasses}>
      {sender !== "self" && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center mr-2">
          <Sparkles size={16} />
        </div>
      )}
      
      <div className={`${bubbleClasses} p-3 transform transition-all duration-200 hover:shadow-md`}>
        {/* Display uploaded image if it exists */}
        {image && (
          <div className="mb-2 rounded-lg overflow-hidden">
            <img 
              src={URL.createObjectURL(image)} 
              alt="Uploaded" 
              className="max-w-full rounded-lg"
            />
          </div>
        )}
        
        {/* Display content as image or text */}
        {isImageUrl ? (
          <img 
            src={text} 
            alt="Content" 
            className="max-w-full rounded-lg"
          />
        ) : (
          <p className="text-sm whitespace-pre-wrap">{text}</p>
        )}
        
        {/* Timestamp */}
        <div className="text-xs opacity-70 mt-1 text-right">
          {formattedTime}
        </div>
      </div>
      
      {sender === "self" && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-700 text-white flex items-center justify-center ml-2">
          <User size={16} />
        </div>
      )}
    </div>
  );
}

// Usage example
export default function MessageContainer() {
  const messages = [
    { text: "Hello! How can I help you today?", sender: "ai", timestamp: "10:45 AM" },
    { text: "I need an image of a mountain landscape", sender: "self", timestamp: "10:46 AM" },
    { text: "https://picsum.photos/seed/mountain/600/400", sender: "ai", timestamp: "10:47 AM" },
    { text: "Thank you, that looks amazing!", sender: "self", timestamp: "10:48 AM" }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-purple-800 font-bold text-xl mb-6">Message Preview</h2>
      
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble 
            key={index}
            text={msg.text}
            sender={msg.sender === "self" ? "self" : "ai"}
            timestamp={msg.timestamp}
          />
        ))}
      </div>
    </div>
  );
}