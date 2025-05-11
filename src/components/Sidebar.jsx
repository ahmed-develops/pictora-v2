import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home, MessageCircle, Settings, ChevronRight, User } from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { to: "/", label: "Home", icon: Home },
    { to: "/login", label: "Chat", icon: MessageCircle },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 fixed top-4 left-4 bg-purple-900 text-white rounded-full shadow-lg z-50 hover:bg-purple-700 transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen fixed left-0 top-0 pt-16 pb-6 px-4 shadow-xl z-40 border-r border-white/10
        transition-all duration-300 ease-in-out flex flex-col w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo Area */}
        <div className="flex items-center mb-8 px-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
            <div className="w-6 h-6 rounded-full bg-purple-600"></div>
          </div>
          <div className="ml-3">
            <h1 className="font-bold text-xl text-white">Pictora.ai</h1>
            <p className="text-xs text-purple-200 opacity-80">Dashboard</p>
          </div>
        </div>
        
        {/* Section Title */}
        <div className="px-4 mb-2">
          <h2 className="text-xs font-semibold text-purple-200 uppercase tracking-wider">Navigation</h2>
        </div>
        
        {/* Sidebar Links */}
        <ul className="space-y-1 flex flex-col mb-6">
          {routes.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setIsOpen(false)} // Close sidebar when navigating on mobile
                  className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 w-full text-left
                  ${isActive
                      ? "bg-white text-purple-900 font-medium shadow-sm"
                      : "text-white/90 hover:bg-white/10"
                    }`}
                >
                  <Icon size={20} className={`flex-shrink-0 ${isActive ? "text-purple-600" : "text-purple-300"}`} />
                  <span className="whitespace-nowrap">
                    {label}
                  </span>
                  
                  {isActive && (
                    <ChevronRight size={16} className="ml-auto" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;