export type CellType = {
  value: "mine" | number;
  state: "hidden" | "shown" | "flagged";
};

export type BoardType = {
  state: "fresh" | "playing" | "win" | "lose";
  rows: number;
  cols: number;
  cells: CellType[][];
};
