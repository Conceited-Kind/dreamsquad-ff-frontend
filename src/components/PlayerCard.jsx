function PlayerCard({ player, index, draggableProps, dragHandleProps, innerRef }) {
    return (
      <div
        ref={innerRef}
        {...draggableProps}
        {...dragHandleProps}
        className="bg-gray-700 p-4 rounded-xl shadow-lg mb-3 hover:bg-gray-600 transition duration-200 cursor-grab"
      >
        <h3 className="text-lg font-bold text-white">{player.name}</h3>
        <p className="text-sm text-gray-300">{player.team} | {player.position}</p>
        <div className="flex justify-between mt-2">
          <p className="text-sm text-green-400 font-semibold">Value: ${player.value}m</p>
          <p className="text-sm text-green-400 font-semibold">Points: {player.points}</p>
        </div>
      </div>
    );
  }
  
  export default PlayerCard;     PlayerCard.jsx