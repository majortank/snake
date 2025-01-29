'use client';
import React, { useState, useEffect, useRef } from 'react';

const generateFood = (snake) => {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};


export default function Home() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(null);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const directionRef = useRef(direction);
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);

 

  useEffect(() => {
    directionRef.current = direction;
    snakeRef.current = snake;
    foodRef.current = food;
  }, [direction, snake, food]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const newHead = { ...snakeRef.current[0] };

      switch (directionRef.current) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Wall collision
      if (newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20) {
        setGameOver(true);
        return;
      }

      // Self collision
      if (snakeRef.current.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return;
      }

      // Food consumption
      const ateFood = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;

      if (ateFood) {
        setSnake(prev => [newHead, ...prev]);
        setScore(s => s + 1);
        setFood(generateFood([newHead, ...snakeRef.current]));
      } else {
        setSnake(prev => {
          const newSnake = [newHead, ...prev];
          newSnake.pop();
          return newSnake;
        });
      }
    }, 200);

    return () => clearInterval(interval);
  }, [gameOver]);

   // Initialize food after component mounts
   useEffect(() => {
    setIsClient(true);
    setFood(generateFood(snake));
  }, []);

  if (!isClient) return null; // Or loading skeleton

  return (
    <div className="App">
      <h1>Snake Game</h1>
      <div className="score">Score: {score}</div>
      <div className="game-board">
        {Array(20).fill().map((_, y) => (
          <div key={y} className="row">
            {Array(20).fill().map((_, x) => {
              const isSnake = snake.some(seg => seg.x === x && seg.y === y);
              const isFood = food?.x === x && food?.y === y;
              return (
                <div
                  key={x}
                  className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over! Score: {score}</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
