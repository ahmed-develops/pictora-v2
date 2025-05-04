import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-lg fixed top-0 w-full z-50 border-b border-white/10">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Pictora Logo"
          className="h-14 w-14 object-cover rounded-full"
        />
        <Link
          to="/"
          className="text-2xl font-semibold text-white hover:text-gray-300 transition-all"
        >
          Pictora
        </Link>
      </div>

      {/* Navbar Title */}
      <h1 className="text-lg hidden sm:block text-gray-300">
        Where every image tells a story
      </h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-gray-800/60 text-white rounded-lg shadow-md hover:bg-gray-700 transition-all active:scale-95"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
