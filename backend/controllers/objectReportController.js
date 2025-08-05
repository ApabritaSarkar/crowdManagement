const MissingObject = require("../models/MissingObject");
const sendEmail = require("../utils/emailService");
const validator = require("validator");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

exports.reportMissingObject = async (req, res) => {
  try {
    const { objectName, description, lastSeenLocation, reporterName, contact, email } = req.body;

    console.log("Received Request Body:", req.body);
    console.log("Received File:", req.file);

    if (!objectName || !description || !lastSeenLocation || !reporterName || !contact || !email) {
      return res.status(400).json({ error: "Validation Error: Missing required fields." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Validation Error: Invalid email address." });
    }

    const imagePath = req.file ? `uploads/missing_objects_images/${req.file.filename}` : null;

    if (!imagePath || !fs.existsSync(imagePath)) {
      return res.status(400).json({ error: "Image file is required and must be uploaded." });
    }

    const newObject = new MissingObject({
      objectName,
      description,
      lastSeenLocation,
      reporterName,
      contact,
      email,
      image: imagePath,
    });

    await newObject.save();

    // Call Flask API to register the object
    try {
      const formData = new FormData();
      formData.append("name", objectName);
      formData.append("image", fs.createReadStream(imagePath)); // Attach file stream

      const headers = formData.getHeaders();

      // Send the request to Flask
      const flaskResponse = await axios.post(
        "http://127.0.0.1:5001/register_object",
        formData,
        { headers }
      );

      console.log("Object Registration Response:", flaskResponse.data);
    } catch (flaskError) {
      console.error(
        "Error registering object in Flask:",
        flaskError.response?.data || flaskError.message
      );
    }

    const subject = "Missing Object Report Confirmation";
    const text = `Dear ${reporterName},

Your missing object report has been successfully filed.

Details:
- Case ID: ${newObject._id}
- Missing Object Name: ${objectName}
- Description: ${description}
- Last Seen Location: ${lastSeenLocation}

Thank you,
Support Team`;

    console.log("Sending email to:", email);
    await sendEmail(email, subject, text);

    res.status(201).json({
      caseId: newObject._id,
      message: `Object report submitted successfully! Your case ID is ${newObject._id}.`,
    });
  } catch (error) {
    console.error("Error submitting the object report:", error);
    res.status(500).json({ error: "Error submitting the object report." });
  }
};

exports.getObjectDetails = async (req, res) => {
  try {
    const { caseId } = req.params;
    const objectDetails = await MissingObject.findById(caseId);

    if (!objectDetails) {
      return res.status(404).json({ error: "Object not found" });
    }

    res.status(200).json(objectDetails);
  } catch (error) {
    console.error("Error fetching object details:", error);
    res.status(500).json({ error: "Error fetching object details." });
  }
};








// const MissingObject = require('../models/MissingObject'); // Correct model reference
// const sendEmail = require('../utils/emailService');
// const validator = require('validator');

// exports.reportMissingObject = async (req, res) => {
//   try {
//     // Extract fields from the request body
//     const { objectName, description, lastSeenLocation, reporterName, contact, email } = req.body;

//     // Debugging: Log received request body
//     console.log("Received Request Body:", req.body);
//     console.log("Received File:", req.file);

//     // Validate required fields
//     if (!objectName || !description || !lastSeenLocation || !reporterName || !contact || !email ) {
//       return res.status(400).json({ error: "Validation Error: Missing required fields." });
//     }

//     // Validate email format
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ error: "Validation Error: Invalid email address." });
//     }

//     // Save the case to the database
//     const newObject = new MissingObject({
//       objectName,
//       description,
//       lastSeenLocation,
//       reporterName,
//       contact,
//       email,
//       image: req.file ? req.file.path : null, // If an image is uploaded
//     });

//     await newObject.save();

//     // Prepare email content
//     const subject = "Missing Object Report Confirmation";
//     const text = `Dear ${reporterName},

// Your missing object report has been successfully filed.

// Details:
// - Case ID: ${newObject._id}
// - Missing Object Name: ${objectName}
// - Description: ${description}
// - Last Seen Location: ${lastSeenLocation}

// Thank you,
// Support Team`;

//     // Debugging: Log before sending email
//     console.log("Sending email to:", email);

//     // Send confirmation email
//     await sendEmail(email, subject, text);

//     // Respond with success
//     res.status(201).json({
//       caseId: newObject._id,
//       message: `Object report submitted successfully! Your case ID is ${newObject._id}.`,
//     });
//   } catch (error) {
//     console.error("Error submitting the object report:", error);
//     res.status(500).json({ error: "Error submitting the object report." });
//   }
// };


// exports.getObjectDetails = async (req, res) => {
//   try {
//     const { caseId } = req.params;
//     const objectDetails = await MissingObject.findById(caseId);

//     if (!objectDetails) {
//       return res.status(404).json({ error: "Object not found" });
//     }

//     res.status(200).json(objectDetails);
//   } catch (error) {
//     console.error("Error fetching object details:", error);
//     res.status(500).json({ error: "Error fetching object details" });
//   }
// };