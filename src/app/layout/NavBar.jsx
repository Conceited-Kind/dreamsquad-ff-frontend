import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth.js'; // This hook provides everything we need
import { FiHome, FiUsers, FiAward, FiLogOut } from "react-icons/fi";

export default function NavBar() {
  // FIX: Get the logout function directly from our useAuth hook
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      // This now calls the logout function from our AuthProvider
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // No changes needed below this line
  if (loading) return null;

  return (
    <nav className="bg-white shadow px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="bg-green-400 rounded-lg p-2 text-2xl text-white">
            <FiAward />
          </span>
          <span className="font-bold text-lg text-gray-800">DreamSquad</span>
        </div>
        {/* Nav Links */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <FiHome /> Dashboard
          </NavLink>
          <NavLink
            to="/team-builder"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <FiUsers /> Team Builder
          </NavLink>
          <NavLink
            to="/leagues"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <FiAward /> Leagues
          </NavLink>
        </div>
        {/* Right Side: Logout */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600"
          >
            <FiLogOut className="text-xl" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
