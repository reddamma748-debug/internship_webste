import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <div className="navbar">
      <h2><i>INTERNSHIP PORTAL</i></h2>

      <nav className="nav-links">
        <Link to="/home"><i>Home</i></Link>
        <Link to="/internships"><i>Internships</i></Link>
        <Link to="/resume"><i>Resume</i></Link>
      </nav>
    </div>
  );
}

export default Navbar;