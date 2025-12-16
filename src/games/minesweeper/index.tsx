import {
  createBoard,
  getRemainingMinesCount,
  putMines,
  sweep,
  toggleFlag,
} from "./board";
import clsx from "clsx";
import Game from "../../ui/templates/game";
import { useLocalStorage } from "../../ui/hooks/use-local-storage";
import { useEffect } from "react";
import { BombIcon, FlagTriangleRightIcon } from "lucide-react";

const BOARD_COLS = 10;
const BOARD_ROWS = 15;
const BOARD_MINES = 20;

export default function Minesweeper() {
  const [board, setBoard] = useLocalStorage(
    "board",
    createBoard(BOARD_COLS, BOARD_ROWS),
  );
  const [remaining, setRemaining] = useLocalStorage("remaining", BOARD_MINES);
  const [wins, setWins] = useLocalStorage("wins", 0);

  useEffect(() => {
    setRemaining(
      board.state == "fresh" ? BOARD_MINES : getRemainingMinesCount(board),
    );
  }, [board]);

  function doSweepAction(row: number, col: number) {
    if (board.state == "fresh") {
      putMines(board, BOARD_MINES, row, col);
    }
    sweep(board, row, col);
    setBoard((b) => ({ ...b }));
  }

  function doToggleFlagAction(row: number, col: number) {
    if (board.state == "fresh") {
      doSweepAction(row, col);
    } else {
      toggleFlag(board, row, col);
      setBoard((b) => ({ ...b }));
    }
  }

  function doRestartAction() {
    if (board.state == "win") {
      setWins((w) => w + 1);
    }
    if (board.state != "fresh") {
      setBoard(createBoard(BOARD_COLS, BOARD_ROWS));
    }
  }

  return (
    <Game
      status={[
        ["Wins", wins],
        ["Remaining", remaining],
      ]}
      onRestart={doRestartAction}
    >
      <div
        className="relative grid gap-[calc(clamp(2px,0.5vw,4px))] rounded-sm bg-stone-400 p-[calc(clamp(2px,0.5vw,4px))]"
        style={{ gridTemplateColumns: `repeat(${board.cols},1fr)` }}
      >
        {(board.state == "win" || board.state == "lose") && (
          <div className="absolute flex h-full w-full flex-col items-center justify-center gap-16 bg-stone-600/80 text-center backdrop-blur-[2px]">
            <h2
              className={clsx(
                "flex flex-col items-center gap-[0.2em] text-5xl font-extrabold text-shadow-lg",
                board.state == "win"
                  ? "text-green-200/50 text-shadow-green-500/30"
                  : "text-red-200/50 text-shadow-red-500/30",
              )}
            >
              {board.state == "win" ? "Winner!" : "Game Over"}
            </h2>
            <button
              onClick={doRestartAction}
              className="cursor-pointer rounded-md bg-orange-500/30 px-4 py-2 font-bold text-white/60 backdrop-blur-xs hover:bg-orange-500/40 active:bg-orange-500/50"
            >
              New game
            </button>
          </div>
        )}
        {board.cells.map((cells, row) =>
          cells.map((cell, col) => (
            <button
              className={clsx(
                "flex aspect-square items-center justify-center overflow-hidden rounded-sm text-center duration-300 ease-out",
                cell.state == "shown" && cell.value == "mine" && "text-black",
                cell.state == "shown" && cell.value == 1 && "text-blue-700",
                cell.state == "shown" && cell.value == 2 && "text-green-700",
                cell.state == "shown" &&
                  cell.value != "mine" &&
                  cell.value >= 3 &&
                  "text-red-700",
                cell.state == "shown" &&
                  cell.value == "mine" &&
                  "bg-red-400 text-black inset-ring-2 inset-ring-red-700",
                cell.state != "shown" &&
                  "cursor-pointer hover:bg-orange-100 active:bg-orange-200",
                cell.state == "hidden" &&
                  "border-r-3 border-b-3 border-black/10 bg-stone-300 shadow-[2px_2px_0_rgba(0,0,0,0.1)]",
                cell.state == "flagged" &&
                  "border-t-3 border-l-3 border-black/5 bg-stone-300/50 text-red-700",
                cell.state == "shown" && "border-none",
              )}
              key={`${row}:${col}`}
              onClick={(e) => {
                e.preventDefault();
                doSweepAction(row, col);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                doToggleFlagAction(row, col);
              }}
            >
              <span className="text-[calc(clamp(24px,6vw,32px))] font-bold">
                {cell.state == "shown" && cell.value == "mine" && <BombIcon />}
                {cell.state == "shown" &&
                  typeof cell.value == "number" &&
                  cell.value > 0 &&
                  cell.value}
                {cell.state == "flagged" && (
                  <FlagTriangleRightIcon className="text-[0.8em]" />
                )}
              </span>
            </button>
          )),
        )}
      </div>
    </Game>
  );
}
