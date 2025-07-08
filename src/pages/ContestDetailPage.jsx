import { useEffect, useState } from "react";
import apiClient from "../backend";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import ProblemRow from "../components/ProblemRow";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const ContestDetailPage = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContestDetails = async () => {
    try {
      const res = await apiClient.get(`/contests/${id}`);
      setContest(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load contest details.");
    }
  };

  const fetchContestProblems = async () => {
    try {
      const res = await apiClient.get(`/contests/${id}/problems`);
      setProblems(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load contest problems.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchContestDetails();
      await fetchContestProblems();
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="p-4 text-gray-700">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!contest) return null;

  const now = dayjs();
  const start = dayjs(contest.start_time);
  const end = dayjs(contest.end_time);

  const isRunning = now.isAfter(start) && now.isBefore(end);
  const isEnded = now.isAfter(end);

  const getTimeLeft = () => {
    const diff = end.diff(now);
    const dur = dayjs.duration(diff);
    return `${dur.hours()}h ${dur.minutes()}m ${dur.seconds()}s`;
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{contest.title}</h1>
      <p className="secondary-text mb-4">{contest.description}</p>

      <div className="primary-text grid grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <strong>Start Time:</strong> {start.format("YYYY-MM-DD HH:mm")}
        </div>
        <div>
          <strong>End Time:</strong> {end.format("YYYY-MM-DD HH:mm")}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <span>
            {isRunning ? "Running" : now.isBefore(start) ? "Upcoming" : "Ended"}
          </span>
        </div>
        {isRunning && (
          <div className="col-span-2 text-orange-500">
            <strong>Time Left:</strong> {getTimeLeft()}
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Problems</h2>
      <div className="space-y-3">
        {!isEnded && !isRunning && (
          <p>Comeback on contest time to see problems</p>
        )}
        {(isEnded || isRunning) && (
          <>
            {problems.length === 0 ? (
              <p>No problems added yet.</p>
            ) : (
              problems.map((problem) => (
                <ProblemRow
                  cid={id}
                  key={problem.order}
                  pid={problem.problem.id}
                  name={problem.problem.title}
                  difficulty={problem.problem.difficulty}
                  author={problem.problem.created_by}
                  tags={problem.problem.tags}
                  contestMode={true}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContestDetailPage;
