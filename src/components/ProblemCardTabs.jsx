import SubmissionsList from "./SubmissionsList";
import Markdown from "react-markdown";

const renderContent = ({
  activeTab,
  detail,
  userSubmissions,
  allSubmissions,
}) => {
  switch (activeTab) {
    case "problem":
      return (
        <>
          <h2 className="text-xl font-semibold mb-4">{detail?.title}</h2>
          <div className="mb-2">
            <Markdown>{detail?.question}</Markdown>
          </div>
          <h3 className="mt-4 mb-2 font-bold">Sample Input:</h3>
          <pre className="bg-[#3a3b3c] p-2 rounded">{detail?.sample_input}</pre>
          <h3 className="mt-4 mb-2 font-bold">Sample Output:</h3>
          <pre className="bg-[#3a3b3c] p-2 rounded">
            {detail?.sample_output}
          </pre>
        </>
      );

    case "my":
      return (
        <div className="text-gray-300">
          <h2 className="text-xl font-semibold mb-4">📄 My Submissions</h2>
          {userSubmissions.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            <SubmissionsList submissions={userSubmissions} />
          )}
        </div>
      );

    case "all":
      return (
        <div className="text-gray-300">
          <h2 className="text-xl font-semibold mb-4">📄 My Submissions</h2>
          {allSubmissions.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            <SubmissionsList submissions={allSubmissions} />
          )}
        </div>
      );

    default:
      return null;
  }
};

export default renderContent;
