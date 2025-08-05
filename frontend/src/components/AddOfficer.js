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
    <form onSubmit={handleSubmit} className='Text-black rounded-lg space-y-4'>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required  className='w-full pl-10 pr-4 py-3 bg-white/10 border border-black/30 rounded-lg text-black  placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 p-2'/>
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className='w-full pl-10 pr-4 py-3  bg-white/10 border border-black/30 rounded-lg text-black placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 p-2'/>
      <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" required className='w-full pl-10 pr-4 py-3  bg-white/10 border border-black/30 rounded-lg text-black placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 p-2'/>
      <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" required className='w-full pl-10 pr-4 py-3  bg-white/10 border border-black/30 rounded-lg text-black  placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 p-2'/>
      <input name="area" value={formData.area} onChange={handleChange} placeholder="Area" required className='w-full pl-10 pr-4 py-3  bg-white/10 border border-black/30 rounded-lg text-black  placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 p-2'/>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className='w-full pl-10 pr-4 py-3  bg-white/10 border border-black/30 rounded-lg text-black placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 p-2'/>
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className='w-full pl-10 pr-4 py-3  bg-white/10 border border-black/30 rounded-lg text-black placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 p-2'/>
      <button type="submit" className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900'>Add Officer</button>
    </form>
  );
};

export default AddOfficer;
