import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#2a2a40] shadow-lg px-6 py-4 flex justify-between items-center">
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
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}
