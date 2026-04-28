const Analytics = require('../models/Analytics');
const Algorithm = require('../models/Algorithm');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Track an event (view, like, share, etc.)
 */
const trackEvent = async (req, res) => {
  try {
    const { algorithmId, eventType, metadata } = req.body;

    // Validate required fields
    if (!algorithmId || !eventType) {
      return errorResponse(res, 'Algorithm ID and event type are required', 400);
    }

    // Verify algorithm exists
    const algorithm = await Algorithm.findById(algorithmId);
    if (!algorithm) {
      return errorResponse(res, 'Algorithm not found', 404);
    }

    // Create analytics record
    const analyticsData = {
      algorithmId,
      algorithmSlug: algorithm.slug,
      algorithmName: algorithm.name,
      eventType,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip || req.connection.remoteAddress,
      timestamp: new Date(),
      metadata: metadata || {}
    };

    const analytics = await Analytics.create(analyticsData);

    return successResponse(res, analytics, 'Event tracked successfully', 201);

  } catch (error) {
    console.error('Error in trackEvent:', error);
    return errorResponse(res, 'Failed to track event', 500);
  }
};

/**
 * Get analytics for a specific algorithm
 */
const getAlgorithmAnalytics = async (req, res) => {
  try {
    const { slug } = req.params;
    const { startDate, endDate, eventType } = req.query;

    // Find algorithm
    const algorithm = await Algorithm.findOne({ slug });
    if (!algorithm) {
      return errorResponse(res, 'Algorithm not found', 404);
    }

    // Build filter
    const filter = { algorithmId: algorithm._id };

    if (eventType) {
      filter.eventType = eventType;
    }

    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    // Get analytics data
    const analytics = await Analytics.find(filter)
      .sort('-timestamp')
      .limit(100)
      .lean();

    // Get aggregated stats
    const stats = await Analytics.aggregate([
      { $match: { algorithmId: algorithm._id } },
      {
        $group: {
          _id: '$eventType',
          count: { $sum: 1 }
        }
      }
    ]);

    return successResponse(res, {
      algorithm: {
        id: algorithm._id,
        name: algorithm.name,
        slug: algorithm.slug
      },
      events: analytics,
      statistics: stats,
      totalEvents: analytics.length
    });

  } catch (error) {
    console.error('Error in getAlgorithmAnalytics:', error);
    return errorResponse(res, 'Failed to fetch analytics', 500);
  }
};

/**
 * Get overall platform analytics
 */
const getOverallAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Build date filter
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.timestamp = {};
      if (startDate) dateFilter.timestamp.$gte = new Date(startDate);
      if (endDate) dateFilter.timestamp.$lte = new Date(endDate);
    }

    // Total events
    const totalEvents = await Analytics.countDocuments(dateFilter);

    // Events by type
    const eventsByType = await Analytics.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$eventType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Top algorithms by views
    const topAlgorithms = await Analytics.aggregate([
      { $match: { eventType: 'view', ...dateFilter } },
      {
        $group: {
          _id: '$algorithmSlug',
          name: { $first: '$algorithmName' },
          views: { $sum: 1 }
        }
      },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]);

    // Daily activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyActivity = await Analytics.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Unique algorithms viewed
    const uniqueAlgorithms = await Analytics.distinct('algorithmId', {
      eventType: 'view',
      ...dateFilter
    });

    return successResponse(res, {
      totalEvents,
      eventsByType,
      topAlgorithms,
      dailyActivity,
      uniqueAlgorithmsViewed: uniqueAlgorithms.length,
      dateRange: {
        start: startDate || 'all time',
        end: endDate || 'now'
      }
    });

  } catch (error) {
    console.error('Error in getOverallAnalytics:', error);
    return errorResponse(res, 'Failed to fetch overall analytics', 500);
  }
};

/**
 * Get trending algorithms
 */
