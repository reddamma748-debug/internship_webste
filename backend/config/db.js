const mysql = require("mysql2");

// Update password if your MySQL root has a password
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "internship_portal"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;