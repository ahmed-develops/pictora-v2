import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim whitespace from the fields
    const { username, email, password } = formData;
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Client-side validation
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      console.log({ username: trimmedUsername, email: trimmedEmail, password: trimmedPassword });  // Log data for debugging

      // Send the data to the backend
      const response = await fetch("http://127.0.0.1:5000/v2/pictora/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: trimmedUsername,
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful! Please verify your email.");
      navigate("/login");
    } catch (err) {
      alert(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  const calculateParallax = (strength = 20) => {
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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30 z-0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className={`w-full max-w-md transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6 relative text-center">
            <div className={`inline-block relative transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <svg viewBox="0 0 60 60" className="w-16 h-16 mx-auto mb-4">
                <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="157" strokeDashoffset={isLoaded ? "0" : "157"} style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }} />
                <path d="M20,30 L28,38 L40,22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="30" strokeDashoffset={isLoaded ? "0" : "30"} strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke-dashoffset 0.8s ease-in-out 0.8s" }} />
              </svg>
            </div>
          </div>

          <div className={`bg-gray-800/70 backdrop-filter backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Create an{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Account</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all font-semibold"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="text-sm mt-4 text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
