const express = require("express");
const { reportMissing } = require("../controllers/reportController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("image"), reportMissing);
// router.post("/report", upload.single("image"), reportMissing);
module.exports = router;





