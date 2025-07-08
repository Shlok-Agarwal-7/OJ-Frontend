import { useState } from "react";
import ProblemCardTabs from "./ProblemCardTabs";
import apiClient from "../backend";

const ProblemCard = ({ detail, id, isContest }) => {
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("problem");
  
  const handleUserSubmission = async () => {
    setActiveTab("my");
    apiClient
      .get(`/getusersubmissions/?problem=${id}`)
      .then((response) => {
        setUserSubmissions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAllSubmissions = async () => {
    setActiveTab("all");
    apiClient
      .get(`/getallsubmissions/?problem=${id}`)
      .then((response) => {
        setAllSubmissions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-[#2e2e40] p-6 rounded-lg shadow card-color h-full flex flex-col">
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
              onClick={() => {
                handleUserSubmission();
              }}
            >
              My Submissions
            </button>
          </li>
          {!isContest && (
            <li>
              <button
                className={`px-3 py-1 rounded-t ${
                  activeTab === "all"
                    ? "bg-[#3a3b3c] text-white"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  handleAllSubmissions();
                }}
              >
                All Submissions
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="flex-grow overflow-y-auto">
        {
          <ProblemCardTabs
            activeTab={activeTab}
            detail={detail}
            userSubmissions={userSubmissions}
            allSubmissions={allSubmissions}
            isContest={isContest}
          />
        }
      </div>
    </div>
  );
};

export default ProblemCard;
