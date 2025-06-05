import { test, expect } from "@playwright/test";

test.describe("Snake Game", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Lancement du jeu et affichage du score", async ({ page }) => {
    await page.getByRole("button", { name: "Jouer" }).click();
    await expect(page.getByTestId("score")).toContainText("1");
    await expect(page.getByTestId("level")).toContainText("simple");
  });

  test("Déplacement du serpent avec les touches fléchées", async ({ page }) => {
    await page.getByRole("button", { name: "Jouer" }).click();
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(200);
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(200);
    await page.keyboard.press("ArrowUp");
    await page.waitForTimeout(200);
    await expect(page.getByTestId("score")).not.toContainText("0");
  });

  test("Game Over et redémarrage", async ({ page }) => {
    await page.getByRole("button", { name: "Jouer" }).click();
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("ArrowLeft");
      await page.waitForTimeout(100);
    }
    await expect(page.getByText("Game Over")).toBeVisible();
    await page.getByRole("button", { name: "Rejouer" }).click();
    await expect(page.getByTestId("score")).toContainText("1");
  });
});
