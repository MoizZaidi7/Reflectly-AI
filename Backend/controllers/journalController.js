import { JournalEntry } from '../models/JournalEntry.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';
import { AppError, ErrorFactory } from '../utils/AppError.js';
import { sendResponse, sendPaginatedResponse } from '../utils/responseHelper.js';
import { sanitizeJournalEntry, sanitizeArray } from '../utils/sanitizers.js';
import { detectEmotion, generateSuggestion } from '../utils/emotionDetection.js';
import logger from '../utils/logger.js';
/**
 * Create a new journal entry
 * @route POST /api/journals
 * @access Private
 */
const createJournalEntry = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  
  // Detect emotion and generate AI suggestion
  const detectedEmotion = detectEmotion(text);
  const aiSuggestion = generateSuggestion(detectedEmotion);

  // Create journal entry
  const journalEntry = await JournalEntry.create({
    userId: req.user._id,
    text: text.trim(),
    detectedEmotion,
    aiSuggestion
  });

  logger.info('Journal entry created', {
    userId: req.user._id,
    entryId: journalEntry._id,
    emotion: detectedEmotion,
    textLength: text.length
  });

  sendResponse(res, 201, {
    message: 'Journal entry created successfully',
    data: sanitizeJournalEntry(journalEntry)
  });
});

/**
 * Get user's journal entries with pagination
 * @route GET /api/journals
 * @access Private
 */
const getUserJournalEntries = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', emotion } = req.query;
  const skip = (page - 1) * limit;

  // Build filter object
  const filter = { userId: req.user._id };
  if (emotion && emotion !== 'all') {
    filter.detectedEmotion = emotion;
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Execute query with pagination
  const [entries, total] = await Promise.all([
    JournalEntry.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    JournalEntry.countDocuments(filter)
  ]);

  const pagination = {
    current: parseInt(page),
    pages: Math.ceil(total / limit),
    total
  };

  logger.info('Journal entries retrieved', {
    userId: req.user._id,
    count: entries.length,
    page: parseInt(page),
    total
  });

  sendPaginatedResponse(
    res, 
    200, 
    sanitizeArray(entries, sanitizeJournalEntry), 
    pagination,
    'Journal entries retrieved successfully'
  );
});

/**
 * Get a single journal entry
 * @route GET /api/journals/:id
 * @access Private
 */
const getJournalEntry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const entry = await JournalEntry.findOne({ 
    _id: id, 
    userId: req.user._id 
  }).lean();

  if (!entry) {
    return next(ErrorFactory.notFound('Journal entry not found'));
  }

  sendResponse(res, 200, {
    message: 'Journal entry retrieved successfully',
    data: sanitizeJournalEntry(entry)
  });
});

/**
 * Update a journal entry
 * @route PUT /api/journals/:id
 * @access Private
 */
const updateJournalEntry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;

  // Find the entry
  const entry = await JournalEntry.findOne({ _id: id, userId: req.user._id });
  if (!entry) {
    return next(ErrorFactory.notFound('Journal entry not found'));
  }

  // Re-analyze emotion if text changed
  const detectedEmotion = detectEmotion(text);
  const aiSuggestion = generateSuggestion(detectedEmotion);

  // Update entry
  entry.text = text.trim();
  entry.detectedEmotion = detectedEmotion;
  entry.aiSuggestion = aiSuggestion;
  await entry.save();

  logger.info('Journal entry updated', {
    userId: req.user._id,
    entryId: entry._id,
    newEmotion: detectedEmotion,
    textLength: text.length
  });

  sendResponse(res, 200, {
    message: 'Journal entry updated successfully',
    data: sanitizeJournalEntry(entry)
  });
});

/**
 * Delete a journal entry
 * @route DELETE /api/journals/:id
 * @access Private
 */
const deleteJournalEntry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const entry = await JournalEntry.findOneAndDelete({ 
    _id: id, 
    userId: req.user._id 
  });

  if (!entry) {
    return next(ErrorFactory.notFound('Journal entry not found'));
  }

  logger.info('Journal entry deleted', {
    userId: req.user._id,
    entryId: id
  });

  sendResponse(res, 200, {
    message: 'Journal entry deleted successfully'
  });
});

/**
 * Get emotion trends for user
 * @route GET /api/journals/trends/emotions
 * @access Private
 */
