import express from 'express';
import { 
  createJournalEntry, 
  getUserJournalEntries, 
  updateJournalEntry, 
  deleteJournalEntry, 
  getEmotionTrends 
} from '../controllers/journalController.js';
import { protect } from '../middleware/auth.js';
import { validateJournalEntry } from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

router.post('/', validateJournalEntry, createJournalEntry);
router.get('/', getUserJournalEntries);
router.put('/:id', validateJournalEntry, updateJournalEntry);
router.delete('/:id', deleteJournalEntry);
router.get('/trends/emotions', getEmotionTrends);

export { router as journalRoutes };