import { useState, useEffect } from 'react';

const mockLeagues = [
  { id: 1, name: 'Premier League', members: 10, status: 'Open' },
  { id: 2, name: 'Champions League', members: 8, status: 'Closed' },
];

export const useLeagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLeagues(mockLeagues);
      setLoading(false);
    }, 1000);
  }, []);

  return { leagues, loading };
};