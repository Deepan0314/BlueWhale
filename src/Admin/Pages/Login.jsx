import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary Admin Credentials
    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("adminToken", "loggedin");

      onLogin();
    } else {
      alert("Invalid Admin Credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          HAIERAH ADMIN
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to Admin Dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg transition"
          >
            Login
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Demo Credentials
          <br />
          Email: <b>admin@gmail.com</b>
          <br />
          Password: <b>admin123</b>
        </div>

      </div>
    </div>
  );
}