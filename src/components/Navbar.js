import React from "react";
import PropTypes from "prop-types";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
  const role = localStorage.getItem("role");
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const hideLogoutPath =
    location.pathname === "/login" || location.pathname === "/signin";

  // Hide Home and Logout if role is workspace OR if path starts with /workspace
  const hideNav =
    role === "workspace" || location.pathname.startsWith("/workspace");

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#1e1e1e" }}
      >
        <div className="container-fluid">
          <div className="navbar-brand">{props.title}</div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!hideLogoutPath && !hideNav && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={role === "student" ? "/" : "/admin"}
                  >
                    Home
                  </Link>
                </li>
              </ul>
            )}
            {!hideLogoutPath && !hideNav && (
              <button className="login-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(["light", "dark"]),
};

export default Navbar;
