export default function GameOverPage({ game, message, onRestart, onMenu }) {
  return (
    <main className="menu-page">
      <section className="hero-panel danger">
        <div className="brand-mark">KO</div>
        <h1>Game Over</h1>
        <p>{message}</p>
        {game && (
          <div className="final-stats">
            <span>Ronda {game.round}</span>
            <span>{game.score}/{game.target} puntos</span>
            <span>{game.activeJokers.length} jokers</span>
          </div>
        )}
        <div className="end-actions">
          <button className="btn primary big" type="button" onClick={onRestart}>
            Reintentar
          </button>
          <button className="btn ghost big" type="button" onClick={onMenu}>
            Volver al menu
          </button>
        </div>
      </section>
    </main>
  );
}
