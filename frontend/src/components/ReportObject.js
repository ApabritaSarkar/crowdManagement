import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ReportMissingForm.css"; // Assuming you're reusing styles

const ReportObject = () => {
  const [formData, setFormData] = useState({
    objectName: "",
    description: "",
    lastSeenLocation: "",
    reporterName: "",
    contact: "",
    email: "",
    image: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [caseId, setCaseId] = useState(""); // Initialize caseId state
  const navigate = useNavigate(); // Initialize navigate function
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    console.log("Submitting Form Data:", Object.fromEntries(data.entries()));

    try {
      const response = await axios.post("http://localhost:5000/api/object",data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setCaseId(response.data.caseId);
      setStatusMessage({
        type: "success",
        text: response.data.message,
      });

      // Clear the form
      setFormData({
        objectName: "",
        description: "",
        lastSeenLocation: "",
        reporterName: "",
        contact: "",
        email: "",
        image: "",
      });
    } catch (error) {
      console.error("Error submitting the report:", error.response?.data || error.message);
      setStatusMessage({
        type: "error",
        text: error.response?.data?.error || "Failed to submit the report. Please try again.",
      });
    }
  };

  return (
    <div className="form-container">
    
    {statusMessage && (
      <div
        className={
          statusMessage.type === "success" ? "success-message" : "error-message"
        }
      >
        {statusMessage.text}
        {caseId && (
          <button
            onClick={() => navigate(`/object/${caseId}`)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View Object Details
          </button>
        )}
      </div>
    )}
    
      <form onSubmit={handleSubmit} className="missing-report-form">
        <div>
        <h2>Report Missing Object</h2>
          <label htmlFor="objectName">Object Name:</label>
          <input
            type="text"
            id="name"
            name="objectName"
            value={formData.objectName}
            onChange={handleChange}
            placeholder="Enter the object name"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="lastSeenLocation">Last Seen Location:</label>
          <input
            type="text"
            id="location"
            name="lastSeenLocation"
            value={formData.lastSeenLocation}
            onChange={handleChange}
            placeholder="Enter the last seen location"
            required
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div>
          <label htmlFor="reporterName">Reporter Name:</label>
          <input
            type="text"
            id="reporterName"
            name="reporterName"
            value={formData.reporterName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="contact">Contact Info:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter your contact info"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportObject;
