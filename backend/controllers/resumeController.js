const Resume = require("../models/Resume");

// Upload resume
exports.uploadResume = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resume = await Resume.create({
      user: userId,
      filename: req.file.originalname,
      filepath: req.file.path
    });

    res.status(201).json({ message: "Resume uploaded successfully", resume });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get resumes of a user
exports.getUserResumes = async (req, res) => {
  try {
    const { userId } = req.params;

    const resumes = await Resume.find({ user: userId }).sort({ createdAt: -1 });

    res.json(resumes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};