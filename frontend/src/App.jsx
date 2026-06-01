import { useGame } from './hooks/useGame';
import GameOverPage from './pages/GameOverPage';
import GamePage from './pages/GamePage';
import MenuPage from './pages/MenuPage';

export default function App() {
  const gameState = useGame();

  if (gameState.screen === 'menu') {
    return (
      <MenuPage
        difficultyId={gameState.difficultyId}
        setDifficultyId={gameState.setDifficultyId}
        onStart={gameState.startGame}
      />
    );
  }

  if (gameState.screen === 'gameOver') {
    return (
      <GameOverPage
        game={gameState.game}
        message={gameState.message}
        onRestart={gameState.restartGame}
        onMenu={gameState.goMenu}
      />
    );
  }

  return (
    <GamePage
      game={gameState.game}
      difficulty={gameState.difficulty}
      selectedIds={gameState.selectedIds}
      selectedCards={gameState.selectedCards}
      lastResult={gameState.lastResult}
      jokerChoices={gameState.jokerChoices}
      message={gameState.message}
      onToggleCard={gameState.toggleCard}
      onPlay={gameState.playSelected}
      onDiscard={gameState.discardSelected}
      onSkip={gameState.skipRound}
      onRestart={gameState.restartGame}
      onMenu={gameState.goMenu}
      onChooseJoker={gameState.chooseJoker}
    />
  );
}
