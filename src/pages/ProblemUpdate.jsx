import apiClient from "../backend";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UpdateProblemPage = () => {
  const { id } = useParams();
  const [error, setError] = useState();
  const [existingProblem, setExistingProblem] = useState({
    question: "",
    difficulty: "",
    title: "",
    sample_input: "",
    sample_output: "",
    tags: [],
    blacklist: false,
    memory_limit: 256,
    time_limit: 1,
  });
  const [testcases, setTestcases] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    apiClient
      .get(`/problems/${id}`)
      .then((response) => {
        setExistingProblem({
          question: response.data?.question,
          difficulty: response.data?.difficulty,
          title: response.data?.title,
          sample_input: response.data.sample_input,
          sample_output: response.data.sample_output,
          tags: response.data.tags,
          blacklist: response.data.blacklist || false,
          memory_limit: response.data.memory_limit || 256,
          time_limit: response.data.time_limit || 1,
        });
      })
      .catch((error) => {
        setError(error);
      });

    apiClient
      .get("/tags/")
      .then((res) => {
        setAvailableTags(res.data.map((tag) => tag.name));
      })
      .catch((err) => {});
  }, []);

  const handleTxtUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const lines = event.target.result.split("\n");
        const testcasesParsed = [];
        let i = 0;

        while (i < lines.length) {
          if (lines[i]?.trim() === "INPUT") {
            i++;
            let inputLines = [];

            while (i < lines.length && lines[i].trim() !== "OUTPUT") {
              inputLines.push(lines[i]);
              i++;
            }

            if (lines[i]?.trim() !== "OUTPUT") {
              throw new Error("Expected OUTPUT after INPUT block");
            }

            i++;
            let outputLines = [];

            while (i < lines.length && lines[i]?.trim() !== "INPUT") {
              outputLines.push(lines[i]);
              i++;
            }

            testcasesParsed.push({
              input: inputLines.join("\n").trim(),
              output: outputLines.join("\n").trim(),
            });
          } else {
            i++;
          }
        }

        if (testcasesParsed.length === 0) {
          throw new Error("No valid testcases found");
        }

        setTestcases([testcasesParsed]);
      } catch (err) {
        alert("Invalid testcases format in .txt file!");
      }
    };

    reader.readAsText(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      difficulty: existingProblem.difficulty,
      question: existingProblem.question,
      title: existingProblem.title,
      sample_input: existingProblem.sample_input,
      sample_output: existingProblem.sample_output,
      tags: existingProblem.tags,
      blacklist: existingProblem.blacklist,
      memory_limit: existingProblem.memory_limit,
      time_limit: existingProblem.time_limit,
    };
    if (testcases.length > 0) {
      payload.testcases = testcases[0];
    }

    const responsePromise = apiClient.patch(`problems/${id}/update`, payload);

    toast.promise(responsePromise, {
      loading: "Updating your problem...",
      success: "Problem updated successfully",
      error: "There was an error updating your problem",
    });

    try {
      await responsePromise;
    } catch (e) {}
  };

  return (
    <div className="max-w-2xl mx-auto text-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Update Problem</h2>
      <form className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input
            value={existingProblem.title}
            onChange={(e) =>
              setExistingProblem({ ...existingProblem, title: e.target.value })
            }
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            placeholder="Enter problem title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            value={existingProblem.question}
            onChange={(e) =>
              setExistingProblem({
                ...existingProblem,
                question: e.target.value,
              })
            }
            rows={10}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white resize-none"
            placeholder="Problem description"
            required
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block mb-1 text-sm">Difficulty</label>
          <select
            value={existingProblem.difficulty}
            onChange={(e) =>
              setExistingProblem({
                ...existingProblem,
                difficulty: e.target.value,
              })
            }
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Sample Input */}
        <div>
          <label className="block mb-1 text-sm">Sample Input</label>
          <textarea
            value={existingProblem.sample_input}
            onChange={(e) =>
              setExistingProblem({
                ...existingProblem,
                sample_input: e.target.value,
              })
            }
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            placeholder="Sample Input"
            required
          />
        </div>

        {/* Sample Output */}
        <div>
          <label className="block mb-1 text-sm">Sample Output</label>
          <textarea
            value={existingProblem.sample_output}
            onChange={(e) =>
              setExistingProblem({
                ...existingProblem,
                sample_output: e.target.value,
              })
            }
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            placeholder="Sample Output"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 text-sm">Tags</label>
          <div className="grid grid-cols-2 gap-2">
            {availableTags.map((tag) => (
              <label key={tag} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={existingProblem.tags.includes(tag)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const updatedTags = checked
                      ? [...existingProblem.tags, tag]
                      : existingProblem.tags.filter((t) => t !== tag);
                    setExistingProblem({
                      ...existingProblem,
                      tags: updatedTags,
                    });
                  }}
                />
                <span className="text-white">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Upload Testcases */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-white">
            Upload Testcases (JSON)
          </label>
          <input
            type="file"
            accept=".txt"
            onChange={handleTxtUpload}
            className="file-input file-input-sm file-input-bordered w-full bg-[#3a3b3c] text-white"
            required
          />
          {testcases.length > 0 && (
            <p className="mt-2 text-green-400 text-sm">
              ✔ All testcases loaded.
            </p>
          )}
        </div>

        {/* Time Limit */}
        <div>
          <label className="block mb-1 text-sm">Time Limit (seconds)</label>
          <input
            type="number"
            value={existingProblem.time_limit}
            onChange={(e) =>
              setExistingProblem({
                ...existingProblem,
                time_limit: parseInt(e.target.value),
              })
            }
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            placeholder="e.g., 1"
            min={1}
            required
          />
        </div>

        {/* Memory Limit */}
        <div>
          <label className="block mb-1 text-sm">Memory Limit (MB)</label>
          <input
            type="number"
            value={existingProblem.memory_limit}
            onChange={(e) =>
              setExistingProblem({
                ...existingProblem,
                memory_limit: parseInt(e.target.value),
              })
            }
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            placeholder="e.g., 256"
            min={32}
            required
          />
        </div>

        {/* Blacklist */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={existingProblem.blacklist}
            onChange={(e) =>
              setExistingProblem({
                ...existingProblem,
                blacklist: e.target.checked,
              })
            }
            className="checkbox"
          />
          <label className="text-sm text-white">Blacklist this problem</label>
        </div>

        {/* Submit */}
        <button
          onClick={handleUpdate}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProblemPage;
