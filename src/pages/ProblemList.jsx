import React from "react";
import { Link } from "react-router-dom";

const dummyProblems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", author: "Alice" },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    author: "Bob",
  },
  {
    id: 3,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    author: "Charlie",
  },
];

export default function ProblemList() {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 ">
      <h1 className="text-2xl font-semibold mb-6">🔥 Problem Set</h1>
      <div className="bg-[#2e2e40] rounded-lg overflow-hidden shadow">
        <table className="w-full text-left">
          <thead className="bg-[#3a3a5a] text-sm uppercase text-gray-300">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Difficulty</th>
              <th className="py-3 px-4">Author</th>
            </tr>
          </thead>
          <tbody>
            {dummyProblems.map((prob, idx) => (
              <tr key={prob.id} className="hover:bg-[#44445c] transition">
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">
                  <Link
                    to={`/problems/${prob.id}`}
                    className="text-blue-400 hover:underline"
                  >
                    {prob.title}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      prob.difficulty === "Easy"
                        ? "bg-green-700"
                        : prob.difficulty === "Medium"
                        ? "bg-yellow-600"
                        : "bg-red-700"
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </td>
                <td className="py-3 px-4 text-white">{prob.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
