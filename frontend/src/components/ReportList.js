import React, { useEffect, useState } from "react";
import axios from "axios";
import CaseTable from "./CaseTable";
import RealTimeUpdates from "./RealTimeUpdates";
import "../styles/ReportList.css";


const ReportList = () => {
  const [cases, setCases] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  const [liveFeedStatus, setLiveFeedStatus] = useState(false); // State for live feed status


  useEffect(() => {
    // Fetch all cases
    const fetchCases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/cases");
        setCases(response.data);
      } catch (error) {
        console.error("Error fetching cases:", error.message);
      }
    };

    // Fetch real-time updates
    const fetchRealTimeUpdates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/realtime");
        setRealTimeUpdates(response.data);
      } catch (error) {
        console.error("Error fetching real-time updates:", error.message);
      }
    };

    fetchCases();
    fetchRealTimeUpdates();

    const interval = setInterval(fetchRealTimeUpdates, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Function to handle live feed
  const startLiveFeed = async () => {
    try {
      const liveFeedUrl = "http://localhost:5001/live_feed"; // Flask live feed endpoint
      setLiveFeedStatus(true); // Indicate live feed is running
      window.open(liveFeedUrl, "_blank"); // Open live feed in a new tab/window
    } catch (error) {
      console.error("Error starting live feed:", error.message);
      alert("Failed to start the live feed. Please check the backend server.");
    }
  };

  return (
    <div className="police-dashboard">
      <h1>Police Dashboard</h1>

      <section>
        <h2>Reported Cases</h2>
        <CaseTable cases={cases} />
      </section>

      <section>
        <h2>Real-Time Surveillance Updates</h2>
        <RealTimeUpdates updates={realTimeUpdates} />
      </section>

      <section>
        <h2>Live Feed</h2>
        <button onClick={startLiveFeed} className="live-feed-button">
          Start Live Feed
        </button>
        {liveFeedStatus && <p className="live-feed-status">Live feed is running...</p>}
      </section>
    </div>
  );
};

export default ReportList;
