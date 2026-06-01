import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CalendarDays, LogOut, Sparkles, UserRound } from "lucide-react";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="site-header">
      <nav className="navbar container">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          Eventify
        </Link>

        <div className="nav-links">
          <NavLink to="/events">Events</NavLink>
          {user?.role === "student" && <NavLink to="/reservations">My Reservations</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin">Admin Dashboard</NavLink>}
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-pill">
                <UserRound size={16} />
                {user.name}
              </span>
              <button type="button" className="icon-text-button ghost-button" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="plain-link" to="/login">
                Login
              </NavLink>
              <NavLink className="primary-button small-button" to="/register">
                <CalendarDays size={16} />
                Join
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
