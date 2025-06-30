export default function PlayerCard({ player }) {
  return (
    <div className="player-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 border-dream-green mb-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{player.name}</h3>
          <p className="text-gray-600 text-sm">{player.team} • {player.position}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-dream-blue">${player.value}M</p>
          <p className="text-sm text-dream-green">{player.points} pts</p>
        </div>
      </div>
    </div>
  )
}