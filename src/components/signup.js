import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
const BASE_URL = process.env.REACT_APP_API_URL; // Ensure this is set in your .env file

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Sign-up form submitted");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    console.log(response);

    if (response.status === 200) {
      navigate("/login");
    } else {
      alert("Sign-up failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="input-group">
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password: </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button className="signup-button" type="submit">
            Sign Up
          </button>
          <button className="login-button" onClick={() => navigate("/login")}>
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
