import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering:", form);
    // call your backend here
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Register</h2>

        <label className="block mb-2 text-sm">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-[#3a3b3c] text-white focus:outline-none focus:ring-2 focus:ring-white"
          required
        />

        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
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
          className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded font-semibold transition mb-2"
        >
          Create Account
        </button>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-200 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
