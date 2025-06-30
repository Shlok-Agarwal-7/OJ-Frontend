import CodeDialog from "./CodeDialog";

const SubmissionsList = ({ submissions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#2c2c2e] text-left text-sm rounded shadow">
        <thead>
          <tr className="text-white bg-[#1f1f21]">
            <th className="px-4 py-2">Problem</th>
            <th className="px-4 py-2">Language</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Verdict</th>
            <th className="px-4 py-2">Code</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          {submissions.map((submission, index) => (
            <tr
              key={index}
              className={`border-t border-[#444] ${
                submission.verdict === "Accepted"
                  ? "bg-[#ecfdf3] text-[#189642]"
                  : "bg-[#fff0f0] text-[#e81414] "
              }`}
            >
              <td className="px-4 py-2">{submission.problem}</td>
              <td className="px-4 py-2">{submission.language}</td>
              <td className="px-4 py-2">{submission.user}</td>
              <td className="px-4 py-2">{submission.verdict}</td>
              <td className="px-4 py-2">
                <CodeDialog code={submission.code} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsList;
