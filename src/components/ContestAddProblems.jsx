import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../backend";
import { toast } from "sonner";

const ContestAddProblems = () => {
  const [problems, setProblems] = useState([{ problem_id: "", order: "" }]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-6 min-h-screen flex justify-center">
      <div className="w-full max-w-3xl">
        <h3 className="text-lg font-semibold mb-4 text-center">Add Problems</h3>
        <form>
          {problems.map((p, index) => (
            <div key={index} className="flex justify-center space-x-4 mb-3">
              <input
                type="number"
                placeholder="Problem ID"
                className="w-1/4 p-2 rounded bg-[#3a3b3c] outline-none text-white"
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
                className="w-1/4 p-2 rounded bg-[#3a3b3c] outline-none text-white"
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

          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={() =>
                setProblems([...problems, { problem_id: "", order: "" }])
              }
              className="text-green-400 text-sm underline"
            >
              + Add another problem
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-green-600 hover:bg-green-500 px-6 py-2 rounded font-semibold ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContestAddProblems;
