import React, { useState, useContext } from 'react';
import { AuthContext } from '@/app/providers/AuthProvider';
import { GoogleLogin } from '@react-oauth/google';
import PrimaryButton from '@/ui/buttons/PrimaryButton';
import AuthInput from '@/ui/inputs/AuthInput';

export default function AuthCard() {
  const [mode, setMode] = useState('login');
  const isLoginMode = mode === 'login';

  const { login, signup, googleLogin } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLoginMode) {
        await login(email, password);
      } else {
        if (password !== confirm) throw new Error("Passwords do not match");
        await signup(username, email, password);
        alert("Registration successful! Please log in.");
        setMode('login');
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://dreamsquad-ff-backend-2.onrender.com/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: credentialResponse.credential })
      });
      if (!response.ok) throw new Error(`Google login failed: ${response.status}`);
      const data = await response.json();
      await googleLogin(data.access_token); // Pass the backend's JWT to AuthContext
      console.log('Google login success:', data);
    } catch (error) {
      setError(error.message || 'Google login failed');
      console.error('Google login failed:', error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Join DreamSquad</h2>
      <p className="text-center text-gray-600 mb-6">Start building your winning team today</p>

      <div className="flex border-b mb-6">
        <button onClick={() => setMode('login')} className={`flex-1 py-2 font-semibold transition-all duration-300 ${isLoginMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Login</button>
        <button onClick={() => setMode('signup')} className={`flex-1 py-2 font-semibold transition-all duration-300 ${!isLoginMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Sign Up</button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLoginMode && (
          <AuthInput placeholder="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        )}
        <AuthInput placeholder="you@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <AuthInput type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        {!isLoginMode && (
          <AuthInput type="password" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
        )}
        {error && <div className="text-red-500 text-sm text-center my-2">{error}</div>}
        <PrimaryButton type="submit" disabled={loading} className="w-full">
          {loading ? (isLoginMode ? 'Logging in...' : 'Signing up...') : (isLoginMode ? 'Login to DreamSquad' : 'Create Account')}
        </PrimaryButton>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError('Google login failed')}
          useOneTap
        />
      </div>
    </div>
  );
}