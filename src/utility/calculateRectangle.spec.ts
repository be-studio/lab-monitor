import { describe, it, expect } from "vitest";
import { calculateRectangle } from "./calculateRectangle";
import { Annotation } from "./types";

describe("calculateRectangle Utility", () => {
  it("should return a rectangle's dimensions as calculated based on the given parameters", () => {
    const rectangle: Annotation = [100, 100, 200, 400];
    const canvasDimensions = {
      width: 500,
      height: 1000,
    };
    const videoNativeDimensions = {
      width: 1000,
      height: 2000,
    };

    expect(
      calculateRectangle(rectangle, canvasDimensions, videoNativeDimensions),
    ).toEqual([0, -50, 100, 200]);
  });
});
