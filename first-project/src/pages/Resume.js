import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Resume() {
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    // Show popup alert
    alert("Resume uploaded successfully ✅");

    // Optional: hide upload form after submit
    setShowUpload(false);
    setFile(null);
  };

  return (
    <div className="resume-container">
      <h2>Resume Options</h2>

      {/* Buttons */}
      <div className="resume-options">
        <button
          onClick={() => navigate("/create-resume")}
          className="resume-btn"
        >
          Create Resume
        </button>

        <button
          onClick={() => setShowUpload(true)}
          className="resume-btn"
        >
          Upload Resume
        </button>
      </div>

      {/* Upload Resume Form */}
      {showUpload && (
        <form className="resume-form" onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Resume;