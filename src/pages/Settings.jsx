import { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Bell,
  Settings as SettingsIcon
} from "lucide-react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [userInfo, setUserInfo] = useState({
    username: "Loading...",
    email: "Loading..."
  });

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) return;

        const res = await axios.get(
          `http://127.0.0.1:5000/v2/pictora/get-user`,
          {
            params: { username },
            withCredentials: true
          }
        );
        if (res.data.status && res.data.user) {
          setUserInfo(res.data.user);
        }

      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const calculateParallax = (strength = 20) => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    const x = (window.innerWidth / 2 - mousePosition.x) / strength;
    const y = (window.innerHeight / 2 - mousePosition.y) / strength;
    return { x, y };
  };

  const parallax = calculateParallax();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20"
          style={{
            transform: `translate(${parallax.x * 2}px, ${parallax.y * 2}px)`,
            transition: "transform 0.1s ease-out"
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20"
          style={{
            transform: `translate(${-parallax.x * 2}px, ${-parallax.y * 2}px)`,
            transition: "transform 0.1s ease-out"
          }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-10"
          style={{
            transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)`,
            transition: "transform 0.1s ease-out"
          }}
        />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div
          className={`w-full max-w-2xl transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="w-full bg-gray-800 bg-opacity-70 rounded-2xl p-6 shadow-xl border border-gray-700">
            <div className="w-full p-4 border-b border-gray-700 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-white">Settings</h1>
                  <p className="text-gray-400 text-xs">
                    Customize your Pictora AI experience
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <SettingsIcon size={16} className="text-white" />
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-700">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <User size={24} className="text-gray-300" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {userInfo ? userInfo.username : "Loading..."}
                </h3>
                <p className="text-sm text-gray-400">{userInfo ? userInfo.email : ""}</p>
              </div>
            </div>

            {/* Notification toggle */}
            <div className="group relative mb-6">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-between bg-gray-800 bg-opacity-70 p-4 rounded-xl border border-gray-700 group-hover:border-gray-600 transition-all duration-300">
                <div>
                  <span className="flex items-center gap-2 text-sm font-medium text-white">
                    <Bell
                      size={16}
                      className="text-pink-400 group-hover:text-white transition-colors"
                    />
                    Notifications
                  </span>
                  <p className="text-xs text-gray-400 mt-0.5 pl-6 group-hover:text-gray-300 transition-colors">
                    Receive updates and alerts
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-all ${notifications
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gray-700"
                    }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${notifications ? "translate-x-6" : "translate-x-0"
                      }`}
                  />
                </button>
              </div>
            </div>

            {/* Save / Cancel buttons */}
            <div>
              <button
                className="w-full p-3 relative group overflow-hidden rounded-xl"
                onClick={() => {
                  // Remove username from localStorage to log the user out
                  localStorage.removeItem("username");

                  // Redirect to the login page
                  window.location.href = "/login"; 
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500 animate-gradient-x"></span>
                <span className="relative font-medium text-white flex items-center justify-center">
                  Log Out
                </span>
              </button>

              <button className="w-full p-3 bg-transparent hover:bg-gray-700 border border-gray-700 text-gray-300 rounded-xl transition-colors text-sm font-medium mt-3">
                Cancel
              </button>
            </div>
          </div>

          <p
            className={`text-gray-500 text-xs mt-4 text-center transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100" : "opacity-0"
              }`}
          >
            Pictora AI v2.5.1
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
