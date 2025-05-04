import { useState } from "react";
import { Sun, Moon, User, Lock, Bell } from "lucide-react";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [selectedModel, setSelectedModel] = useState("CLIP");
  const [selectedAction, setSelectedAction] = useState("text-to-image");

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 py-12 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      
      {/* Settings Container */}
      <div className={`w-full max-w-3xl p-6 rounded-2xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"} mt-20`}>

        
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-8">Settings</h2>

        {/* User Profile Section */}
        <div className="flex flex-col items-center gap-4 border-b pb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-semibold shadow-md">
            <User size={42} />
          </div>
          <h3 className="text-lg font-semibold">Muhammad Shaheer</h3>
          <p className="text-sm text-gray-500">k213323@nu.edu.pk</p>
        </div>

        {/* Preferences */}
        <div className="mt-8 space-y-6">
          
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3 text-lg font-medium">
              {darkMode ? <Moon size={24} /> : <Sun size={24} />} Dark Mode
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition-all ${darkMode ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${darkMode ? "translate-x-7" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Notification Toggle */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3 text-lg font-medium">
              <Bell size={24} /> Notifications
            </span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition-all ${notifications ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${notifications ? "translate-x-7" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-lg font-medium mb-2">Select AI Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="CLIP">CLIP</option>
              <option value="DeepSeek">DeepSeek</option>
              <option value="My Model">My Model</option>
            </select>
          </div>

          {/* Action Selection */}
          <div>
            <label className="block text-lg font-medium mb-2">Select Action Type</label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="text-to-image">Text to Image</option>
              <option value="image-to-text">Image to Text</option>
              <option value="image-to-image">Image to Image</option>
            </select>
          </div>

          {/* Change Password */}
          <div className="mt-8">
            <button className="w-full p-4 bg-gray-800 text-white rounded-lg flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-md">
              <Lock size={24} /> Change Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;
