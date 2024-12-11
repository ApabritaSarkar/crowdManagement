import React, { useState, useEffect } from "react";
import AddOfficer from "./AddOfficer";
import OfficerList from "./OfficerList";
import { getOfficers } from "../api/officerService";
import '../styles/Admin.css';


const Admin = () => {
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
    <div>
      <h1>Admin Dashboard</h1>
      <AddOfficer refreshOfficers={fetchOfficers} />
      <h2>All Officers</h2>
      <OfficerList officers={officers} />
    </div>
  );
};

export default Admin;
