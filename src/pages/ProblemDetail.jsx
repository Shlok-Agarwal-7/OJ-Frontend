import { useParams } from "react-router-dom";

export default function ProblemDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#2e2e40] p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">🧠 Problem #{id}</h2>
        <p className="mb-2">
          Given an array of integers, return indices of the two numbers such
          that they add up to a specific target.
        </p>
        <p className="mb-2">
          You may assume that each input would have exactly one solution.
        </p>
        <h3 className="mt-4 mb-2 font-bold">Input:</h3>
        <pre className="bg-[#1a1a2e] p-2 rounded">
          nums = [2,7,11,15], target = 9
        </pre>
        <h3 className="mt-4 mb-2 font-bold">Output:</h3>
        <pre className="bg-[#1a1a2e] p-2 rounded">[0,1]</pre>
      </div>

      <div className="bg-[#2e2e40] p-6 rounded-lg shadow flex flex-col">
        <h2 className="text-lg font-semibold mb-2">💻 Code Editor</h2>
        <textarea
          className="bg-[#1a1a2e] text-sm text-gray-200 p-4 rounded h-72 font-mono outline-none resize-none"
          placeholder="// write your solution here..."
        ></textarea>
        <button className="mt-4 bg-green-600 hover:bg-green-500 px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}
