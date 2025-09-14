import { JournalEntry } from '../models/JournalEntry.js';
import { detectEmotion, generateSuggestion } from '../utils/emotionDetection.js';

const createJournalEntry = async (req, res) => {
  try {
    const { text } = req.body;
    
    const detectedEmotion = detectEmotion(text);
    const aiSuggestion = generateSuggestion(detectedEmotion);

    const journalEntry = await JournalEntry.create({
      userId: req.user._id,
      text,
      detectedEmotion,
      aiSuggestion
    });

    res.status(201).json({
      success: true,
      data: journalEntry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating journal entry'
    });
  }
};

const getUserJournalEntries = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const entries = await JournalEntry.find({ userId: req.user._id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await JournalEntry.countDocuments({ userId: req.user._id });

    res.json({
      success: true,
      data: entries,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching journal entries'
    });
  }
};

const updateJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const entry = await JournalEntry.findOne({ _id: id, userId: req.user._id });
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }

    const detectedEmotion = detectEmotion(text);
    const aiSuggestion = generateSuggestion(detectedEmotion);

    entry.text = text;
    entry.detectedEmotion = detectedEmotion;
    entry.aiSuggestion = aiSuggestion;
    await entry.save();

    res.json({
      success: true,
      data: entry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating journal entry'
    });
  }
};

const deleteJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await JournalEntry.findOneAndDelete({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Journal entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting journal entry'
    });
  }
};

const getEmotionTrends = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

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
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
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
          _id: 0
        }
      }
    ]);

    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching emotion trends'
    });
  }
};

export { 
  createJournalEntry, 
  getUserJournalEntries, 
  updateJournalEntry, 
  deleteJournalEntry, 
  getEmotionTrends 
};