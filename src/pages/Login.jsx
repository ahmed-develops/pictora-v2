import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const login = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch("http://127.0.0.1:5000/v2/pictora/login", {
      method: "POST",
      body: formData,
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data.status) {
          toast.success("Login successful! Redirecting to chat...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          localStorage.setItem("username", username);
          setTimeout(() => {
            navigate("/chat");
          }, 3000); // Redirect after the toast disappears
        } else {
          toast.error("Login failed. Invalid credentials.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        }
      })
      .catch((err) => toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      }));
  };

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

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className={`w-full max-w-md transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 relative text-center">
            <div className={`inline-block relative transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="relative z-10">
                <svg viewBox="0 0 60 60" className="w-16 h-16 mx-auto mb-6">
                  <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="157" strokeDashoffset={isLoaded ? "0" : "157"} style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }} />
                  <path d="M20,30 L28,38 L40,22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="30" strokeDashoffset={isLoaded ? "0" : "30"} strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke-dashoffset 0.8s ease-in-out 0.8s" }} />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-lg opacity-30 scale-110 animate-pulse" />
            </div>
          </div>

          {/* Login Card */}
          <div className={`bg-gray-800/70 backdrop-filter backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Welcome to{" "}
              <span className={`relative inline-block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Pictora
              </span>
            </h1>

            <form onSubmit={login} className={`transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="mb-4">
                <div className="group relative">
                  <input
                    type="text"
                    className="w-full bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="group relative">
                  <input
                    type="password"
                    className="w-full bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-lg w-full"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-pink-500 group-hover:to-purple-500 transition-all duration-500 animate-gradient-x"></span>
                <span className="relative rounded-md bg-gray-800 px-6 py-3 transition-all duration-200 ease-out group-hover:bg-opacity-80 w-full text-center">
                  Login
                </span>
              </button>
            </form>

            {/* Signup link */}
            <p className={`mt-6 text-center text-gray-400 transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                Sign up
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className={`mt-8 text-center text-gray-500 text-sm transition-all duration-1000 delay-1400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">
              Back to Home
            </Link>
            {" · "}
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
              About
            </Link>
          </p>
        </div>
      </div>

      {/* ToastContainer for react-toastify */}
      <ToastContainer />
    </div>
  );
}
