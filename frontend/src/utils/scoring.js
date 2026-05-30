import { evaluateHand } from './poker';

export function calculateScore(cards, activeJokers, context = {}) {
  const hand = evaluateHand(cards);
  const baseCards = cards.reduce((sum, card) => sum + card.value, 0);
  const specialBonus = cards.reduce((sum, card) => {
    if (card.special === 'bonus') return sum + 12;
    if (card.special === 'lucky') return sum + (Math.random() < 0.5 ? 20 : 0);
    return sum;
  }, 0);
  const specialMultiplier = cards.some((card) => card.special === 'glass') ? 1.5 : 1;

  let flatBonus = specialBonus;
  let multiplier = hand.multiplier * specialMultiplier;
  const applied = [];

  activeJokers.forEach((joker) => {
    const effect = joker.effect;
    if (effect.type === 'flat') {
      flatBonus += effect.value;
      applied.push(`${joker.name} +${effect.value}`);
    }
    if (effect.type === 'handMultiplier' && effect.handIds.includes(hand.id)) {
      multiplier *= effect.value;
      applied.push(`${joker.name} x${effect.value}`);
    }
    if (effect.type === 'handFlat' && effect.handIds.includes(hand.id)) {
      flatBonus += effect.value;
      applied.push(`${joker.name} +${effect.value}`);
    }
    if (effect.type === 'rankBonus') {
      const bonus = cards.filter((card) => effect.ranks.includes(card.rank)).length * effect.value;
      if (bonus > 0) {
        flatBonus += bonus;
        applied.push(`${joker.name} +${bonus}`);
      }
    }
    if (effect.type === 'specialMultiplier' && cards.some((card) => card.special)) {
      multiplier *= effect.value;
      applied.push(`${joker.name} x${effect.value}`);
    }
    if (effect.type === 'lowLifeMultiplier' && context.lives === 1) {
      multiplier *= effect.value;
      applied.push(`${joker.name} x${effect.value}`);
    }
  });

  const total = Math.round((baseCards + flatBonus) * multiplier);
  return {
    total,
    baseCards,
    flatBonus,
    multiplier: Number(multiplier.toFixed(2)),
    hand,
    applied,
  };
}

export function getRoundTarget(difficulty, round) {
  return Math.round(difficulty.baseTarget * Math.pow(difficulty.targetGrowth, round - 1));
}
