import { Router } from 'express';
import { getDifficulties, getJokers, health } from '../controllers/dataController.js';
import { scoreGame } from '../controllers/gameController.js';
import { getStatsSummary, saveMatch } from '../controllers/statsController.js';

const router = Router();

router.get('/health', health);
router.get('/jokers', getJokers);
router.get('/difficulties', getDifficulties);
router.post('/game/score', scoreGame);
router.get('/stats/summary', getStatsSummary);
router.post('/stats/match', saveMatch);

export default router;
