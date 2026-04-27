import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  algorithmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Algorithm',
    required: true,
    index: true,
  },
  eventType: {
    type: String,
    enum: ['view', 'like', 'copy_code', 'visit_visualization'],
    required: true,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
}, {
  timestamps: true,
});

// Index for time-based queries
analyticsSchema.index({ timestamp: -1 });
analyticsSchema.index({ algorithmId: 1, eventType: 1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
