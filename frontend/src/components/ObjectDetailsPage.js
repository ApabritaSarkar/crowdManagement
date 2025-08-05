import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ObjectDetailsPage.css";

const ObjectDetailsPage = () => {
  const { id } = useParams(); // Extract the object ID from the URL
  const [objectDetails, setObjectDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the object details from the backend
    const fetchObjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/object/${id}`);
        setObjectDetails(response.data); // Set the fetched object details
      } catch (err) {
        console.error("Error fetching object details:", err);
        setError("Failed to fetch object details. Please try again.");
      }
    };

    fetchObjectDetails();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!objectDetails) {
    return <div>Loading...</div>; // Display a loading state while fetching data
  }

  return (
    <div className="object-details-container">
        {objectDetails.image && (
        <div>
          <strong></strong>
          <div>
            <img
              src={`http://localhost:5000/${objectDetails.image}`}
              alt="Uploaded Object"
              className="object-image"
              style={{
                maxWidth: "300px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
              }}
            />
          </div>
        </div>
      )}
      <h2>Missing Object Details</h2>
      <p>
        <strong>Object Name:</strong> {objectDetails.objectName}
      </p>
      <p>
        <strong>Description:</strong> {objectDetails.description}
      </p>
      <p>
        <strong>Last Seen Location:</strong> {objectDetails.lastSeenLocation}
      </p>
      {/* <p>
        <strong>Reporter Name:</strong> {objectDetails.reporterName}
      </p>
      <p>
        <strong>Contact Info:</strong> {objectDetails.contact}
      </p>
      <p>
        <strong>Email:</strong> {objectDetails.email}
      </p> */}
      <p>
        <strong>Date Reported:</strong>{" "}
        {new Date(objectDetails.createdAt).toLocaleString()}
      </p>
      
    </div>
  );
};

export default ObjectDetailsPage;
