import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Build Your Dream Squad</h1>
          <p className="text-xl text-blue-100 mb-10">
            The simplest fantasy football platform. No complex rules, no premium fees - just pure football fun with friends.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white mb-3">Compete & Win</h3>
              <p className="text-blue-100">Join leagues and climb the leaderboards</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white mb-3">Real-Time Stats</h3>
              <p className="text-blue-100">Live updates from actual matches</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white mb-3">Play with Friends</h3>
              <p className="text-blue-100">Create private leagues with your crew</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white mb-3">Easy Team Building</h3>
              <p className="text-blue-100">Drag & drop interface</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Join DreamSquad</h2>
            <p className="text-gray-600 mb-6">Start building your winning team today</p>
            
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="you@email.com" 
                className="form-input"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="form-input"
              />
              <button className="btn-primary w-full">
                Login to DreamSquad
              </button>
              <button className="btn-secondary w-full">
                Sign Up
              </button>
            </div>
            
            <div className="my-4 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">OR CONTINUE WITH</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 hover:bg-gray-50 transition">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}