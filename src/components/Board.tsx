import React from "react";
import { gridSize } from "../constants";
import type { Coord } from "../types/coord";

interface BoardProps {
  snake: Coord[];
  food: Coord;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  boardRef: React.RefObject<HTMLDivElement | null>;
}

const Board: React.FC<BoardProps> = ({ snake, food, onKeyDown, boardRef }) => {
  return (
    <div
      tabIndex={0}
      ref={boardRef}
      onKeyDown={onKeyDown}
      className="grid outline-none mt-4"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 20px)`,
        gap: "2px",
      }}
    >
      {Array.from({ length: gridSize * gridSize }).map((_, i) => {
        const x = i % gridSize;
        const y = Math.floor(i / gridSize);
        const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
        const isFood = food.x === x && food.y === y;
        return (
          <div
            key={i}
            className={`size-5 rounded-sm ${
              isSnake ? "bg-green-400" : isFood ? "bg-red-500" : "bg-gray-700"
            }`}
          />
        );
      })}
    </div>
  );
};

export default Board;
