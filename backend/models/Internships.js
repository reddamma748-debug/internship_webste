const express = require("express");
const router = express.Router();

const { getInternships, addInternship, insertDefaultInternships } = require("../controllers/internshipController");

// GET all internships
router.get("/", getInternships);

// POST single internship
router.post("/add", addInternship);

// POST to insert 20 default internships
router.post("/add-defaults", (req, res) => {
  insertDefaultInternships();   // call the function
  res.json({ message: "Default 20 internships inserted!" });
});

module.exports = router;