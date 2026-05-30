export default function Card({ card, selected, onClick }) {
  const specialLabel = {
    bonus: '+',
    glass: 'x',
    lucky: '?',
  }[card.special];

  return (
    <button
      className={`card ${card.color} ${selected ? 'selected' : ''} ${card.special ? 'special' : ''}`}
      onClick={() => onClick(card.id)}
      type="button"
      aria-pressed={selected}
    >
      <span className="card-corner">{card.rank}</span>
      <span className="card-symbol">{card.symbol}</span>
      <span className="card-suit">{card.suitLabel}</span>
      {specialLabel && <span className="special-mark">{specialLabel}</span>}
    </button>
  );
}
