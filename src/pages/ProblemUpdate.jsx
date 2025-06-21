import ProblemForm from "../components/ProblemForm";

const existingProblem = {
  id: 1,
  title: "Two Sum",
  description: "Given an array of integers...",
  difficulty: "Easy",
  author: "Alice",
  input: "nums = [2, 7, 11, 15], target = 9",
  output: "[0, 1]",
};

const UpdateProblemPage = () => {
  const handleUpdate = (formData) => {
    console.log("Updating problem:", formData);
    // Send update to backend
  };

  return <ProblemForm initialData={existingProblem} onSubmit={handleUpdate} />;
};

export default UpdateProblemPage;
