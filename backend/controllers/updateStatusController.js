const Case = require("../models/Case");
const sendEmail = require("../utils/emailService");

exports.updateCaseStatus = async (req, res) => {
  try {
    const { caseId, status } = req.body;

    if (!caseId || !status) {
      return res.status(400).json({ error: "Case ID and status are required." });
    }

    const caseDetails = await Case.findById(caseId);
    if (!caseDetails) {
      return res.status(404).json({ error: "Case not found." });
    }

    caseDetails.status = status;
    await caseDetails.save();

    // Send an email notification
    const subject = `Case Status Updated: ${status}`;
    const text = `Dear ${caseDetails.cname},

The status of your case (ID: ${caseDetails._id}) has been updated to "${status}".

Thank you,
Support Team.`;

    await sendEmail(caseDetails.email, subject, text);

    res.json({ message: "Case status updated and email sent successfully." });
  } catch (error) {
    console.error("Error updating case status:", error.message);
    res.status(500).json({ error: "Error updating case status." });
  }
};
