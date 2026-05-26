const rankValues = {
  A: 14,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
};

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
  if (!cards.length) return handTypes.highCard;

  const rankCounts = countBy(cards.map((card) => card.rank));
  const suitCounts = countBy(cards.map((card) => card.suit));
  const counts = Object.values(rankCounts).sort((a, b) => b - a);
  const isFlush = cards.length >= 5 && Object.values(suitCounts).some((count) => count >= 5);
  const isStraight = cards.length >= 5 && hasStraight(cards.map((card) => card.rank));

  if (isStraight && isFlush) return handTypes.straightFlush;
  if (counts[0] === 4) return handTypes.fourKind;
  if (counts[0] === 3 && counts[1] >= 2) return handTypes.fullHouse;
  if (isFlush) return handTypes.flush;
  if (isStraight) return handTypes.straight;
  if (counts[0] === 3) return handTypes.threeKind;
  if (counts[0] === 2 && counts[1] === 2) return handTypes.twoPair;
  if (counts[0] === 2) return handTypes.pair;
  return handTypes.highCard;
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
