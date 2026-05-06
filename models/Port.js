const mongoose = require("mongoose");

const portSchema = new mongoose.Schema({

  serverName: {
    type: String,
    required: true,
    trim: true,
  },

  portNumber: {
    type: Number,
    required: true,
  },

  website: {
    type: String,
    required: true,
    trim: true,
  },

  service: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

});

// ✅ SAME PORT ALLOWED IN DIFFERENT KVM
// ❌ SAME PORT + SAME KVM NOT ALLOWED

portSchema.index(
  {
    portNumber: 1,
    service: 1,
  },
  {
    unique: true,
  }
);

module.exports =
  mongoose.model("Port", portSchema);