const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  forgotPassword
} = require("../controllers/authController");


// ==============================
// ✅ SIGNUP
// ==============================
router.post("/signup", signup);


// ==============================
// ✅ LOGIN
// ==============================
router.post("/login", login);


// ==============================
// ✅ FORGOT PASSWORD
// ==============================
router.put(
  "/forgot-password",
  forgotPassword
);

module.exports = router;