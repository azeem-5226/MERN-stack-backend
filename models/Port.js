const mongoose = require("mongoose");

const portSchema = new mongoose.Schema({
  serverName: {
    type: String,
    required: true,
  },

  portNumber: {
    type: Number,
    required: true,
    unique: true,
  },

  website: {
    type: String,
    required: true,
  },

  service: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Port", portSchema);