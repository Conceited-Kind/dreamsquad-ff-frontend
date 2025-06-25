import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-yellow-400">DreamSquad FF</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Build your dream football team, compete in leagues, and dominate the leaderboard!
        </p>
        <button
          onClick={() => navigate(user ? "/draft" : "/login")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition w-full text-lg"
        >
          {user ? "Start Drafting" : "Get Started"}
        </button>
      </div>
    </div>
  );
}

export default Home;