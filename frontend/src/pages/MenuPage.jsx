import { difficulties } from '../data/difficulties';

export default function MenuPage({ difficultyId, setDifficultyId, onStart }) {
  return (
    <main className="menu-page">
      <section className="hero-panel">
        <div className="brand-mark">NB</div>
        <h1>Not-Balatro</h1>
        <p>
          Poker rapido con jokers, rondas y objetivos crecientes.
        </p>
        <div className="difficulty-grid">
          {difficulties.map((difficulty) => (
            <button
              className={`difficulty-card ${difficultyId === difficulty.id ? 'active' : ''}`}
              key={difficulty.id}
              type="button"
              onClick={() => setDifficultyId(difficulty.id)}
            >
              <strong>{difficulty.name}</strong>
            </button>
          ))}
        </div>
        <button className="btn primary big" type="button" onClick={() => onStart(difficultyId)}>
          Iniciar partida
        </button>
      </section>
    </main>
  );
}
