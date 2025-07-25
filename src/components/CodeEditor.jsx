// import { useState } from "react";
// import CodeEditorTabs from "./CodeEditorTabs";
// import apiClient from "../backend";
// import { toast } from "sonner";
// import Editor from "@monaco-editor/react";

// const CodeEditor = ({ id, cid, isContest }) => {
//   const [activeTab, setActiveTab] = useState("input");
//   const [language, setLanguage] = useState("cpp");
//   const [code, setCode] = useState(
//     `#include <iostream>
// using namespace std;

// int main() {
//     // your code goes here
//     return 0;
// }
// `
//   );
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [verdict, setVerdict] = useState("");
//   const [loading, setLoading] = useState(false);

//   const monacoLanguageMap = {
//     cpp: "cpp",
//     py: "python",
//   };
//   const boilerplates = {
//     cpp: `#include <iostream>
// using namespace std;

// int main() {
//     // your code goes here
//     return 0;
// }
// `,
//     py: `def main():
//     # your code goes here
//     pass

// if __name__ == "__main__":
//     main()
// `,
//   };

//   const handleRun = async () => {
//     setLoading(true);

//     const runCodePromise = apiClient.post("/execute", {
//       language: language,
//       code: code,
//       input_data: input,
//     });

//     toast.promise(runCodePromise, {
//       loading: "Running your code..",
//       success: (res) => {
//         setOutput(res.data.output);
//         return "Code ran Successfully!";
//       },
//       error: "There was an error running your code",
//     });

//     try {
//       await runCodePromise;
//     } catch (e) {}

//     setActiveTab("output");
//     setLoading(false);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     let submitCodePromise;
//     if (isContest) {
//       submitCodePromise = apiClient.post(`/contests/${cid}/submit`, {
//         language: language,
//         code: code,
//         problem_id: id,
//       });
//       toast.promise(submitCodePromise, {
//         loading: "Trying all Testcases",
//         success: (res) => {
//           setVerdict(res.data.verdict);
//           if (res.data.verdict !== "Accepted") {
//             toast.error(res.data.verdict);
//           } else {
//             return `Code Submitted : ${verdict}`;
//           }
//         },
//         error: (error) => {
//           return error.status !== 403
//             ? "There was a error running your code"
//             : "Contest has ended";
//         },
//       });
//       try {
//         await submitCodePromise;
//       } catch (error) {}
//     } else {
//       submitCodePromise = apiClient.post("/submit", {
//         language: language,
//         code: code,
//         problem_id: id,
//       });
//       toast.promise(submitCodePromise, {
//         loading: "Trying all Testcases",
//         success: (res) => {
//           setVerdict(res.data.verdict);
//           if (res.data.verdict !== "Accepted") {
//             toast.error(res.data.verdict);
//           }
//           return `Code Submitted : ${res.data.verdict}`;
//         },
//         error: "There was a error running your code",
//       });

//       try {
//         await submitCodePromise;
//       } catch (error) {}
//     }
//     setActiveTab("verdict");
//     setLoading(false);
//   };

//   return (
//     <div className="bg-[#2e2e40] card-color p-6 rounded-lg shadow flex flex-col h-full">
//       <h2 className="text-lg font-semibold mb-2 text-white">💻 Code Editor</h2>
//       {/* Language Selector */}

//       <div className="mb-2">
//         <label className="block text-gray-300 text-sm mb-1">Language</label>
//         <select
//           value={language}
//           onChange={(e) => {
//             const selectedLang = e.target.value;
//             setLanguage(selectedLang);
//             setCode(boilerplates[selectedLang]); // set boilerplate
//           }}
//           className="bg-[#3a3b3c] text-gray-200 p-2 rounded w-full outline-none"
//         >
//           <option value="cpp">C++</option>
//           <option value="py">Python</option>
//         </select>
//       </div>
//       {/* Code Textarea */}
//       <div className="rounded overflow-hidden mb-2" style={{ height: "300px" }}>
//         <Editor
//           height="100%"
//           language={monacoLanguageMap[language]}
//           theme="vs-dark"
//           value={code}
//           onChange={(value) => {
//             setCode(value);
//             localStorage.setItem("code",value)
//             }}
//           options={{
//             fontSize: 14,
//             minimap: { enabled: false },
//             automaticLayout: true,
//             scrollBeyondLastLine: false,
//             wordWrap: "on",
//             suggestOnTriggerCharacters: true,
//             tabCompletion: "on",
//             autoClosingBrackets: "always",
//             autoIndent: "full",
//           }}
//         />
//       </div>

