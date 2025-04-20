import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        email,
        password,
      });
      if (response) {
        toast.success("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-[#111] rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1a1a1a] border border-gray-600 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <button
            onClick={register}
            className="w-full mt-2 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl text-white font-semibold transition active:scale-95"
          >
            Register
          </button>
        </div>

        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            className="text-cyan-400 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
