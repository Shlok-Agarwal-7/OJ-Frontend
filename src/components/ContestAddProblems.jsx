import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../backend";
import {toast} from 'sonner'

const ContestAddProblems = () => {
  const [problems, setProblems] = useState([{ problem_id: "", order: "" }]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const addProblemsPromise = Promise.all(
        problems.map((prob) => {
          if (!prob.problem_id || !prob.order) return Promise.resolve();
          return apiClient.post(`/contests/${id}/addproblem`, {
            problem_id: parseInt(prob.problem_id),
            order: parseInt(prob.order),
          });
        })
      );

      toast.promise(addProblemsPromise, {
        loading: "Adding problems...",
        success: "All problems added!",
        error: (error) =>
          error?.response?.data?.detail || "Failed to add problems",
      });

      await addProblemsPromise;

      navigate(`/contests/${id}`);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-6 min-h-screen">
      <h3 className="text-lg font-semibold mb-2">Add Problems</h3>
      <form>
        {problems.map((p, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="number"
              placeholder="Problem ID"
              className="w-1/2 p-2 rounded bg-[#3a3b3c] outline-none text-white"
              value={p.problem_id}
              onChange={(e) => {
                const updated = [...problems];
                updated[index].problem_id = e.target.value;
                setProblems(updated);
              }}
            />
            <input
              type="number"
              placeholder="Order"
              className="w-1/2 p-2 rounded bg-[#3a3b3c] outline-none text-white"
              value={p.order}
              onChange={(e) => {
                const updated = [...problems];
                updated[index].order = e.target.value;
                setProblems(updated);
              }}
            />
            <button
              type="button"
              className="text-red-400"
              onClick={() =>
                setProblems((prev) => prev.filter((_, i) => i !== index))
              }
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setProblems([...problems, { problem_id: "", order: "" }])
          }
          className="text-green-400 text-sm underline"
        >
          + Add another problem
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold ${
            loading ? "cursor-not-allowed" : ""
          }`}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default ContestAddProblems;
