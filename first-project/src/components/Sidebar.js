import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/resume">Resume</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Sidebar;