const Algorithm = require('../models/Algorithm');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Get all algorithms with filtering, search, and pagination
 */
const getAllAlgorithms = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      search,
      page = 1,
      limit = 12,
      sort = '-views'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    if (difficulty && difficulty !== 'All') {
      filter.difficulty = difficulty;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const algorithms = await Algorithm.find(filter)
      .select('-__v')
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .lean();

    // Get total count for pagination
    const total = await Algorithm.countDocuments(filter);

    return successResponse(res, {
      algorithms,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error in getAllAlgorithms:', error);
    return errorResponse(res, 'Failed to fetch algorithms', 500);
  }
};

/**
 * Get single algorithm by slug
 */
const getAlgorithmBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const algorithm = await Algorithm.findOne({ slug })
      .select('-__v')
      .lean();

    if (!algorithm) {
      return errorResponse(res, 'Algorithm not found', 404);
    }

    return successResponse(res, algorithm);

  } catch (error) {
    console.error('Error in getAlgorithmBySlug:', error);
    return errorResponse(res, 'Failed to fetch algorithm', 500);
  }
};

/**
 * Increment algorithm views
 */
const incrementViews = async (req, res) => {
  try {
    const { slug } = req.params;

    const algorithm = await Algorithm.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!algorithm) {
      return errorResponse(res, 'Algorithm not found', 404);
    }

    return successResponse(res, { views: algorithm.views });

  } catch (error) {
    console.error('Error in incrementViews:', error);
    return errorResponse(res, 'Failed to update views', 500);
  }
};

/**
 * Toggle like on algorithm
 */
const toggleLike = async (req, res) => {
  try {
    const { slug } = req.params;
    const { increment = true } = req.body;

    const updateValue = increment ? 1 : -1;

    const algorithm = await Algorithm.findOneAndUpdate(
      { slug },
      { $inc: { likes: updateValue } },
      { new: true }
    );

    if (!algorithm) {
      return errorResponse(res, 'Algorithm not found', 404);
    }

    return successResponse(res, { likes: algorithm.likes });

  } catch (error) {
    console.error('Error in toggleLike:', error);
    return errorResponse(res, 'Failed to update likes', 500);
  }
};

/**
 * Get algorithm statistics
 */
const getStats = async (req, res) => {
  try {
    const stats = await Algorithm.aggregate([
      {
        $group: {
          _id: null,
          totalAlgorithms: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          avgViews: { $avg: '$views' }
        }
      }
    ]);

    const categoryStats = await Algorithm.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const difficultyStats = await Algorithm.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);

    return successResponse(res, {
      overall: stats[0] || {
        totalAlgorithms: 0,
        totalViews: 0,
        totalLikes: 0,
        avgViews: 0
      },
      byCategory: categoryStats,
      byDifficulty: difficultyStats
    });

  } catch (error) {
    console.error('Error in getStats:', error);
    return errorResponse(res, 'Failed to fetch statistics', 500);
  }
};

/**
 * Get popular algorithms
 */
const getPopular = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const algorithms = await Algorithm.find()
      .select('name slug category difficulty views likes')
      .sort('-views')
      .limit(parseInt(limit))
      .lean();

    return successResponse(res, algorithms);

  } catch (error) {
    console.error('Error in getPopular:', error);
    return errorResponse(res, 'Failed to fetch popular algorithms', 500);
  }
};

/**
 * Search algorithms
 */
const searchAlgorithms = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return errorResponse(res, 'Search query must be at least 2 characters', 400);
    }

    const algorithms = await Algorithm.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    })
      .select('name slug category difficulty')
      .limit(10)
      .lean();

    return successResponse(res, algorithms);

  } catch (error) {
    console.error('Error in searchAlgorithms:', error);
    return errorResponse(res, 'Search failed', 500);
  }
};

/**
 * Get categories
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Algorithm.distinct('category');
    return successResponse(res, categories);
  } catch (error) {
    console.error('Error in getCategories:', error);
    return errorResponse(res, 'Failed to fetch categories', 500);
  }
};

// Export all functions
module.exports = {
  getAllAlgorithms,
  getAlgorithmBySlug,
  incrementViews,
  toggleLike,
  getStats,
  getPopular,
  searchAlgorithms,
  getCategories
};
