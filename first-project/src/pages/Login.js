import React, { useState } from "react"; import { useNavigate } from "react-router-dom"; import "../App.css"; 
 
function Login({ setIsLoggedIn }) {   const [email, setEmail] = useState("");   const [password, setPassword] = useState("");   const navigate = useNavigate(); 
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
 
    if (email && password) {       setIsLoggedIn(true);     //   THIS IS IMPORTANT       navigate("/home");       //   Redirect to Home 
    } else { 
      alert("Enter Email and Password"); 
    } 
  }; 
 
  return ( 
    <div className="login-page"> 
      <div className="login-card"> 
        <h2>Login</h2> 
 
        <form onSubmit={handleSubmit}> 
          <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} 
            required 
          /> 
 
          <input 
            type="password"             placeholder="Enter Password"             value={password}             onChange={(e) => setPassword(e.target.value)} 
            required 
          /> 
 
          <button type="submit" className="login-btn"> 
            Login 
          </button> 
        </form> 
      </div> 
    </div> 
  ); 
} 
 
export default Login; 
