const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String, default: '' },
  salary: { type: String, default: '' },
  status: { type: String, enum: ['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'], default: 'Applied' },
  notes: { type: String, default: '' },
  appliedDate: { type: Date, default: Date.now },
  resumeUrl: { type: String, default: '' }
});

module.exports = mongoose.model('Job', jobSchema);