import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";

const ProblemRow = ({ id, name, difficulty, author }) => {
  const difficultyColor = {
    Easy: "bg-green-600 text-white",
    Medium: "bg-yellow-500 text-black",
    Hard: "bg-red-600 text-white",
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 card rounded-md text-sm mb-2">
      {/* Problem ID */}
      <span className="w-6 text-gray-300">{id}</span>

      {/* Problem Name */}
      <Link
        to={`/problem/${id}`}
        className="flex-1 primary-text hover:underline cursor-pointer pl-4"
      >
        {name}
      </Link>

      {/* Difficulty Badge */}
      <Link to={`/problem-update/${id}`} className="cursor-pointer mx-2">
        <RxUpdate className="secondary-text hover:primary-text transition" />
      </Link>

      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          difficultyColor[difficulty] || "bg-gray-500 text-white"
        }`}
      >
        {difficulty}
      </span>

      {/* Author */}
      <span className="text-white pl-4">{author}</span>
    </div>
  );
};

export default ProblemRow;