const getTrending = async (req, res) => {
  try {
    const { days = 7, limit = 10 } = req.query;

    // Calculate date threshold
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - parseInt(days));

    // Get trending algorithms based on recent views
    const trending = await Analytics.aggregate([
      {
        $match: {
          eventType: 'view',
          timestamp: { $gte: dateThreshold }
        }
      },
      {
        $group: {
          _id: '$algorithmId',
          slug: { $first: '$algorithmSlug' },
          name: { $first: '$algorithmName' },
          recentViews: { $sum: 1 }
        }
      },
      { $sort: { recentViews: -1 } },
      { $limit: parseInt(limit) }
    ]);

    // Enrich with algorithm data
    const enrichedTrending = await Promise.all(
      trending.map(async (item) => {
        const algorithm = await Algorithm.findById(item._id)
          .select('category difficulty timeComplexity views likes')
          .lean();

        return {
          ...item,
          ...algorithm
        };
      })
    );

    return successResponse(res, enrichedTrending);

  } catch (error) {
    console.error('Error in getTrending:', error);
    return errorResponse(res, 'Failed to fetch trending algorithms', 500);
  }
};

/**
 * Get user activity summary
 */
const getUserActivity = async (req, res) => {
  try {
    const { ipAddress, userAgent } = req.query;

    if (!ipAddress && !userAgent) {
      return errorResponse(res, 'IP address or user agent required', 400);
    }

    const filter = {};
    if (ipAddress) filter.ipAddress = ipAddress;
    if (userAgent) filter.userAgent = userAgent;

    const activities = await Analytics.find(filter)
      .sort('-timestamp')
      .limit(50)
      .select('algorithmName algorithmSlug eventType timestamp')
      .lean();

    const summary = await Analytics.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$eventType',
          count: { $sum: 1 }
        }
      }
    ]);

    return successResponse(res, {
      activities,
      summary,
      totalActivities: activities.length
    });

  } catch (error) {
    console.error('Error in getUserActivity:', error);
    return errorResponse(res, 'Failed to fetch user activity', 500);
  }
};

/**
 * Get popular algorithms by time range
 */
const getPopularByTimeRange = async (req, res) => {
  try {
    const { range = 'week', limit = 10 } = req.query;

    // Calculate date threshold based on range
    const dateThreshold = new Date();
    switch (range) {
      case 'day':
        dateThreshold.setDate(dateThreshold.getDate() - 1);
        break;
      case 'week':
        dateThreshold.setDate(dateThreshold.getDate() - 7);
        break;
      case 'month':
        dateThreshold.setMonth(dateThreshold.getMonth() - 1);
        break;
      case 'year':
        dateThreshold.setFullYear(dateThreshold.getFullYear() - 1);
        break;
      default:
        dateThreshold.setDate(dateThreshold.getDate() - 7);
    }

    const popular = await Analytics.aggregate([
      {
        $match: {
          eventType: 'view',
          timestamp: { $gte: dateThreshold }
        }
      },
      {
        $group: {
          _id: '$algorithmId',
          slug: { $first: '$algorithmSlug' },
          name: { $first: '$algorithmName' },
          views: { $sum: 1 }
        }
      },
      { $sort: { views: -1 } },
      { $limit: parseInt(limit) }
    ]);

    return successResponse(res, {
      range,
      algorithms: popular
    });

  } catch (error) {
    console.error('Error in getPopularByTimeRange:', error);
    return errorResponse(res, 'Failed to fetch popular algorithms', 500);
  }
};

/**
 * Clean old analytics data
 */
const cleanOldAnalytics = async (req, res) => {
  try {
    const { daysToKeep = 90 } = req.query;

    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - parseInt(daysToKeep));

    const result = await Analytics.deleteMany({
      timestamp: { $lt: dateThreshold }
    });

    return successResponse(res, {
      deletedCount: result.deletedCount,
      message: `Deleted analytics older than ${daysToKeep} days`
    });

  } catch (error) {
    console.error('Error in cleanOldAnalytics:', error);
    return errorResponse(res, 'Failed to clean old analytics', 500);
  }
};

// Export all functions
module.exports = {
  trackEvent,
  getAlgorithmAnalytics,
  getOverallAnalytics,
  getTrending,
  getUserActivity,
  getPopularByTimeRange,
  cleanOldAnalytics
};
