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

export type Color = (typeof COLORS)[number];

export type Nut = {
  state: "idle" | "hold" | "complete";
  size: number;
  colors: Color[];
};

export type Space = {
  state: "playing" | "win";
  nuts: Nut[];
};
