export default function Controls({
  canPlay,
  canDiscard,
  canSkip,
  onPlay,
  onDiscard,
  onSkip,
  onRestart,
  onMenu,
}) {
  return (
    <div className="controls">
      <button className="btn primary" type="button" onClick={onPlay} disabled={!canPlay}>
        Jugar mano
      </button>
      <button className="btn amber" type="button" onClick={onDiscard} disabled={!canDiscard}>
        Descartar
      </button>
      <button className="btn ghost" type="button" onClick={onSkip} disabled={!canSkip}>
        Saltar
      </button>
      <button className="btn ghost" type="button" onClick={onRestart}>
        Reiniciar
      </button>
      <button className="btn link" type="button" onClick={onMenu}>
        Menu
      </button>
    </div>
  );
}
