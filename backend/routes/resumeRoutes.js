const express = require("express");
const multer = require("multer");
const { uploadResume, getUserResumes } = require("../controllers/resumeController");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");  // Folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Upload resume
router.post("/upload", upload.single("resume"), uploadResume);

// Get resumes of a user
router.get("/:userId", getUserResumes);

module.exports = router;