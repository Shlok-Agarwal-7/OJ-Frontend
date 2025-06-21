const topUsers = [
  { rank: 1, name: "Alice", points: 980 },
  { rank: 2, name: "Bob", points: 930 },
  { rank: 3, name: "Charlie", points: 870 },
  { rank: 4, name: "Dave", points: 850 },
  { rank: 5, name: "Eve", points: 820 },
  { rank: 6, name: "Frank", points: 800 },
  { rank: 7, name: "Grace", points: 790 },
  { rank: 8, name: "Heidi", points: 775 },
  { rank: 9, name: "Ivan", points: 760 },
  { rank: 10, name: "Judy", points: 750 },
];

export default function Leaderboard() {
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
              {topUsers.map((user, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#3a3b3c] transition border-b border-gray-800/50"
                >
                  <td className="py-3 px-4 font-semibold text-lg text-yellow-300">
                    #{user.rank}
                  </td>
                  <td className="py-3 px-4">{user.name}</td>
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
