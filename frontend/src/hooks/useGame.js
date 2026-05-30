import { useMemo, useState } from 'react';
import { difficulties } from '../data/difficulties';
import { jokers } from '../data/jokers';
import { createDeck, drawCards, shuffleDeck } from '../utils/deck';
import { sampleItems } from '../utils/random';
import { calculateScore, getRoundTarget } from '../utils/scoring';

const handSize = 8;
const maxSelection = 5;

export function useGame() {
  const [screen, setScreen] = useState('menu');
  const [difficultyId, setDifficultyId] = useState('normal');
  const [game, setGame] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [jokerChoices, setJokerChoices] = useState([]);
  const [message, setMessage] = useState('Elige dificultad y empieza.');

  const difficulty = useMemo(
    () => difficulties.find((item) => item.id === difficultyId) || difficulties[1],
    [difficultyId]
  );

  function startGame(chosenDifficultyId = difficultyId) {
    const chosenDifficulty = difficulties.find((item) => item.id === chosenDifficultyId) || difficulties[1];
    const deck = shuffleDeck(createDeck());
    const firstDraw = drawCards(deck, handSize);
    setDifficultyId(chosenDifficulty.id);
    setGame({
      deck: firstDraw.remaining,
      hand: firstDraw.drawn,
      round: 1,
      score: 0,
      target: getRoundTarget(chosenDifficulty, 1),
      lives: chosenDifficulty.lives,
      handsLeft: chosenDifficulty.handsPerRound,
      discardsLeft: chosenDifficulty.discardsPerRound,
      activeJokers: [],
      status: 'playing',
    });
    setSelectedIds([]);
    setLastResult(null);
    setJokerChoices([]);
    setScreen('game');
    setMessage('Partida iniciada. Selecciona hasta 5 cartas.');
  }

  function toggleCard(cardId) {
    if (!game || game.status !== 'playing') return;
    setSelectedIds((current) => {
      if (current.includes(cardId)) return current.filter((id) => id !== cardId);
      if (current.length >= maxSelection) return current;
      return [...current, cardId];
    });
  }

  function playSelected() {
    if (!game || selectedIds.length === 0 || game.status !== 'playing') return;
    const selectedCards = game.hand.filter((card) => selectedIds.includes(card.id));
    const result = calculateScore(selectedCards, game.activeJokers, { lives: game.lives });
    const nextScore = game.score + result.total;
    const nextHands = game.handsLeft - 1;
    const replaced = replaceSelectedCards(game.hand, game.deck, selectedIds);
    const reachedTarget = nextScore >= game.target;

    setLastResult(result);
    setSelectedIds([]);

    if (reachedTarget) {
      const choices = sampleItems(jokers, 2, game.activeJokers.map((joker) => joker.id));
      setGame({
        ...game,
        score: nextScore,
        hand: replaced.hand,
        deck: replaced.deck,
        status: 'roundWon',
      });
      setJokerChoices(choices);
      setMessage('Ronda ganada. Elige un joker para continuar.');
      return;
    }

    const nextGame = {
      ...game,
      score: nextScore,
      handsLeft: nextHands,
      hand: replaced.hand,
      deck: replaced.deck,
    };

    if (shouldLoseLife(nextGame)) {
      handleFailedRound(nextGame);
      return;
    }

    setGame(nextGame);
    setMessage(`${result.hand.name}: +${result.total} puntos.`);
  }

  function discardSelected() {
    if (!game || selectedIds.length === 0 || game.discardsLeft <= 0 || game.status !== 'playing') return;
    const replaced = replaceSelectedCards(game.hand, game.deck, selectedIds);
    const nextGame = {
      ...game,
      hand: replaced.hand,
      deck: replaced.deck,
      discardsLeft: game.discardsLeft - 1,
    };
    setSelectedIds([]);
    setGame(nextGame);
    setMessage('Cartas descartadas y reemplazadas.');
  }

  function skipRound() {
    if (!game || game.status !== 'playing') return;
    const nextLives = game.lives - 1;
    if (nextLives <= 0) {
      setGame({ ...game, lives: 0, status: 'gameOver' });
      setScreen('gameOver');
      setMessage('Game Over. Saltar costo tu ultima vida.');
      return;
    }
    const nextScore = Math.max(0, game.score - difficulty.skipPenalty);
    setGame({ ...game, lives: nextLives, score: nextScore });
    setSelectedIds([]);
    setMessage(`Saltaste. Pierdes 1 vida y ${difficulty.skipPenalty} puntos.`);
  }

  function chooseJoker(joker) {
    if (!game || game.status !== 'roundWon') return;
    const nextRound = game.round + 1;
    const deck = game.deck.length < handSize ? shuffleDeck(createDeck()) : game.deck;
    const draw = drawCards(deck, handSize);

    setGame({
      ...game,
      deck: draw.remaining,
      hand: draw.drawn,
      round: nextRound,
      score: 0,
      target: getRoundTarget(difficulty, nextRound),
      handsLeft: difficulty.handsPerRound,
      discardsLeft: difficulty.discardsPerRound,
      activeJokers: [...game.activeJokers, joker],
      status: 'playing',
    });
    setJokerChoices([]);
    setLastResult(null);
    setMessage(`${joker.name} agregado. Nueva ronda lista.`);
  }

  function restartGame() {
    startGame(difficultyId);
  }

  function handleFailedRound(currentGame) {
    const nextLives = currentGame.lives - 1;
    if (nextLives <= 0) {
      setGame({ ...currentGame, lives: 0, status: 'gameOver' });
      setScreen('gameOver');
      setMessage('Game Over. No alcanzaste el objetivo.');
      return;
    }

    const deck = shuffleDeck(createDeck());
    const draw = drawCards(deck, handSize);
    setGame({
      ...currentGame,
      deck: draw.remaining,
      hand: draw.drawn,
      score: 0,
      lives: nextLives,
      handsLeft: difficulty.handsPerRound,
      discardsLeft: difficulty.discardsPerRound,
      status: 'playing',
    });
    setMessage('Pierdes 1 vida. Misma ronda, nueva mano.');
  }

  function goMenu() {
    setScreen('menu');
    setGame(null);
    setSelectedIds([]);
    setLastResult(null);
    setJokerChoices([]);
    setMessage('Elige dificultad y empieza.');
  }

  return {
    screen,
    difficulty,
    difficultyId,
    setDifficultyId,
    game,
    selectedIds,
    selectedCards: game ? game.hand.filter((card) => selectedIds.includes(card.id)) : [],
    lastResult,
    jokerChoices,
    message,
    startGame,
    toggleCard,
    playSelected,
    discardSelected,
    skipRound,
    chooseJoker,
    restartGame,
    goMenu,
  };
}

function replaceSelectedCards(hand, deck, selectedIds) {
  const draw = drawCards(deck, selectedIds.length);
  let drawIndex = 0;
  const nextHand = hand
    .map((card) => {
      if (!selectedIds.includes(card.id)) return card;
      const replacement = draw.drawn[drawIndex];
      drawIndex += 1;
      return replacement || null;
    })
    .filter(Boolean);

  return {
    hand: nextHand,
    deck: draw.remaining,
  };
}

function shouldLoseLife(game) {
  const noHands = game.handsLeft <= 0;
  const noDeck = game.deck.length === 0 && game.hand.length === 0;
  return game.score < game.target && (noHands || noDeck);
}
