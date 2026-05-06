const express = require("express");
const router = express.Router();

const {
  addPort,
  getPort,
  getAllPorts,
  updatePort,
  deletePort
} = require("../controllers/portController");

// ➕ Add new port
router.post("/", addPort);

// 📋 Get all ports
router.get("/", getAllPorts);

// 🔎 Get port by number
router.get("/:portNumber", getPort);

// ✏️ Update port
router.put("/:portNumber", updatePort);

// ❌ Delete port
router.delete("/:portNumber", deletePort);

module.exports = router;