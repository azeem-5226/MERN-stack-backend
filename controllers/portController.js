const Port = require("../models/Port");

// ➕ Add Port
exports.addPort = async (req, res) => {
  try {
    const {
      serverName,
      portNumber,
      website,
      service
    } = req.body;

    // Check existing port
    const exists = await Port.findOne({ portNumber });

    if (exists) {
      return res.status(400).json({
        message: "Port already exists"
      });
    }

    // Create new port
    const port = await Port.create({
      serverName,
      portNumber,
      website,
      service
    });

    res.json(port);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// 📋 Get All Ports
exports.getAllPorts = async (req, res) => {
  try {
    const ports = await Port.find().sort({
      portNumber: 1
    });

    res.json(ports);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// 🔍 Get Single Port
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
      error: err.message
    });
  }
};

// ✏️ Update Port
exports.updatePort = async (req, res) => {
  try {
    const updated = await Port.findOneAndUpdate(
      {
        portNumber: req.params.portNumber
      },
      {
        serverName: req.body.serverName,
        portNumber: req.body.portNumber,
        website: req.body.website,
        service: req.body.service
      },
      {
        new: true
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Port not found"
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// ❌ Delete Port
exports.deletePort = async (req, res) => {
  try {
    const deleted = await Port.findOneAndDelete({
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
      error: err.message
    });
  }
};