const renderContent = ({ activeTab }) => {
    
  switch (activeTab) {
    case "problem":
      return (
        <>
          <h2 className="text-xl font-semibold mb-4">2 SUM</h2>
          <p className="mb-2">
            Given an array of integers, return indices of the two numbers such
            that they add up to a specific target.
          </p>
          <p className="mb-2">
            You may assume that each input would have exactly one solution.
          </p>
          <h3 className="mt-4 mb-2 font-bold">Input:</h3>
          <pre className="bg-[#3a3b3c] p-2 rounded">
            nums = [2,7,11,15], target = 9
          </pre>
          <h3 className="mt-4 mb-2 font-bold">Output:</h3>
          <pre className="bg-[#3a3b3c] p-2 rounded">[0,1]</pre>
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
