import mongoose from 'mongoose';
import slugify from 'slugify';

const codeSnippetSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['python', 'javascript', 'cpp', 'java', 'go'],
  },
  code: {
    type: String,
    required: true,
  },
}, { _id: false });

const visualizationSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['visualgo', 'algorithm-visualizer', 'custom', 'youtube', 'other'],
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
}, { _id: false });

const complexitySchema = new mongoose.Schema({
  time: {
    best: { type: String, default: 'N/A' },
    average: { type: String, default: 'N/A' },
    worst: { type: String, required: true },
  },
  space: {
    type: String,
    required: true,
  },
}, { _id: false });

const algorithmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Algorithm name is required'],
    trim: true,
    unique: true,
    index: true,
  },
  slug: {
    type: String,
    unique: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'sorting',
      'searching',
      'graph',
      'tree',
      'dynamic-programming',
      'greedy',
      'backtracking',
      'divide-conquer',
      'string',
      'math',
      'bit-manipulation',
      'array',
      'linked-list',
      'stack',
      'queue',
      'heap',
      'hashing',
      'recursion',
      'other'
    ],
    index: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
    index: true,
  },
  description: {
    short: {
      type: String,
      required: true,
      maxLength: 200,
    },
    detailed: {
      type: String,
      required: true,
    },
  },
  complexity: {
    type: complexitySchema,
    required: true,
  },
  codeSnippets: {
    type: [codeSnippetSchema],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one code snippet is required',
    },
  },
  visualizations: {
    type: [visualizationSchema],
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
  prerequisites: {
    type: [String],
    default: [],
  },
  useCases: {
    type: [String],
    default: [],
  },
  analytics: {
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes for performance
algorithmSchema.index({ name: 'text', 'description.short': 'text', tags: 'text' });
algorithmSchema.index({ category: 1, difficulty: 1 });
algorithmSchema.index({ createdAt: -1 });

// Pre-save hook to generate slug
algorithmSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

// Virtual for difficulty color
algorithmSchema.virtual('difficultyColor').get(function() {
  const colors = {
    easy: '#22c55e',
    medium: '#f59e0b',
    hard: '#ef4444',
  };
  return colors[this.difficulty];
});

// Instance method to increment views
algorithmSchema.methods.incrementViews = async function() {
  this.analytics.views += 1;
  return this.save();
};

// Instance method to increment likes
algorithmSchema.methods.incrementLikes = async function() {
  this.analytics.likes += 1;
  return this.save();
};

// Static method to get categories with counts
algorithmSchema.statics.getCategoryCounts = async function() {
  return this.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
};

// Static method to get popular algorithms
algorithmSchema.statics.getPopular = async function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ 'analytics.views': -1 })
    .limit(limit);
};

const Algorithm = mongoose.model('Algorithm', algorithmSchema);

export default Algorithm;
