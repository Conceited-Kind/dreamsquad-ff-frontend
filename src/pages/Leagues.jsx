import React, { useState, useEffect, useCallback, useContext, createContext } from 'react';
import axios from 'axios';

// --- START: SELF-CONTAINED HELPER COMPONENTS AND HOOKS ---
// To resolve any import errors, all necessary components and functions are now included directly in this file.

// 1. API Layer
const api = axios.create({
  baseURL: 'http://localhost:5000', // Hardcoded URL to fix build issues
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const getMyLeagues = () => api.get('/leagues/my-leagues');
const getPublicLeagues = () => api.get('/leagues/public');
const getLeagueDetails = (leagueId) => api.get(`/leagues/${leagueId}`);
const createLeague = (name) => api.post('/leagues/create', { name });
const joinLeague = (code) => api.post('/leagues/join', { code });
const leaveLeague = (leagueId) => api.post(`/leagues/${leagueId}/leave`);
const deleteLeague = (leagueId) => api.delete(`/leagues/${leagueId}`);


// 2. Auth Context (Simplified for this component)
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setUser({ username });
        }
    }, []);
    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};


// 3. UI Components
const PrimaryButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    light: 'bg-white text-purple-700 font-bold shadow transition hover:bg-gray-100',
    'light-outline': 'bg-transparent border-2 border-white text-white font-bold transition hover:bg-white/10',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };
  return (
    <button className={`py-2 px-4 rounded-lg font-semibold text-sm ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{children[0]}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        {children.slice(1)}
      </div>
    </div>
  );
};

// 4. Icon Components
const FiUsers = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const FiLock = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const FiTrophy = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>;
const FiTrash2 = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const FiLogOut = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;

// --- Main Page Sub-Components ---
const LeagueCard = ({ league, onSelect, isActive, onLeave, onDelete }) => (
  <div className={`w-full text-left p-4 border rounded-lg transition-all ${isActive ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500' : 'bg-white border-gray-200 hover:shadow-md'}`}>
    <div className="flex justify-between items-start cursor-pointer" onClick={() => onSelect(league.id)}>
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-gray-800">{league.name}</h3>
        <div className="flex items-center gap-x-4 text-sm text-gray-500 mt-1">
          <span className="flex items-center"><FiUsers className="mr-1.5"/>{league.members} / {league.maxMembers || 12}</span>
          {league.code && <span className="flex items-center"><FiLock className="mr-1.5"/> Code: {league.code}</span>}
        </div>
      </div>
      <div className="text-right flex-shrink-0 ml-4">
        <p className="font-bold text-blue-600 text-xl">Rank #{league.rank}</p>
        <p className="text-sm text-gray-600">{league.points} pts</p>
      </div>
    </div>
    <div className="border-t mt-3 pt-3 flex justify-end gap-2">
      {league.isOwner ? (
        <PrimaryButton onClick={() => onDelete(league.id, league.name)} variant="danger">
          <FiTrash2 className="inline-block mr-1" /> Delete
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={() => onLeave(league.id, league.name)} variant="secondary">
          <FiLogOut className="inline-block mr-1" /> Leave
        </PrimaryButton>
      )}
    </div>
  </div>
);

const StandingsSidebar = ({ leagueDetails, currentUsername }) => {
    if (!leagueDetails) return <div className="bg-white p-6 rounded-xl shadow-lg h-full flex items-center justify-center"><p className="text-gray-500">Select a league to view standings.</p></div>;
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><FiTrophy className="text-yellow-500" /> {leagueDetails.name}</h2>
            <p className="text-sm text-gray-500 mb-4">Live Standings</p>
            <ol className="space-y-2">
                {leagueDetails.standings.map(team => (
                    <li key={team.rank} className={`flex justify-between p-3 rounded-lg ${team.owner_name === currentUsername ? 'bg-blue-100' : 'bg-gray-50'}`}>
                        <div className="flex items-center"><span className="font-semibold text-gray-500 w-8">#{team.rank}</span><p className="font-semibold text-gray-800">{team.team_name}</p></div>
                        <p className="font-bold text-gray-700">{team.points} pts</p>
                    </li>
                ))}
            </ol>
        </div>
    );
};


// --- Main Leagues Page Component ---
const LeaguesPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('myLeagues');
  const [myLeagues, setMyLeagues] = useState([]);
  const [selectedLeagueDetails, setSelectedLeagueDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const [newLeagueName, setNewLeagueName] = useState('');
  const [joinLeagueCode, setJoinLeagueCode] = useState('');

  const handleSelectLeague = useCallback(async (leagueId) => {
    try {
        const response = await getLeagueDetails(leagueId);
        setSelectedLeagueDetails(response.data);
    } catch (err) { alert("Could not load league details."); }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const myLeaguesRes = await getMyLeagues();
      const myLeaguesData = myLeaguesRes.data || [];
      setMyLeagues(myLeaguesData);
      
      if (myLeaguesData.length > 0 && (!selectedLeagueDetails || !myLeaguesData.find(l => l.id === selectedLeagueDetails.id))) {
        handleSelectLeague(myLeaguesData[0].id);
      } else if (myLeaguesData.length === 0) {
        setSelectedLeagueDetails(null);
      }
    } catch (err) {
      console.error("Failed to load leagues:", err);
    } finally {
      setLoading(false);
    }
  }, [handleSelectLeague, selectedLeagueDetails]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreateLeague = async () => {
    if (!newLeagueName) return alert("Please enter a name for your league.");
    try {
      await createLeague(newLeagueName);
      setCreateModalOpen(false);
      setNewLeagueName('');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create league.");
    }
  };
  
  const handleJoinLeague = async (code) => {
    if (!code) return alert("Please enter a league code.");
    try {
      await joinLeague(code);
      setJoinModalOpen(false);
      setJoinLeagueCode('');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to join league.");
    }
  };

  const handleLeaveLeague = async (leagueId, leagueName) => {
    if (window.confirm(`Are you sure you want to leave the league "${leagueName}"?`)) {
        try {
            await leaveLeague(leagueId);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to leave league.");
        }
    }
  };

  const handleDeleteLeague = async (leagueId, leagueName) => {
    if (window.confirm(`Are you sure you want to permanently delete "${leagueName}"? This cannot be undone.`)) {
        try {
            await deleteLeague(leagueId);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete league.");
        }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 mb-8 text-white shadow-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Fantasy Leagues</h1>
                    <p className="text-lg opacity-90">Compete with friends and players worldwide</p>
                </div>
                <div className="flex gap-4">
                    <PrimaryButton variant="light" onClick={() => setCreateModalOpen(true)}>+ Create League</PrimaryButton>
                    <PrimaryButton variant="light-outline" onClick={() => setJoinModalOpen(true)}>Join with Code</PrimaryButton>
                </div>
            </div>
        </div>
        
        <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
                <button onClick={() => setActiveTab('myLeagues')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'myLeagues' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>My Leagues</button>
                {/* Find a League tab can be added back here */}
            </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                {loading ? <p>Loading leagues...</p> : myLeagues.length > 0 ? (
                    myLeagues.map(league => <LeagueCard key={league.id} league={league} onSelect={handleSelectLeague} isActive={selectedLeagueDetails?.id === league.id} onLeave={handleLeaveLeague} onDelete={handleDeleteLeague} />)
                ) : <div className="bg-white p-6 rounded-xl text-center text-gray-500">You haven't joined any leagues yet.</div>}
            </div>
            <div className="lg:col-span-1">
                <StandingsSidebar leagueDetails={selectedLeagueDetails} currentUsername={user?.username} />
            </div>
        </div>
      </div>
      <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
        <>Create New League</>
        <p className="text-gray-600 mb-4">Start your own fantasy league and invite friends to compete.</p>
        <input type="text" value={newLeagueName} onChange={e => setNewLeagueName(e.target.value)} placeholder="League Name" className="w-full p-2 border rounded mb-4" />
        <PrimaryButton onClick={handleCreateLeague} className="w-full">Create</PrimaryButton>
      </Modal>
      <Modal isOpen={isJoinModalOpen} onClose={() => setJoinModalOpen(false)}>
        <>Join Private League</>
        <p className="text-gray-600 mb-4">Enter a league code to join a private league.</p>
        <input type="text" value={joinLeagueCode} onChange={e => setJoinLeagueCode(e.target.value)} placeholder="Enter League Code" className="w-full p-2 border rounded mb-4" />
        <PrimaryButton onClick={() => handleJoinLeague(joinLeagueCode)} className="w-full">Join</PrimaryButton>
      </Modal>
    </div>
  );
}

export default function Leagues() {
    return (
        <AuthProvider>
            <LeaguesPage />
        </AuthProvider>
    )
}
