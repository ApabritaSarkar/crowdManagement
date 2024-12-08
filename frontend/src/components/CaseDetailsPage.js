import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CaseDetailsPage.css"; 

const CaseDetailsPage = () => {
  const { caseId } = useParams(); // Get the case ID from the URL
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the case details from the backend
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/case/${caseId}`);
        setCaseDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching case details:", error);
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  if (loading) {
    return <div>Loading case details...</div>;
  }

  if (!caseDetails) {
    return <div>Case not found.</div>;
  }

  return (
    <div className="case-details">
      <h2>Case Details</h2>
      <p><strong>Case ID:</strong> {caseDetails._id}</p>
      <p><strong>Missing Name:</strong> {caseDetails.name}</p>
      <p><strong>Description:</strong> {caseDetails.description}</p>
      <p><strong>Last Seen Location:</strong> {caseDetails.location}</p>
      <p><strong>Status:</strong> {caseDetails.status}</p>
      <p>
        <strong>Date Reported:</strong>{" "}
        {new Date(caseDetails.createdAt).toLocaleString()}
      </p>
      {caseDetails.image && (
        <div>
          <strong>Uploaded Image:</strong>
          <img
            src={`http://localhost:5000/${caseDetails.image}`}
            alt="Missing Person"
            style={{ width: "300px", height: "auto", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default CaseDetailsPage;
