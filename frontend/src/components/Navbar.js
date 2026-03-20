import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/internship_logo.jpg"; // Make sure path is correct
import "../App.css";

function Navbar() {

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-title">Internship Portal</span>
      </div>
      
      <div className="navbar-right">
        <Link to="/home">Home</Link>
        <Link to="/internships">Internships</Link>
        <Link to="/resume">Resume</Link>
      </div>
    </nav>
  );
}

export default Navbar;