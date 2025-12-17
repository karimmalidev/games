import { type BoltType, type SpaceType } from "../types";
import { makeBoltHold, makeBoltIdle } from "./change-hold-state";

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

  markBoltAndSpaceAsCompleteIfEligible(clickedBolt, space);
}

function markBoltAndSpaceAsCompleteIfEligible(
  bolt: BoltType,
  space: SpaceType,
) {
  if (!shouldBoltBeMarkedAsComplete(bolt)) {
    return;
  }
  bolt.state = "complete";

  if (
    !space.bolts.every(
      (bolt) => bolt.nuts.length == 0 || bolt.state == "complete",
    )
  ) {
    return;
  }
  space.state = "complete";
}

function shouldBoltBeMarkedAsComplete(bolt: BoltType) {
  const c = bolt.nuts[0].color;
  if (
    bolt.nuts.length == bolt.size &&
    bolt.nuts.every((nut) => nut.color == c)
  ) {
    return true;
  }
  return false;
}
