import { rankValues } from './deck';

export const handTypes = {
  highCard: { id: 'highCard', name: 'Carta alta', multiplier: 1 },
  pair: { id: 'pair', name: 'Par', multiplier: 1.5 },
  twoPair: { id: 'twoPair', name: 'Doble par', multiplier: 2 },
  threeKind: { id: 'threeKind', name: 'Trio', multiplier: 2.6 },
  straight: { id: 'straight', name: 'Escalera', multiplier: 3.2 },
  flush: { id: 'flush', name: 'Color', multiplier: 3.6 },
  fullHouse: { id: 'fullHouse', name: 'Full house', multiplier: 4.4 },
  fourKind: { id: 'fourKind', name: 'Poker', multiplier: 5.4 },
  straightFlush: { id: 'straightFlush', name: 'Escalera de color', multiplier: 7 },
};

export function evaluateHand(cards) {
  if (!cards.length) {
    return { ...handTypes.highCard, detail: 'Selecciona cartas para puntuar.' };
  }

  const rankCounts = countBy(cards.map((card) => card.rank));
  const suitCounts = countBy(cards.map((card) => card.suit));
  const counts = Object.values(rankCounts).sort((a, b) => b - a);
  const isFlush = cards.length >= 5 && Object.values(suitCounts).some((count) => count >= 5);
  const isStraight = cards.length >= 5 && hasStraight(cards.map((card) => card.rank));

  if (isStraight && isFlush) return withDetail(handTypes.straightFlush, cards);
  if (counts[0] === 4) return withDetail(handTypes.fourKind, cards);
  if (counts[0] === 3 && counts[1] >= 2) return withDetail(handTypes.fullHouse, cards);
  if (isFlush) return withDetail(handTypes.flush, cards);
  if (isStraight) return withDetail(handTypes.straight, cards);
  if (counts[0] === 3) return withDetail(handTypes.threeKind, cards);
  if (counts[0] === 2 && counts[1] === 2) return withDetail(handTypes.twoPair, cards);
  if (counts[0] === 2) return withDetail(handTypes.pair, cards);
  return withDetail(handTypes.highCard, cards);
}

function countBy(items) {
  return items.reduce((result, item) => {
    result[item] = (result[item] || 0) + 1;
    return result;
  }, {});
}

function hasStraight(ranks) {
  const values = [...new Set(ranks.map((rank) => rankValues[rank]))].sort((a, b) => a - b);
  if (values.includes(14)) values.unshift(1);

  let streak = 1;
  for (let i = 1; i < values.length; i += 1) {
    streak = values[i] === values[i - 1] + 1 ? streak + 1 : 1;
    if (streak >= 5) return true;
  }
  return false;
}

function withDetail(handType, cards) {
  const cardNames = cards.map((card) => `${card.rank}${card.symbol}`).join(' ');
  return { ...handType, detail: `${handType.name}: ${cardNames}` };
}
