import React from "react";

interface GameOverProps {
  onRestart: () => void;
  directionLabel: string;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart, directionLabel }) => (
  <div className="text-center mb-4 w-full">
    <h2 className="text-2xl font-bold text-red-500 mb-2">Game Over</h2>
    <button
      onClick={onRestart}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Rejouer
    </button>
    <div
      data-testid="current-direction"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
      }}
      aria-hidden="true"
    >
      {directionLabel}
    </div>
  </div>
);

export default GameOver;
