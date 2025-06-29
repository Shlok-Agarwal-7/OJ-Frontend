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
          <p className="mb-2">{detail?.question}</p>
          <h3 className="mt-4 mb-2 font-bold">Input:</h3>
          <pre className="bg-[#3a3b3c] p-2 rounded">
            {detail?.testcases[0]?.input}
          </pre>
          <h3 className="mt-4 mb-2 font-bold">Output:</h3>
          <pre className="bg-[#3a3b3c] p-2 rounded">
            {detail?.testcases[0]?.output}
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
            <ul className="space-y-2">
              {userSubmissions.map((submission, index) => (
                <li key={index} className="bg-[#3a3b3c] p-3 rounded shadow-md">
                  <p>
                    <span className="font-bold">Language:</span>{" "}
                    {submission.language}
                  </p>
                  <p>
                    <span className="font-bold">Verdict:</span>{" "}
                    {submission.verdict}
                  </p>
                </li>
              ))}
            </ul>
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
            <ul className="space-y-2">
              {allSubmissions.map((submission, index) => (
                <li key={index} className="bg-[#3a3b3c] p-3 rounded shadow-md">
                  <p>
                    <span className="font-bold">Language:</span>{" "}
                    {submission.language}
                  </p>
                  <p>
                    <span className="font-bold">Verdict:</span>{" "}
                    {submission.verdict}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    default:
      return null;
  }
};

export default renderContent;
