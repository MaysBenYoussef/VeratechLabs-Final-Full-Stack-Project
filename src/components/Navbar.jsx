import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token") !== null;

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo-img" />

        <div className="logo-text">
          VeraTechLabs
        </div>
      </div>

      <div className="nav-center">
        <a href="/">Home</a>

        <a href="#about">About</a>

        <a href="#services">Services</a>

        <a href="#WhyChooseUs">Why Choose Us</a>

        <a href="#contact">Contact</a>
      </div>

      <div className="nav-right">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        ) : (
          <>
          
            <Link to="/dashboard" className="dashboard-btn">
              Dashboard
            </Link>

           
            {user?.role === "admin" && (
              <div className="dropdown">
                <button className="manage-btn">
                  Management ▼
                </button>

                <div className="dropdown-content">
  <Link to="/service-management">
    Manage Services
  </Link>

  <Link to="/request-management">
    Manage Requests
  </Link>

  <Link to="/documents">
    Documents
  </Link>

  <Link to="/clients">
    Clients
  </Link>

  <Link to="/projects">
    Projects
  </Link>

  <Link to="/project-dashboard">
    Project Dashboard
  </Link>
</div>
              </div>
            )}

            
            {user?.role === "employee" && (
              <Link
                to="/request-management"
                className="dashboard-btn"
              >
                Manage Requests
              </Link>
            )}

            
            <Link
              to="/request-service"
              className="request-btn"
            >
              Request Service
            </Link>

            
            <button
              onClick={logout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;