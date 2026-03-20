// shoeUsers.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

db.serialize(() => {
  // 1️⃣ Create users table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      password TEXT
    )
  `, (err) => {
    if (err) throw err;

    // 2️⃣ Insert multiple sample users automatically
    const sampleUsers = [
      ["John Doe", "john@example.com", "123456"],
      ["Jane Smith", "jane@example.com", "abcdef"],
      ["Reddamma", "reddamma748@example.com", "123456"],
      ["Bob Brown", "bob@example.com", "qwerty123"]
    ];

    const insertStmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");

    sampleUsers.forEach(user => {
      insertStmt.run(user, (err) => {
        if (err) throw err;
      });
    });

    insertStmt.finalize(() => {
      console.log(`Inserted ${sampleUsers.length} sample users!`);
      
      // 3️⃣ Print all users automatically
      db.all("SELECT * FROM users", (err, rows) => {
        if (err) throw err;
        console.log("\nAll users in database:");
        console.table(rows);
      });
    });
  });
});