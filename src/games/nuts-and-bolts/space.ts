import { createArray } from "../../lib/array";
import { pick, shuffle } from "../../lib/random";
import {
  COLORS,
  type BoltType,
  type NutType,
  type SpaceType,
} from "./space-type";

export function generateSpace(level: number): SpaceType {
  const totalBolts = 3;
  const requiredBolts = 2;
  const boltSize = 3;

  let id = 0;
  const space: SpaceType = {
    id: id++,
    state: "playing",
    bolts: createArray(totalBolts, () => ({
      id: id++,
      nuts: [],
      size: boltSize,
      state: "idle",
    })),
    boltOnHoldId: null,
  };

  const nuts: NutType[] = [];
  for (let i = 0; i < requiredBolts; i++) {
    const color = pick(COLORS);
    nuts.push(
      ...createArray<NutType>(boltSize, () => ({
        color,
        state: "idle",
        id: id++,
      })),
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

export function clickBolt(space: SpaceType, clickedBolt: BoltType) {
  if (space.state != "playing" || clickedBolt.state == "complete") {
    return;
  }

  if (space.boltOnHoldId == null) {
    if (clickedBolt.nuts.length == 0) {
      return;
    }
    space.boltOnHoldId = clickedBolt.id;
    makeBoltHold(clickedBolt);
    return;
  }

  const boltOnHold = space.bolts.find(({ id }) => id == space.boltOnHoldId)!;
  const nutsOnHold = boltOnHold.nuts.filter((nut) => nut.state == "hold");
  const colorOnHold = nutsOnHold[0].color;
  const colorClicked = clickedBolt.nuts[0]?.color;

  if (colorClicked && colorClicked != colorOnHold) {
    makeBoltIdle(boltOnHold);
    space.boltOnHoldId = null;
    return;
  }

  const availableSpace = clickedBolt.size - clickedBolt.nuts.length;
  const nutsToBeMoved = nutsOnHold.slice(0, availableSpace);
  clickedBolt.nuts.unshift(...nutsToBeMoved);
  boltOnHold.nuts.splice(0, nutsToBeMoved.length);
  makeBoltIdle(clickedBolt);
  makeBoltIdle(boltOnHold);
  if (boltOnHold.id != clickedBolt.id) {
    space.id += 1;
  }
  space.boltOnHoldId = null;
  if (shouldBeComplete(clickedBolt)) {
    clickedBolt.state = "complete";
    if (
      space.bolts.every(
        (bolt) => bolt.nuts.length == 0 || bolt.state == "complete",
      )
    ) {
      space.state = "complete";
    }
  }
}

function shouldBeComplete(bolt: BoltType) {
  const c = bolt.nuts[0].color;
  if (
    bolt.nuts.length == bolt.size &&
    bolt.nuts.every((nut) => nut.color == c)
  ) {
    return true;
  }
  return false;
}

function makeBoltIdle(bolt: BoltType) {
  bolt.state = "idle";
  bolt.nuts.forEach((nut) => (nut.state = "idle"));
}

function makeBoltHold(bolt: BoltType) {
  bolt.state = "hold";
  const first = bolt.nuts[0];
  for (const nut of bolt.nuts) {
    if (nut.color != first.color) {
      return;
    }
    nut.state = "hold";
  }
}

export function mergeSpaces(
  history: SpaceType[],
  current: SpaceType,
): SpaceType[] {
  const previous = history.pop();

  if (!previous) {
    return [current];
  }

  if (equals(previous, current)) {
    return [...history, current];
  }

  makeSpaceIdle(previous);

  return [...history, previous, current];
}

function equals(a: SpaceType, b: SpaceType) {
  for (let i = 0; i < a.bolts.length; i++) {
    for (let j = 0; j < a.bolts[i].size; j++) {
      if (a.bolts[i].nuts[j]?.id != b.bolts[i].nuts[j]?.id) {
        return false;
      }
    }
  }
  return true;
}

function makeSpaceIdle(space: SpaceType) {
  if (space.boltOnHoldId == null) {
    return;
  }
  const boltOnHold = space.bolts.find(({ id }) => id == space.boltOnHoldId)!;
  makeBoltIdle(boltOnHold);
  space.boltOnHoldId = null;
}

export function mergeSpace(
  history: SpaceType[],
  space: SpaceType,
): SpaceType[] {
  const last = history.pop();
  if (last && last.id != space.id) {
    makeSpaceIdle(last);
    return [...history, last, space];
  }
  return [...history, space];
}
