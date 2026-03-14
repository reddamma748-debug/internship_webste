const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });


// APPLY INTERNSHIP
router.post("/apply", upload.single("resume"), (req, res) => {

  const { name, email } = req.body;

  if (!req.file) {
    return res.json({
      message: "Please upload resume"
    });
  }

  const resume = req.file.filename;

  const sql = "INSERT INTO applications (name, email, resume) VALUES (?, ?, ?)";

  db.query(sql, [name, email, resume], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({
        message: "Application failed"
      });
    }

    res.json({
      message: "Submitted Successfully"
    });

  });

});

module.exports = router;