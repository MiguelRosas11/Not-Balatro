import { evaluateHand } from '../utils/poker.js';

export function calculateScore(cards = [], activeJokers = [], context = {}) {
  const hand = evaluateHand(cards);
  const baseCards = cards.reduce((sum, card) => sum + Number(card.value || 0), 0);
  let flatBonus = cards.reduce((sum, card) => {
    if (card.special === 'bonus') return sum + 12;
    if (card.special === 'lucky') return sum + 10;
    return sum;
  }, 0);
  let multiplier = hand.multiplier * (cards.some((card) => card.special === 'glass') ? 1.5 : 1);
  const applied = [];

  activeJokers.forEach((joker) => {
    const effect = joker.effect;
    if (!effect) return;
    if (effect.type === 'flat') {
      flatBonus += effect.value;
      applied.push(joker.name);
    }
    if (effect.type === 'handMultiplier' && effect.handIds.includes(hand.id)) {
      multiplier *= effect.value;
      applied.push(joker.name);
    }
    if (effect.type === 'handFlat' && effect.handIds.includes(hand.id)) {
      flatBonus += effect.value;
      applied.push(joker.name);
    }
    if (effect.type === 'rankBonus') {
      flatBonus += cards.filter((card) => effect.ranks.includes(card.rank)).length * effect.value;
      applied.push(joker.name);
    }
    if (effect.type === 'specialMultiplier' && cards.some((card) => card.special)) {
      multiplier *= effect.value;
      applied.push(joker.name);
    }
    if (effect.type === 'lowLifeMultiplier' && context.lives === 1) {
      multiplier *= effect.value;
      applied.push(joker.name);
    }
  });

  return {
    total: Math.round((baseCards + flatBonus) * multiplier),
    baseCards,
    flatBonus,
    multiplier: Number(multiplier.toFixed(2)),
    hand,
    applied,
  };
}
