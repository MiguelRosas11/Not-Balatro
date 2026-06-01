import { calculateScore } from '../services/scoreService.js';

export function scoreGame(req, res) {
  const { cards = [], jokers = [], context = {} } = req.body || {};
  if (!Array.isArray(cards) || cards.length > 5) {
    return res.status(400).json({ error: 'cards debe ser un arreglo de 1 a 5 cartas.' });
  }
  return res.json(calculateScore(cards, jokers, context));
}
