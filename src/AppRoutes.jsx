import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '@/pages/Landing.jsx';
import TeamBuilder from '@/pages/TeamBuilder.jsx';
import Leagues from '@/pages/Leagues.jsx';
import Dashboard from '@/pages/Dashboard.jsx';
import ProtectedRoute from '@/app/routes/ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/team-builder"
        element={
          <ProtectedRoute>
            <TeamBuilder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leagues"
        element={
          <ProtectedRoute>
            <Leagues />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
