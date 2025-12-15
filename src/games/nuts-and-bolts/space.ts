import { createArray } from "../../lib/array";
import { pick, shuffle } from "../../lib/random";
import { COLORS, type Color, type Space } from "./space-type";

export function generateSpace(): Space {
  const totalNuts = 12;
  const requiredNuts = 10;
  const nutSize = 5;

  const space: Space = {
    state: "playing",
    nuts: createArray(totalNuts, () => ({
      colors: [],
      size: nutSize,
      state: "idle",
    })),
  };

  const colors: Color[] = [];
  for (let i = 0; i < requiredNuts; i++) {
    const color = pick(COLORS);
    colors.push(...createArray(nutSize, () => color));
  }
  shuffle(colors);

  let i = 0;
  for (const nut of space.nuts.slice(0, requiredNuts)) {
    nut.colors.push(...colors.slice(i, i + nutSize));
    i += nutSize;
  }

  return space;
}
