import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ latestCaseId }) => {
  const navigate = useNavigate();

  const handleTrackCase = () => {
    if (latestCaseId) {
      navigate(`/track/${latestCaseId}`); // Navigate to the specific case route
    } else {
      alert("No case has been submitted yet!");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          Missing Report
        </div>
        <ul className="navbar-links">
          <li onClick={() => navigate("/report")}>Home</li>
          <li>
            <button
              onClick={handleTrackCase}
              className="track-case-button"
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Track Case
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
