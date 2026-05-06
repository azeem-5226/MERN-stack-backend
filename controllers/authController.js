const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==============================
// ✅ SIGNUP
// ==============================
exports.signup = async (req, res) => {
  try {

    const {
      name,
      email,
      password
    } = req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Signup successful",
      user
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// ==============================
// ✅ LOGIN
// ==============================
exports.login = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    // FIND USER
    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email"
      });
    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id
      },
      "secretkey",
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// ==============================
// ✅ FORGOT PASSWORD
// ==============================
exports.forgotPassword = async (req, res) => {
  try {

    const {
      email,
      newPassword
    } = req.body;

    // FIND USER
    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // HASH NEW PASSWORD
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    // UPDATE PASSWORD
    user.password = hashedPassword;

    await user.save();

    res.json({
      message:
        "Password updated successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};