import type { SpaceType } from "../types";
import { makeSpaceIdle } from "./change-hold-state";

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
