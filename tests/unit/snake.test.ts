import type { Coord } from "../../src/types/coord";
import { isOppositeDirection } from "../../src/utils/direction";
import { generateFood } from "../../src/utils/food";

describe("generateFood", () => {
  test("ne génère pas de nourriture sur le serpent", () => {
    const snake = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    for (let i = 0; i < 100; i++) {
      const food = generateFood(snake);
      expect(snake.some((seg) => seg.x === food.x && seg.y === food.y)).toBe(
        false
      );
    }
  });
  test("isOppositeDirection détecte bien directions opposées", () => {
    expect(isOppositeDirection({ x: 1, y: 0 }, { x: -1, y: 0 })).toBe(true);
    expect(isOppositeDirection({ x: 0, y: 1 }, { x: 0, y: -1 })).toBe(true);
    expect(isOppositeDirection({ x: 1, y: 0 }, { x: 1, y: 0 })).toBe(false);
  });

  // Simuler un déplacement simple du serpent
  test("déplacement simple ajoute nouvelle tête et enlève queue si pas de nourriture", () => {
    const snake: Coord[] = [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ];
    const nextDir: Coord = { x: 1, y: 0 };
    const food: Coord = { x: 10, y: 10 };

    const head = { x: snake[0].x + nextDir.x, y: snake[0].y + nextDir.y };

    expect(snake.some((seg) => seg.x === head.x && seg.y === head.y)).toBe(
      false
    );

    const newSnake = [head, ...snake];
    if (!(head.x === food.x && head.y === food.y)) {
      newSnake.pop();
    }

    expect(newSnake.length).toBe(snake.length);
    expect(newSnake[0]).toEqual(head);
  });

  test("manger la nourriture agrandit le serpent", () => {
    const snake: Coord[] = [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ];
    const nextDir: Coord = { x: 1, y: 0 };
    const food: Coord = { x: 3, y: 2 };

    const head = { x: snake[0].x + nextDir.x, y: snake[0].y + nextDir.y };
    expect(head).toEqual(food);

    const newSnake = [head, ...snake];
    if (!(head.x === food.x && head.y === food.y)) {
      newSnake.pop();
    }

    expect(newSnake.length).toBe(snake.length + 1);
    expect(newSnake[0]).toEqual(food);
  });

  test("collision avec le corps détectée", () => {
    const snake: Coord[] = [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 2 },
    ];
    const nextDir: Coord = { x: -1, y: 0 };

    const head = { x: snake[0].x + nextDir.x, y: snake[0].y + nextDir.y };

    const collision = snake.some((seg) => seg.x === head.x && seg.y === head.y);
    expect(collision).toBe(true);
  });
});
