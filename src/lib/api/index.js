import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Authentication Functions
export const loginWithEmail = (email, password) => 
  api.post('/auth/login', { email, password });

export const signupWithEmail = (username, email, password) => 
  api.post('/auth/register', { username, email, password });

export const loginWithGoogle = (token) => 
  api.post('/auth/google', { token });

// Team Functions
export const getTeam = () => api.get('/team');
export const draftPlayer = (playerId) => 
  api.post('/team/draft', { player_id: playerId });
export const removePlayerFromTeam = (playerId) => 
  api.post('/team/remove_player', { player_id: playerId });

// Player Functions
export const getPlayers = () => api.get('/players');

// League Functions
export const getMyLeagues = () => api.get('/leagues/my-leagues');
export const getPublicLeagues = () => api.get('/leagues/public');
export const getLeagueDetails = (leagueId) => 
  api.get(`/leagues/${leagueId}`);
export const createLeague = (name) => 
  api.post('/leagues/create', { name });
export const joinLeague = (code) => 
  api.post('/leagues/join', { code });

// Dashboard Functions
export const getDashboardData = () => api.get('/dashboard');

export default api;