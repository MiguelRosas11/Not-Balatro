export default function GameHud({ game, difficulty }) {
  const stats = [
    ['Ronda', game.round],
    ['Objetivo', game.target],
    ['Puntos', game.score],
    ['Vidas', game.lives],
    ['Manos', game.handsLeft],
    ['Descartes', game.discardsLeft],
    ['Mazo', game.deck.length],
  ];

  return (
    <aside className="hud">
      <div>
        <p className="eyebrow">Dificultad</p>
        <h2>{difficulty.name}</h2>
      </div>
      <div className="progress-track">
        <span style={{ width: `${Math.min(100, (game.score / game.target) * 100)}%` }} />
      </div>
      <div className="stat-grid">
        {stats.map(([label, value]) => (
          <div className="stat" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </aside>
  );
}
