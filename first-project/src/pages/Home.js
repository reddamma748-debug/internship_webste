import React from "react";
import "../App.css";
import reddy1 from "../images/reddy1.jpg";
import reddy2 from "../images/reddy2.jpg";
import reddy3 from "../images/reddy3.jpg";
import r2 from "../images/r2.jpg";
import reddy5 from "../images/reddy5.jpg";
import reddy6 from "../images/reddy6.jpg";
import reddy7 from "../images/reddy7.jpg";
import pick8 from "../images/pick8.jpg";
import pick2 from "../images/pick2.jpg";
import pick9 from "../images/pick9.jpg";
import pick10 from "../images/pick10.jpg";
import pick11 from "../images/pick11.jpg";
import pick6 from "../images/pick6.jpg";
import pick7 from "../images/pick7.jpg";

function Home() {
  return (
    <div className="home-container">

      {/* 🔹 Summary Section */}
      <div className="home-summary">
        <h1><i>Welcome to Internship Portal</i></h1>
        <p><i>
          Our Internship Portal helps students explore IT and Non-IT
          internships, build professional resumes, and apply easily.
          We provide career opportunities in various domains to help
          students gain real-world experience.
        </i></p>
      </div>

      {/* 🔹 IT Internships Scroll (Right → Left) */}
      <h2 className="section-title"><i>IT Internships</i></h2>
      <div className="scroll-container">
        <div className="scroll-right">
          <img src={reddy1} alt="IT Internship" />
          <img src={reddy2} alt="IT Internship" />
          <img src={reddy3} alt="IT Internship" />
          <img src={r2} alt="IT Internship" />
          <img src={reddy5} alt="IT Internship" />
          <img src={reddy6} alt="IT Internship" />
          <img src={reddy7} alt="IT Internship" />
        </div>
      </div>

      {/* 🔹 Non-IT Internships Scroll (Left → Right) */}
      <h2 className="section-title"><i>Non-IT Internships</i></h2>
      <div className="scroll-container">
        <div className="scroll-left">
          <img src={pick8} alt="Non-IT Internship" />
          <img src={pick2} alt="Non-IT Internship" />
          <img src={pick9} alt="Non-IT Internship" />
          <img src={pick10} alt="Non-IT Internship" />
          <img src={pick11} alt="Non-IT Internship" />
          <img src={pick6} alt="Non-IT Internship" />
          <img src={pick7} alt="Non-IT Internship" />  
        </div>
      </div>

    </div>
  );
}

export default Home;