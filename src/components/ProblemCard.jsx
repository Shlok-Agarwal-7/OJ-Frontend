import { useState } from "react";
import ProblemCardTabs from "./ProblemCardTabs";
import apiClient from "../backend";
import { toRelativeUrl } from "../backend";

const ProblemCard = ({ detail, id, isContest }) => {
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [nextUserUrl,setNextUserUrl] = useState();
  const [prevUserUrl,setPrevUserUrl] = useState();
  const [nextAllUrl,setNextAllUrl] = useState();
  const [prevAllUrl,setPrevAllUrl] = useState();
  const [activeTab, setActiveTab] = useState("problem");

  const handleUserSubmissions = async (url = `/getusersubmissions/?problem=${id}`) => {
    setActiveTab("my");
    const relativeUrl = toRelativeUrl(url)
    apiClient
      .get(relativeUrl)
      .then((response) => {
        setUserSubmissions(response.data.results);
        setNextUserUrl(response.data.next)
        setPrevUserUrl(response.data.previous)
      })
      .catch((error) => {
      });
  };

  const handleAllSubmissions = async (url = `/getallsubmissions/?problem=${id}`) => {
    setActiveTab("all");
    const relativeUrl = toRelativeUrl(url)
    apiClient
      .get(relativeUrl)
      .then((response) => {
        setAllSubmissions(response.data.results);
        setNextAllUrl(response.data.next)
        setPrevAllUrl(response.data.previous)
      })
      .catch((error) => {
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
                handleUserSubmissions();
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
          {!isContest && (
            <li>
              <button
                className={`px-3 py-1 rounded-t ${
                  activeTab === "ai"
                    ? "bg-[#3a3b3c] text-white"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("ai")}
              >
                AI Hint
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
            handleAllSubmissions = {handleAllSubmissions}
            handleUserSubmission = {handleUserSubmissions}
            nextUserUrl = {nextUserUrl} 
            prevUserUrl = {prevUserUrl}
            nextAllUrl = {nextAllUrl}
            prevAllUrl = {prevAllUrl}
          />
        }
      </div>
    </div>
  );
};

export default ProblemCard;
