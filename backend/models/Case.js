const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cname: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String,required: true },
  
  contact: { type: String, required: true },
  email: { type: String, required: true },
  // status: { type: String, default: 'Reported' },
  status: {
    type: String,
    enum: ["submitted", "in_progress", "resolved", "match_found"],
    default: "submitted",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Case', caseSchema);









// const mongoose = require("mongoose");

// const caseSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   location: { type: String, required: true },
//   contact: { type: String, required: true },
//   image: { type: String, required: true },
//   email:{ type:String,required:false },
//   status: { type: String, default: "Reported" },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Case", caseSchema);







// const mongoose = require("mongoose");

// const caseSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   location: { type: String, required: true },
//   contact: { type: String, required: true },
//   email: { type: String, required: true },
//   image: { type: String },
//   status: { type: String, default: "Reported" },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Case", caseSchema);


