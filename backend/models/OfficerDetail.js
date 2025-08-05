const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const officerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  role: { type: String, required: true },
  area: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  // photoPath: String, // Path to the uploaded photo
});

// Hash password before saving
officerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      console.log('Raw Password:', this.password);
      this.password = await bcrypt.hash(this.password, 10);
      console.log('Hashed Password:', this.password);
    }
    next();
});

// Convert username to lowercase for consistency
officerSchema.pre('save', function (next) {
    this.username = this.username.toLowerCase();
    next();
});

module.exports = mongoose.model('OfficerDetail', officerSchema);