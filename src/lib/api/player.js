export const getPlayerFullName = (player) => {
  return `${player.firstName} ${player.lastName}`;
};

export const getPlayerStats = (player) => {
  return {
    goals: player.stats?.goals || 0,
    assists: player.stats?.assists || 0,
    matches: player.stats?.matches || 0,
  };
};