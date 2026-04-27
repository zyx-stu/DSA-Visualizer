import express from 'express';
import algorithmController from '../controllers/algorithmController.js';
import { validateAlgorithm } from '../middleware/validator.js';

const router = express.Router();

// Public routes
router.get('/', algorithmController.getAll);
router.get('/stats', algorithmController.getStats);
router.get('/categories', algorithmController.getCategories);
router.get('/popular', algorithmController.getPopular);
router.get('/slug/:slug', algorithmController.getBySlug);
router.get('/:id', algorithmController.getById);
router.post('/:id/like', algorithmController.like);

// Admin routes (add authentication middleware in production)
router.post('/', validateAlgorithm, algorithmController.create);
router.put('/:id', validateAlgorithm, algorithmController.update);
router.delete('/:id', algorithmController.delete);

export default router;
