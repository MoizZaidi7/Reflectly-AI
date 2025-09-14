import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  detectedEmotion: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'angry', 'neutral', 'excited', 'tired', 'grateful'],
    default: 'neutral'
  },
  aiSuggestion: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

journalEntrySchema.index({ userId: 1, date: -1 });

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

export { JournalEntry };