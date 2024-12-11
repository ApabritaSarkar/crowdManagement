import React, { useState } from 'react';
import { addOfficer } from '../api/officerService';
import '../styles/AddOfficer.css';


const AddOfficer = ({ refreshOfficers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    role: '',
    area: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOfficer(formData);
      alert('Officer added successfully!');
      refreshOfficers(); // Refresh the officer list
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        role: '',
        area: '',
        username: '',
        password: '',
      });
    } catch (error) {
      alert('Error adding officer.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" required />
      <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" required />
      <input name="area" value={formData.area} onChange={handleChange} placeholder="Area" required />
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Add Officer</button>
    </form>
  );
};

export default AddOfficer;
