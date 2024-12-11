import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/HomePage.css';

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
    <div className="homepage-container">
      <h1>Welcome to the Police Management System</h1>
      {/* Admin Button */}
      <div>
        <button className="admin-button" onClick={handleAdminClick}>
          Admin
        </button>
      </div>
      {/* Password Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Admin Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="password-input"
            />
            <div className="modal-buttons">
              <button className="submit-button" onClick={handlePasswordSubmit}>
                Submit
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )}
      <div className="homepage-buttons">
        <button onClick={() => navigate("/officer-login")}>Officer Login</button>
        <button onClick={() => navigate("/report-person")}>Report person</button>
        <button onClick={() => navigate("/report-object")}>Report object</button>
      </div>
    </div>
  );
};

export default HomePage;
