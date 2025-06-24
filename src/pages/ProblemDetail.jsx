import { useParams} from "react-router-dom";
import {useState,useEffect} from "react";
import CodeEditor from "../components/CodeEditor";
import ProblemCard from "../components/ProblemCard";
import apiClient from "../backend";

export default function ProblemDetail() {
  const { id } = useParams();

  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await apiClient.get(`problems/${id}`);
        setDetail(response.data);
      } catch (e) {
        setError(e);
      }
    };

    fetchProblem();
  }, []);

  return (
    <div className="flex w-full justify-center mt-5">
      <div className="w-1/2 h-full  px-2">
        <ProblemCard detail = {detail}/>
      </div>
      <div className="w-1/2 h-full px-2">
        <CodeEditor />
      </div>
    </div>
  );
}
