import LeagueList from '../components/LeagueList';
import Leaderboard from '../components/Leaderboard';

function League() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20"> {/* Added pt-20 for navbar offset */}
      <LeagueList />
      <Leaderboard />
    </div>
  );
}

export default League;