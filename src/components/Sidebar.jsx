import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home, MessageCircle, Settings } from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { to: "/", label: "Home", icon: Home },
    { to: "/chat", label: "Chat", icon: MessageCircle },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 fixed top-4 left-4 bg-gray-800/70 backdrop-blur-md text-white rounded-full shadow-lg z-50 hover:bg-gray-700 transition-all"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar (Mobile only) */}
      {isOpen && (
        <>
          <div
            className="bg-gray-900/80 backdrop-blur-md text-white min-h-screen fixed left-0 top-0 pt-24 pb-6 px-6 shadow-xl z-40 border-r border-white/10
            transition-all duration-300 ease-in-out flex flex-col w-64"
          >
            {/* Sidebar Links */}
            <ul className="space-y-3 flex flex-col">
              {routes.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200
                      ${
                        location.pathname === to
                          ? "bg-gray-700 text-white font-bold shadow-md"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    onClick={() => setIsOpen(false)} // close sidebar on link click
                  >
                    <Icon size={24} className="flex-shrink-0" />
                    <span className="transition-all duration-300">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </>
  );
}

export default Sidebar;
