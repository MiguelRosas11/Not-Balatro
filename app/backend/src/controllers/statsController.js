import { randomUUID } from 'node:crypto';

const memoryStats = [];

export function getStatsSummary(req, res) {
  res.json({
    matchesStored: memoryStats.length,
    note: 'Endpoint preparado para futuras estadisticas persistentes.',
  });
}

export function saveMatch(req, res) {
  const match = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  memoryStats.push(match);
  res.status(201).json(match);
}
