import apiClient from "../backend";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopUser = async () => {
      try {
        const response = await apiClient.get("/api/top-users");
        setUsers(response.data);
      } catch (error) {
        navigate("/register");
        toast.info("Need to be logged in to access page");
      }
    };

    fetchTopUser();
  }, []);
  return (
    <div className="w-full min-h-screen primary-text px-4">
      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="text-3xl font-bold text-center mb-8">🏆 Leaderboard</h1>

        <div className="card shadow rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#3a3b3c] primary-text text-sm uppercase">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#3a3b3c] transition border-b border-gray-800/50"
                >
                  <td className="py-3 px-4 font-semibold text-lg text-yellow-300">
                    #{idx + 1}
                  </td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4 text-green-400 font-medium">
                    {user.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
