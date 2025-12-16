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
  state: "idle" | "hold" | "complete";
  size: number;
  nuts: NutType[];
};

export type SpaceType = {
  step: number;
  state: "playing" | "complete";
  boltOnHold: BoltType | null;
  bolts: BoltType[];
};
