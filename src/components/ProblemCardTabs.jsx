import SubmissionsList from "./SubmissionsList";
import Markdown from "react-markdown";
import AIHintBox from "./aiHintBox";

const renderContent = ({
  activeTab,
  detail,
  userSubmissions,
  allSubmissions,
  handleUserSubmissions,
  handleAllSubmissions,
  nextUserUrl,
  prevUserUrl,
  nextAllUrl,
  prevAllUrl
}) => {
  switch (activeTab) {
    case "problem":
      return (
        <div className="max-h-[100vh] overflow-y-auto pr-2 text-white">
          <h2 className="text-xl font-semibold mb-4">{detail?.title}</h2>
          <div className="mb-2">
            <Markdown>{detail?.question}</Markdown>
          </div>
          <h3 className="mt-4 mb-2 font-bold">Time Limit & Memory Limit</h3>
          <pre className="bg-[#3a3b3c] p-2 rounded">
            {detail?.time_limit}s,{detail?.memory_limit} MB
          </pre>
          <h3 className="mt-4 mb-2 font-bold">Sample Input:</h3>
          <pre className="bg-[#3a3b3c] p-2 rounded">{detail?.sample_input}</pre>
          <h3 className="mt-4 mb-2 font-bold">Sample Output:</h3>
          <pre className="bg-[#3a3b3c] p-2 rounded">
            {detail?.sample_output}
          </pre>
        </div>
      );

    case "my":
      return (
        <div>
          <div className="text-gray-300">
            <h2 className="text-xl font-semibold mb-4">📄 My Submissions</h2>
            {userSubmissions.length === 0 ? (
              <p>No submissions yet.</p>
            ) : (
              <SubmissionsList submissions={userSubmissions} />
            )}
          </div>
          <div className="join">
            <button className="join-item btn" onClick={handleUserSubmissions(prevUserUrl)}>«</button>
            <button className="join-item btn" onClick={handleUserSubmissions(nextUserUrl)}>»</button>
          </div>
        </div>
      );

    case "all":
      return (
        <div>
          <div className="text-gray-300">
            <h2 className="text-xl font-semibold mb-4">📄 My Submissions</h2>
            {allSubmissions.length === 0 ? (
              <p>No submissions yet.</p>
            ) : (
              <SubmissionsList submissions={allSubmissions} />
            )}
          </div>
          <button className="join-item btn" onClick = {handleAllSubmissions(prevAllUrl)}>«</button>
          <button className="join-item btn" onClick={handleAllSubmissions(nextAllUrl)}>»</button>
        </div>
      );
    case "ai":
      return <AIHintBox title={detail?.title} question={detail?.question} />;

    default:
      return null;
  }
};

export default renderContent;
