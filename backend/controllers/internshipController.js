const db = require("../db");

const getInternships = (req, res) => {
  db.query("SELECT * FROM internships", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const addInternship = (req, res) => {
  const { id, title, company, location, category, duration, stipend_paid, start_date, end_date } = req.body;
  db.query(
    "INSERT INTO internships (id, title, company, location, category, duration, stipend_paid, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id, title, company, location, category, duration, stipend_paid, start_date, end_date],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Internship added!" });
    }
  );
};

// Function to insert default 20 internships
const insertDefaultInternships = () => {
  const internships = [
    { id: 1, title: "Web Developer Intern", company: "TechCorp", location: "Remote", category: "Development", duration: "3 months", stipend_paid: "$500/month", start_date: "2026-04-01", end_date: "2026-07-01" },
    { id: 2, title: "Data Analyst Intern", company: "DataWorks", location: "Bangalore", category: "Data Science", duration: "6 months", stipend_paid: "$600/month", start_date: "2026-05-01", end_date: "2026-11-01" },
    { id: 3, title: "UI/UX Designer Intern", company: "DesignStudio", location: "Mumbai", category: "Design", duration: "3 months", stipend_paid: "$400/month", start_date: "2026-06-01", end_date: "2026-09-01" },
    { id: 4, title: "Machine Learning Intern", company: "AI Labs", location: "Hyderabad", category: "Artificial Intelligence", duration: "6 months", stipend_paid: "$700/month", start_date: "2026-05-15", end_date: "2026-11-15" },
    { id: 5, title: "Marketing Intern", company: "BrandBuzz", location: "Pune", category: "Marketing", duration: "3 months", stipend_paid: "$300/month", start_date: "2026-04-15", end_date: "2026-07-15" },
    { id: 6, title: "Frontend Developer Intern", company: "NextGen Tech", location: "Remote", category: "Development", duration: "4 months", stipend_paid: "$450/month", start_date: "2026-05-10", end_date: "2026-09-10" },
    { id: 7, title: "Backend Developer Intern", company: "CloudBase", location: "Bangalore", category: "Development", duration: "6 months", stipend_paid: "$650/month", start_date: "2026-06-01", end_date: "2026-12-01" },
    { id: 8, title: "Graphic Design Intern", company: "CreativeHub", location: "Mumbai", category: "Design", duration: "3 months", stipend_paid: "$350/month", start_date: "2026-04-20", end_date: "2026-07-20" },
    { id: 9, title: "SEO & Digital Marketing Intern", company: "MarketBoost", location: "Pune", category: "Marketing", duration: "3 months", stipend_paid: "$300/month", start_date: "2026-05-05", end_date: "2026-08-05" },
    { id: 10, title: "Mobile App Developer Intern", company: "AppWorks", location: "Hyderabad", category: "Development", duration: "6 months", stipend_paid: "$700/month", start_date: "2026-06-15", end_date: "2026-12-15" },
    { id: 11, title: "Content Writing Intern", company: "WriteUp", location: "Remote", category: "Content", duration: "3 months", stipend_paid: "$250/month", start_date: "2026-04-10", end_date: "2026-07-10" },
    { id: 12, title: "HR Intern", company: "PeopleFirst", location: "Bangalore", category: "Human Resources", duration: "4 months", stipend_paid: "$350/month", start_date: "2026-05-01", end_date: "2026-09-01" },
    { id: 13, title: "Finance Intern", company: "MoneyMatters", location: "Mumbai", category: "Finance", duration: "6 months", stipend_paid: "$600/month", start_date: "2026-06-01", end_date: "2026-12-01" },
    { id: 14, title: "Operations Intern", company: "OpsCorp", location: "Pune", category: "Operations", duration: "3 months", stipend_paid: "$300/month", start_date: "2026-04-25", end_date: "2026-07-25" },
    { id: 15, title: "Cybersecurity Intern", company: "SecureNet", location: "Hyderabad", category: "IT & Security", duration: "6 months", stipend_paid: "$700/month", start_date: "2026-05-15", end_date: "2026-11-15" },
    { id: 16, title: "Full Stack Developer Intern", company: "StackSolutions", location: "Remote", category: "Development", duration: "6 months", stipend_paid: "$650/month", start_date: "2026-06-01", end_date: "2026-12-01" },
    { id: 17, title: "Social Media Intern", company: "SocialBuzz", location: "Mumbai", category: "Marketing", duration: "3 months", stipend_paid: "$300/month", start_date: "2026-04-20", end_date: "2026-07-20" },
    { id: 18, title: "AI Research Intern", company: "NeuralNet Labs", location: "Bangalore", category: "Artificial Intelligence", duration: "6 months", stipend_paid: "$750/month", start_date: "2026-06-10", end_date: "2026-12-10" },
    { id: 19, title: "Business Analyst Intern", company: "BizInsights", location: "Pune", category: "Business", duration: "3 months", stipend_paid: "$400/month", start_date: "2026-05-01", end_date: "2026-08-01" },
    { id: 20, title: "Product Management Intern", company: "ProdMasters", location: "Hyderabad", category: "Management", duration: "6 months", stipend_paid: "$700/month", start_date: "2026-06-15", end_date: "2026-12-15" }
  ];

  internships.forEach(item => {
    db.query(
      "INSERT INTO internships (id, title, company, location, category, duration, stipend_paid, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [item.id, item.title, item.company, item.location, item.category, item.duration, item.stipend_paid, item.start_date, item.end_date],
      (err) => {
        if (err) console.error("Insert error:", err.message);
        else console.log(`Inserted: ${item.title} at ${item.company}`);
      }
    );
  });
};

module.exports = { getInternships, addInternship, insertDefaultInternships };