//       {/* Tab Navigation */}
//       <div className="flex mt-4 space-x-2">
//         {["input", "output", "verdict"].map((tab) => (
//           <button
//             key={tab}
//             className={`px-3 py-1 rounded-t font-medium text-sm ${
//               activeTab === tab
//                 ? "bg-[#3a3b3c] text-white"
//                 : "bg-[#1e1e2f] text-gray-400"
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="mt-0">
//         {
//           <CodeEditorTabs
//             activeTab={activeTab}
//             setInput={setInput}
//             output={output}
//             loading={loading}
//             input={input}
//             verdict={verdict}
//           />
//         }
//       </div>

//       {/* Bottom Buttons */}
//       <div className="mt-auto pt-4 flex justify-end gap-4">
//         <button
//           disabled={loading}
//           className={`bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={handleRun}
//         >
//           Run
//         </button>
//         <button
//           disabled={loading}
//           className={`bg-green-600 hover:bg-green-500 px-4 py-2 rounded ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;
import { useState } from "react";
import CodeEditorTabs from "./CodeEditorTabs";
import apiClient from "../backend";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ id, cid, isContest }) => {
  const boilerplates = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    // your code goes here
    return 0;
}
`,
    py: `def main():
    # your code goes here
    pass

if __name__ == "__main__":
    main()
`,
  };

  const getInitialCode = (lang) => {
    const saved = localStorage.getItem(`code-${lang}`);
    return saved || boilerplates[lang];
  };

  const [activeTab, setActiveTab] = useState("input");
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(() => getInitialCode("cpp"));
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(false);

  const monacoLanguageMap = {
    cpp: "cpp",
    py: "python",
  };

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
    let submitCodePromise;
    if (isContest) {
      submitCodePromise = apiClient.post(`/contests/${cid}/submit`, {
        language: language,
        code: code,
        problem_id: id,
      });
      toast.promise(submitCodePromise, {
        loading: "Trying all Testcases",
        success: (res) => {
          setVerdict(res.data.verdict);
          if (res.data.verdict !== "Accepted") {
            toast.error(res.data.verdict);
          } else {
            return `Code Submitted : ${verdict}`;
          }
        },
        error: (error) => {
          return error.status !== 403
            ? "There was a error running your code"
            : "Contest has ended";
        },
      });
      try {
        await submitCodePromise;
      } catch (error) {}
    } else {
      submitCodePromise = apiClient.post("/submit", {
        language: language,
        code: code,
        problem_id: id,
      });
      toast.promise(submitCodePromise, {
        loading: "Trying all Testcases",
        success: (res) => {
          setVerdict(res.data.verdict);
          if (res.data.verdict !== "Accepted") {
            toast.error(res.data.verdict);
          }
          return `Code Submitted : ${res.data.verdict}`;
        },
        error: "There was a error running your code",
      });

      try {
        await submitCodePromise;
      } catch (error) {}
    }
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
          onChange={(e) => {
            const selectedLang = e.target.value;
            setLanguage(selectedLang);
            const saved = localStorage.getItem(`code-${selectedLang}`);
            setCode(saved || boilerplates[selectedLang]);
          }}
          className="bg-[#3a3b3c] text-gray-200 p-2 rounded w-full outline-none"
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      {/* Code Textarea */}
      <div className="rounded overflow-hidden mb-2" style={{ height: "300px" }}>
        <Editor
          height="100%"
          language={monacoLanguageMap[language]}
          theme="vs-dark"
          value={code}
          onChange={(value) => {
            setCode(value);
            localStorage.setItem(`code-${language}`, value);
          }}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            suggestOnTriggerCharacters: true,
            tabCompletion: "on",
            autoClosingBrackets: "always",
            autoIndent: "full",
          }}
        />
      </div>

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
