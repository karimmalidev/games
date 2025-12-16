export const COLORS = [
  "red",
  "yellow",
  "green",
  "fuchsia",
  "blue",
  "cyan",
  "white",
  "black",
] as const;

export type NutType = {
  id: number;
  state: "idle" | "hold";
  color: (typeof COLORS)[number];
};

export type BoltType = {
  id: number;
  state: "idle" | "hold" | "complete";
  size: number;
  nuts: NutType[];
};

export type SpaceType = {
  id: number;
  state: "playing" | "complete";
  boltOnHoldId: number | null;
  bolts: BoltType[];
};
