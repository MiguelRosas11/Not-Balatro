export const suits = [
  { id: 'hearts', label: 'Corazones', symbol: '♥', color: 'red' },
  { id: 'diamonds', label: 'Diamantes', symbol: '♦', color: 'red' },
  { id: 'clubs', label: 'Treboles', symbol: '♣', color: 'black' },
  { id: 'spades', label: 'Espadas', symbol: '♠', color: 'black' },
];

export const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const rankValues = {
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

export function createDeck() {
  return suits.flatMap((suit) =>
    ranks.map((rank) => ({
      id: `${rank}-${suit.id}`,
      rank,
      suit: suit.id,
      suitLabel: suit.label,
      symbol: suit.symbol,
      color: suit.color,
      value: rankValues[rank],
      special: Math.random() < 0.14 ? pickSpecial() : null,
    }))
  );
}

export function shuffleDeck(deck) {
  const copy = [...deck];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function drawCards(deck, amount) {
  return {
    drawn: deck.slice(0, amount),
    remaining: deck.slice(amount),
  };
}

function pickSpecial() {
  const specials = ['bonus', 'glass', 'lucky'];
  return specials[Math.floor(Math.random() * specials.length)];
}
