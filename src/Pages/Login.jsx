import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { motion } from "framer-motion";

import loginImage from "../assets/login.jpg";
import HairaLogo from "../assets/HairaLogo.png";
import Logotransparent from "../assets/HaierahLogoTransparent.png";
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

   const result = login(email, password);

  console.log(result);

  if (result.success) {
     console.log("Logged in role:", result.user.role);
     if (result.user.role === "admin") {
         navigate("/admin");
     } else {
        navigate("/");
     }

  } else {
       alert("Invalid email or password");
     }
  };

  return (
   <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-r from-black via-gray-900 to-black relative">

      
      {/* TOP RIGHT */}
      <div className="absolute top-10 right-10 z-50 text-sm">
        <span className="text-gray-600">New customer?</span>

        <Link
          to="/register"
          className="ml-2 font-semibold hover:underline"
        >
          Create account
        </Link>
      </div>

      {/* LEFT SIDE IMAGE */}
      <div className="relative hidden lg:block">
        <div className="absolute top-8 left-8 z-20">
           <img src={Logotransparent} alt="HAIERAH Logo" className="h-16 w-auto object-contain"/>
        </div>
        <img
          src={loginImage}
          alt="HAIERAH Fashion"
          className="w-full h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute bottom-16 left-12 text-white">
          <p className="uppercase tracking-[6px] text-sm">
            NEW SEASON
          </p>

          <h1 className="font-serif text-6xl leading-tight mt-5">
            Luxury
            <br />
            Redefined.
          </h1>

          <p className="mt-5 text-lg max-w-sm">
            Discover timeless fashion designed for modern elegance.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center px-8 py-10 bg-white ">

        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 w-full max-w-md border border-white/30"
         >
          <h1 className="text-5xl font-serif text-center text-black">
            HAIERAH
          </h1>

          <p className="text-center text-gray-500 uppercase tracking-[4px] mt-3 mb-10">
            Welcome Back
          </p>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-5 outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-3 outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* FORGOT PASSWORD */}
          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-sm underline text-gray-600 hover:text-black"
            >
              Forgot Password?
            </Link>
          </div>

          {/* SIGN IN BUTTON */}
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl uppercase tracking-widest hover:bg-gray-800 transition"
          >
            Sign In
          </button>

         
            
          {/* REGISTER LINK */}
          <p className="text-center mt-8 text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="ml-2 font-semibold text-black hover:underline"
            >
              Register
            </Link>
          </p>

        </motion.form>

      </div>

    </div>
  );
}