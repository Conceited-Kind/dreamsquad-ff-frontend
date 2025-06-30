// src/features/leagues/components/LeagueCard.jsx
export default function LeagueCard({ league }) {
  return (
    <div className="bg-white rounded-card shadow-card p-4 mb-4">
      <h3 className="font-bold text-lg">{league.name}</h3>
      <p className="text-gray-600 text-sm">
        Members: {league.members} | Rank: #{league.rank} | Points: {league.points}
      </p>
      <button className="mt-2 bg-dream-green text-white px-4 py-2 rounded-pill text-sm">
        View League
      </button>
    </div>
  );
}