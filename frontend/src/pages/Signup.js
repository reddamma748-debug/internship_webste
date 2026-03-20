import React from "react";

function Signup({ setShowSignup }) {
  const handleSignup = (e) => {
    e.preventDefault();
    alert("Signup Successful!");
    setShowSignup(false); // Go back to login
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button type="submit" className="login-btn">
            Create Account
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setShowSignup(false)}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;