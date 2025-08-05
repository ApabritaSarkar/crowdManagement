const mongoose = require("mongoose");

const missingObjectSchema = new mongoose.Schema({
  objectName: { type: String, required: true },
  description: { type: String, required: true },
  lastSeenLocation: { type: String, required: true },
  reporterName: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String,required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MissingObject", missingObjectSchema);
