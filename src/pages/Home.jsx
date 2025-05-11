import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
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

  const features = [
    {
      title: "Text to Image",
      description: "Transform your words into stunning visuals with our highly efficent AI-powered image generation.",
      color: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      title: "Image to Text",
      description: "Extract meaningful insights and descriptions from any image with advanced AI analysis.",
      color: "from-blue-500 to-teal-400",
      delay: 0.4
    },
    {
      title: "Image to Image",
      description: "Transform and reimagine your visuals with our AI that creates new images based on your originals.",
      color: "from-amber-500 to-red-500",
      delay: 0.6
    },
  ];

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

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 z-0"></div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo animation */}
          <div className="mb-8 relative">
            <div className={`inline-block relative transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="relative z-10">
                <svg viewBox="0 0 60 60" className="w-20 h-20 mx-auto mb-6">
                  <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="157" strokeDashoffset={isLoaded ? "0" : "157"} style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }} />
                  <path d="M20,30 L28,38 L40,22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="30" strokeDashoffset={isLoaded ? "0" : "30"} strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke-dashoffset 0.8s ease-in-out 0.8s" }} />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-lg opacity-30 scale-110 animate-pulse" />
            </div>
          </div>

          {/* Heading with animated text reveal */}
          <h1 className="text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Welcome to{" "}
            <span className={`relative inline-block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Pictora{" "}
            </span>
            <span className={`relative inline-block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Chatbot
            </span>
          </h1>

          {/* Subtitle with typewriter effect */}
          <p className={`text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Where every image tells a story. Start chatting with our AI-powered
            chatbot and explore the world of creativity through images.
          </p>

          {/* CTA Button with hover animation */}
          <div className={`mb-20 transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a
              href="/register"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 font-medium text-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-pink-500 group-hover:to-purple-500 transition-all duration-500 animate-gradient-x"></span>
              <span className="relative rounded-full bg-gray-900 px-8 py-4 transition-all duration-200 ease-out group-hover:bg-opacity-80 flex items-center gap-2">
                <span>Start for Free</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Features Section with hover effects and staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              style={{ transitionDelay: `${0.8 + feature.delay}s` }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="relative group">
                {/* Card background with gradient animation */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Card contents */}
                <div className="relative bg-gray-800 backdrop-filter backdrop-blur-sm bg-opacity-70 rounded-2xl p-6 shadow-xl border border-gray-700 group-hover:border-gray-600 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    {/* Feature icon/image with animation */}
                    <div className="mb-6 overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 rounded-xl"></div>
                    </div>

                    {/* Feature title with animation */}
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
                      {feature.title}
                    </h3>

                    {/* Feature description with animation */}
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Learn more button/indicator */}
                  <div className="mt-6 flex justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-blue-400 group-hover:text-white transition-colors duration-300">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg> */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with About Link */}
        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>
            Want to learn more?{" "}
            <Link
              to="/about"
              className="text-pink-400 hover:underline hover:text-pink-300 transition"
            >
              About
            </Link>
          </p>
        </footer>


      </div>
    </div>
  );
}