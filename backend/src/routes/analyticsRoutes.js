import express from 'express';

const router = express.Router();

// Store for analytics (in production, use a database)
let analyticsData = {
  algorithmUsage: {},
  searchUsage: {},
  totalRequests: 0,
  uniqueUsers: new Set()
};

// Track algorithm usage
router.post('/track', (req, res) => {
  try {
    const { algorithm, type, userId } = req.body;
    
    analyticsData.totalRequests++;
    
    if (userId) {
      analyticsData.uniqueUsers.add(userId);
    }
    
    if (type === 'sort') {
      analyticsData.algorithmUsage[algorithm] = 
        (analyticsData.algorithmUsage[algorithm] || 0) + 1;
    } else if (type === 'search') {
      analyticsData.searchUsage[algorithm] = 
        (analyticsData.searchUsage[algorithm] || 0) + 1;
    }
    
    res.json({ 
      success: true, 
      message: 'Analytics tracked successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get analytics data
router.get('/stats', (req, res) => {
  try {
    const stats = {
      totalRequests: analyticsData.totalRequests,
      uniqueUsers: analyticsData.uniqueUsers.size,
      algorithmUsage: analyticsData.algorithmUsage,
      searchUsage: analyticsData.searchUsage,
      mostUsedAlgorithm: getMostUsed(analyticsData.algorithmUsage),
      mostUsedSearch: getMostUsed(analyticsData.searchUsage)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get algorithm-specific stats
router.get('/algorithm/:name', (req, res) => {
  try {
    const { name } = req.params;
    const usageCount = analyticsData.algorithmUsage[name] || 0;
    
    res.json({
      algorithm: name,
      usageCount,
      percentage: analyticsData.totalRequests > 0 
        ? ((usageCount / analyticsData.totalRequests) * 100).toFixed(2)
        : 0
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Reset analytics (for testing)
router.delete('/reset', (req, res) => {
  try {
    analyticsData = {
      algorithmUsage: {},
      searchUsage: {},
      totalRequests: 0,
      uniqueUsers: new Set()
    };
    
    res.json({ 
      success: true, 
      message: 'Analytics reset successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Helper function to get most used item
function getMostUsed(usageObject) {
  if (Object.keys(usageObject).length === 0) return null;
  
  return Object.entries(usageObject).reduce((a, b) => 
    a[1] > b[1] ? a : b
  )[0];
}

export default router;
