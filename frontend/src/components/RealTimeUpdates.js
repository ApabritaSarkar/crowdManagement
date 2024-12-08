import React, { useState, useEffect } from "react";
import axios from "axios";

const RealTimeUpdates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/realtime");
        const data = response.data || [];
        setUpdates(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching updates:", error);
        setUpdates([]); // Default to empty array on error
      }
    }

    fetchUpdates();
  }, []);

  return (
    <div>
      <h2>Real-Time Updates</h2>
      {Array.isArray(updates) && updates.length > 0 ? (
        updates.map((update, index) => (
          <div key={index} className="update-item">
            <p>{update.message}</p>
          </div>
        ))
      ) : (
        <p>No updates available.</p>
      )}
    </div>
  );
};

export default RealTimeUpdates;
