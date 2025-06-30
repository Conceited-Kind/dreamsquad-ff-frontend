import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        { email, password }
      );
      setToken(response.data.access_token);
      setError('');
      localStorage.setItem('token', response.data.access_token); 
      alert('Login successful! Token: ' + response.data.access_token);
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h1>DreamSquad FF</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {token && <p>Token: {token}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;