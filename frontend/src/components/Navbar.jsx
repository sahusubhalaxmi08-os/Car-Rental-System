import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">
          🚗 CarRental
        </Link>
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/cars">Cars</Link>

        {user && (
          <Link to="/my-bookings">
            My Bookings
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin/dashboard">
            Admin
          </Link>
        )}

        {user ? (
          <>
            <Link to="/profile">
              Profile
            </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;