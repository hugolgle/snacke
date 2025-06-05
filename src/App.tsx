// src/App.tsx
import React, { useEffect, useRef, useState } from "react";
import { Level, gridSize } from "./constants";
import { getDirectionFromKey, isOppositeDirection } from "./utils/direction";
import type { Coord } from "./types/coord";
import GameOver from "./components/GameOver";
import ScoreBoard from "./components/ScoreBoard";
import Board from "./components/Board";


const App: React.FC = () => {
  const [snake, setSnake] = useState<Coord[]>([]);
  const [dir, setDir] = useState<Coord>({ x: 1, y: 0 });
  const [nextDir, setNextDir] = useState<Coord>({ x: 1, y: 0 });
  const [food, setFood] = useState<Coord>({ x: 5, y: 15 });
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [level, setLevel] = useState(Level.SIMPLE);

  const boardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    boardRef.current?.focus();
  }, [started]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!started) return;
      const newDirection = getDirectionFromKey(e.key);
      if (newDirection && !isOppositeDirection(newDirection, dir)) {
        setNextDir(newDirection);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [started, dir]);

  useEffect(() => {
    if (snake.length % 5 === 0) {
      const newSpeed = Math.max(20, 100 - Math.floor(snake.length / 5) * 10);
      setSpeed(newSpeed);
    }
    if (speed <= 80) setLevel(Level.MEDIUM);
    if (speed <= 60) setLevel(Level.HARD);
  }, [snake]);

  useEffect(() => {
    if (gameOver || !started) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = {
          ...prev[0],
          x: prev[0].x + nextDir.x,
          y: prev[0].y + nextDir.y,
        };
        if (
          head.x < 0 ||
          head.x >= gridSize ||
          head.y < 0 ||
          head.y >= gridSize ||
          prev.some((seg) => seg.x === head.x && seg.y === head.y)
        ) {
          const highScore = localStorage.getItem("snakeGameHighScore");
          if (!highScore || Number(highScore) <= prev.length) {
            localStorage.setItem("snakeGameHighScore", String(prev.length));
          }
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
        } else {
          newSnake.pop();
        }
        setDir(nextDir);
        return newSnake;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [nextDir, food, gameOver, started, speed]);

  const startGame = () => {
    setSnake([{ x: 2, y: 2 }]);
    setDir({ x: 1, y: 0 });
    setNextDir({ x: 1, y: 0 });
    setFood({ x: 5, y: 5 });
    setGameOver(false);
    setStarted(true);
    setSpeed(100);
    setLevel(Level.SIMPLE);
  };

  const highScore = localStorage.getItem("snakeGameHighScore") || "0";
  const directionLabel =
    dir.x === 1 ? "right" : dir.x === -1 ? "left" : dir.y === 1 ? "down" : "up";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-900 text-white p-4">
      {!started ? (
        <button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Jouer
        </button>
      ) : (
        <>
          {gameOver ? (
            <GameOver onRestart={startGame} directionLabel={directionLabel} />
          ) : (
            <>
              <ScoreBoard
                level={level}
                score={snake.length}
                highScore={highScore}
              />
              <Board
                snake={snake}
                food={food}
                onKeyDown={(e) => {
                  const newDirection = getDirectionFromKey(e.key);
                  if (newDirection && !isOppositeDirection(newDirection, dir)) {
                    setNextDir(newDirection);
                  }
                }}
                boardRef={boardRef}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
