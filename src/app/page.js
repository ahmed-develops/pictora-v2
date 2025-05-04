"use client";

import React, { useState } from "react";
import { Send, Paperclip, Camera, Link } from "lucide-react";
import { useRouter } from "next/navigation";

const ModelComparison = () => {
  const router = useRouter();

  const imageToTextModels = [
    { name: "Pictora Vision", endpoint: "http://localhost:8000/generate-pictora-response/" },
    { name: "CLIP", endpoint: "http://localhost:8000/generate-clip-response/" },
    { name: "Janus Pro", endpoint: "http://localhost:8000/generate-janus-response" }
  ];

  const [prompt, setPrompt] = useState("");
  const [imageCount, setImageCount] = useState(0);
  const [chats, setChats] = useState([[], [], []]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim() && !selectedImage) return;

    let imageUrl = null;
    if (selectedImage) {
      imageUrl = URL.createObjectURL(selectedImage);
    }

    imageToTextModels.forEach(async (model, modelIndex) => {
      const formData = new FormData();

      if (model.name === "Pictora Vision" || model.name === "CLIP") {
        formData.append("api_key", "AIzaSyAjJuSJjXpuCaWdU7HBsszxrmWjjZ8rHC4");
        formData.append("text_prompt", prompt);
        if (selectedImage) {
          formData.append("image", selectedImage);
        }
      } else {
        formData.append("question", prompt);
        if (selectedImage) {
          formData.append("file", selectedImage);
        }
      }

      try {
        const response = await fetch(model.endpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let accumulatedResponse = "";
        let words = [];

        setChats((prevChats) =>
          prevChats.map((chat, index) =>
            index === modelIndex
              ? [
                ...chat,
                { user: "You", text: prompt, image: imageUrl },
                { user: model.name, text: "Please wait, your response is being generated." },
              ]
              : chat
          )
        );

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          accumulatedResponse += decoder.decode(value, { stream: true });

          try {
            const parsedResponse = JSON.parse(accumulatedResponse);
            const formattedText = parsedResponse.response
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
              .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italics
              .replace(/\n/g, "<br>"); // New lines

            setChats((prevChats) =>
              prevChats.map((chat, index) =>
                index === modelIndex
                  ? chat.map((msg, j) =>
                    j === chat.length - 1 ? { ...msg, text: formattedText } : msg
                  )
                  : chat
              )
            );
          } catch (error) {
            console.error("Error parsing JSON response:", error);
          }
        }
      } catch (error) {
        console.error(`Error fetching response for ${model.name}:`, error);
      }
    });

    handleRemoveImage();
    setPrompt("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageCount(0);

    document.getElementById("imageUpload").value = "";
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedImage(files[0]);
      setImageCount(1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">Model Comparison</h1>
        <button
          onClick={() => router.push('/to-image')}
          className="relative px-6 py-3 font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Text to Image
          <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">&nbsp;→</span>

        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {imageToTextModels.map((model, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-[calc(90vh-140px)] overflow-auto"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">{model.name}</h2>
              <div className="flex-grow bg-gray-50 p-3 rounded-md h-full overflow-auto border border-gray-300">
                {chats[index].map((chat, i) => (
                  <div key={i} className={`mb-2 p-2 rounded-md ${chat.user === "You" ? "bg-blue-100 text-right" : "bg-gray-200"}`}>
                    <strong>{chat.user}: </strong>
                    {chat.user === model.name ? (
                      // Use dangerouslySetInnerHTML to render formatted response
                      <div dangerouslySetInnerHTML={{ __html: chat.text }} />
                    ) : (
                      chat.text
                    )}
                    {chat.image && <img src={chat.image} alt="Sent" className="mt-2 rounded-lg max-w-full h-auto" />}
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex items-center">
        <textarea
          className="flex-grow h-12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
          placeholder="Enter your prompt here"
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyPress}
        />
        <input type="file" id="imageUpload" onChange={handleFileChange} accept="image/*" className="hidden" />
        <label htmlFor="imageUpload" className="cursor-pointer p-2 relative">
          <Paperclip size={24} color="black" />
          {imageCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {imageCount}
            </span>
          )}
        </label>
        <input type="file" id="imageUpload" onChange={handleFileChange} accept="image/*" className="hidden" />

        {/* Show remove button if an image is selected */}
        {selectedImage && (
          <button onClick={handleRemoveImage} className="ml-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300">
            ❌
          </button>
        )}
        <button className="text-blue-500 hover:text-blue-700 p-2" onClick={handleSendPrompt}>
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ModelComparison;
