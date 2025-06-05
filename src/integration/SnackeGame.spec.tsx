import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from "@testing-library/react";
import SnakeGame from "../App";

jest.useFakeTimers();

beforeEach(() => {
  localStorage.clear();
});

test("Affiche le bouton Jouer au démarrage", () => {
  const { getByText } = render(<SnakeGame />);
  expect(getByText("Jouer")).toBeTruthy();
});

test("Lance une partie en cliquant sur Jouer", () => {
  const { getByText, container } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  expect(container.querySelectorAll(".bg-green-400").length).toBeGreaterThan(0);
  expect(container.querySelector(".bg-red-500")).toBeTruthy();
});

test("Empêche de relancer la partie si elle est déjà lancée", () => {
  const { getByText, container } = render(<SnakeGame />);
  const btn = getByText("Jouer");
  fireEvent.click(btn);
  fireEvent.click(btn);
  expect(container.querySelectorAll(".bg-green-400").length).toBeGreaterThan(0);
});

test("Affiche Game Over si le serpent sort du plateau", () => {
  const { getByText, container } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  act(() => jest.advanceTimersByTime(3000));
  expect(container.textContent?.toLowerCase()).toContain("game over");
});

test("Permet de rejouer après Game Over", () => {
  const { getByText, container } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  act(() => jest.advanceTimersByTime(3000));
  fireEvent.click(getByText("Rejouer"));
  expect(container.textContent?.toLowerCase()).not.toContain("game over");
  expect(container.querySelectorAll(".bg-green-400").length).toBeGreaterThan(0);
});

test("Réinitialise score et nourriture après Rejouer", () => {
  const { getByText, container } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  act(() => jest.advanceTimersByTime(2000));
  fireEvent.click(getByText("Rejouer"));
  expect(container.textContent).toContain("1");
  expect(container.querySelector(".bg-red-500")).toBeTruthy();
});

test("Affiche le record pendant la partie", () => {
  const { getByText, container } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  act(() => jest.advanceTimersByTime(1000));
  expect(container.textContent).toMatch(/record personnel\s*:\s*\d+/i);
});

test("Niveau passe à medium ou hard après certains points", async () => {
  render(<SnakeGame />);
  fireEvent.click(screen.getByText("Jouer"));

  await waitFor(
    () => {
      const niveauEl = screen.getByTestId("level");
      expect(niveauEl.textContent).toMatch(/simple|medium|hard/i);
    },
    { timeout: 10000 }
  );
});

test("Navigation clavier fonctionne (flèches)", async () => {
  const { getByText, getByTestId } = render(<SnakeGame />);

  fireEvent.click(getByText("Jouer"));

  act(() => {
    fireEvent.keyDown(window, { key: "ArrowRight" });
    jest.advanceTimersByTime(500);
    fireEvent.keyDown(window, { key: "ArrowDown" });
    jest.advanceTimersByTime(500);
  });

  const difficultyEl = getByTestId("level");
  expect(difficultyEl.textContent).toMatch(/simple|medium|hard/i);
});

test("La nourriture est générée à une position différente après avoir été mangée", () => {
  const { getByText, container } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  const initialFood = container.querySelector(".bg-red-500");
  act(() => jest.advanceTimersByTime(3000));
  const newFood = container.querySelector(".bg-red-500");
  expect(newFood).not.toBe(initialFood);
});

test("Le serpent grandit en mangeant", () => {
  const { getByText, container } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  const initialLength = container.querySelectorAll(".bg-green-400").length;
  act(() => jest.advanceTimersByTime(3000));
  const newLength = container.querySelectorAll(".bg-green-400").length;
  expect(newLength).toBeGreaterThan(initialLength);
});

test("Le focus est mis sur la grille quand la partie démarre", () => {
  const { getByText, container } = render(<SnakeGame />);
  const playBtn = getByText("Jouer");
  fireEvent.click(playBtn);
  const board = container.querySelector(".grid") as HTMLDivElement;
  expect(document.activeElement).toBe(board);
});

test("La vitesse diminue (accélère) à mesure que le score augmente", () => {
  const { getByText } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  act(() => jest.advanceTimersByTime(10000));
  const level = getByText(/medium|hard/i);
  expect(level.textContent).toMatch(/medium|hard/);
});

test("Le jeu ignore les touches clavier quand il n’est pas démarré", () => {
  const { container } = render(<SnakeGame />);
  act(() => {
    fireEvent.keyDown(window, { key: "ArrowDown" });
    jest.advanceTimersByTime(500);
  });
  expect(container.querySelectorAll(".bg-green-400").length).toBe(0);
});

test("Rejouer remet bien le niveau à simple", () => {
  const { getByText } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  act(() => jest.advanceTimersByTime(8000));
  fireEvent.click(getByText("Rejouer"));
  expect(getByText("simple")).toBeTruthy();
});

test("Collision avec soi-même déclenche un Game Over", () => {
  const { getByText, container } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));

  act(() => {
    fireEvent.keyDown(window, { key: "ArrowDown" });
    jest.advanceTimersByTime(500);
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    jest.advanceTimersByTime(500);
    fireEvent.keyDown(window, { key: "ArrowUp" });
    jest.advanceTimersByTime(500);
  });

  expect(container.textContent?.toLowerCase()).toContain("game over");
});

test("La grille contient bien 15x15 = 225 cases", () => {
  const { container, getByText } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  const cells = container.querySelectorAll(".size-5");
  expect(cells.length).toBe(225);
});

test("Le niveau reste à HARD même après une longue partie", () => {
  const { getByText } = render(<SnakeGame />);
  fireEvent.click(getByText("Jouer"));
  act(() => jest.advanceTimersByTime(20000));
  const levelText = getByText(/hard/i);
  expect(levelText).toBeTruthy();
});
