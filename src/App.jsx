import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import TeamBuilder from "./pages/TeamBuilder";
import Dashboard from "./pages/Dashboard";
import Leagues from "./pages/Leagues";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/team-builder" element={<TeamBuilder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;