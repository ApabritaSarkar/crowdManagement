const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware"); // Use your upload middleware
const { reportMissingObject,getObjectDetails } = require("../controllers/objectReportController");




router.post("/", upload.single("image"), reportMissingObject);

router.get("/:caseId", getObjectDetails);

module.exports = router;
