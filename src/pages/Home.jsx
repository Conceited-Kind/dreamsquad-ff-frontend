import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/football-bg.jpg')" }}
    >
      <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center p-6 bg-gray-900 bg-opacity-80 rounded-xl max-w-lg">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to DreamSquad FF
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Build your dream football team, compete in leagues, and dominate the
            leaderboard!
          </p>
          {user ? (
            <button
              onClick={() => navigate("/draft")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-200 font-semibold"
            >
              Start Drafting
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-200 font-semibold"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
