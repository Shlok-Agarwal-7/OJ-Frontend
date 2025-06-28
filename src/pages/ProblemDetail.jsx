import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import ProblemCard from "../components/ProblemCard";
import apiClient from "../backend";
import { toast } from "sonner";
export default function ProblemDetail() {
  const { id } = useParams();

  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await apiClient.get(`problems/${id}`);
        setDetail(response.data);
      } catch (e) {
        navigate("/register");
        toast.info("Need to logged in to access page");
      }
    };

    fetchProblem();
  }, []);

  return (
    <div className="flex w-full justify-center mt-5">
      <div className="w-1/2 h-full  px-2">
        <ProblemCard detail={detail} />
      </div>
      <div className="w-1/2 h-full px-2">
        <CodeEditor id = {id}/>
      </div>
    </div>
  );
}
