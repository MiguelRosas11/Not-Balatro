import { calculateScore } from '../utils/scoring';

export default function ScorePreview({ selectedCards, activeJokers, lives, lastResult }) {
  const preview = selectedCards.length ? calculateScore(selectedCards, activeJokers, { lives }) : null;
  const result = preview || lastResult;

  return (
    <section className="score-preview">
      <div className="section-heading">
        <h2>{preview ? 'Vista previa' : 'Ultima mano'}</h2>
        <span>{selectedCards.length}/5</span>
      </div>
      {!result && <p className="empty">Selecciona cartas para ver combinacion y puntaje.</p>}
      {result && (
        <div className="score-box">
          <strong>{result.hand.name}</strong>
          <span>{result.total} pts</span>
          <p>Base {result.baseCards} + bonus {result.flatBonus} x {result.multiplier}</p>
          {result.applied.length > 0 && <small>{result.applied.join(' | ')}</small>}
        </div>
      )}
    </section>
  );
}
