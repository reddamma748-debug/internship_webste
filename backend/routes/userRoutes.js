const express = require("express");
const router = express.Router();
const db = require("../config/db");

// login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length > 0) {
      res.json({
        message: "Login successful",
        user: result[0]
      });
    } else {
      res.json({
        message: "Invalid email or password"
      });
    }
  });
});

module.exports = router;