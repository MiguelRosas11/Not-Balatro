import Card from './Card';

export default function CardHand({ cards, selectedIds, onToggle }) {
  return (
    <section className="play-section">
      <div className="section-heading">
        <h2>Mano</h2>
        <span>{cards.length} cartas</span>
      </div>
      <div className="hand-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} selected={selectedIds.includes(card.id)} onClick={onToggle} />
        ))}
      </div>
    </section>
  );
}
