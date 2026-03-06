import React, { useState } from "react";
import "../App.css";

function Home() {
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    resume: null,
  });

  const internships = [
    // ================= IT INTERNSHIPS =================
    {
      id: 1,
      title: "Python Developer Intern",
      company: "TechSoft Solutions",
      location: "Hyderabad",
      category: "IT",
      duration: "Full Time",
      stipend: "₹8000",
      type: "Paid",
      startDate: "01-Apr-2026",
      endDate: "30-Sep-2026",
      latitude: 17.3850,
      longitude: 78.4867,
    },
    {
      id: 2,
      title: "React Developer Intern",
      company: "Innovatech Pvt Ltd",
      location: "Bangalore",
      category: "IT",
      duration: "Part Time",
      stipend: "₹6000",
      type: "Paid",
      startDate: "01-Apr-2026",
      endDate: "30-Sep-2026",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      id: 3,
      title: "Java Developer Intern",
      company: "CodeCraft Technologies",
      location: "Pune",
      category: "IT",
      duration: "Full Time",
      stipend: "₹9000",
      type: "Paid",
      startDate: "01-jan-2026",
      endDate: "27-feb-2026",
      latitude: 18.5204,
      longitude: 73.8567,
    },
    {
      id: 4,
      title: "Data Analyst Intern",
      company: "DataVision Analytics",
      location: "Mumbai",
      category: "IT",
      duration: "Full Time",
      stipend: "₹10000",
      type: "Paid",
      startDate: "01-Apr-2026",
      endDate: "30-Sep-2026",
      latitude: 19.0760,
      longitude: 72.8777,
    },
    {
      id: 5,
      title: "Cyber Security Intern",
      company: "SecureNet Systems",
      location: "Delhi",
      category: "IT",
      duration: "Full Time",
      stipend: "₹12000",
      type: "Paid",
      startDate: "01-Apr-2026",
      endDate: "30-Sep-2026",
      latitude: 28.6139,
      longitude: 77.2090,
    },
    {
      id: 6,
      title: "AI & ML Intern",
      company: "Smart AI Labs",
      location: "Bangalore",
      category: "IT",
      duration: "Full Time",
      stipend: "₹15000",
      type: "Paid",
      startDate: "01-Apr-2025",
      endDate: "30-Sep-2025",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      id: 7,
      title: "Frontend Developer Intern",
      company: "WebWizards",
      location: "Pune",
      category: "IT",
      duration: "Part Time",
      stipend: "₹7000",
      type: "Paid",
      startDate: "01-Apr-2026",
      endDate: "30-Sep-2026",
      latitude: 18.5204,
      longitude: 73.8567,
    },
    {
      id: 8,
      title: "Backend Developer Intern",
      company: "CloudTech Solutions",
      location: "Hyderabad",
      category: "IT",
      duration: "Full Time",
      stipend: "₹9000",
      type: "Paid",
      startDate: "01-Apr-2026",
      endDate: "30-Sep-2026",
      latitude: 17.3850,
      longitude: 78.4867,
    },
    {
      id: 9,
      title: "Full Stack Developer Intern",
      company: "CodeFusion",
      location: "Chennai",
      category: "IT",
      duration: "Full Time",
      stipend: "₹12000",
      type: "Paid",
      startDate: "01-Apr-2026",
      endDate: "30-Sep-2026",
      latitude: 13.0827,
      longitude: 80.2707,
    },
    {
      id: 10,
      title: "DevOps Intern",
      company: "TechOps Pvt Ltd",
      location: "Delhi",
      category: "IT",
      duration: "Part Time",
      stipend: "₹10000",
      type: "Paid",
      startDate: "01-Apr-2026",
      endDate: "30-Sep-2026",
      latitude: 28.6139,
      longitude: 77.2090,
    },

    // ================= NON-IT INTERNSHIPS =================
    {
      id: 11,
      title: "HR Intern",
      company: "Global HR Services",
      location: "Chennai",
      category: "Non-IT",
      duration: "Full Time",
      stipend: "₹5000",
      type: "Paid",
      startDate: "01-May-2026",
      endDate: "31-Oct-2026",
      latitude: 13.0827,
      longitude: 80.2707,
    },
    {
      id: 12,
      title: "Marketing Intern",
      company: "Bright Media Agency",
      location: "Hyderabad",
      category: "Non-IT",
      duration: "Part Time",
      stipend: "₹4000",
      type: "Paid",
      startDate: "01-May-2026",
      endDate: "31-Oct-2026",
      latitude: 17.3850,
      longitude: 78.4867,
    },
    {
      id: 13,
      title: "Finance Intern",
      company: "Capital Growth Pvt Ltd",
      location: "Bangalore",
      category: "Non-IT",
      duration: "Full Time",
      stipend: "₹7000",
      type: "Paid",
      startDate: "29 -June-2025",
      endDate: "31-Oct-2025",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      id: 14,
      title: "Content Writing Intern",
      company: "Creative Minds",
      location: "Mumbai",
      category: "Non-IT",
      duration: "Part Time",
      stipend: "₹3000",
      type: "Paid",
      startDate: "01-May-2026",
      endDate: "31-Oct-2026",
      latitude: 19.0760,
      longitude: 72.8777,
    },
    {
      id: 15,
      title: "Operations Intern",
      company: "LogiFlow Solutions",
      location: "Chennai",
      category: "Non-IT",
      duration: "Full Time",
      stipend: "₹6000",
      type: "Paid",
      startDate: "01-May-2026",
      endDate: "31-Oct-2026",
      latitude: 13.0827,
      longitude: 80.2707,
    },
    {
      id: 16,
      title: "Sales Intern",
      company: "TopSell Pvt Ltd",
      location: "Mumbai",
      category: "Non-IT",
      duration: "Full Time",
      stipend: "₹5000",
      type: "Paid",
      startDate: "01-May-2026",
      endDate: "31-Oct-2026",
      latitude: 19.0760,
      longitude: 72.8777,
    },
    {
      id: 17,
      title: "Event Management Intern",
      company: "Eventify",
      location: "Bangalore",
      category: "Non-IT",
      duration: "Part Time",
      stipend: "₹4000",
      type: "Paid",
      startDate: "01-May-2026",
      endDate: "31-Oct-2026",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      id: 18,
      title: "Customer Support Intern",
      company: "HelpDesk Solutions",
      location: "Hyderabad",
      category: "Non-IT",
      duration: "Full Time",
      stipend: "₹6000",
      type: "Paid",
      startDate: "01-May-2026",
      endDate: "31-Oct-2026",
      latitude: 17.3850,
      longitude: 78.4867,
    },
    {
      id: 19,
      title: "Research Intern",
      company: "Insight Research Labs",
      location: "Pune",
      category: "Non-IT",
      duration: "Part Time",
      stipend: "₹4500",
      type: "Paid",
      startDate: "01-May-2026",
      endDate: "31-Oct-2026",
      latitude: 18.5204,
      longitude: 73.8567,
    },
    {
      id: 20,
      title: "Logistics Intern",
      company: "FastTrack Logistics",
      location: "Delhi",
      category: "Non-IT",
      duration: "Full Time",
      stipend: "₹5000",
      type: "Paid",
      startDate: "01-Sep-2025",
      endDate: "31-Dec-2025",
      latitude: 28.6139,
      longitude: 77.2090,
    },
  ];

  const filteredInternships = internships.filter((internship) => {
    const search = skill.trim().toLowerCase();
    const matchCategory =
      category === "" || internship.category === category;
    const matchTitle =
      search === "" ||
      internship.title.toLowerCase().includes(search);
    return matchCategory && matchTitle;
  });

  const handleApplyClick = (internship) => {
    setSelectedInternship(internship);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setApplicant((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setApplicant((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Applied Successfully for ${selectedInternship.title}`);
    setApplicant({ name: "", email: "", resume: null });
    setShowForm(false);
  };

  return (
    <div className="container">
      <h2>Internships</h2>

      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="IT">IT</option>
          <option value="Non-IT">Non-IT</option>
        </select>

        <input
          type="text"
          placeholder="Enter title"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      </div>

      {filteredInternships.map((internship) => (
        <div key={internship.id} className="card">
          <div>
            <h3 className="internship-title">{internship.title}</h3>
            <p><strong>Company:</strong> {internship.company}</p>
            <p><strong>Location:</strong> {internship.location}</p>
            <p><strong>Category:</strong> {internship.category}</p>
            <p><strong>Duration:</strong> {internship.duration}</p>
            <p><strong>Stipend:</strong> {internship.stipend}</p>
            <p><strong>Type:</strong> {internship.type}</p>
            <p><strong>Start Date:</strong> {internship.startDate}</p>
            <p><strong>End Date:</strong> {internship.endDate}</p>
          </div>

          {[3, 6, 13, 20].includes(internship.id) ? (
          <p className="expired-text">Expired!</p>
          ) : (
          <button
          className="apply-button"
          onClick={() => handleApplyClick(internship)}
          >
          Apply
          </button>
          )}
        </div>
      ))}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Apply for {selectedInternship.title}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={applicant.name}
                onChange={handleFormChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={applicant.email}
                onChange={handleFormChange}
                required
              />
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFormChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;