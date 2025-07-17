import { useState } from "react";
import apiClient from "../backend";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ContestForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [problems, setProblems] = useState([{ problem_id: "", order: "" }]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      start_time: startTime,
      end_time: endTime,
    };

    let contestId = null;

    try {
      setLoading(true);

      const createContestPromise = apiClient.post("/contests/create", payload);
      toast.promise(createContestPromise, {
        loading: "Creating contest...",
        success: "Contest created!",
        error: (error) =>
          error?.response?.data?.detail[0] || "Failed to create contest",
      });

      const res = await createContestPromise;
      contestId = res?.data?.id;

      const addProblemsPromise = Promise.all(
        problems.map((prob) => {
          if (!prob.problem_id || !prob.order) return Promise.resolve();
          return apiClient.post(`/contests/${contestId}/addproblem`, {
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

      navigate(`/contests/${contestId}`);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl min-h-screen mx-auto text-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Create Contest</h2>

      <form className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            placeholder="Enter contest title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white resize-none"
            placeholder="Contest description"
            required
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block mb-1 text-sm">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            required
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block mb-1 text-sm">End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            required
          />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add Problems</h3>

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
        </div>

        {/* Submit */}
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

export default ContestForm;
