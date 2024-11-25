import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddOfficer from './components/AddOfficer';
import OfficerList from './components/OfficerList';
import OfficerLogin from './components/OfficerLogin';
import { getOfficers } from './api/officerService';

const App = () => {
  const [officers, setOfficers] = useState([]);

  const fetchOfficers = async () => {
    try {
      const response = await getOfficers();
      setOfficers(response.data);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/officer-login">Officer Login</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Admin Dashboard */}
          <Route
            path="/"
            element={
              <div>
                <h1>Admin Dashboard</h1>
                <AddOfficer refreshOfficers={fetchOfficers} />
                <h2>All Officers</h2>
                <OfficerList officers={officers} />
              </div>
            }
          />
          
          {/* Officer Login */}
          <Route path="/officer-login" element={<OfficerLogin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
