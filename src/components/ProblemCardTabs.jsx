const renderContent = ({ activeTab, detail }) => {
   
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
          <p>No submissions yet.</p>
        </div>
      );

    case "all":
      return (
        <div className="text-gray-300">
          <h2 className="text-xl font-semibold mb-4">🌍 All Submissions</h2>
          <p>All recent submissions will appear here.</p>
        </div>
      );

    default:
      return null;
  }
};

export default renderContent;
