import React, { useState, useEffect } from 'react';
import { Code, Heart, Shield, Mail, Users, MapPin } from 'lucide-react'; // Added MapPin import

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
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
      title: "Advanced AI Algorithms",
      description: "Our state-of-the-art deep learning models power the core functionality, providing high-quality image generation and analysis.",
      icon: <Code size={20} />,
      delay: 0.4
    },
    {
      title: "User-Centric Design",
      description: "Every feature is thoughtfully crafted with the user experience in mind, ensuring intuitive and enjoyable interactions.",
      icon: <Heart size={20} />,
      delay: 0.6
    },
    {
      title: "Privacy First",
      description: "We prioritize your data privacy and security, with transparent policies and robust protections in place.",
      icon: <Shield size={20} />,
      delay: 0.8
    }
  ];

  const teamMembers = [
    { name: "Muhamamad Ahmed", role: "BSCS 2021 21K-3161", email: "k213161@nu.edu.pk", location: "Karachi, Pakistan", delay: 0.4 },
    { name: "Muhammad Shaheer", role: "BSCS 2021 21K-3323", email: "k213323@nu.edu.pk", location: "Karachi, Pakistan", delay: 0.5 },
    { name: "Muhammad Anas", role: "BSCS 2021 21K-4556", email: "k214556@nu.edu.pk", location: "Karachi, Pakistan", delay: 0.6 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20"
          style={{ transform: `translate(${parallax.x * 2}px, ${parallax.y * 2}px)` }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20"
          style={{ transform: `translate(${-parallax.x * 2}px, ${-parallax.y * 2}px)` }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-10"
          style={{ transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)` }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30 z-0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              About Pictora
            </span>
          </h1>
          <p className={`text-xl text-gray-300 mb-8 font-light max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            We're reimagining how AI can transform the creative process, one image at a time.
          </p>

          {/* Tabs */}
          <div className={`flex justify-center gap-4 mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {['about', 'team', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* About Content */}
        {activeTab === 'about' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Our Vision</h2>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  Pictora bridges the gap between ideas and visuals. We believe in the power of AI to unlock creativity and make visual content creation accessible to everyone.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our mission is to build intuitive AI tools that empower users to express themselves visually and bring their imagination to life.
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`bg-gray-800 bg-opacity-60 p-6 rounded-xl border border-gray-700 transition-all duration-1000 delay-[${feature.delay}s] ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  >
                    <div className="mb-4 text-purple-400">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Content */}
        {activeTab === 'team' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-60 p-6 rounded-xl border border-gray-700 w-full max-w-xs text-center">
                  <div className="text-purple-400 text-2xl font-semibold mb-2">{member.name}</div>
                  <div className="text-gray-300 text-sm mb-4">{member.role}</div>
                  <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
                    <Mail size={16} />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span>{member.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Contact Content */}
        {activeTab === 'contact' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <div className="bg-gray-800 bg-opacity-60 p-8 rounded-xl border border-gray-700">
              <div className="mb-6 text-purple-400">
                <Mail size={24} />
              </div>
              <p className="text-gray-300 text-lg mb-4">
                Have questions or feedback? We'd love to hear from you. Reach out to our team and we’ll get back to you as soon as possible.
              </p>
              <p className="text-gray-300 text-lg">
                 Email: <span className="text-white font-medium">k213161@nu.edu.pk</span>
              </p>
              <p className="text-gray-300 text-lg mt-2">
                 Location: Karachi, Pakistan
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
