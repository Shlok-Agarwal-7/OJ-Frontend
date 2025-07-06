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
    try {
      const res = await apiClient.post("/execute", {
        language: language,
        code: code,
        input_data: input,
      });
      const task_id = res.data.task_id;

      toast.loading("Running your Code");

      const poll = setInterval(async () => {
        const res = await apiClient.get(`/check-run-status/${task_id}`);
        if (res.data.status == "SUCCESS") {
          clearInterval(poll);
          toast.dismiss();
          toast.success("Code ran successfully");
          setOutput(res.data.output);
          setActiveTab("output");
          setLoading(false);
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(poll);
        toast.dismiss();
        toast.error("Run timed out.");
        setLoading(false);
      }, 15000);
    } catch (e) {
      toast.error("There was an error running your code");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await apiClient.post("/submit", {
        language: language,
        code: code,
        problem_id: id,
      });

      const submission_id = res.data.submission_id;
      toast.loading("Running against testcases");

      const poll = setInterval(async () => {
        const res = await apiClient.get(
          `/check-submit-status/${submission_id}`
        );
        if (res.data.verdict != "pending") {
          clearInterval(poll);
          toast.dismiss();
          toast.success("Problem submitted successfully");
          setVerdict(res.data.verdict);
          setActiveTab("verdict");
          setLoading(false);
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(poll);
        toast.dismiss();
        toast.error("Run timed out.");
        setLoading(false);
      }, 15000);
    } catch (e) {
      toast.error("There was a issue submitting your code");
      setLoading(false);
    }
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
