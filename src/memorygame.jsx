// import React, { useState, useEffect } from 'react';
import './memorygame.css';

import { useState, useEffect, useCallback } from 'react';

function MemoryGame() {
  const initialGameState = {
    cards: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D' ,'E', 'E', 'F', 'F'],
    flippedCards: [],
    timer: 0,
    score: 0,
    gameWon: false
  };

  const [gameState, setGameState] = useState(initialGameState);

  const shuffle = useCallback((array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }, []);

  useEffect(() => {
    let shuffledCards = shuffle([...gameState.cards]);
    setGameState(prevState => ({...prevState, cards: shuffledCards}));
    let interval = setInterval(() => {
      setGameState(prevState => ({...prevState, timer: prevState.timer + 1}));
    }, 1000);
    return () => clearInterval(interval);
  }, []); // Removed dependencies

  const flipCard = useCallback((index) => {
    setGameState(prevState => ({...prevState, flippedCards: [...prevState.flippedCards, index]}));
  }, []);

  const checkMatch = useCallback(() => {
    if (gameState.cards[gameState.flippedCards[0]] === gameState.cards[gameState.flippedCards[1]]) {
      setGameState(prevState => ({...prevState, score: prevState.score + 1, flippedCards: []}));
    } else {
      setTimeout(() => {
        setGameState(prevState => ({...prevState, flippedCards: []}));
      }, 1000);
    }
  }, [gameState.cards, gameState.flippedCards]);

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      checkMatch();
    }
  }, [gameState.flippedCards, checkMatch]); // Added checkMatch to dependencies

  useEffect(() => {
    if (gameState.flippedCards.length === gameState.cards.length) {
      setGameState(prevState => ({...prevState, gameWon: true}));
    }
  }, [gameState.flippedCards.length, gameState.cards.length]); // Changed dependencies

  const resetGame = useCallback(() => {
    let shuffledCards = shuffle([...gameState.cards]);
    setGameState({...initialGameState, cards: shuffledCards});
  }, [shuffle, initialGameState]);



  return (
    <div className="App">
      <h1>MEMORY GAME</h1>
      <div className="game-board">
        {gameState.cards.map((card, index) => (
          <div
            className={`card ${gameState.flippedCards.includes(index) ? 'flipped' : ''}`}
            key={index}
            onClick={() => flipCard(index)}
          >
            {gameState.flippedCards.includes(index) && card}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset</button>
      <p>Time: {gameState.timer}</p>
      <p>Score: {gameState.score}</p>
      {gameState.gameWon && <div>You have won!</div>}

    </div>
  );
}

export default MemoryGame;