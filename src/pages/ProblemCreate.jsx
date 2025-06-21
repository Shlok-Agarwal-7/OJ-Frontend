import ProblemForm from "../components/ProblemForm";

const CreateProblemPage = () => {
  const handleCreate = (formData) => {
    console.log("Creating problem:", formData);
    // Send to backend here
  };

  return <ProblemForm onSubmit={handleCreate} />;
};

export default CreateProblemPage;
