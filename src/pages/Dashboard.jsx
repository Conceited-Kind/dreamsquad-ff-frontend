import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import PrimaryButton from '@/ui/buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { getDashboardData } from '@/lib/api';
import { FiShield, FiTrendingUp, FiUsers, FiDollarSign } from 'react-icons/fi';

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-transform transform hover:-translate-y-1">
    <div className="text-3xl text-blue-500 mx-auto mb-3">{icon}</div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
    <p className="text-gray-600 font-medium">{title}</p>
  </div>
);

const TopPerformerCard = ({ player }) => (
  <div className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
    <div className="flex items-center gap-3">
      <img src={player.photo} alt={player.name} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
      <div>
        <p className="font-semibold text-gray-800">{player.name}</p>
        <p className="text-xs text-gray-500">{player.position}</p>
      </div>
    </div>
    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">{player.points} pts</span>
  </div>
);

const LeagueStandingRow = ({ standing, currentUsername }) => (
  <li className={`flex justify-between p-3 rounded-lg ${standing.owner_name === currentUsername ? 'bg-blue-50' : ''}`}>
    <p className="font-semibold">#{standing.rank} {standing.team_name}</p>
    <p className="font-bold">{standing.points} pts</p>
  </li>
);

// --- Main Dashboard Component ---
export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setDashboardData(response.data);
      } catch (err) {
        setError("Failed to load dashboard data. Please try logging in again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) return <div className="text-center p-10">Loading Dashboard...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!dashboardData) return <div className="text-center p-10">Could not load dashboard information.</div>;

  const { team_name, total_points, league_rank, team_budget, squad_size, top_performers, league_standings_snippet, upcoming_match } = dashboardData;

  const stats = [
    { icon: <FiTrendingUp />, title: 'Total Points', value: total_points },
    { icon: <FiShield />, title: 'League Rank', value: league_rank !== 'N/A' ? `#${league_rank}` : 'N/A' },
    { icon: <FiDollarSign />, title: 'Team Budget', value: `$${team_budget.toFixed(1)}M` },
    { icon: <FiUsers />, title: 'Squad Size', value: `${squad_size}/11` },
  ];

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Welcome back, {user?.username || 'Coach'}!</h1>
            <p className="text-lg opacity-90 mt-1">Your team "{team_name}" is ready for the next challenge.</p>
          </div>
          <PrimaryButton 
            variant="light" 
            onClick={() => navigate('/team-builder')}
          >
            Edit Team
          </PrimaryButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upcoming Match</h2>
            <div className="flex justify-around items-center text-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-bold text-lg text-blue-600">{team_name}</p>
                <p className="text-3xl font-bold text-gray-800">{total_points}</p>
                <p className="text-sm text-gray-500">Your Points</p>
              </div>
              <p className="text-2xl font-bold text-gray-400">vs</p>
              <div>
                <p className="font-bold text-lg text-gray-600">{upcoming_match.opponent_name}</p>
                <p className="text-3xl font-bold text-gray-800">{upcoming_match.opponent_points}</p>
                <p className="text-sm text-gray-500">Their Points</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Top Performers</h2>
            <div className="space-y-3">
              {top_performers.length > 0 ? top_performers.map((player, index) => (
                <TopPerformerCard key={index} player={player} />
              )) : <p className="text-gray-500">Draft players to see your top performers.</p>}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">League Standings</h2>
          <ol className="space-y-2">
            {league_standings_snippet.length > 0 ? league_standings_snippet.map((standing) => (
              <LeagueStandingRow key={standing.rank} standing={standing} currentUsername={user.username} />
            )) : <p className="text-gray-500">Join a league to see your rank.</p>}
          </ol>
        </div>
      </div>
    </div>
  );
}
