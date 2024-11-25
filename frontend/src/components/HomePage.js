import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome</h1>
      <button
        style={buttonStyle}
        onClick={() => navigate("/admin-dashboard")}
      >
        Admin Dashboard
      </button>
      <button
        style={buttonStyle}
        onClick={() => navigate("/officer-login")}
      >
        Officer Login
      </button>
      <button
        style={buttonStyle}
        onClick={() => navigate("/report-diary")}
      >
        Report Diary
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: "15px 30px",
  fontSize: "16px",
  margin: "10px",
  cursor: "pointer",
};

export default HomePage;
