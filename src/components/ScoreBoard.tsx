import React from "react";
import { Level } from "../constants";

interface ScoreBoardProps {
  level: Level;
  score: number;
  highScore: string;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ level, score, highScore }) => (
  <>
    <p data-testid="level">Niveau : {level}</p>
    <p data-testid="score">Score : {score}</p>
    <p>Record personnel : {highScore}</p>
  </>
);

export default ScoreBoard;
