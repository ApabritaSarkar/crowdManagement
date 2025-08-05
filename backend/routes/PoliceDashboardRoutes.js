const express = require("express");
const { getAllCases,updateCaseStatus, updateCaseDetails,getRealTimeUpdates} = require("../controllers/PoliceDashboardController");
// const {
//   getAllCases,
//   updateCaseStatus,
//   getRealTimeUpdates,
// } = require("../controllers/PoliceDashboardController");

const router = express.Router();

// Get all cases
router.get("/cases", getAllCases);

// Update case status
router.put("/cases/status", updateCaseStatus);

// Get real-time surveillance updates
router.get("/realtime", getRealTimeUpdates);
router.put("/cases/update", updateCaseDetails);


module.exports = router;

console.log("Imported updateCaseStatus:", updateCaseStatus);
