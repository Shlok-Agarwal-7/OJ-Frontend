import { Link } from "react-router-dom";

const ContestNavbar = ({cid}) => {
  return (
    <nav className="card-color shadow-lg px-6 py-4 flex justify-between items-center rounded-md">
      <Link to="/problems" className="text-xl font-bold text-white">
        💻 CodeJudge
      </Link>

      <div className="space-x-4 flex items-center">
        <Link
          to={`/contests/${cid}`}
          className="hover:text-blue-400 text-white transition"
        >
            Back to Contest
        </Link>
        <Link
          to="/leaderboard"
          className="hover:text-blue-400 text-white transition"
        >
          Leaderboard
        </Link>
      </div>
    </nav>
  );
};

export default ContestNavbar;
