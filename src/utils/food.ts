
import { gridSize } from "../constants";
import type { Coord } from "../types/coord";

export function randomPosition(): Coord {
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
}

export function isOnSnake(pos: Coord, snake: Coord[]): boolean {
  return snake.some((seg) => seg.x === pos.x && seg.y === pos.y);
}

export function generateFood(snake: Coord[]): Coord {
  let newFood: Coord;
  do {
    newFood = randomPosition();
  } while (isOnSnake(newFood, snake));
  return newFood;
}
