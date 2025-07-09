import apiClient from "../backend";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // for 'Do'
import { Link } from "react-router-dom";

dayjs.extend(advancedFormat);

const ContestsPage = () => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [previousContests, setPreviousContests] = useState([]);
  const [runningContests, setRunningContests] = useState([]);
  const [activeList, setActiveList] = useState("Running"); // 'running', 'upcoming', 'completed'

  const fetchUpcomingContests = async () => {
    const res = await apiClient.get("contests/upcoming");
    setUpcomingContests(res.data);
  };
  const fetchRunningContests = async () => {
    const res = await apiClient.get("contests/running");
    setRunningContests(res.data);
  };

  const fetchPreviousContests = async () => {
    const res = await apiClient.get("contests/previous");
    setPreviousContests(res.data);
  };

  useEffect(() => {
    fetchPreviousContests();
    fetchUpcomingContests();
    fetchRunningContests();
  }, []);

  const getActiveContests = () => {
    if (activeList === "Running") return runningContests;
    if (activeList === "Previous") return previousContests;
    if (activeList === "Upcoming") return upcomingContests;
    return [];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Contests</h1>
      {/* Toggle Buttons */}
      <div className="flex space-x-3 mb-6">
        <button
          className="btn btn-soft btn-accent"
          onClick={() => setActiveList("Running")}
        >
          Running
        </button>
        <button
          className="btn btn-soft btn-warning"
          onClick={() => setActiveList("Upcoming")}
        >
          Upcoming
        </button>
        <button
          className="btn btn-soft btn-info"
          onClick={() => setActiveList("Previous")}
        >
          Completed
        </button>
        {localStorage.getItem("role") === "Mentor" && (
          <div className="mb-4">
            <Link
              to="/contests/create"
              className="inline-block bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-semibold transition"
            >
              + Add Contest
            </Link>
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-5">
        {`${activeList}`} Contest List
      </h1>
      {/* Contest List */}
      <div className="grid gap-4">
        {getActiveContests().length === 0 ? (
          <p className="text-gray-500">No contests found.</p>
        ) : (
          getActiveContests().map((contest) => (
            <div
              key={contest.id}
              className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <Link
                to={`/contests/${contest.id}`}
                className="text-xl font-semibold mb-1 hover:underline"
              >
                {contest.title}
              </Link>
              <p className="text-sm text-gray-500">
                <span>
                  {" "}
                  {dayjs(contest.start_time).format("Do MMMM h:mm A")}{" "}
                </span>
                <span>{dayjs(contest.end_time).format("Do MMMM h:mm A")} </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContestsPage;
