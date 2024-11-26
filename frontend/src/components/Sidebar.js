import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="sidebar">
      <h2 className="logo">CCTV Dashboard</h2>
      <ul className="nav-links">
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/settings")}>Settings</li>
        <li onClick={() => navigate("/chat")}>Chat</li>
      </ul>
    </div>
  );
};

export default Sidebar;
