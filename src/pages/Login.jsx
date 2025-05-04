import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Log in to Your Account</h2>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 bg-white border border-gray-300 shadow-sm px-5 py-3 rounded-lg w-full text-gray-700 font-medium hover:bg-gray-50 transition-all mb-4"
        >
          <span className="text-2xl"><img src="src/assets/google_logo.svg" alt="Google logo" className="w-6 h-6" />
          </span> {/* Replace with your Google Icon */}
          <span>Sign in with Google</span>
        </motion.button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative text-sm text-gray-500 bg-white px-2 inline-block">or</div>
        </div>

        {/* Email & Password Login Form */}
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition-all"
          >
            Log In
          </motion.button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-gray-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
