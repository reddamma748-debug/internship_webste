import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "../App.css";

function CreateResume() {
  const [category, setCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [template, setTemplate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState({
    name: "",
    email: "",
    summary: "",
    skills: "",
    education: "",
    languages: "",
    achievements: "",
    activities: "",
    hobbies: "",
  });

  const itCourses = ["B.Tech CSE", "BCA", "MCA", "Data Science"];
  const nonItCourses = ["B.Com", "BBA", "MBA", "BA"];

  // Default professional summaries (2 lines)
  const defaultSummaries = {
    "B.Tech CSE": "Aspiring software engineer with strong fundamentals in computer science and algorithms.\nPassionate about developing scalable applications and learning new technologies.",
    BCA: "Motivated Bachelor in Computer Applications student with hands-on programming experience.\nEager to apply development and analytical skills in real-world projects.",
    MCA: "Master of Computer Applications student skilled in software development and database management.\nSeeking opportunities to contribute to innovative IT solutions and projects.",
    "Data Science": "Data Science enthusiast experienced in Python, machine learning, and data analytics.\nInterested in extracting insights from data to solve real-world business problems.",
    "B.Com": "Commerce student with a strong foundation in accounting, finance, and taxation.\nLooking to gain practical experience in business and financial operations.",
    BBA: "Bachelor of Business Administration student with knowledge in management, marketing, and operations.\nExcited to apply leadership and organizational skills in professional settings.",
    MBA: "MBA graduate with expertise in business strategy, leadership, and analytics.\nDedicated to driving business growth and operational excellence through innovative solutions.",
    BA: "Bachelor of Arts student interested in social sciences, communication, and research.\nSkilled in critical thinking, analysis, and creative problem solving.",
  };

  // Update summary automatically when course changes
  useEffect(() => {
    if (selectedCourse && defaultSummaries[selectedCourse]) {
      setResume((prev) => ({
        ...prev,
        summary: defaultSummaries[selectedCourse],
      }));
    } else {
      setResume((prev) => ({ ...prev, summary: "" }));
    }
  }, [selectedCourse]);

  const handleChange = (e) => setResume({ ...resume, [e.target.name]: e.target.value });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!resume.name || !resume.email || !resume.education) {
      alert("Name, Email and Education are mandatory!");
      return;
    }

    const doc = new jsPDF();
    let y = 20;

    if (template === "classic") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text(resume.name.toUpperCase(), 20, y);
      if (photo) doc.addImage(photo, "JPEG", 160, 15, 35, 35);
      y += 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`${resume.email} | ${selectedCourse}`, 20, y);
      y = 55;
      doc.line(20, y, 190, y);
      y += 10;
    }

    if (template === "modern") {
      doc.setFillColor(25, 118, 210);
      doc.rect(0, 0, 210, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text(resume.name.toUpperCase(), 20, 25);
      if (photo) doc.addImage(photo, "JPEG", 160, 5, 30, 30);
      doc.setFontSize(12);
      doc.text(resume.email, 20, 35);
      doc.setTextColor(0, 0, 0);
      y = 55;
    }

    if (template === "minimal") {
      doc.setFontSize(18);
      doc.text(resume.name, 105, 20, null, null, "center");
      if (photo) {
        doc.addImage(photo, "JPEG", 85, 30, 40, 40);
        y = 80;
      } else {
        y = 40;
      }
    }

    const addSection = (title, content) => {
      if (!content) return;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, 20, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(content, 170);
      doc.text(lines, 20, y);
      y += lines.length * 7 + 5;
      doc.line(20, y, 190, y);
      y += 10;
    };

    addSection("PROFESSIONAL SUMMARY", resume.summary);
    addSection("SKILLS", resume.skills);
    addSection("EDUCATION", resume.education);
    addSection("LANGUAGES KNOWN", resume.languages);
    addSection("ACHIEVEMENTS", resume.achievements);
    addSection("ACTIVITIES", resume.activities);
    addSection("HOBBIES", resume.hobbies);

    doc.save("Professional_Resume.pdf");
  };

  return (
    <div className="resume-container">
      <div className="resume-form">
        <h2>Create Resume</h2>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSelectedCourse("");
          }}
        >
          <option value="">Select Category</option>
          <option value="IT">IT</option>
          <option value="Non-IT">Non-IT</option>
        </select>

        {category && (
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">Select Course</option>
            {(category === "IT" ? itCourses : nonItCourses).map((course, i) => (
              <option key={i} value={course}>{course}</option>
            ))}
          </select>
        )}

        {selectedCourse && (
          <>
            <select value={template} onChange={(e) => setTemplate(e.target.value)}>
              <option value="">Select Template</option>
              <option value="classic">Classic Professional</option>
              <option value="modern">Modern</option>
              <option value="minimal">Creative</option>
            </select>

            <input type="text" name="name" placeholder="Full Name *" value={resume.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email *" value={resume.email} onChange={handleChange} />
            <textarea name="summary" placeholder="Professional Summary" value={resume.summary} onChange={handleChange} />
            <input type="text" name="skills" placeholder="Skills" value={resume.skills} onChange={handleChange} />
            <input type="text" name="education" placeholder="Education *" value={resume.education} onChange={handleChange} />
            <input type="text" name="languages" placeholder="Languages Known" value={resume.languages} onChange={handleChange} />
            <textarea name="achievements" placeholder="Achievements" value={resume.achievements} onChange={handleChange} />
            <textarea name="activities" placeholder="Activities" value={resume.activities} onChange={handleChange} />
            <input type="text" name="hobbies" placeholder="Hobbies" value={resume.hobbies} onChange={handleChange} />

            <label>Upload Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />

            <button onClick={handleDownload}>Download Professional Resume</button>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateResume;