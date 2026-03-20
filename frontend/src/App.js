import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Internships from "./pages/Internships";
import Resume from "./pages/Resume";
import Login from "./pages/Login";
import CreateResume from "./pages/CreateResume";
import ApplyForm from "./pages/ApplyForm";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* Register handled in Login.js toggle */}
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/internships" element={isLoggedIn ? <Internships /> : <Navigate to="/login" />} />
        <Route path="/resume" element={isLoggedIn ? <Resume /> : <Navigate to="/login" />} />
        <Route path="/apply" element={isLoggedIn ? <ApplyForm /> : <Navigate to="/login" />} />
        <Route path="/create-resume" element={isLoggedIn ? <CreateResume /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;