import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../images/internship_logo.jpg";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [newPassword, setNewPassword] = useState("");

  // ✅ REGEX
  const emailPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const passwordPattern =
    /^[A-Za-z0-9@$!%*?&.#]{1,8}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= LOGIN + REGISTER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ EMAIL VALIDATION
    if (!emailPattern.test(formData.email)) {
      alert(
        "Email must contain at least 1 letter, 1 number, 1 special character and be in valid format"
      );
      return;
    }

    // ✅ PASSWORD VALIDATION
    if (!passwordPattern.test(formData.password)) {
      alert(
        "Password must be up to 8 characters and can include letters, numbers, and special characters"
      );
      return;
    }

    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/register";

    const body = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : formData;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);

        if (isLogin) {
          setIsLoggedIn(true);
          navigate("/home");
        } else {
          setIsLogin(true);
          setFormData({ name: "", email: "", password: "" });
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Server error");
    }
  };

  // ================= FORGOT PASSWORD =================
  const handleResetPassword = async () => {

    // ✅ PASSWORD VALIDATION FOR RESET
    if (!passwordPattern.test(newPassword)) {
      alert(
        "New password must be up to 8 characters and include valid characters"
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          newPassword: newPassword,
        }),
      });

      const data = await res.json();

      alert(data.message);

      if (data.success) {
        setShowForgot(false);
        setNewPassword("");
      }
    } catch (err) {
      console.log(err);
      alert("Error updating password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Internship Portal</h1>

        {/* Toggle Buttons */}
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {isLogin && (
            <div className="login-options">
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </span>
            </div>
          )}

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        {/* FORGOT PASSWORD */}
        {showForgot && (
          <div className="forgot-box">
            <h3>Reset Password</h3>

            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button onClick={handleResetPassword}>
              Update Password
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;