import { Link } from "react-router-dom";
import ProblemRow from "../components/ProblemRow";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import apiClient from "../backend";

const ProblemList = () => {
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await apiClient.get("/problems");
        setProblems(response.data);
      } catch (e) {
        setError(e);
        console.log(error);
      }
    };

    fetchProblems();
  }, []);

  // states
  const role = localStorage.getItem("role");
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen primary primary-text p-6">
      <h1 className="text-2xl font-bold mb-4">🧩 Problem List</h1>
      <div className="flex justify-between mb-4">
        <div className="relative w-1/4">
          <BiSearchAlt2 className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Problems"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="card rounded-md p-2 pl-9 w-full bg-[#3a3b3c] text-white outline-none"
          />
        </div>

        <Link to="/problem-create">
          <button
            className={`bg-blue-500 hover:bg-blue-400 rounded-md p-2 ${
              role === "Student" ? "hidden disabled" : ""
            }`}
          >
            Add New Problem
          </button>
        </Link>
      </div>

      {/* Header Row */}
      <div className="flex items-center justify-between px-4 py-2 text-sm secondary-text border-b border-gray-600">
        <span className="w-6">#</span>
        <span className="flex-1 pl-4">Title</span>
        <span>Difficulty</span>
        <span className="pl-4">Author</span>
      </div>

      {/* List of Problems */}
      <div className="mt-2">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem) => (
            <ProblemRow
              key={problem.id}
              id={problem.id}
              name={problem.title}
              difficulty={problem.difficulty}
              author={problem.created_by}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            No problems found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemList;
