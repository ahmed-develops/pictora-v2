import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import textToImage from "../assets/text-format.png";
import imageToText from "../assets/image-gallery.png";
import imageToImage from "../assets/equal-rights.png";

function Home() {
  const titleWords = ["Pictora", "Chatbot"];

  const features = [
    {
      title: "Text to Image",
      description: "Generate stunning visuals from textual descriptions.",
      image: textToImage,
    },
    {
      title: "Image to Text",
      description: "Extract meaningful insights from images.",
      image: imageToText,
    },
    {
      title: "Image to Image",
      description: "Transform one image into another with AI.",
      image: imageToImage,
    },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900">
      <motion.div
        className="text-center max-w-2xl px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-extrabold mb-6 font-[Arial] text-gray-900 leading-tight">
          Welcome to{" "}
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              className="text-gray-700 inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-lg text-gray-700 mb-8 font-[Arial] leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Where every image tells a story. Start chatting with our AI-powered
          chatbot and explore the world of creativity through images.
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/register"
            className="px-8 py-3.5 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-800 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Start for Free</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col items-center text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-opacity-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-24 h-24 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer with Fade-in Effect */}
      <motion.div
        className="absolute bottom-6 text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p>© 2025 Pictora.ai | All rights reserved.</p>
      </motion.div>
    </div>
  );
}

export default Home;
