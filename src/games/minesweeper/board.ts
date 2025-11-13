import { createArray2D } from "../../lib/array";
import { shuffle } from "../../lib/random";

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

export function createBoard(cols: number, rows: number): BoardType {
  return {
    state: "fresh",
    rows,
    cols,
    cells: createArray2D<CellType>(rows, cols, () => ({
      value: 0,
      state: "hidden",
    })),
  };
}

export function putMines(
  board: BoardType,
  mines: number,
  row: number,
  col: number,
) {
  const cells = shuffle(getMineableCells(board, row, col));
  for (let i = 0; i < mines; i++) {
    cells[i].value = "mine";
  }

  putNumbers(board);
}

function getMineableCells(board: BoardType, row: number, col: number) {
  const avoidedCellsPositions = [
    { row, col },
    ...getNeighbors(board, row, col),
  ];

  const mineableCells = [];
  for (let r = 0; r < board.rows; r++) {
    for (let c = 0; c < board.cols; c++) {
      const found = avoidedCellsPositions.find(
        ({ row, col }) => row == r && col == c,
      );
      if (!found) {
        mineableCells.push(board.cells[r][c]);
      }
    }
  }

  return mineableCells;
}

function putNumbers(board: BoardType) {
  const { rows, cols } = board;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board.cells[r][c].value == "mine") {
        getNeighbors(board, r, c).forEach(({ row, col }) => {
          typeof board.cells[row][col].value == "number" &&
            board.cells[row][col].value++;
        });
      }
    }
  }
}

function getNeighbors(
  board: BoardType,
  row: number,
  col: number,
): { row: number; col: number }[] {
  const neighbors = [];

  for (let r = Math.max(0, row - 1); r < Math.min(board.rows, row + 2); r++) {
    for (let c = Math.max(0, col - 1); c < Math.min(board.cols, col + 2); c++) {
      if (r != row || c != col) {
        neighbors.push({ row: r, col: c });
      }
    }
  }

  return neighbors;
}

export function countMines(board: BoardType) {
  let sum = 0;

  for (const cells of board.cells) {
    for (const { value } of cells) {
      if (value == "mine") {
        sum++;
      }
    }
  }

  return sum;
}

export function sweep(board: BoardType, row: number, col: number) {
  const cell = board.cells[row][col];
  if (cell.value == "mine") {
    board.state = "lose";
    board.cells.flat().forEach((cell) => {
      cell.state = "shown";
    });
    return;
  }

  board.state = "playing";

  if (cell.value > 0) {
    cell.state = "shown";
    return;
  }

  function sweepRecursive(row: number, col: number) {
    const cell = board.cells[row][col];

    if (cell.state != "hidden" || cell.value == "mine") {
      return;
    }

    cell.state = "shown";
    if (cell.value > 0) {
      return;
    }

    getNeighbors(board, row, col).forEach(({ row, col }) =>
      sweepRecursive(row, col),
    );
  }

  sweepRecursive(row, col);

  if (isEligibleToWin(board)) {
    board.state = "win";
  }
}

export function getRemainingMinesCount(board: BoardType) {
  let count = 0;
  for (const cell of board.cells.flat()) {
    if (cell.value == "mine") {
      count++;
    }
    if (cell.state == "flagged") {
      count--;
    }
  }
  return count;
}

export function isEligibleToWin(board: BoardType): boolean {
  for (const cell of board.cells.flat()) {
    if (cell.value != "mine" && cell.state != "shown") {
      return false;
    }
  }
  return true;
}
