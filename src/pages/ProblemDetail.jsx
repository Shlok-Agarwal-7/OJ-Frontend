import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import ProblemCard from "../components/ProblemCard";

export default function ProblemDetail() {
  const { id } = useParams();

  return (
    <div className="flex w-full justify-center mt-5">
      <div className="w-1/2 h-full  px-2">
        <ProblemCard />
      </div>
      <div className="w-1/2 h-full px-2">
        <CodeEditor />
      </div>
    </div>
  );
}
