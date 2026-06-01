export default function JokerModal({ choices, onChoose }) {
  if (!choices.length) return null;

  return (
    <div className="modal-backdrop">
      <section className="joker-modal">
        <p className="eyebrow">Victoria de ronda</p>
        <h2>Elige un joker</h2>
        <div className="choice-grid">
          {choices.map((joker) => (
            <button className="joker-choice" type="button" key={joker.id} onClick={() => onChoose(joker)}>
              <span>{joker.short}</span>
              <strong>{joker.name}</strong>
              <small>{joker.description}</small>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
