import { createArray } from "../../../../lib/array";
import { randParam, shuffle } from "../../../../lib/random";
import {
  BOLT_SIZE_MARGIN,
  BOLT_SIZE_MAX,
  BOLT_SIZE_MIN,
  EMPTY_BOLTS,
  LEVEL_EFFECTIVE_MAX,
  TOTAL_BLOTS_MARGIN,
  TOTAL_BOLTS_MAX,
  TOTAL_BOLTS_MIN,
} from "../constants";
import {
  COLORS,
  type NutType,
  type SpaceParams,
  type SpaceType,
} from "../types";

export function generateSpace(level: number): SpaceType {
  const params = generateSpaceParams(level);

  const space = createEmptySpace(params);

  const nuts = generateSortedNuts(params);
  do {
    shuffle(nuts);
  } while (hasSortedPart(nuts, params));

  putNutsOnSpace(nuts, space, params);

  return space;
}

function generateSpaceParams(level: number): SpaceParams {
  const scale =
    (Math.min(LEVEL_EFFECTIVE_MAX, level) / LEVEL_EFFECTIVE_MAX) ** 0.5;
  const totalBolts = randParam(
    scale,
    TOTAL_BOLTS_MIN,
    TOTAL_BOLTS_MAX,
    TOTAL_BLOTS_MARGIN,
  );
  const requiredBolts = totalBolts - EMPTY_BOLTS;
  const boltSize = randParam(
    scale,
    BOLT_SIZE_MIN,
    BOLT_SIZE_MAX,
    BOLT_SIZE_MARGIN,
  );
  return {
    totalBolts,
    requiredBolts,
    boltSize,
  };
}

function createEmptySpace({ totalBolts, boltSize }: SpaceParams): SpaceType {
  let boltId = 1;
  return {
    id: 1,
    state: "playing",
    bolts: createArray(totalBolts, () => ({
      id: boltId++,
      nuts: [],
      size: boltSize,
      state: "idle",
    })),
    boltOnHoldId: null,
  };
}

function generateSortedNuts({ requiredBolts, boltSize }: SpaceParams) {
  const nuts: NutType[] = [];
  let colorIndex = 0;
  let nutId = 1;
  for (let i = 0; i < requiredBolts; i++) {
    const color = COLORS[colorIndex];
    colorIndex = (colorIndex + 1) % COLORS.length;
    nuts.push(
      ...createArray<NutType>(boltSize, () => ({
        color,
        state: "idle",
        id: nutId++,
      })),
    );
  }
  return nuts;
}

function hasSortedPart(
  nuts: NutType[],
  { boltSize, requiredBolts }: SpaceParams,
) {
  for (let i = 0; i < requiredBolts; i++) {
    const slice = nuts.slice(i * boltSize, (i + 1) * boltSize);
    const color = slice[0].color;
    if (slice.every((nut) => nut.color == color)) {
      return true;
    }
  }
  return false;
}

function putNutsOnSpace(
  nuts: NutType[],
  space: SpaceType,
  { requiredBolts, boltSize }: SpaceParams,
) {
  for (let i = 0; i < requiredBolts; i++) {
    space.bolts[i].nuts = nuts.slice(i * boltSize, (i + 1) * boltSize);
  }
}
