export default function JokerPanel({ jokers }) {
  return (
    <section className="joker-panel">
      <div className="section-heading">
        <h2>Jokers activos</h2>
        <span>{jokers.length}/6</span>
      </div>
      <div className="joker-list">
        {jokers.length === 0 && <p className="empty">Gana una ronda para desbloquear jokers.</p>}
        {jokers.map((joker) => (
          <article className="joker-card" key={joker.id}>
            <div className="joker-badge">{joker.short}</div>
            <h3>{joker.name}</h3>
            <p>{joker.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
