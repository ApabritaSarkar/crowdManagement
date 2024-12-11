import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/OfficerLogin.css';

const OfficerLogin = ({ setUsername }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {        
        setMessage("Login successful!");
        // Store the officer's username in localStorage
        localStorage.setItem("username", data.officer.username);
        navigate(`/profile/${data.officer.username}`); // Navigate to the profile page
      } else {
        setMessage(data.message || 'Error logging in');
      }
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <div>
      <h1>Officer Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OfficerLogin;
