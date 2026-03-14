const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Connect Database =====
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Connected to SQLite database");
  }
});


// ===== CREATE USERS TABLE =====
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT
)
`);


// ===== CREATE INTERNSHIPS TABLE =====
db.run(`
CREATE TABLE IF NOT EXISTS internships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  company TEXT,
  location TEXT,
  category TEXT,
  duration TEXT,
  stipend TEXT,
  type TEXT,
  paid TEXT,
  latitude REAL,
  longitude REAL
)
`);


// ===== CREATE APPLICATIONS TABLE =====
db.run(`
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  internship_id INTEGER
)
`);


// ===== CREATE RESUMES TABLE =====
db.run(`
CREATE TABLE IF NOT EXISTS resumes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  skills TEXT,
  education TEXT,
  languages_known TEXT,
  achievements TEXT,
  activities TEXT,
  hobbies TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`);


// ===== LOGIN API =====
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.get(sql, [email, password], (err, row) => {

    if (err) {
      return res.status(500).json({ message: "Login error" });
    }

    if (!row) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user: row });

  });

});


// ===== GET INTERNSHIPS =====
app.get("/internships", (req, res) => {

  const sql = "SELECT * FROM internships";

  db.all(sql, [], (err, rows) => {

    if (err) {
      return res.status(500).json({ message: "Error fetching internships" });
    }

    res.json(rows);

  });

});


// ===== APPLY INTERNSHIP =====
app.post("/applications", (req, res) => {

  const { name, email, internship_id } = req.body;

  if (!name || !email || !internship_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql =
    "INSERT INTO applications (name, email, internship_id) VALUES (?, ?, ?)";

  db.run(sql, [name, email, internship_id], function (err) {

    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: "Application failed" });
    }

    res.json({
      message: "Application submitted successfully",
      application_id: this.lastID
    });

  });

});


// ===== CREATE RESUME =====
app.post("/upload-resume", (req, res) => {

  const {
    name,
    email,
    skills,
    education,
    languages_known,
    achievements,
    activities,
    hobbies
  } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  const sql = `
  INSERT INTO resumes
  (name,email,skills,education,languages_known,achievements,activities,hobbies)
  VALUES (?,?,?,?,?,?,?,?)
  `;

  db.run(
    sql,
    [name,email,skills,education,languages_known,achievements,activities,hobbies],
    function (err) {

      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Resume creation failed" });
      }

      res.json({
        message: "Resume uploaded successfully",
        resume_id: this.lastID
      });

    }
  );

});


// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});