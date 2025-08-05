const express = require("express");
const router = express.Router();
const {
  getAllObjects,
  getObjectRealTimeUpdates,
} = require("../controllers/objectDashboardController");

// Fetch all objects
router.get("/objects", getAllObjects);

// Fetch real-time updates for objects
router.get("/realtime", getObjectRealTimeUpdates);

module.exports = router;