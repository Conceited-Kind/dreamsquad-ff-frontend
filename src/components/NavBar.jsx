import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full bg-dream-blue shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-white hover:text-dream-green transition">
          DreamSquad FF
        </NavLink>
        <div className="space-x-6 flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white text-lg font-semibold hover:text-dream-green transition ${isActive ? 'text-dream-green' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/draft"
            className={({ isActive }) =>
              `text-white text-lg font-semibold hover:text-dream-green transition ${isActive ? 'text-dream-green' : ''}`
            }
          >
            Draft
          </NavLink>
          <NavLink
            to="/league"
            className={({ isActive }) =>
              `text-white text-lg font-semibold hover:text-dream-green transition ${isActive ? 'text-dream-green' : ''}`
            }
          >
            League
          </NavLink>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-white text-lg font-semibold hover:text-dream-green transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-white text-lg font-semibold hover:text-dream-green transition ${isActive ? 'text-dream-green' : ''}`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;