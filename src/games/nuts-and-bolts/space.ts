import { createArray } from "../../lib/array";
import { pick, shuffle } from "../../lib/random";
import {
  COLORS,
  type BoltType,
  type NutType,
  type SpaceType,
} from "./space-type";

export function generateSpace(): SpaceType {
  const totalBolts = 3;
  const requiredBolts = 2;
  const boltSize = 3;

  const space: SpaceType = {
    state: "playing",
    bolts: createArray(totalBolts, () => ({
      nuts: [],
      size: boltSize,
      state: "idle",
    })),
    boltOnHold: null,
  };

  const nuts: NutType[] = [];
  let id = 1;
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

  if (!space.boltOnHold) {
    if (clickedBolt.nuts.length == 0) {
      return;
    }
    space.boltOnHold = clickedBolt;
    makeBoltHold(clickedBolt);
    return;
  }

  const nutsOnHold = space.boltOnHold.nuts.filter((nut) => nut.state == "hold");
  const colorOnHold = nutsOnHold[0].color;
  const colorClicked = clickedBolt.nuts[0]?.color;

  if (colorClicked && colorClicked != colorOnHold) {
    makeBoltIdle(space.boltOnHold);
    space.boltOnHold = null;
    return;
  }

  const availableSpace = clickedBolt.size - clickedBolt.nuts.length;
  const nutsToBeMoved = nutsOnHold.slice(0, availableSpace);
  clickedBolt.nuts.unshift(...nutsToBeMoved);
  space.boltOnHold.nuts.splice(0, nutsToBeMoved.length);
  makeBoltIdle(clickedBolt);
  makeBoltIdle(space.boltOnHold);
  space.boltOnHold = null;
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
