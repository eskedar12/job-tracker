const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

// Get all saved jobs for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ appliedDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save a new job (manually added or from search)
router.post('/', auth, async (req, res) => {
  try {
    const { company, position, location, salary, status, notes, appliedDate, resumeUrl } = req.body;
    const newJob = new Job({
      userId: req.user.id,
      company,
      position,
      location,
      salary,
      status,
      notes,
      appliedDate,
      resumeUrl
    });
    await newJob.save();
    res.json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a job (status, notes, etc.)
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status, notes },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a job
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;