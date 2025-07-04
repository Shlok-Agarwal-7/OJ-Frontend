import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";
import apiClient from "../backend";

const ProblemRow = ({ id, name, difficulty, author, tags }) => {
  const difficultyColor = {
    Easy: "bg-green-600 text-white",
    Medium: "bg-yellow-500 text-black",
    Hard: "bg-red-600 text-white",
  };

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/problems/${id}/delete`);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const role = localStorage.getItem("role");

  return (
    <div className="flex items-center justify-between px-4 py-2 card-color rounded-md text-sm mb-2">
      {/* Problem ID */}
      <span className="w-6 text-gray-300">{id}</span>

      {/* Problem Name */}
      <Link
        to={`/problem/${id}`}
        className="flex-1 primary-text hover:underline cursor-pointer pl-4"
      >
        {name}
      </Link>
      <div>
        {tags.map((tag,idx) => {
          return (
            <div key={idx} className="badge badge-soft badge-primary">
              {tag}
            </div>
          );
        })}
      </div>
      <Link
        to={`/problem-update/${id}`}
        className={`cursor-pointer mx-2 
      ${role === "Student" ? "hidden disabled" : ""}`}
      >
        <RxUpdate className="secondary-text hover:primary-text transition" />
      </Link>

      {role !== "Student" && (
        <button className="cursor-pointer mx-2" onClick={handleDelete}>
          <RiDeleteBin5Line className="secondary-text hover:primary-text transition" />
        </button>
      )}

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
