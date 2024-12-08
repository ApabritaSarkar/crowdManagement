
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ReportMissingForm.css";

const ReportPerson = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    cname: "",
    contact: "",
    email: "",
    image: "",
  });

  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [caseId, setCaseId] = useState(null); // Store the submitted case ID
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      try {
        const response = await axios.post("http://localhost:5000/api/report", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Backend Response:", response);
        setCaseId(response.data.caseId);
        setStatusMessage({
          type: "success",
          text: response.data.message,
        });
      } catch (error) {
        console.error("Error Response:", error.response?.data || error.message);
        setStatusMessage({
          type: "error",
          text: error.response?.data?.error || "Submission failed. Please try again later.",
        });
      }
      

      setFormData({
        name: "",
        description: "",
        location: "",
        cname: "",
        contact: "",
        email: "",
        image: "",
      });
    } catch (error) {
      console.error("Error submitting the case:", error.response?.data || error.message);
      setStatusMessage({
        type: "error",
        text: error.response?.data?.error || "Submission failed. Please try again later.",
      });
    }
  };

  const handleTrackCase = () => {
    if (caseId) {
      navigate(`/track/${caseId}`); // Navigate to the specific case route
    }
  };

  return (
    <div className="form-container">
      {/* Status Message */}
      {statusMessage.text && (
        <div className={statusMessage.type === "success" ? "success-message" : "error-message"}>
          {statusMessage.text}
          {caseId && (
            <button
              onClick={handleTrackCase}
              className="track-case-button"
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
              Case Details
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="missing-report-form">
        <h2>Report Missing Person</h2>
        <div>
          <label htmlFor="name">Missing Person Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter the name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="Enter a description"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="location">Last Seen Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            placeholder="Enter the last seen location"
            onChange={handleChange}
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
          <label htmlFor="cname">Complainant Name:</label>
          <input
            type="text"
            id="cname"
            name="cname"
            value={formData.cname}
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contact">Complainant Contact:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            placeholder="Enter your contact info"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Complainant Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>
        

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportPerson;