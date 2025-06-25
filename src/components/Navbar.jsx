import { Link, useNavigate } from "react-router-dom";
import apiClient from "../backend";
import { useState } from "react";

export default function Navbar() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    const refresh = localStorage.getItem("refresh");
    apiClient
      .post("/api/logout", { refresh: refresh })
      .then((response) => {
        navigate("/");
        localStorage.clear();
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <nav className="card shadow-lg px-6 py-4 flex justify-between items-center rounded-md">
      <Link to="/problems" className="text-xl font-bold text-white">
        💻 CodeJudge
      </Link>
      <div className="space-x-4">
        <Link
          to="/problems"
          className="hover:text-blue-400 text-white transition"
        >
          Problems
        </Link>
        <Link
          to="/leaderboard"
          className="hover:text-blue-400 text-white transtion "
        >
          Leaderboard
        </Link>
        {localStorage.getItem("access_token") == null ? (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm"
          >
            {" "}
            Login{" "}
          </Link>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm"
            onClick={handleLogout}
          >
            {" "}
            Logout{" "}
          </button>
        )}
      </div>
    </nav>
  );
}
