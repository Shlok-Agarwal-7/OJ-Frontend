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
  const [difficultyFilter, setDifficultyFilter] = useState(new Set());
  const [tagFilter, setTagFilter] = useState(new Set());

  const filteredProblems = problems.filter((problem) => {
    const matchesTitle = problem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesDifficulty =
      difficultyFilter.size === 0 || difficultyFilter.has(problem.difficulty);

    const matchesTags =
      tagFilter.size === 0 || problem.tags.some((tag) => tagFilter.has(tag)); // tag is a string

    return matchesTitle && matchesDifficulty && matchesTags;
  });

  const toggleDifficulty = (level) => {
    setDifficultyFilter((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(level)) {
        newSet.delete(level);
      } else {
        newSet.add(level);
      }
      return newSet;
    });
  };

  const toggleTag = (tag) => {
    setTagFilter((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen primary primary-text p-6">
      <h1 className="text-2xl font-bold mb-4">🧩 Problem List</h1>
      <div className="flex justify-between mb-4 items-center">
        <div className="flex gap-4 items-center w-2/3">
          {/* Search bar */}
          <div className="relative w-full max-w-sm">
            <BiSearchAlt2 className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Problems"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="card-color rounded-md p-2 pl-9 w-full bg-[#3a3b3c] text-white outline-none"
            />
          </div>

          {/* Difficulty Filter Dropdown */}
          <details className="dropdown">
            <summary className="btn btn-sm bg-[#3a3b3c] text-white border-none hover:bg-[#4a4b4c]">
              Filter by Difficulty
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-40 p-2 shadow">
              {["Easy", "Medium", "Hard"].map((level) => (
                <li key={level}>
                  <label>
                    <input
                      type="checkbox"
                      checked={difficultyFilter.has(level)}
                      onChange={() => toggleDifficulty(level)}
                      className="checkbox checckbox-sm"
                    />
                    <span>{level}</span>
                  </label>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Tag Filter Dropdown */}
        <details className="dropdown">
          <summary className="btn btn-sm bg-[#3a3b3c] text-white border-none hover:bg-[#4a4b4c]">
            Filter by Tags
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-48 p-2 shadow max-h-60 overflow-auto">
            {[...new Set(problems.flatMap((p) => p.tags))].map((tag) => (
              <li key={tag}>
                <label>
                  <input
                    type="checkbox"
                    checked={tagFilter.has(tag)}
                    onChange={() => toggleTag(tag)}
                    className="checkbox checkbox-sm"
                  />
                  <span>{tag}</span>
                </label>
              </li>
            ))}
          </ul>
        </details>

        {/* Add New Problem Button */}
        <Link to="/problem-create">
          <button
            className={`bg-blue-500 hover:bg-blue-400 rounded-md px-4 py-2 ${
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
              tags={problem.tags}
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
