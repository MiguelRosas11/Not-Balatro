import { difficulties } from '../data/difficulties.js';
import { jokers } from '../data/jokers.js';

export function health(req, res) {
  res.json({ ok: true, name: 'Not-Balatro API', timestamp: new Date().toISOString() });
}

export function getJokers(req, res) {
  res.json(jokers);
}

export function getDifficulties(req, res) {
  res.json(difficulties);
}
