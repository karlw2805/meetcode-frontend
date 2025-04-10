import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };
  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg ${
          props.mode === "dark"
            ? "bg-dark navbar-dark"
            : "bg-light navbar-light"
        }`}
        style={{ border: "1px solid white" }}
      >
        <div className="container-fluid">
          <div className="navbar-brand">{props.title}</div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={role === "student" ? "/" : "/admin"}
                >
                  Home
                </Link>
                {/* <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <button
                className="btn btn-primary"
                style={{
                  color: "white",
                  height: "38px",
                  width: "100px",
                  marginLeft: "1000px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </ul>
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
