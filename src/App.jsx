import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Draft from "./pages/Draft";
import League from "./pages/League";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/draft" element={<Draft />} />
        <Route path="/league" element={<League />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
