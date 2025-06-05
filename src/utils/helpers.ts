import { gridSize } from "../constants";
import type { Coord } from "../types/coord";

export function generateRandomCoord(): Coord {
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
}

export function isCollision(snake: Coord[], head: Coord): boolean {
  return (
    head.x < 0 ||
    head.x >= gridSize ||
    head.y < 0 ||
    head.y >= gridSize ||
    snake.some((seg) => seg.x === head.x && seg.y === head.y)
  );
}

export function getHighScore(): number {
  return Number(localStorage.getItem("snakeGameHighScore") || "0");
}

export function updateHighScore(score: number): void {
  const current = getHighScore();
  if (score > current) {
    localStorage.setItem("snakeGameHighScore", String(score));
  }
}
