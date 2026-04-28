const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// POST /api/analytics/track
router.post('/track', analyticsController.trackEvent);

// GET /api/analytics/:slug
router.get('/:slug', analyticsController.getAlgorithmAnalytics);

module.exports = router;
