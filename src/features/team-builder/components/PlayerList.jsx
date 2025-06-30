import React, { useState } from 'react';

function formatCurrency(value) {
  return `$${parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
}

const positions = ['All Positions', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

const PlayerList = ({ players, addPlayer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All Positions');

  const filteredPlayers = players
    .filter(player => selectedPosition === 'All Positions' || player.position === selectedPosition)
    .filter(player =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search players or teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
        />
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="w-full md:w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white"
        >
          {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <div key={player.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-lg">{player.name}</p>
                    <p className="text-gray-500 text-sm">{player.team}</p>
                  </div>
                  <p className="font-bold text-lg text-blue-600">{formatCurrency(player.value)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{player.position}</span>
                    <p className="text-sm mt-2">Points this season: <span className="font-semibold">{player.points}</span></p>
                  </div>
                  <span className="w-3 h-3 bg-green-500 rounded-full" title="Available"></span>
                </div>
              </div>
              <button
                onClick={() => addPlayer(player)}
                className="mt-4 w-full bg-[#1e40af] text-white font-semibold py-2 rounded-lg hover:bg-[#1c3899] transition"
              >
                + Add to Team
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            <p>No players match your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerList;