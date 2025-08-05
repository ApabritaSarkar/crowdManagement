import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/TrackingPage.css";
// import ChatSystem from "./ChatSystem";
// import CaseTable from "./CaseTable";


const TrackingPage = () => {
  
  
  const { caseId } = useParams(); // Get caseId from URL
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/case/${caseId}`);
        setCaseDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching case details:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Error fetching case details.");
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  if (loading) {
    return <div className="loading">Loading case details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
 
    <div className="tracking-page">
    <h2 className="tracking-title">Track Your Missing Report</h2>
  
    <div className="tracking-card">
      {/* Image Section */}
      {caseDetails.image && (
        <div className="tracking-image-container">
          <img
            src={`http://localhost:5000/${caseDetails.image}`}
            alt="Missing Person"
            className="tracking-image"
          />
        </div>
      )}
  
      {/* Details Section */}
      <div className="tracking-info">
        <p>
          <strong>Case ID:</strong> {caseDetails._id}
        </p>
        <p>
          <strong>Missing Person Name:</strong> {caseDetails.name}
        </p>
        <p>
          <strong>Description:</strong> {caseDetails.description}
        </p>
        <p>
          <strong>Last Seen Location:</strong> {caseDetails.location}
        </p>
        <p>
            <strong>Status:</strong> <span className={`status-${caseDetails.status}`}>{caseDetails.status}</span>
          </p>

          
      </div>
    </div>
    {/* <ChatSystem caseId={caseDetails._id} /> */}
  </div>


  
  

  );
};

export default TrackingPage;






// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TrackingPage = ({ caseId }) => {
//   const [caseDetails, setCaseDetails] = useState(null);
//   const [statusMessage, setStatusMessage] = useState("");

//   useEffect(() => {
//     const fetchCaseDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/case/${caseId}`);
//         setCaseDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching case details:", error.message);
//       }
//     };

//     fetchCaseDetails();
//   }, [caseId]);

//   const updateStatus = async (newStatus) => {
//     try {
//       await axios.post("http://localhost:5000/api/status/update-status", {
//         caseId,
//         status: newStatus,
//       });
//       setStatusMessage(`Status updated to "${newStatus}" successfully.`);
//       setCaseDetails({ ...caseDetails, status: newStatus });
//     } catch (error) {
//       console.error("Error updating status:", error.message);
//     }
//   };

//   if (!caseDetails) {
//     return <p>Loading case details...</p>;
//   }

//   return (
//     <div>
//       <h2>Track Your Case</h2>
//       <p><strong>Case ID:</strong> {caseDetails._id}</p>
//       <p><strong>Status:</strong> {caseDetails.status}</p>
//       <p><strong>Missing Person Name:</strong> {caseDetails.name}</p>
//       <p><strong>Description:</strong> {caseDetails.description}</p>
//       <button onClick={() => updateStatus("in_progress")}>Mark as In Progress</button>
//       <button onClick={() => updateStatus("resolved")}>Mark as Resolved</button>
//       {statusMessage && <p>{statusMessage}</p>}
//     </div>
//   );
// };

// export default TrackingPage;
