import type { Coord } from "../types/coord";


export const getDirectionFromKey = (key: string): Coord | null => {
  switch (key) {
    case "ArrowUp":
      return { x: 0, y: -1 };
    case "ArrowDown":
      return { x: 0, y: 1 };
    case "ArrowLeft":
      return { x: -1, y: 0 };
    case "ArrowRight":
      return { x: 1, y: 0 };
    default:
      return null;
  }
};

export const isOppositeDirection = (a: Coord, b: Coord): boolean => {
  return a.x === -b.x && a.y === -b.y;
};
