const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], (err, result) => {

    if (result.length === 0) {
      return res.json({ message: "User not found" });
    }

    const user = result[0];

    if (password !== user.password) {
      return res.json({ message: "Invalid password" });
    }

    res.json({
      message: "Submitted Successfully",
      user: user
    });

  });

});

module.exports = router;