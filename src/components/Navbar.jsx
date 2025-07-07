import { Link, useNavigate } from "react-router-dom";
import apiClient from "../backend";
import { useState } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    const refresh = localStorage.getItem("refresh");
    apiClient
      .post("/api/logout", { refresh: refresh })
      .then((response) => {
        navigate("/");
        toast.success("Successfuly logged out");
        localStorage.clear();
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <nav className="card-color shadow-lg px-6 py-4 flex justify-between items-center rounded-md">
      <Link to="/problems" className="text-xl font-bold text-white">
        💻 CodeJudge
      </Link>

      <div className="space-x-4 flex items-center">
        <Link
          to="/problems"
          className="hover:text-blue-400 text-white transition"
        >
          Problems
        </Link>
        <Link
          to="/contests"
          className="hover:text-blue-400 text-white transition"
        >
          Contests
        </Link>
        <Link
          to="/leaderboard"
          className="hover:text-blue-400 text-white transition"
        >
          Leaderboard
        </Link>

        {localStorage.getItem("access_token") == null ? (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm text-white"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              to={`/profile/${username}`}
              className="text-white hover:text-blue-400 transition text-sm"
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
