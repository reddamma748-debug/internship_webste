import React from "react";

function Dashboard() {
  const total = 3;    
  const applied = 4;    
  const saved = 0;

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Total Internships: {total}</p>
      <p>Applied Internships: {applied}</p>
      <p>Saved Internships: {saved}</p>
    </div>
  );
}

export default Dashboard;
