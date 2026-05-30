import CardHand from '../components/CardHand';
import Controls from '../components/Controls';
import GameHud from '../components/GameHud';
import JokerModal from '../components/JokerModal';
import JokerPanel from '../components/JokerPanel';
import ScorePreview from '../components/ScorePreview';

export default function GamePage({
  game,
  difficulty,
  selectedIds,
  selectedCards,
  lastResult,
  jokerChoices,
  message,
  onToggleCard,
  onPlay,
  onDiscard,
  onSkip,
  onRestart,
  onMenu,
  onChooseJoker,
}) {
  const isPlaying = game.status === 'playing';

  return (
    <main className="game-page">
      <GameHud game={game} difficulty={difficulty} />
      <section className="table-area">
        <header className="game-header">
          <div>
            <p className="eyebrow">Mesa activa</p>
            <h1>Not-Balatro</h1>
          </div>
          <div className="message-pill">{message}</div>
        </header>
        <ScorePreview
          selectedCards={selectedCards}
          activeJokers={game.activeJokers}
          lives={game.lives}
          lastResult={lastResult}
        />
        <CardHand cards={game.hand} selectedIds={selectedIds} onToggle={onToggleCard} />
        <Controls
          canPlay={isPlaying && selectedIds.length > 0}
          canDiscard={isPlaying && selectedIds.length > 0 && game.discardsLeft > 0}
          canSkip={isPlaying}
          onPlay={onPlay}
          onDiscard={onDiscard}
          onSkip={onSkip}
          onRestart={onRestart}
          onMenu={onMenu}
        />
      </section>
      <JokerPanel jokers={game.activeJokers} />
      <JokerModal choices={jokerChoices} onChoose={onChooseJoker} />
    </main>
  );
}
