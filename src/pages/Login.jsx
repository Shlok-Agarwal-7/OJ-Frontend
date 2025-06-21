import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", form);
    // call your backend here
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">🔑 Login</h2>

        <label className="block mb-2 text-sm">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-[#3a3b3c] text-white focus:outline-none focus:ring-2 focus:ring-white"
          required
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded bg-[#3a3b3c] text-white focus:outline-none focus:ring-2 focus:ring-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 py-3 rounded font-semibold transition mb-2"
        >
          Sign In
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-200 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
