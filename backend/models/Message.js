const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // Username of the sender
  content: { type: String, required: true }, // Message content
  timestamp: { type: Date, default: Date.now }, // Timestamp for the message
});

module.exports = mongoose.model("Message", messageSchema);
