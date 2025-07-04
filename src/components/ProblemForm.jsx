import { useState, useEffect } from "react";
import apiClient from "../backend";
import { toast } from "sonner";

const ProblemForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [testcases, setTestcases] = useState([]);
  const [tags, setTags] = useState([]);
  const [sampleInput, setSampleInput] = useState();
  const [sampleOutput, setSampleOutput] = useState();
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    apiClient
      .get("/tags/")
      .then((res) => {
        setAvailableTags(res.data.map((tag) => tag.name));
      })
      .catch((err) => {
        console.error("Failed to load tags", err);
      });
  }, []);

  const handleJsonUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setTestcases([json]);
      } catch (err) {
        alert("Invalid JSON file!");
        console.error(err);
      }
    };

    reader.readAsText(file);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = {
      testcases: testcases[0],
      difficulty: difficulty,
      question: description,
      title: title,
      tags: tags,
      sample_input: sampleInput,
      sample_output: sampleOutput,
    };

    const responsePromise = apiClient.post("problems/create", payload);
    toast.promise(responsePromise, {
      loading: "Creating Problem",
      success: "Problem Created!",
      error: "There was a error creating your problem",
    });
  };
  return (
    <div className="max-w-2xl mx-auto  text-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Create Problem</h2>
      <form className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            placeholder="Enter problem title"
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
            name="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm">Sample Input</label>
          <textarea
            name="sample_input"
            value={sampleInput}
            onChange={(e) => setSampleInput(e.target.value)}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            placeholder="Sample Input"
            required
          />
        </div>

        {/* Sample Output */}
        <div>
          <label className="block mb-1 text-sm">Sample Output</label>
          <textarea
            name="sample_output"
            value={sampleOutput}
            onChange={(e) => setSampleOutput(e.target.value)}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            placeholder="Sample Output"
            required
          />
        </div>
        {/* Tags Section */}
        <div>
          <label className="block mb-1 text-sm text-white">Tags</label>

          <div className="grid grid-cols-2 gap-2">
            {availableTags.map((tag) => (
              <label key={tag} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={tags.includes(tag)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setTags((prev) => [...prev, tag]);
                    } else {
                      setTags((prev) => prev.filter((t) => t !== tag));
                    }
                  }}
                />
                <span className="text-white">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-white">
            Upload Testcases (JSON)
          </label>

          <input
            type="file"
            accept=".json"
            onChange={handleJsonUpload}
            className="file-input file-input-sm file-input-bordered w-full bg-[#3a3b3c] text-white"
            required
          />

          {testcases.length > 0 && (
            <p className="mt-2 text-green-400 text-sm">
              ✔ {testcases.length} testcases loaded.
            </p>
          )}
        </div>

        {/* Submit */}

        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default ProblemForm;
