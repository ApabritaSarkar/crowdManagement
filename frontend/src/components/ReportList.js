import React, { useEffect, useState } from "react";
import axios from "axios";
import CaseTable from "./CaseTable";
import RealTimeUpdates from "./RealTimeUpdates";
import "../styles/ReportList.css";


const ReportList = () => {
  const [cases, setCases] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);

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
    </div>
  );
};

export default ReportList;
