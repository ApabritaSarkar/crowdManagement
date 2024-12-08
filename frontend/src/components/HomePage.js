import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Police Management System</h1>
      <button onClick={() => navigate("/admin")}>Admin</button>
      <button onClick={() => navigate("/officer-login")}>Officer Login</button>
      <button onClick={() => navigate("/report-diary")}>Report Diary</button>
    </div>
  );
};

export default HomePage;
