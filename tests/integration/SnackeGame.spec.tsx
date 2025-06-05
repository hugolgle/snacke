import {
  render,
  fireEvent,
  act,
  screen,
  waitFor,
} from "@testing-library/react";
import SnakeGame from "../../src/App";

jest.useFakeTimers();

beforeEach(() => {
  localStorage.clear();
});

test("Augmente le score après avoir mangé", async () => {
  render(<SnakeGame />);

  // Lancer la partie
  fireEvent.click(screen.getByText("Jouer"));

  // Attendre que l'élément score soit dans le DOM
  const scoreEl = await screen.findByTestId("score");

  // Attendre que le score devienne > 0
  await waitFor(
    () => {
      const score = parseInt(
        scoreEl.textContent?.replace(/\D/g, "") || "0",
        10
      );
      expect(score).toBeGreaterThan(0);
    },
    { timeout: 10000 }
  );
});

test("Stocke le record dans le localStorage", () => {
  const { getByText } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  act(() => jest.advanceTimersByTime(4000));
  expect(localStorage.getItem("snakeGameHighScore")).not.toBeNull();
});

test("Empêche les directions opposées (ex: droite -> gauche)", () => {
  const { getByTestId } = render(<SnakeGame />);
  fireEvent.click(screen.getByText("Jouer"));
  act(() => {
    fireEvent.keyDown(window, { key: "ArrowRight" });
    fireEvent.keyDown(window, { key: "ArrowLeft" });
  });

  const directionEl = getByTestId("current-direction");
  expect(directionEl.textContent).toBe("right");
});

test("Empêche le demi-tour immédiat du serpent", () => {
  const { getByText } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  act(() => {
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    jest.advanceTimersByTime(500);
  });
  expect(() => getByText("Game Over")).toThrow();
});

test("Le record est mis à jour si dépassé", () => {
  localStorage.setItem("snakeGameHighScore", "2");
  const { getByText, container } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  act(() => jest.advanceTimersByTime(4000));
  const recordMatch = container.textContent?.match(
    /Record personnel\s*:\s*(\d+)/i
  );
  const recordScore = recordMatch ? parseInt(recordMatch[1], 10) : null;
  expect(recordScore).not.toBeNull();
  expect(recordScore!).toBeGreaterThan(2);
});
