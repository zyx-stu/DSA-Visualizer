const Analytics = require('../models/Analytics');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Track an analytics event
 * POST /api/analytics/track
 */
const trackEvent = async (req, res) => {
  try {
    const { algorithmSlug, event, language } = req.body;

    if (!algorithmSlug || !event) {
      return errorResponse(res, 'algorithmSlug and event are required', 400);
    }

    await Analytics.create({
      algorithmSlug,
      event,
      language: language || null,
      userAgent: req.headers['user-agent'] || null,
      ip: req.ip || null,
    });

    return successResponse(res, null, 'Event tracked', 201);
  } catch (error) {
    console.error('trackEvent error:', error);
    return errorResponse(res, 'Failed to track event', 500);
  }
};

/**
 * Get aggregated analytics for an algorithm
 * GET /api/analytics/:slug
 */
const getAlgorithmAnalytics = async (req, res) => {
  try {
    const { slug } = req.params;

    const stats = await Analytics.aggregate([
      { $match: { algorithmSlug: slug } },
      { $group: { _id: '$event', count: { $sum: 1 } } },
    ]);

    return successResponse(res, { slug, stats });
  } catch (error) {
    console.error('getAlgorithmAnalytics error:', error);
    return errorResponse(res, 'Failed to fetch analytics', 500);
  }
};

module.exports = { trackEvent, getAlgorithmAnalytics };
