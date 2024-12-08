import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const addOfficer = async (officer) => {
  return axios.post(`${API_URL}/add-officer`, officer);
};

export const getOfficers = async () => {
  return axios.get(`${API_URL}/officers`);
};

export const officerLogin = async (credentials) => {
    return axios.post('http://localhost:5000/api/login', credentials);
  };
  
