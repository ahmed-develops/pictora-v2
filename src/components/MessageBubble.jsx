function MessageBubble({ text, sender }) {
    return (
      <div
        className={`p-3 max-w-xs rounded-lg ${
          sender === "self"
            ? "bg-blue-500 ml-auto text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        {text}
      </div>
    );
  }
  
  export default MessageBubble;
  