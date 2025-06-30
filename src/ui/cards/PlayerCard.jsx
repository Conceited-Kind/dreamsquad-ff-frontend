import React from 'react';
import { formatCurrency } from './formatters.js';

const PlayerCard = ({ player }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-bold">{player.name}</h3>
      <p className="text-gray-600">Position: {player.position}</p>
      <p className="text-gray-600">Value: {formatCurrency(player.value)}</p>
      <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add to Team
      </button>
    </div>
  );
};

export default PlayerCard;