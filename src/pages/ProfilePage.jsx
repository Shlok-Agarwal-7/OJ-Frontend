import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // or useRouter() for Next.js
import apiClient from "../backend";
import CodeDialog from "../components/CodeDialog";
import { toast } from "sonner";

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      const profileDataPromise = apiClient.get(`${username}`);
      const submissionsDataPromise = apiClient.get(`mysubmissions/${username}`);
      toast.promise(profileDataPromise, {
        loading: "loading Profile",
        error: "user doesn't exist",
        success: (res) => {
          setProfile(res.data);
          return "profile loaded"
        },
      });
      toast.promise(submissionsDataPromise, {
        loading: "loading submissions",
        error: "error fetching submissions",
        success: (res) => {
          setSubmissions(res.data);
          return "submissions loaded"
        },
      });
      try {
        await profileDataPromise;
        await submissionsDataPromise;
      } catch {}
    };
    fetchData();
  }, [username]);

  return (
    <div className="p-6 max-w-4xl mx-auto text-white min-h-screen">
      {/* Profile Info */}
      <div className="card-color p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {profile?.username}'s Profile
        </h1>
        <p>
          Points: <strong>{profile?.points}</strong>
        </p>
        <p>
          Rank: <strong>{profile?.rank}</strong>
        </p>
        <p>
          Role : <strong>{role}</strong>
        </p>
      </div>
      <h1 className="font-bold text-2xl mb-5">Submissions :</h1>

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
    </div>
  );
};

export default ProfilePage;
