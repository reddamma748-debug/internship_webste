import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Internships from "./pages/Internships";
import Resume from "./pages/Resume";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateResume from "./pages/CreateResume";
import ApplyForm from "./pages/ApplyForm";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />

        <Route
          path="/internships"
          element={isLoggedIn ? <Internships /> : <Navigate to="/" />}
        />

        <Route
          path="/resume"
          element={isLoggedIn ? <Resume /> : <Navigate to="/" />}
        />

        <Route
          path="/apply"
          element={isLoggedIn ? <ApplyForm /> : <Navigate to="/" />}
        />

        <Route
          path="/create-resume"
          element={isLoggedIn ? <CreateResume /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;