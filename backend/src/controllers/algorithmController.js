const Algorithm = require('../models/Algorithm');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Get all algorithms with filtering, search, and pagination
 * GET /api/algorithms?category=sorting&difficulty=easy&search=bubble&page=1&limit=12
 */
const getAllAlgorithms = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      search,
      page = 1,
      limit = 12,
      sort = 'createdAt',
    } = req.query;

    const filter = { isActive: true };

    if (category && category !== 'all') filter.category = category;
    if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;

    if (search && search.trim().length >= 2) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { 'description.short': { $regex: search.trim(), $options: 'i' } },
        { tags: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortMap = {
      popular: { 'analytics.views': -1 },
      newest:  { createdAt: -1 },
      name:    { name: 1 },
      createdAt: { createdAt: -1 },
    };
    const sortQuery = sortMap[sort] || { createdAt: -1 };

    const [algorithms, total] = await Promise.all([
      Algorithm.find(filter)
        .select('-__v -codeSnippets -visualizations')
        .sort(sortQuery)
        .limit(parseInt(limit))
        .skip(skip)
        .lean(),
      Algorithm.countDocuments(filter),
    ]);

    return successResponse(res, {
      algorithms,
      pagination: {
        currentPage:  parseInt(page),
        totalPages:   Math.ceil(total / parseInt(limit)),
        totalItems:   total,
        itemsPerPage: parseInt(limit),
        hasNext:      parseInt(page) < Math.ceil(total / parseInt(limit)),
        hasPrev:      parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error('getAllAlgorithms error:', error);
    return errorResponse(res, 'Failed to fetch algorithms', 500);
  }
};

/**
 * Get single algorithm by slug (full detail including code)
 * GET /api/algorithms/:slug
 */
const getAlgorithmBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const algorithm = await Algorithm.findOne({ slug, isActive: true })
      .select('-__v')
      .lean();

    if (!algorithm) {
      return errorResponse(res, 'Algorithm not found', 404);
    }

    // Increment view count asynchronously (fire-and-forget)
    Algorithm.findOneAndUpdate(
      { slug },
      { $inc: { 'analytics.views': 1 } }
    ).exec();

    return successResponse(res, { algorithm });
  } catch (error) {
    console.error('getAlgorithmBySlug error:', error);
    return errorResponse(res, 'Failed to fetch algorithm', 500);
  }
};

/**
 * Toggle like on algorithm
 * POST /api/algorithms/:slug/like
 */
const toggleLike = async (req, res) => {
  try {
    const { slug } = req.params;
    const { increment = true } = req.body;
    const delta = increment ? 1 : -1;

    const algorithm = await Algorithm.findOneAndUpdate(
      { slug },
      { $inc: { 'analytics.likes': delta } },
      { new: true, select: 'analytics.likes' }
    );

    if (!algorithm) return errorResponse(res, 'Algorithm not found', 404);

    return successResponse(res, { likes: algorithm.analytics.likes });
  } catch (error) {
    console.error('toggleLike error:', error);
    return errorResponse(res, 'Failed to update likes', 500);
  }
};

/**
 * Get platform statistics
 * GET /api/algorithms/stats
 */
const getStats = async (req, res) => {
  try {
    const [overall, byCategory, byDifficulty] = await Promise.all([
      Algorithm.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: null,
            totalAlgorithms: { $sum: 1 },
            totalViews: { $sum: '$analytics.views' },
            totalLikes: { $sum: '$analytics.likes' },
          },
        },
      ]),
      Algorithm.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Algorithm.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$difficulty', count: { $sum: 1 } } },
      ]),
    ]);

    return successResponse(res, {
      overall: overall[0] || { totalAlgorithms: 0, totalViews: 0, totalLikes: 0 },
      byCategory,
      byDifficulty,
    });
  } catch (error) {
    console.error('getStats error:', error);
    return errorResponse(res, 'Failed to fetch statistics', 500);
  }
};

/**
 * Get popular algorithms
 * GET /api/algorithms/popular?limit=6
 */
const getPopular = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const algorithms = await Algorithm.find({ isActive: true })
      .select('name slug category difficulty analytics description.short tags')
      .sort({ 'analytics.views': -1 })
      .limit(Math.min(parseInt(limit), 20))
      .lean();

    return successResponse(res, { algorithms });
  } catch (error) {
    console.error('getPopular error:', error);
    return errorResponse(res, 'Failed to fetch popular algorithms', 500);
  }
};

/**
 * Search algorithms (autocomplete)
 * GET /api/algorithms/search?q=bubble
 */
const searchAlgorithms = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return errorResponse(res, 'Search query must be at least 2 characters', 400);
    }

    const algorithms = await Algorithm.find({
      isActive: true,
      $or: [
        { name: { $regex: q.trim(), $options: 'i' } },
        { 'description.short': { $regex: q.trim(), $options: 'i' } },
        { tags: { $regex: q.trim(), $options: 'i' } },
        { category: { $regex: q.trim(), $options: 'i' } },
      ],
    })
      .select('name slug category difficulty')
      .limit(10)
      .lean();

    return successResponse(res, { algorithms });
  } catch (error) {
    console.error('searchAlgorithms error:', error);
    return errorResponse(res, 'Search failed', 500);
  }
};

/**
 * Get all distinct categories
 * GET /api/algorithms/categories
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Algorithm.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    return successResponse(res, { categories });
  } catch (error) {
    console.error('getCategories error:', error);
    return errorResponse(res, 'Failed to fetch categories', 500);
  }
};

module.exports = {
  getAllAlgorithms,
  getAlgorithmBySlug,
  toggleLike,
  getStats,
  getPopular,
  searchAlgorithms,
  getCategories,
};
