import { useEffect, useState } from "react";
import apiClient from "../backend";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import ProblemRow from "../components/ProblemRow";
import ContestTimer from "../components/ContestTimer";
import { toast } from "sonner";
import { useUserContext } from "../context/UserContext";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const ContestDetailPage = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const {user} = useUserContext() 

  const fetchContestDetails = async () => {
    const contestPromise = apiClient.get(`/contests/${id}`);
    toast.promise(contestPromise, {
      loading: "loading your contest",
      error: "error loading constest details",
      success: (res) => {
        setContest(res.data);
        return "Contest details loaded";
      },
    });
    try {
      await contestPromise;
    } catch (err) {}
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
      await fetchContestDetails();
      await fetchContestProblems();
    };
    fetchData();
  }, [id]);

  if (!contest) return null;

  const now = dayjs();
  const start = dayjs(contest.start_time);
  const end = dayjs(contest.end_time);

  const isRunning = now.isAfter(start) && now.isBefore(end);
  const isEnded = now.isAfter(end);
  const isUpcoming = now.isBefore(start);

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{contest.title}</h1>
      <div className="flex justify-between">
        <p className="secondary-text mb-4">{contest.description}</p>
        {(user?.role === "Mentor") && (<Link
          to={`/addProblems/${id}`}
          className="mb-4 p-2 bg-blue-500 rounded-md"
        >
          Add Problems
        </Link>)}
      </div>

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
            <ContestTimer start={start} end={end} />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Problems</h2>
      <div className="space-y-3">
        {isUpcoming && <p>Comeback on contest time to see problems</p>}
        {isRunning && (
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
        {isEnded && (
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
                  contestMode={false}
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
