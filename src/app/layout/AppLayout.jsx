import React, { useContext } from 'react';
import { AuthContext } from '@/app/providers/AuthProvider';
import NavBar from '@/app/layout/NavBar.jsx';
import AppRoutes from '@/AppRoutes.jsx';
import { useLocation } from 'react-router-dom';

const AppLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Only show NavBar if user is logged in and not on landing page
  const showNavBar = user && location.pathname !== '/';

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-green-500">
      {showNavBar && <NavBar />}
      <main>
        <AppRoutes />
      </main>
    </div>
  );
};

export default AppLayout;