const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// ROUTES
const portRoutes = require("./routes/portRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DATABASE
connectDB();

// ROUTES
app.use("/api/ports", portRoutes);
app.use("/api/auth", authRoutes);

// SERVER
app.listen(5000, () =>
  console.log("Server running on port 5000")
);