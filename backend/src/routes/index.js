const express = require('express');
const router = express.Router();

const algorithmRoutes = require('./algorithmRoutes');
const analyticsRoutes = require('./analyticsRoutes');

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'DSA Visualizer API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mount routes
router.use('/algorithms', algorithmRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
