import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
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

// --- Authentication Functions ---
export const loginWithEmail = (email, password) => api.post('/auth/login', { email, password });
export const signupWithEmail = (username, email, password) => api.post('/auth/register', { username, email, password });

// NEW: Function to handle Google Login
// It takes the credential token from Google and sends it to our backend
export const loginWithGoogle = (token) => api.post('/auth/google', { token });


// --- Other API Functions ---
export const getDashboardData = () => api.get('/dashboard');
export const getPlayers = () => api.get('/players');
// ... and all your other functions
export const getTeam = () => api.get('/team');
export const draftPlayer = (playerId) => api.post('/team/draft', { player_id: playerId });
export const removePlayerFromTeam = (playerId) => api.post('/team/remove_player', { player_id: playerId });
export const getMyLeagues = () => api.get('/leagues/my-leagues');
export const getPublicLeagues = () => api.get('/leagues/public');
export const getLeagueDetails = (leagueId) => api.get(`/leagues/${leagueId}`);
export const createLeague = (name) => api.post('/leagues/create', { name });
export const joinLeague = (code) => api.post('/leagues/join', { code });

export default api;

export const leaveLeague = (leagueId) => api.post(`/leagues/${leagueId}/leave`);
export const deleteLeague = (leagueId) => api.delete(`/leagues/${leagueId}`);
