import { getDirectionFromKey, isOppositeDirection } from "../../src/utils/direction";

describe("direction utils", () => {
  test("getDirectionFromKey retourne la bonne direction", () => {
    expect(getDirectionFromKey("ArrowUp")).toEqual({ x: 0, y: -1 });
    expect(getDirectionFromKey("ArrowDown")).toEqual({ x: 0, y: 1 });
    expect(getDirectionFromKey("ArrowLeft")).toEqual({ x: -1, y: 0 });
    expect(getDirectionFromKey("ArrowRight")).toEqual({ x: 1, y: 0 });
    expect(getDirectionFromKey("a")).toBeNull();
  });

  test("isOppositeDirection détecte les directions opposées", () => {
    expect(isOppositeDirection({ x: 1, y: 0 }, { x: -1, y: 0 })).toBe(true);
    expect(isOppositeDirection({ x: 0, y: 1 }, { x: 0, y: -1 })).toBe(true);
    expect(isOppositeDirection({ x: 1, y: 0 }, { x: 1, y: 0 })).toBe(false);
    expect(isOppositeDirection({ x: 0, y: 1 }, { x: 1, y: 0 })).toBe(false);
  });
});
