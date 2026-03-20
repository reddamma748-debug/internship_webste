// server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Ensure upload folders exist
const folders = ["uploads", "resumes"];
folders.forEach((folder) => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/resumes", express.static(path.join(__dirname, "resumes")));

/* ---------------- DATABASE ---------------- */
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.log(err);
  else console.log("SQLite Connected");
});

/* ---------------- TABLES ---------------- */
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS internships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    company TEXT,
    location TEXT,
    category TEXT,
    duration TEXT,
    stipend TEXT,
    type TEXT,
    start_date TEXT,
    end_date TEXT,
    latitude TEXT,
    longitude TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  internship_id INTEGER,
  resume TEXT
)`);

/* ---------------- MULTER SETUP ---------------- */
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "resumes/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const resumeUpload = multer({ storage: resumeStorage })

// ------------------ LOGIN ROUTE ------------------
// ------------------ REGISTER ------------------
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.run(sql, [name, email, password], function(err) {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    res.json({ success: true, message: "User registered successfully", userId: this.lastID });
  });
});

// ------------------ LOGIN ------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  // Check credentials
  db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (row) {
      res.json({ success: true, message: "Login successful", user: row });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

/*-------------------Users----------------------------*/
app.post("/users", (req, res) => {

  const { name, email, password } = req.body;

  const sql = `INSERT INTO users(name,email,password) VALUES(?,?,?)`;

  db.run(sql, [name, email, password], function(err){

    if(err){
      return res.json({ success:false, message:err.message });
    }

    res.json({
      success:true,
      message:"User created",
      id:this.lastID
    });

  });

});

app.get("/users", (req,res)=>{

  const sql = `SELECT * FROM users`;

  db.all(sql,[],(err,rows)=>{

    if(err){
      return res.json({success:false});
    }

    res.json(rows);

  });

});

app.put("/users/:id",(req,res)=>{

  const id = req.params.id;
  const { name,email,password } = req.body;

  const sql = `UPDATE users SET name=?,email=?,password=? WHERE id=?`;

  db.run(sql,[name,email,password,id],function(err){

    if(err){
      return res.json({success:false});
    }

    res.json({
      success:true,
      message:"User updated"
    });

  });

});

app.delete("/users/:id", (req, res) => {

  const id = req.params.id;

  const sql = `DELETE FROM users WHERE id=?`;

  db.run(sql, [id], function (err) {

    if (err) {
      return res.json({ success:false });
    }

    res.json({
      success:true,
      message:"User deleted"
    });

  });

});

/* ---------------- MULTER (Resume Upload) ---------------- */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

/* ---------------- ADD INTERNSHIP ---------------- */

app.post("/addInternship", (req, res) => {
  const {
    title,
    company,
    location,
    stipend,
    type,
    category,
    start_date,
    end_date,
    latitude,
    longitude,
  } = req.body;

  const sql = `
    INSERT INTO internships 
    (title, company, location, stipend, type, category, start_date, end_date, latitude, longitude)
    VALUES (?,?,?,?,?,?,?,?,?,?)
  `;

  db.run(
    sql,
    [title, company, location, stipend, type, category, start_date, end_date, latitude, longitude],
    function (err) {
      if (err) return res.status(400).send({ success: false, message: err.message });
      res.send({ success: true, message: "Internship Added", id: this.lastID });
    }
  );
});

// Get all internships
app.get('/internships', (req, res) => {
  const sql = "SELECT * FROM internships";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// Get internship by ID
app.get('/internships/:id', (req, res) => {
  const sql = "SELECT * FROM internships WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    res.json({ success: true, data: row });
  });
});

// Create new internship
app.post('/internships', (req, res) => {
  const { title, company, location, category, duration, stipend, type, startDate, endDate } = req.body;
  const sql = `INSERT INTO internships 
    (title, company, location, category, duration, stipend, type, startDate, endDate) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [title, company, location, category, duration, stipend, type, startDate, endDate], function(err) {
    if (err) return res.status(400).json({ success: false, message: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// Update internship
app.put('/internships/:id', (req, res) => {
  const { title, company, location, category, duration, stipend, type, startDate, endDate } = req.body;
  const sql = `UPDATE internships SET 
    title=?, company=?, location=?, category=?, duration=?, stipend=?, type=?, startDate=?, endDate=? 
    WHERE id=?`;
  db.run(sql, [title, company, location, category, duration, stipend, type, startDate, endDate, req.params.id], function(err) {
    if (err) return res.status(400).json({ success: false, message: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

// Delete internship
app.delete('/internships/:id', (req, res) => {
  const sql = "DELETE FROM internships WHERE id=?";
  db.run(sql, [req.params.id], function(err) {
    if (err) return res.status(400).json({ success: false, message: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

/* ---------------- APPLICATION ROUTES ---------------- */
// Apply with resume
app.post("/applications", (req, res) => {

  const { name, email, internship_id, resume } = req.body;

  console.log(req.body); // 🔥 ADD THIS (IMPORTANT DEBUG)

  const sql = `
    INSERT INTO applications (name, email, internship_id, resume)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [name, email, internship_id, resume], function(err) {

    if (err) {
      console.log(err);
      return res.status(400).json({
        success:false,
        message: err.message
      });
    }

    res.json({
      success:true,
      message:"Application submitted"
    });

  });

});
// Get all applications
app.get("/applications", (req, res) => {
  db.all("SELECT * FROM applications", [], (err, rows) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    res.json({ success: true, data: rows });
  });
});

// Get applications for a specific internship
app.get("/my-applications/:email", (req, res) => {

  const email = req.params.email;

  const sql = `
    SELECT internships.*
    FROM applications
    JOIN internships 
    ON applications.internship_id = internships.id
    WHERE applications.email = ?
  `;

  db.all(sql, [email], (err, rows) => {

    if (err) {
      return res.status(400).json({
        success:false,
        message: err.message
      });
    }

    res.json({
      success:true,
      data: rows
    });

  });

});

// Update application (optional resume)
app.put("/applications/:id", resumeUpload.single("resume"), (req, res) => {
  const { name, email } = req.body;
  const resume = req.file ? req.file.filename : null;

  let sql, params;
  if (resume) {
    sql = "UPDATE applications SET name=?, email=?, resume=? WHERE id=?";
    params = [name, email, resume, req.params.id];
  } else {
    sql = "UPDATE applications SET name=?, email=? WHERE id=?";
    params = [name, email, req.params.id];
  }

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ success: false, message: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

// Delete application
app.delete("/applications/:id", (req, res) => {
  db.run("DELETE FROM applications WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(400).json({ success: false, message: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

/* ---------------- FORGOT PASSWORD ---------------- */

app.post("/forgot", (req, res) => {

  const { email, password } = req.body;

  const sql = `UPDATE users SET password=? WHERE email=?`;

  db.run(sql, [password, email], function (err) {

    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true, message: "Password Updated" });
    }

  });

});

/* ---------------- START SERVER ---------------- */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});