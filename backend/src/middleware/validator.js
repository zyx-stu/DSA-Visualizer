import { body, validationResult } from 'express-validator';

export const validateAlgorithm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be 3-100 characters'),
  
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn([
      'sorting', 'searching', 'graph', 'tree', 'dynamic-programming',
      'greedy', 'backtracking', 'divide-conquer', 'string', 'math',
      'bit-manipulation', 'array', 'linked-list', 'stack', 'queue',
      'heap', 'hashing', 'recursion', 'other'
    ]).withMessage('Invalid category'),
  
  body('difficulty')
    .notEmpty().withMessage('Difficulty is required')
    .isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty'),
  
  body('description.short')
    .trim()
    .notEmpty().withMessage('Short description is required')
    .isLength({ max: 200 }).withMessage('Short description max 200 characters'),
  
  body('description.detailed')
    .trim()
    .notEmpty().withMessage('Detailed description is required'),
  
  body('complexity.time.worst')
    .notEmpty().withMessage('Worst time complexity is required'),
  
  body('complexity.space')
    .notEmpty().withMessage('Space complexity is required'),
  
  body('codeSnippets')
    .isArray({ min: 1 }).withMessage('At least one code snippet required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }
    next();
  },
];
