import type { BoltType, SpaceType } from "../types";

export function makeSpaceIdle(space: SpaceType) {
  if (space.boltOnHoldId == null) {
    return;
  }
  const boltOnHold = space.bolts.find(({ id }) => id == space.boltOnHoldId)!;
  makeBoltIdle(boltOnHold);
  space.boltOnHoldId = null;
}

export function makeBoltIdle(bolt: BoltType) {
  bolt.state = "idle";
  bolt.nuts.forEach((nut) => (nut.state = "idle"));
}

export function makeBoltHold(bolt: BoltType) {
  bolt.state = "hold";
  const first = bolt.nuts[0];
  for (const nut of bolt.nuts) {
    if (nut.color != first.color) {
      return;
    }
    nut.state = "hold";
  }
}
