const express = require("express");
const { updateCaseStatus } = require("../controllers/updateStatusController");

const router = express.Router();

router.post("/update-status", updateCaseStatus);

module.exports = router;
