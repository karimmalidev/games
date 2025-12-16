import { createArray } from "../../lib/array";
import { pick, shuffle } from "../../lib/random";
import { COLORS, type NutType, type SpaceType } from "./space-type";

export function generateSpace(): SpaceType {
  const totalBolts = 12;
  const requiredBolts = 10;
  const boltSize = 5;

  const space: SpaceType = {
    state: "playing",
    bolts: createArray(totalBolts, () => ({
      nuts: [],
      size: boltSize,
      state: "idle",
    })),
  };

  const nuts: NutType[] = [];
  for (let i = 0; i < requiredBolts; i++) {
    const color = pick(COLORS);
    nuts.push(
      ...createArray<NutType>(boltSize, () => ({ color, state: "idle" })),
    );
  }
  shuffle(nuts);

  let i = 0;
  for (const bolt of space.bolts.slice(0, requiredBolts)) {
    bolt.nuts.push(...nuts.slice(i, i + boltSize));
    i += boltSize;
  }

  return space;
}
