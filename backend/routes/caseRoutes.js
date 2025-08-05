const express = require('express');
const mongoose = require('mongoose');
const Case = require('../models/Case');
const router = express.Router();

router.get('/:caseId', async (req, res) => {
  try {
    const { caseId } = req.params;

    // Validate caseId format
    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      return res.status(400).json({ error: "Invalid Case ID format" });
    }

    const caseDetails = await Case.findById(caseId);

    if (!caseDetails) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.json(caseDetails);
  } catch (error) {
    console.error("Error fetching case details:", error);
    res.status(500).json({ error: "Error fetching case details" });
  }
});

module.exports = router;



// const express = require('express');
// const Case = require('../models/Case');
// const router = express.Router();

// // Get case details by ID
// router.get('/:caseId', async (req, res) => {
//   try {
//     const caseDetails = await Case.findById(req.params.caseId);

//     if (!caseDetails) {
//       return res.status(404).json({ error: "Case not found" });
//     }

//     res.json(caseDetails);
//   } catch (error) {
//     console.error("Error fetching case details:", error);
//     res.status(500).json({ error: "Error fetching case details" });
//   }
// });

// module.exports = router;
