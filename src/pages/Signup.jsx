import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/chat");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[var(--background)]">
      <div className="glass w-96">
        <h1 className="text-2xl font-bold text-[var(--text-dark)] mb-4">Sign Up</h1>
        <input type="email" placeholder="Email" className="border p-2 rounded w-full mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 rounded w-full mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignup} className="btn w-full">Sign Up</button>
        <p className="mt-2 text-sm text-center">Already have an account? <a href="/login" className="text-[var(--secondary)]">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;
