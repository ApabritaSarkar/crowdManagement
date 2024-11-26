import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Retrieve the logged-in officer's username from localStorage
  const username = localStorage.getItem("username");

  return (
    <div className="sidebar">
      <h2 className="logo">CCTV Dashboard</h2>
      <ul className="nav-links">
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        {/* Navigate dynamically to the profile page */}
        <li onClick={() => navigate(`/profile/${username}`)}>Profile</li>
        <li onClick={() => navigate("/chat")}>Chat</li>
      </ul>
    </div>
  );
};

export default Sidebar;
