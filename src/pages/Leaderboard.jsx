import apiClient from "../backend";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RangeSelector from "../components/RangeSelector";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [range, setRange] = useState(10);
  const [localRank, setLocalRank] = useState(false);

  const navigate = useNavigate();
  const fetchTopUser = async () => {
    try {
      const response = await apiClient.get(`/api/top-users/?range=${range}`);
      setUsers(response.data);
      setLocalRank(false);
    } catch (error) {
      navigate("/register");
      toast.info("need to be logged to access this page");
    }
  };

  const fetchLocalRanks = async () => {
    try {
      const response = await apiClient.get(`/api/local-users/?range=${range}`);
      setUsers(response.data);
      setLocalRank(true);
    } catch (e) {}
  };

  useEffect(() => {
    fetchTopUser();
  }, []);

  useEffect(() => {
    if (range >= 1 && range <= 50) {
      if (localRank) {
        fetchLocalRanks();
      } else {
        fetchTopUser();
      }
    }
  }, [range]);
  return (
    <div className="w-full min-h-screen primary-text px-4">
      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="text-3xl font-bold text-center mb-8">🏆 Leaderboard</h1>
        <RangeSelector
          setRange={setRange}
          fetchLocalRanks={fetchLocalRanks}
          fetchTopUsers={fetchTopUser}
          localRank={localRank}
          range={range}
        />
        <div className="card-color shadow rounded-lg overflow-hidden mt-4">
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
                  className={`hover:bg-[#3a3b3c] transition border-b border-gray-800/50 ${
                    localStorage.getItem("username") == user.username
                      ? "bg-[#ecfdf3] text-[#189642]"
                      : ""
                  }`}
                >
                  <td
                    className={`py-3 px-4 font-semibold text-lg ${
                      localStorage.getItem("username") == user.username
                        ? "text-[#189642]"
                        : "text-yellow-300"
                    }`}
                  >
                    #{user.rank}
                  </td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4 text-[#189642] font-medium">
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
