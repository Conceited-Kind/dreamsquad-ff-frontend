import React, { useState } from 'react';
import axios from 'axios';

function SyncPlayers() {
  const [leagueId, setLeagueId] = useState(39); // Premier League
  const [season, setSeason] = useState(2024);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSync = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/players/sync`,
        { league_id: leagueId, season },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError('Sync failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Sync Players</h2>
      <form onSubmit={handleSync}>
        <div>
          <label>League ID:</label>
          <input
            type="number"
            value={leagueId}
            onChange={(e) => setLeagueId(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Season:</label>
          <input
            type="number"
            value={season}
            onChange={(e) => setSeason(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Sync</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SyncPlayers;