import { useState } from "react";
import CodeEditorTabs from "./CodeEditorTabs";
import apiClient from "../backend";
import { toast } from "sonner";

const CodeEditor = ({ id }) => {
  const [activeTab, setActiveTab] = useState("input");
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const [verdict,setVerdict] = useState();
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    try {
      setLoading(true);
      const response = await apiClient.post("/execute", {
        language: language,
        code: code,
        input_data: input,
      });
      setOutput(response.data.output);
      toast.success("Code Ran Sucessfully");
    } catch (e) {
      toast.error("There was a error executing the code");
    }
    setLoading(false);
    setActiveTab("output");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await apiClient.post("/submit", {
        language: language,
        code: code,
        problem: id,
      });
      setVerdict(response.data.verdict);
      toast.info("Code Submitted Successfully");
    } catch (e) {
      toast.error("There was server error at our side");
      console.log(e);
    }
    setLoading(true);
    setActiveTab("verdict");
  };

  return (
    <div className="bg-[#2e2e40] card p-6 rounded-lg shadow flex flex-col h-full">
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
            verdict = {verdict}
          />
        }
      </div>

      {/* Bottom Buttons */}
      <div className="mt-auto pt-4 flex justify-end gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
          onClick={handleRun}
        >
          Run
        </button>
        <button
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
