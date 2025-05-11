import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Sidebar from "./components/Sidebar";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AboutPage from "./pages/AboutPage"; // <-- Import About page
import ChatWindow from "./pages/Chat";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
