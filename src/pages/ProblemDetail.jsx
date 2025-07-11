import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import ProblemCard from "../components/ProblemCard";
import apiClient from "../backend";
import { toast } from "sonner";
import ContestNavbar from "../components/ContestNavbar";

export default function ProblemDetail() {
  const params = useParams();
  const location = useLocation();

  const isContest = location.pathname.startsWith("/contests/");

  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await apiClient.get(`problems/${params.pid}`);
        setDetail(response.data);
      } catch (e) {
        navigate("/register");
        toast.info("Need to logged in to access page");
      }
    };

    fetchProblem();
  }, []);

  return (
    <div>
      {isContest && <ContestNavbar cid={params.cid} />}
      <div className="flex w-full justify-center mt-2 min-h-screen">
        <div className="w-1/2 h-full  px-2">
          <ProblemCard detail={detail} id={params.pid} isContest={isContest} />
        </div>
        <div className="w-1/2 h-full px-2">
          <CodeEditor id={params.pid} cid={params.cid} isContest={isContest} />
        </div>
      </div>
    </div>
  );
}
