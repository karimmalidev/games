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
  state: "idle" | "hold";
  color: (typeof COLORS)[number];
};

export type BoltType = {
  state: "idle" | "hold" | "complete";
  size: number;
  nuts: NutType[];
};

export type SpaceType = {
  state: "playing" | "win";
  bolts: BoltType[];
};
