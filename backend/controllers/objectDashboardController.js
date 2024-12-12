const MissingObject = require("../models/MissingObject");

// Fetch all objects
const getAllObjects = async (req, res) => {
  try {
    const objects = await MissingObject.find().sort({ createdAt: -1 });
    res.status(200).json(objects);
  } catch (error) {
    console.error("Error fetching objects:", error);
    res.status(500).json({ error: "Error fetching objects." });
  }
};

// Fetch real-time updates for objects
const getObjectRealTimeUpdates = async (req, res) => {
  try {
    // Simulate fetching real-time updates from a data source
    const updates = [
      { timestamp: new Date(), message: "New missing object report filed." },
      { timestamp: new Date(), message: "Object ID 12345 has been marked as 'Recovered'." },
    ];

    res.status(200).json({ updates });
  } catch (error) {
    console.error("Error fetching object real-time updates:", error);
    res.status(500).json({ error: "Error fetching object real-time updates." });
  }
};

module.exports = {
  getAllObjects,
  getObjectRealTimeUpdates,
};