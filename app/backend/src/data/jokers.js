export const jokers = [
  {
    id: 'golden-grin',
    name: 'Sonrisa Dorada',
    short: '+20',
    description: 'Suma 20 puntos planos en cada mano jugada.',
    effect: { type: 'flat', value: 20 },
  },
  {
    id: 'pair-party',
    name: 'Fiesta de Pares',
    short: 'Par x1.6',
    description: 'Si la jugada tiene al menos un par, multiplica por 1.6.',
    effect: { type: 'handMultiplier', handIds: ['pair', 'twoPair', 'threeKind', 'fullHouse', 'fourKind'], value: 1.6 },
  },
  {
    id: 'flush-flare',
    name: 'Brillo de Color',
    short: 'Color +45',
    description: 'Si juegas color o escalera de color, suma 45 puntos.',
    effect: { type: 'handFlat', handIds: ['flush', 'straightFlush'], value: 45 },
  },
  {
    id: 'royal-chip',
    name: 'Ficha Real',
    short: 'Figuras +8',
    description: 'Cada J, Q, K o A jugada suma 8 puntos extra.',
    effect: { type: 'rankBonus', ranks: ['J', 'Q', 'K', 'A'], value: 8 },
  },
  {
    id: 'wild-spark',
    name: 'Chispa Salvaje',
    short: 'Especial x1.3',
    description: 'Si hay una carta especial seleccionada, multiplica por 1.3.',
    effect: { type: 'specialMultiplier', value: 1.3 },
  },
  {
    id: 'last-breath',
    name: 'Ultimo Aliento',
    short: 'Vida baja x2',
    description: 'Si tienes 1 vida, duplica el puntaje de la mano.',
    effect: { type: 'lowLifeMultiplier', value: 2 },
  },
];
