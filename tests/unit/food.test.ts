import { gridSize } from "../../src/constants";

import type { Coord } from "../../src/types/coord";
import { generateFood, isOnSnake, randomPosition } from "../../src/utils/food";

describe("food utils", () => {
  test("randomPosition génère une position dans la grille", () => {
    for (let i = 0; i < 100; i++) {
      const pos = randomPosition();
      expect(pos.x).toBeGreaterThanOrEqual(0);
      expect(pos.x).toBeLessThan(gridSize);
      expect(pos.y).toBeGreaterThanOrEqual(0);
      expect(pos.y).toBeLessThan(gridSize);
    }
  });

  test("isOnSnake détecte une coordonnée sur le serpent", () => {
    const snake = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    expect(isOnSnake({ x: 1, y: 1 }, snake)).toBe(true);
    expect(isOnSnake({ x: 3, y: 3 }, snake)).toBe(false);
  });

  test("generateFood ne génère pas sur le serpent", () => {
    const snake: Coord[] = [];

    for (let i = 0; i < 10; i++) {
      const food = generateFood(snake);
      expect(food.x).toBeGreaterThanOrEqual(0);
      expect(food.x).toBeLessThan(gridSize);
      expect(food.y).toBeGreaterThanOrEqual(0);
      expect(food.y).toBeLessThan(gridSize);
    }

    const snake2 = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
    ];
    for (let i = 0; i < 20; i++) {
      const food = generateFood(snake2);
      expect(isOnSnake(food, snake2)).toBe(false);
    }
  });
});
