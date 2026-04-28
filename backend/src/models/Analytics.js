const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  algorithmSlug: {
    type: String,
    required: true,
    index: true,
  },
  event: {
    type: String,
    required: true,
    enum: ['view', 'like', 'code_copy', 'visualization_click'],
  },
  language: {
    type: String,
    default: null,
  },
  userAgent: {
    type: String,
    default: null,
  },
  ip: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

analyticsSchema.index({ algorithmSlug: 1, event: 1 });
analyticsSchema.index({ createdAt: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;
