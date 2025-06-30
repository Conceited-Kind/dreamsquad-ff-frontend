import { useState, useEffect, useCallback } from 'react';
import { getPlayers, getTeam, draftPlayer, removePlayerFromTeam } from '@/lib/api';

export const useTeamBuilders = () => {
  // State for the user's current team and all available players
  const [team, setTeam] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  
  // State for budget and loading/error status
  const [budget, setBudget] = useState(100.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch both the user's team and the list of all players
  const fetchData = useCallback(async () => {
    // No setLoading(true) here to prevent flicker on re-fetch
    try {
      // Fetch both sets of data in parallel for speed
      const [teamRes, playersRes] = await Promise.all([getTeam(), getPlayers()]);

      setTeam(teamRes.data.players || []);
      setBudget(teamRes.data.budget_left || 100.0);
      setAllPlayers(playersRes.data || []);

    } catch (err) {
      console.error("Failed to fetch team data:", err);
      setError("Could not load team builder data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data when the hook is first used
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to add a player to the team by calling the backend
  const addPlayerToTeam = async (player) => {
    // Optimistic UI update
    const currentTeam = team;
    const currentBudget = budget;
    
    // Check if player is already in the team to avoid duplicates
    if (team.some(p => p.id === player.id)) return;

    setTeam([...team, player]);
    setBudget(budget - player.value);

    try {
      await draftPlayer(player.id);
      // After successfully drafting, refresh the data to reflect the change
      await fetchData(); 
    } catch (err) {
      // Revert UI on failure
      alert(err.response?.data?.message || "Could not draft player.");
      setTeam(currentTeam);
      setBudget(currentBudget);
    }
  };

  // Function to remove a player from the team by calling the backend
  const removePlayerFromTeamUI = async (playerId) => {
    const playerToRemove = team.find(p => p.id === playerId);
    if (!playerToRemove) return;

    // Optimistic UI update
    const currentTeam = team;
    const currentBudget = budget;
    setTeam(team.filter(p => p.id !== playerId));
    setBudget(budget + playerToRemove.value);

    try {
      await removePlayerFromTeam(playerId);
      // After successfully removing, refresh the data
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Could not remove player.");
      // Revert UI on failure
      setTeam(currentTeam);
      setBudget(currentBudget);
    }
  };

  // Filter the list of all players to exclude those already on the team
  const availablePlayers = allPlayers.filter(p => !team.some(teamPlayer => teamPlayer.id === p.id));

  return { 
    team, 
    budget, 
    addPlayer: addPlayerToTeam, 
    removePlayer: removePlayerFromTeamUI, 
    availablePlayers, 
    loading, 
    error,
    fetchData // Expose fetchData to allow manual refresh
  };
};
