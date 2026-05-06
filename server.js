const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const portRoutes = require("./routes/portRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/ports", portRoutes);

app.listen(5000, () => console.log("Server running"));