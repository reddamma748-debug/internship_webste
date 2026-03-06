import React, { useState } from "react";

function UploadResume() {
  const [message, setMessage] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Upload Resume</h2>

      <input type="file" />
      <br /><br />

      <button
        type="button"
        onClick={() => {
          console.log("Clicked");
          setMessage("Resume uploaded successfully");
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default UploadResume;