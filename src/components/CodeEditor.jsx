import { useState } from "react";
import CodeEditorTabs from "./CodeEditorTabs";
import apiClient from "../backend";
import { toast } from "sonner";

const CodeEditor = ({ id }) => {
  const [activeTab, setActiveTab] = useState("input");
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);

    const runCodePromise = apiClient.post("/execute", {
      language: language,
      code: code,
      input_data: input,
    });

    toast.promise(runCodePromise, {
      loading: "Running your code..",
      success: (res) => {
        setOutput(res.data.output);
        return "Code ran Successfully!";
      },
      error: "There was an error running your code",
    });

    try {
      await runCodePromise;
    } catch (e) {}

    setActiveTab("output");
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const SubmitCodePromise = apiClient.post("/execute", {
      language: language,
      code: code,
      problem_id: id,
    });

    toast.promise(SubmitCodePromise, {
      loading: "Try all testcases...",
      success: (res) => {
        setVerdict(res.data.verdict);
        return "Code Submitted  Successfully!";
      },
      error: "There was an error running your code",
    });

    try {
      await SubmitCodePromise;
    } catch (e) {}

    setActiveTab("verdict");
    setLoading(false);
  };

  return (
    <div className="bg-[#2e2e40] card-color p-6 rounded-lg shadow flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2 text-white">💻 Code Editor</h2>
      {/* Language Selector */}

      <div className="mb-2">
        <label className="block text-gray-300 text-sm mb-1">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-[#3a3b3c] text-gray-200 p-2 rounded w-full outline-none"
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="java">Java</option>
        </select>
      </div>
      {/* Code Textarea */}
      <textarea
        className="bg-[#3a3b3c] text-sm text-gray-200 p-4 rounded h-72 font-mono outline-none resize-none"
        placeholder="// write your solution here..."
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>

      {/* Tab Navigation */}
      <div className="flex mt-4 space-x-2">
        {["input", "output", "verdict"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded-t font-medium text-sm ${
              activeTab === tab
                ? "bg-[#3a3b3c] text-white"
                : "bg-[#1e1e2f] text-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-0">
        {
          <CodeEditorTabs
            activeTab={activeTab}
            setInput={setInput}
            output={output}
            loading={loading}
            input={input}
            verdict={verdict}
          />
        }
      </div>

      {/* Bottom Buttons */}
      <div className="mt-auto pt-4 flex justify-end gap-4">
        <button
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleRun}
        >
          Run
        </button>
        <button
          disabled={loading}
          className={`bg-green-600 hover:bg-green-500 px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
