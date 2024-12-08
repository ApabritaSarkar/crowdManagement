import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const HARDCODED_PASSWORD = "admin123"; // Hardcoded password

  const handleAdminClick = () => {
    setIsModalOpen(true); // Open the password modal
  };

  const handlePasswordSubmit = () => {
    if (password === HARDCODED_PASSWORD) {
      setIsModalOpen(false);
      setErrorMessage("");
      navigate("/admin"); // Redirect to the admin page
    } else {
      setErrorMessage("Incorrect password. Try again.");
    }
  };

  return (
    <div>
      <h1>Welcome to the Police Management System</h1>
      {/* Admin Button */}
      <div>
        <button
          onClick={handleAdminClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Admin
        </button>
      </div>
      {/* Password Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <h3>Enter Admin Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handlePasswordSubmit}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Submit
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            {errorMessage && (
              <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
            )}
          </div>
        </div>
      )}
      <button onClick={() => navigate("/officer-login")}>Officer Login</button>
      <button onClick={() => navigate("/report-person")}>Report person</button>
      <button onClick={() => navigate("/report-object")}>Report object</button>
    </div>
  );
};

export default HomePage;
