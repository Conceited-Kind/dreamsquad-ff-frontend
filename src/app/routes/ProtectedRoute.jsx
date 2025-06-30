import { useContext } from "react";
import { AuthContext } from "@/app/providers/AuthProvider";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or a loading spinner

  return user ? children : <Navigate to="/" replace />;
}