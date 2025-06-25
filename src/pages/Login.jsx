import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start space-x-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="font-semibold text-white">{title}</div>
        <div className="text-white text-sm">{desc}</div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [tab, setTab] = useState('login');
  const { user } = useAuth();

  if (user) {
    window.location.href = '/';
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-600">
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto p-4">
        {/* Left: Marketing */}
        <div className="flex-1 flex flex-col justify-center pr-0 md:pr-12 mb-8 md:mb-0">
          <h1 className="hero-title">
            Build Your <span className="highlight">Dream Squad</span>
          </h1>
          <p className="text-lg text-white mb-8">
            The simplest fantasy football platform. No complex rules, no premium fees – just pure football fun with friends.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="feature-icon">🏆</span>
              <div>
                <div className="font-semibold text-white">Compete & Win</div>
                <div className="text-white text-sm">Join leagues and climb the leaderboards</div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="feature-icon">👥</span>
              <div>
                <div className="font-semibold text-white">Play with Friends</div>
                <div className="text-white text-sm">Create private leagues with your crew</div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="feature-icon">📊</span>
              <div>
                <div className="font-semibold text-white">Real-Time Stats</div>
                <div className="text-white text-sm">Live updates from actual matches</div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="feature-icon">🛠️</span>
              <div>
                <div className="font-semibold text-white">Easy Team Building</div>
                <div className="text-white text-sm">Drag & drop interface</div>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Login Card */}
        <div className="flex-1 flex justify-center">
          <div className="card w-full max-w-md">
            <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">Join DreamSquad</h2>
            <p className="text-gray-600 mb-6 text-center">Start building your winning team today</p>
            <div className="tabs">
              <div className={`tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Login</div>
              <div className={`tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Sign Up</div>
            </div>
            <form>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full mb-3 px-4 py-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 px-4 py-2 border rounded"
              />
              <button className="btn-primary w-full">
                Login to DreamSquad
              </button>
            </form>
            <div className="my-4 text-center text-gray-400 text-xs">OR CONTINUE WITH</div>
            <button className="btn-google w-full">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}