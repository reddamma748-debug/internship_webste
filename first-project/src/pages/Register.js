import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (email && password) {
      alert("Registration Successful");
      navigate("/");
    } else {
      alert("Enter Email and Password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Register</h2>

        <form onSubmit={handleRegister}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Register
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;