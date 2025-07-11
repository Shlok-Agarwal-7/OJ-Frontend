import { useState } from "react";
import apiClient from "../backend";

const AIHintBox = ({ title, question }) => {
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHint = async () => {
    setLoading(true);
    setHint("");

    try {
      const response = await apiClient.post("/get-hint/", {
        title: title,
        question: question,
      }); // Update if your API expects title/question instead
      setHint(response.data.hint);
    } catch (error) {
      setHint("Failed to load hint. Try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 w-full px-4">
      {hint && (
        <div className="card-color collapse border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">Tap to Reveal Hint</div>

          <div className="collapse-content text-sm">{hint}</div>
        </div>
      )}
      <button
        onClick={fetchHint}
        disabled={loading}
        className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow mt-5 ${
          loading ? "cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Generating Hint..." : "Get AI Hint"}
      </button>
    </div>
  );
};

export default AIHintBox;
