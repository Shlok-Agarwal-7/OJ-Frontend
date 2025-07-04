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
      .catch((err) => {
        console.error("Failed to load tags", err);
      });
  }, []);

  const handleJsonUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setTestcases([]);
      return;
    }

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      difficulty: existingProblem.difficulty,
      question: existingProblem.question,
      title: existingProblem.title,
      sample_input: existingProblem.sample_input,
      sample_output: existingProblem.sample_output,
      tags: existingProblem.tags,
    };

    if (testcases.length > 0) {
      payload.testcases = testcases[0];
    }

    const responsePromise =  apiClient
      .patch(`problems/${id}/update`, payload)
    
    toast.promise(responsePromise,{
      loading : "updating your problem",
      success : "Problem updated successfully",
      error : "There was a error updating your problem"
    })
  };

  return (
    <>
      <div className="max-w-2xl mx-auto  text-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Update Problem</h2>
        <form className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm">Title</label>
            <input
              name="title"
              value={existingProblem.title}
              onChange={(e) =>
                setExistingProblem({
                  ...existingProblem,
                  title: e.target.value,
                })
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
              name="description"
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
              name="difficulty"
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
            <input
              name="sample_input"
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
            <input
              name="sample_output"
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
          {/* Tags Section */}
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

          {/* Upload Testcases JSON */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-white">
              Upload Testcases (JSON)
            </label>

            <input
              type="file"
              accept=".json"
              onChange={handleJsonUpload}
              className="file-input file-input-sm file-input-bordered w-full bg-[#3a3b3c] text-white"
            />

            {testcases.length > 0 && (
              <p className="mt-2 text-green-400 text-sm">
                ✔ {testcases.length} testcases loaded.
              </p>
            )}
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
    </>
  );
};

export default UpdateProblemPage;
