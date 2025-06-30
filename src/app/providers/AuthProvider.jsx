import { createContext, useState, useEffect } from "react";
import { loginWithEmail, signupWithEmail, loginWithGoogle } from "@/lib/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username, token });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await loginWithEmail(email, password);
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('username', response.data.username);
        setUser({ username: response.data.username, token: response.data.access_token });
      } else {
        console.error("Login failed, no token received:", response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = async (googleToken) => {
    try {
      const response = await loginWithGoogle(googleToken);
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('username', response.data.username);
        setUser({ username: response.data.username, token: response.data.access_token });
      }
    } catch (error) {
      console.error("Google login failed on backend:", error);
      throw error.response?.data || new Error("Could not verify Google login.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    setUser(null);
    window.location.href = '/';
  };

  const value = {
    user,
    loading,
    login: handleLogin,
    googleLogin: handleGoogleLogin,
    logout: handleLogout,
    signup: signupWithEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};