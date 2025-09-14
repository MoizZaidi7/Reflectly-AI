import express from 'express';
import { 
  createJournalEntry, 
  getUserJournalEntries,
  getJournalEntry,
  updateJournalEntry, 
  deleteJournalEntry, 
  getEmotionTrends,
  getJournalStats,
  searchJournalEntries
} from '../controllers/journalController.js';
import { protect } from '../middleware/auth.js';
import { validateJournalEntry } from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

router.post('/', validateJournalEntry, createJournalEntry);
router.get('/', getUserJournalEntries);
router.get('/:id', getJournalEntry);
router.put('/:id', validateJournalEntry, updateJournalEntry);
router.delete('/:id', deleteJournalEntry);
router.get('/trends/emotions', getEmotionTrends);
router.get('/stats', getJournalStats);
router.get('/search', searchJournalEntries);

export { router as journalRoutes };