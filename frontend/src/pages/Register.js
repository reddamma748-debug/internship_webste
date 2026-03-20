import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful");

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter Name"
            required
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            required
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit">Register</button>

        </form>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;