const getEmotionTrends = asyncHandler(async (req, res) => {
  const { days = 30 } = req.query;
  const daysNumber = parseInt(days); // Convert to number
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysNumber);

  const trends = await JournalEntry.aggregate([
    {
      $match: {
        userId: req.user._id,
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          emotion: '$detectedEmotion',
          date: { 
            $dateToString: { 
              format: '%Y-%m-%d', 
              date: '$date',
              timezone: req.user.timezone || 'UTC'
            } 
          }
        },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: '$_id.emotion',
        data: {
          $push: {
            date: '$_id.date',
            count: '$count'
          }
        },
        total: { $sum: '$count' }
      }
    },
    {
      $project: {
        emotion: '$_id',
        data: 1,
        total: 1,
        percentage: { 
          $multiply: [
            { $divide: ['$total', daysNumber] }, // Use the numeric value
            100
          ] 
        },
        _id: 0
      }
    },
    {
      $sort: { total: -1 }
    }
  ]);

  // Get summary statistics
  const summary = await JournalEntry.aggregate([
    {
      $match: {
        userId: req.user._id,
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalEntries: { $sum: 1 },
        avgEntriesPerDay: { $avg: 1 },
        emotions: { $addToSet: '$detectedEmotion' },
        firstEntry: { $min: '$date' },
        lastEntry: { $max: '$date' }
      }
    }
  ]);

  logger.info('Emotion trends retrieved', {
    userId: req.user._id,
    days: daysNumber, // Use the numeric value
    trendsCount: trends.length
  });

  sendResponse(res, 200, {
    message: 'Emotion trends retrieved successfully',
    data: {
      trends,
      summary: summary[0] || {},
      period: {
        days: daysNumber, // Use the numeric value
        startDate,
        endDate: new Date()
      }
    }
  });
});
/**
 * Get journal statistics
 * @route GET /api/journals/stats
 * @access Private
 */
const getJournalStats = asyncHandler(async (req, res) => {
  const stats = await JournalEntry.aggregate([
    {
      $match: { userId: req.user._id }
    },
    {
      $facet: {
        totalStats: [
          {
            $group: {
              _id: null,
              totalEntries: { $sum: 1 },
              totalWords: { $sum: { $size: { $split: ['$text', ' '] } } },
              avgWordsPerEntry: { $avg: { $size: { $split: ['$text', ' '] } } },
              firstEntry: { $min: '$createdAt' },
              lastEntry: { $max: '$createdAt' }
            }
          }
        ],
        emotionBreakdown: [
          {
            $group: {
              _id: '$detectedEmotion',
              count: { $sum: 1 },
              percentage: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          }
        ],
        monthlyStats: [
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' }
              },
              count: { $sum: 1 }
            }
          },
          {
            $sort: { '_id.year': -1, '_id.month': -1 }
          },
          {
            $limit: 12
          }
        ]
      }
    }
  ]);

  sendResponse(res, 200, {
    message: 'Journal statistics retrieved successfully',
    data: stats[0]
  });
});

/**
 * Search journal entries
 * @route GET /api/journals/search
 * @access Private
 */
const searchJournalEntries = asyncHandler(async (req, res) => {
  const { q, emotion, dateFrom, dateTo, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  if (!q || q.trim().length < 2) {
    return sendResponse(res, 400, {
      message: 'Search query must be at least 2 characters long'
    });
  }

  // Build search filter
  const filter = {
    userId: req.user._id,
    $text: { $search: q.trim() }
  };

  if (emotion && emotion !== 'all') {
    filter.detectedEmotion = emotion;
  }

  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
    if (dateTo) filter.createdAt.$lte = new Date(dateTo);
  }

  const [entries, total] = await Promise.all([
    JournalEntry.find(filter)
      .select('text detectedEmotion aiSuggestion date createdAt')
      .sort({ score: { $meta: 'textScore' }, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    JournalEntry.countDocuments(filter)
  ]);

  const pagination = {
    current: parseInt(page),
    pages: Math.ceil(total / limit),
    total
  };

  logger.info('Journal search performed', {
    userId: req.user._id,
    query: q,
    results: entries.length
  });

  sendPaginatedResponse(
    res,
    200,
    sanitizeArray(entries, sanitizeJournalEntry),
    pagination,
    `Found ${total} journal entries`
  );
});

export { 
  createJournalEntry, 
  getUserJournalEntries,
  getJournalEntry,
  updateJournalEntry, 
  deleteJournalEntry, 
  getEmotionTrends,
  getJournalStats,
  searchJournalEntries
};