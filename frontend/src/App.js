import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddOfficer from "./components/AddOfficer";
import OfficerList from "./components/OfficerList";
import OfficerLogin from "./components/OfficerLogin";
import ReportDiary from "./components/ReportDiary";
import Dashboard from "./components/Dashboard";
import { getOfficers } from "./api/officerService";

const App = () => {
  const [officers, setOfficers] = useState([]);

  const fetchOfficers = async () => {
    try {
      const response = await getOfficers();
      setOfficers(response.data);
    } catch (error) {
      console.error("Error fetching officers:", error);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin-dashboard"
          element={
            <div>
              <h1>Admin Dashboard</h1>
              <AddOfficer refreshOfficers={fetchOfficers} />
              <h2>All Officers</h2>
              <OfficerList officers={officers} />
            </div>
          }
        />
        <Route path="/officer-login" element={<OfficerLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-diary" element={<ReportDiary />} />
      </Routes>
    </Router>
  );
};

export default App;
