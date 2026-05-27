const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
  const { query } = req.query;
  // Mock jobs – you can later integrate with a real API like JSearch
  const mockJobs = [
    { id: '1', company: 'Stripe', position: 'Senior Frontend Engineer', location: 'Remote', salary: '$180k', description: 'Great opportunity' },
    { id: '2', company: 'Linear', position: 'Product Designer', location: 'San Francisco', salary: '$160k', description: 'Design systems' },
    { id: '3', company: 'Vercel', position: 'Full Stack Engineer', location: 'Remote', salary: '$170k', description: 'Next.js expert' },
    { id: '4', company: 'Figma', position: 'UI Engineer', location: 'New York', salary: '$165k', description: 'Component libraries' }
  ];
  res.json(mockJobs);
});

module.exports = router;