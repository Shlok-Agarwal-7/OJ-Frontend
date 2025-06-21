import { useState } from "react";

const ProblemForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    difficulty: initialData.difficulty || "Easy",
    author: initialData.author || "",
    input: initialData.input || "",
    output: initialData.output || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto  text-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {initialData.id ? "✏️ Update Problem" : "📝 Create Problem"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
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
            value={formData.description}
            onChange={handleChange}
            rows={4}
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
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Author */}
        <div>
          <label className="block mb-1 text-sm">Author</label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white"
            placeholder="Enter author name"
          />
        </div>

        {/* Input */}
        <div>
          <label className="block mb-1 text-sm">Sample Input</label>
          <textarea
            name="input"
            value={formData.input}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white resize-none"
            placeholder="e.g. nums = [2, 7, 11, 15], target = 9"
          />
        </div>

        {/* Output */}
        <div>
          <label className="block mb-1 text-sm">Sample Output</label>
          <textarea
            name="output"
            value={formData.output}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 rounded bg-[#3a3b3c] outline-none text-white resize-none"
            placeholder="e.g. [0, 1]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold"
        >
          {initialData.id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ProblemForm;
