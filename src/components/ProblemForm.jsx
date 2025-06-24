import { useState, useEffect } from "react";
import apiClient from "../backend";

const ProblemForm = ({ initialData = {} }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [testcases, setTestcases] = useState([]);
  const [id,setId] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
    setDifficulty(initialData.difficulty || "");
    setId(initialData.id || "")
  }, [initialData]);

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

  const handleCreate = (e) => {
    e.preventDefault();
    const payload = {
      testcases: testcases[0],
      difficulty: difficulty,
      question: description,
      title: title,
    };

    apiClient
      .post("problems/create", payload)
      .then((response) => {
        if (response.status == 201) {
          console.log("Problem Created Successfully");
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  
  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      testcases: testcases[0],
      difficulty: difficulty,
      question: description,
      title: title,
    };

    apiClient
      .patch(`problems/${id}/update`, payload)
      .then((response) => {
        if (response.status == 201) {
          console.log("Problem Updated Successfully");
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="max-w-2xl mx-auto  text-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {initialData.description ? "Update Problem" : "Create Problem"}
      </h2>
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

        <label>Upload Testcases JSON:</label>
        <input type="file" accept=".json" onChange={handleJsonUpload} />

        {testcases.length > 0 && (
          <div>
            <p>✔ {testcases.length} testcases loaded.</p>
          </div>
        )}

        {/* Submit */}

        {initialData.description ? (
          <button
            onClick = {handleUpdate}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold"
          >
            Update
          </button>
        ) : (
          <button
            onClick = {handleCreate}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold"
          >
            Create
          </button>
        )}
      </form>
    </div>
  );
};

export default ProblemForm;
