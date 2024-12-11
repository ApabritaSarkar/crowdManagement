const express = require('express');
const Officer = require('../models/OfficerDetail');
const bcrypt = require('bcrypt');
const router = express.Router();

// Add Officer
router.post('/add-officer', async (req, res) => {
  try {
    const { name, email, phone_number, role, area, username, password } = req.body;
    const officer = new Officer({
      name,
      email,
      phone_number,
      role,
      area,
      username: username.toLowerCase(), // Save username in lowercase
      password,
    });
    await officer.save();
    res.status(200).json({ message: 'Officer added successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding officer.', error: err.message });
  }
});

// Get All Officers
router.get('/officers', async (req, res) => {
  try {
    const officers = await Officer.find();
    res.status(200).json(officers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching officers.', error: err.message });
  }
});

// Officer Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Login attempt:', { username, password }); // Log incoming request data

  if (!username || !password) {
      console.log('Missing username or password');
      return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
      const officer = await Officer.findOne({ username: username.toLowerCase() });

      if (!officer) {
          console.log('User not found for username:', username);
          return res.status(404).json({ message: 'User not found.' });
      }

      console.log('Stored Hashed Password:', officer.password);

    const isPasswordMatch = await bcrypt.compare(password, officer.password);
    console.log('Password Match Result:', isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

      const { password: _, ...safeOfficerData } = officer.toObject();
      console.log('Login successful for:', username);

      res.status(200).json({ message: 'Login successful.', officer: safeOfficerData });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Error logging in.', error: err.message });
  }
});


// Get Officer Profile by Username
router.get('/officer/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch officer details by username
    const officer = await Officer.findOne({ username: username.toLowerCase() });

    if (!officer) {
      return res.status(404).json({ message: 'Officer not found.' });
    }

    // Exclude sensitive data like password
    const { password, ...officerData } = officer.toObject();

    res.status(200).json({ message: 'Officer details fetched successfully.', officer: officerData });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching officer details.', error: err.message });
  }
});


module.exports = router;
