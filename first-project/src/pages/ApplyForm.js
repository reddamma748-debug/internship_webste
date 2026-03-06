import React, { useState } from "react";

function ApplyForm() {

  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application Submitted Successfully!");
  };

  return (
    <div className="form-container">
      <h2>Internship Application</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Apply Now</button>
      </form>
    </div>
  );
}

export default ApplyForm;