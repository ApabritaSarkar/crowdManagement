import React, { useEffect, useState } from "react";
import axios from "axios";
import ObjectTables from "./ObjectTables";
import RealTimeUpdates from "./RealTimeUpdates"; // Optional
// import "../styles/ObjectDashboard.css";

const ObjectDashboard = () => {
  const [objects, setObjects] = useState([]); // Object reports
  const [realTimeUpdates, setRealTimeUpdates] = useState([]); // Real-time updates

  useEffect(() => {
    // Fetch all object reports
    const fetchObjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/object-dashboard/objects");
        setObjects(response.data);
      } catch (error) {
        console.error("Error fetching object reports:", error.message);
      }
    };

    // Fetch real-time updates for objects
    const fetchRealTimeUpdates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/object-dashboard/realtime");
        setRealTimeUpdates(response.data.updates || []);
      } catch (error) {
        console.error("Error fetching real-time updates:", error.message);
      }
    };

    fetchObjects();
    fetchRealTimeUpdates();

    const interval = setInterval(fetchRealTimeUpdates, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="object-dashboard">
      <h1>Object Dashboard</h1>

      <section>
        <h2>Reported Missing Objects</h2>
        <ObjectTables objects={objects} />
      </section>

      <section>
        <h2>Real-Time Updates</h2>
        <RealTimeUpdates updates={realTimeUpdates} />
      </section>
    </div>
  );
};

export default ObjectDashboard;