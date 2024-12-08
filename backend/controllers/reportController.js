const Case = require('../models/Case');
const sendEmail = require('../utils/emailService');
const validator = require('validator');

exports.reportMissing = async (req, res) => {
  try {
    // Extract fields from the request body
    const { name, cname, description, location, contact, email } = req.body;

    // Debugging: Log received request body
    console.log("Received Request Body:", req.body);

    // Validate required fields
    if (!name || !cname || !description || !location || !contact || !email) {
      return res.status(400).json({ error: "Validation Error: Missing required fields." });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Validation Error: Invalid email address." });
    }

    // Save the case to the database
    const newCase = new Case({
      name,
      cname,
      description,
      location,
      contact,
      email,
      image: req.file ? req.file.path : null, // If an image is uploaded
    });

    await newCase.save();

    // Prepare email content
    const subject = "Complaint Confirmation";
    const text = `Dear ${cname},

Your complaint has been successfully filed.

Details:
- Case ID: ${newCase._id}
- Missing Person Name: ${name}
- Description: ${description}
- Last Seen Location: ${location}

Thank you,
Support Team`;

    // Debugging: Log before sending email
    console.log("Sending email to:", email);

    // Send confirmation email
    await sendEmail(email, subject, text);

    // Respond with success
    // res.status(201).json({ caseId: newCase._id, message:  `Case  successfully! Your case ID is ${newCase._id}.`, });
    console.log("Case successfully saved:", newCase);
    res.status(201).json({
      caseId: newCase._id,
      message: `Case submitted Successfully
       ! Your case ID is ${newCase._id}.`,
    });
  } catch (error) {
    console.error("Error details:", error.message, error.stack);
    res.status(500).json({ error: "Error submitting the case." });
  }
};