const Port = require("../models/Port");

// =====================================
// ➕ ADD PORT
// =====================================
exports.addPort = async (req, res) => {

  try {

    const {
      serverName,
      portNumber,
      website,
      service
    } = req.body;

    // =========================
    // CHECK EMPTY FIELDS
    // =========================

    if (
      !serverName ||
      !portNumber ||
      !website ||
      !service
    ) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    // =========================
    // CHECK SAME PORT IN SAME KVM
    // =========================

    const exists = await Port.findOne({
      portNumber: Number(portNumber),
      service: service.trim().toLowerCase()
    });

    // ❌ BLOCK ONLY SAME PORT + SAME KVM
    if (exists) {

      return res.status(400).json({
        message:
          `Port ${portNumber} already running on ${service}`
      });

    }

    // =========================
    // CREATE PORT
    // =========================

    const newPort = await Port.create({

      serverName,

      portNumber: Number(portNumber),

      website,

      service: service.trim().toLowerCase()

    });

    res.status(201).json({
      message: "Port added successfully",
      data: newPort
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error",
      error: err.message
    });

  }

};

// =====================================
// 📋 GET ALL PORTS
// =====================================
exports.getAllPorts = async (req, res) => {

  try {

    const ports = await Port.find().sort({
      portNumber: 1
    });

    res.json(ports);

  } catch (err) {

    res.status(500).json({
      message: "Failed to fetch ports"
    });

  }

};

// =====================================
// 🔍 GET PORT
// =====================================
exports.getPort = async (req, res) => {

  try {

    const port = await Port.findOne({
      portNumber: req.params.portNumber
    });

    if (!port) {

      return res.status(404).json({
        message: "Port not found"
      });

    }

    res.json(port);

  } catch (err) {

    res.status(500).json({
      message: "Search failed"
    });

  }

};

// =====================================
// ✏️ UPDATE PORT
// =====================================
exports.updatePort = async (req, res) => {

  try {

    const {
      serverName,
      portNumber,
      website,
      service
    } = req.body;

    // =========================
    // FIND CURRENT PORT
    // =========================

    const currentPort =
      await Port.findOne({
        portNumber:
          req.params.portNumber
      });

    if (!currentPort) {

      return res.status(404).json({
        message: "Port not found"
      });

    }

    // =========================
    // CHECK DUPLICATE
    // =========================

    const duplicate =
      await Port.findOne({

        _id: {
          $ne: currentPort._id
        },

        portNumber:
          Number(portNumber),

        service:
          service
            .trim()
            .toLowerCase()

      });

    // ❌ BLOCK ONLY SAME PORT + SAME KVM

    if (duplicate) {

      return res.status(400).json({

        message:
          `Port ${portNumber} already exists on ${service}`

      });

    }

    // =========================
    // UPDATE
    // =========================

    currentPort.serverName =
      serverName;

    currentPort.portNumber =
      Number(portNumber);

    currentPort.website =
      website;

    currentPort.service =
      service
        .trim()
        .toLowerCase();

    await currentPort.save();

    // =========================
    // SUCCESS
    // =========================

    res.json({

      message:
        "Port updated successfully",

      data: currentPort

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message:
        "Update failed",

      error: err.message

    });

  }

};

// =====================================
// ❌ DELETE PORT
// =====================================
exports.deletePort = async (req, res) => {

  try {

    const deleted =
      await Port.findOneAndDelete({
        portNumber: req.params.portNumber
      });

    if (!deleted) {

      return res.status(404).json({
        message: "Port not found"
      });

    }

    res.json({
      message: "Deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: "Delete failed"
    });

  }

};