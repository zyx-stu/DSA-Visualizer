const express = require('express');
const router = express.Router();
const algorithmController = require('../controllers/algorithmController');
const { validateQuery } = require('../middleware/validator');

// GET /api/algorithms - Get all algorithms (with filters)
router.get('/', algorithmController.getAllAlgorithms);

// GET /api/algorithms/popular - Get popular algorithms
router.get('/popular', algorithmController.getPopular);

// GET /api/algorithms/stats - Get statistics
router.get('/stats', algorithmController.getStats);

// GET /api/algorithms/categories - Get all categories
router.get('/categories', algorithmController.getCategories);

// GET /api/algorithms/search - Search algorithms
router.get('/search', algorithmController.searchAlgorithms);

// GET /api/algorithms/:slug - Get single algorithm
router.get('/:slug', algorithmController.getAlgorithmBySlug);

// POST /api/algorithms/:slug/view - Increment views
router.post('/:slug/view', algorithmController.incrementViews);

// POST /api/algorithms/:slug/like - Toggle like
router.post('/:slug/like', algorithmController.toggleLike);

module.exports = router;
