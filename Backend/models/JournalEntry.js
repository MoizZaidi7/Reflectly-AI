import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  text: {
    type: String,
    required: [true, 'Journal text is required'],
    trim: true,
    minlength: [1, 'Journal entry cannot be empty'],
    maxlength: [5000, 'Journal entry cannot exceed 5000 characters']
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  },
  detectedEmotion: {
    type: String,
    enum: {
      values: ['happy', 'sad', 'anxious', 'angry', 'neutral', 'excited', 'tired', 'grateful', 'confused', 'hopeful'],
      message: 'Invalid emotion type'
    },
    default: 'neutral',
    index: true
  },
  aiSuggestion: {
    type: String,
    trim: true,
    maxlength: [1000, 'AI suggestion cannot exceed 1000 characters']
  },
  mood: {
    scale: {
      type: Number,
      min: [1, 'Mood scale must be at least 1'],
      max: [10, 'Mood scale cannot exceed 10'],
      default: 5
    },
    note: {
      type: String,
      trim: true,
      maxlength: [200, 'Mood note cannot exceed 200 characters']
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [20, 'Tag cannot exceed 20 characters']
  }],
  isPrivate: {
    type: Boolean,
    default: true
  },
  wordCount: {
    type: Number,
    default: 0
  },
  sentiment: {
    score: {
      type: Number,
      min: -1,
      max: 1,
      default: 0
    },
    magnitude: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  weather: {
    condition: {
      type: String,
      trim: true
    },
    temperature: Number,
    location: {
      type: String,
      trim: true
    }
  },
  attachments: [{
    filename: {
      type: String,
      required: true
    },
    originalName: String,
    mimetype: String,
    size: Number,
    url: String
  }]
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Indexes for better performance
journalEntrySchema.index({ userId: 1, createdAt: -1 });
journalEntrySchema.index({ userId: 1, detectedEmotion: 1 });
journalEntrySchema.index({ userId: 1, date: -1 });
journalEntrySchema.index({ tags: 1 });
journalEntrySchema.index({ 'sentiment.score': 1 });

// Text index for search functionality
journalEntrySchema.index({ 
  text: 'text', 
  'mood.note': 'text',
  tags: 'text'
}, {
  weights: {
    text: 10,
    'mood.note': 5,
    tags: 3
  },
  name: 'journal_text_index'
});

// Virtual for reading time estimation
journalEntrySchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const words = this.wordCount || this.text.split(' ').length;
  return Math.ceil(words / wordsPerMinute);
});

// Virtual for formatted date
journalEntrySchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Pre-save middleware to calculate word count
journalEntrySchema.pre('save', function(next) {
  if (this.isModified('text')) {
    this.wordCount = this.text.trim().split(/\s+/).length;
  }
  next();
});

// Pre-save middleware to validate tags
journalEntrySchema.pre('save', function(next) {
  if (this.tags && this.tags.length > 10) {
    return next(new Error('Cannot have more than 10 tags per entry'));
  }
  
  // Remove duplicates and empty tags
  if (this.tags) {
    this.tags = [...new Set(this.tags.filter(tag => tag && tag.trim()))];
  }
  
  next();
});

// Static method to get emotion statistics for a user
journalEntrySchema.statics.getEmotionStats = async function(userId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return await this.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: '$detectedEmotion',
        count: { $sum: 1 },
        avgMood: { $avg: '$mood.scale' },
        avgSentiment: { $avg: '$sentiment.score' }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

// Static method to search entries
journalEntrySchema.statics.searchEntries = async function(userId, query, options = {}) {
  const {
    emotion,
    dateFrom,
    dateTo,
    tags,
    minMood,
    maxMood,
    page = 1,
    limit = 10
  } = options;

  const filter = {
    userId: new mongoose.Types.ObjectId(userId),
    $text: { $search: query }
  };

  if (emotion) filter.detectedEmotion = emotion;
  if (tags && tags.length > 0) filter.tags = { $in: tags };
  if (minMood !== undefined) filter['mood.scale'] = { $gte: minMood };
  if (maxMood !== undefined) {
    filter['mood.scale'] = { ...filter['mood.scale'], $lte: maxMood };
  }
  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
    if (dateTo) filter.createdAt.$lte = new Date(dateTo);
  }

  const skip = (page - 1) * limit;

  const [entries, total] = await Promise.all([
    this.find(filter)
      .sort({ score: { $meta: 'textScore' }, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    this.countDocuments(filter)
  ]);

  return {
    entries,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalEntries: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  };
};

// Instance method to get similar entries
journalEntrySchema.methods.getSimilarEntries = async function(limit = 5) {
  return await this.constructor.find({
    userId: this.userId,
    _id: { $ne: this._id },
    $or: [
      { detectedEmotion: this.detectedEmotion },
      { tags: { $in: this.tags } },
      { 'sentiment.score': { 
        $gte: this.sentiment.score - 0.2, 
        $lte: this.sentiment.score + 0.2 
      }}
    ]
  })
  .sort({ createdAt: -1 })
  .limit(limit);
};

// Instance method to update sentiment
journalEntrySchema.methods.updateSentiment = function(score, magnitude) {
  this.sentiment.score = score;
  this.sentiment.magnitude = magnitude;
  return this.save();
};

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

export { JournalEntry };