const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (password !== user.password) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};