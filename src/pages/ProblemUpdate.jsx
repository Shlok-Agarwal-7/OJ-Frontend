import ProblemForm from "../components/ProblemForm";
import apiClient from "../backend";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateProblemPage = () => {
  const { id } = useParams();

  const [error, setError] = useState();
  const [existingProblem, setExistingProblem] = useState({});
  useEffect(() => {
    apiClient
      .get(`/problems/${id}`)
      .then((response) => {
        console.log(response.data);
        setExistingProblem({
          description: response.data?.question,
          difficulty: response.data?.difficulty,
          title: response.data?.title,
          id : id
        });
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return <ProblemForm initialData={existingProblem} />;
};

export default UpdateProblemPage;
