import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../backend";
import { toast } from "sonner";
export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    apiClient
      .post("api/register", form)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);
        navigate("/problems");
        toast.success(`Welcome ${response.data.username}`);
      })
      .catch((error) => {
        if (error.status === 400) {
          const fields = error.response.data.non_field_errors;
          fields.map((item, idx) => {
            toast.error(item);
          });
        }
      });
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="card-color w-full max-w-md p-8 rounded-xl shadow-xl"
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
          disabled={loading}
          className={`w-full ${
            loading ? "cursor-not-allowed" : ""
          } bg-blue-600 hover:bg-blue-500 py-3 rounded font-semibold transition mb-2`}
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
