import React from 'react';

const Leaderboard = ({ rankings = [] }) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul className="space-y-2">
        {rankings.length ? (
          rankings.map((entry, index) => (
            <li key={index} className="p-2 border rounded">
              {index + 1}. {entry.name} - {entry.score} points
            </li>
          ))
        ) : (
          <p>No rankings available.</p>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;