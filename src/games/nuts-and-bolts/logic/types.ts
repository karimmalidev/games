export const COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "black",
  "white",
  "cyan",
  "fuchsia",
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

export type SpaceParams = {
  totalBolts: number;
  requiredBolts: number;
  boltSize: number;
};
