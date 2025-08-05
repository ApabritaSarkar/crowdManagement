const Case = require("../models/Case");
// const Chat = require("../models/Chat");

// Get all cases

const getAllCases = async (req, res) => {
    try {
      const cases = await Case.find(); // Fetch all cases
      res.status(200).json(cases);
    } catch (error) {
      console.error("Error fetching cases:", error);
      res.status(500).json({ error: "Error fetching cases." });
    }
  };
// exports.getAllCases = async (req, res) => {
//   try {
//     const cases = await Case.find().sort({ createdAt: -1 });
//     res.status(200).json(cases);
//   } catch (error) {
//     console.error("Error fetching cases:", error.message);
//     res.status(500).json({ error: "Error fetching cases." });
//   }
// };

const updateCaseDetails = async (req, res) => {
    try {
      const { caseId, status, notes } = req.body;
  
      if (!caseId) {
        return res.status(400).json({ error: "Case ID is required" });
      }
  
      const updatedCase = await Case.findByIdAndUpdate(
        caseId,
        { status, notes },
        { new: true }
      );
  
      if (!updatedCase) {
        return res.status(404).json({ error: "Case not found" });
      }
  
      res.status(200).json({ message: "Case updated successfully", updatedCase });
    } catch (error) {
      console.error("Error updating case details:", error);
      res.status(500).json({ error: "Error updating case details" });
    }
  };
  
  console.log("updateCaseDetails function exported successfully");



// Fetch real-time matches (dummy API for now)
const getRealTimeUpdates = async (req, res) => {
    try {
      // Simulate fetching real-time updates from a data source
      const updates = [
        { timestamp: new Date(), message: "New missing person report filed." },
        { timestamp: new Date(), message: "Case ID 12345 has been updated to 'Found'." },
      ];
  
      res.status(200).json({ updates });
    } catch (error) {
      console.error("Error fetching real-time updates:", error);
      res.status(500).json({ error: "Error fetching real-time updates." });
    }
  };
  
  console.log("getRealTimeUpdates function exported successfully");
  

  const updateCaseStatus = async (req, res) => {
    try {
      const { caseId, status } = req.body;
  
      if (!caseId || !status) {
        return res.status(400).json({ error: "Missing caseId or status in request." });
      }
  
      const updatedCase = await Case.findByIdAndUpdate(
        caseId,
        { status },
        { new: true } // Return the updated document
      );
  
      if (!updatedCase) {
        return res.status(404).json({ error: "Case not found." });
      }
  
      res.status(200).json({ message: "Case status updated successfully.", updatedCase });
    } catch (error) {
      console.error("Error updating case status:", error);
      res.status(500).json({ error: "Error updating case status." });
    }
  };
  
  module.exports = {
    getRealTimeUpdates,
    updateCaseStatus,
    updateCaseDetails,
    getAllCases
  };
  

