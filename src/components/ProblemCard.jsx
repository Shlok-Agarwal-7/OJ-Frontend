import { useState } from "react";
import ProblemCardTabs  from "./ProblemCardTabs";

const ProblemCard = () => {
  const [activeTab, setActiveTab] = useState("problem");

  return (
    <div className="bg-[#2e2e40] p-6 rounded-lg shadow card h-full flex flex-col">
      {/* Tabs */}
      <div className="flex items-center mb-5">
        <ul className="flex gap-4 text-sm font-medium text-gray-300">
          <li>
            <button
              className={`px-3 py-1 rounded-t ${
                activeTab === "problem"
                  ? "bg-[#3a3b3c] text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("problem")}
            >
              Problem
            </button>
          </li>
          <li>
            <button
              className={`px-3 py-1 rounded-t ${
                activeTab === "my" ? "bg-[#3a3b3c] text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("my")}
            >
              My Submissions
            </button>
          </li>
          <li>
            <button
              className={`px-3 py-1 rounded-t ${
                activeTab === "all"
                  ? "bg-[#3a3b3c] text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Submissions
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="flex-grow overflow-y-auto">
        {<ProblemCardTabs activeTab={activeTab} />}
      </div>
    </div>
  );
};

export default ProblemCard;
