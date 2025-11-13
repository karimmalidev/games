import type { GameType } from "./game-type";
import Minesweeper from "./minesweeper";
import { PiBombFill } from "react-icons/pi";

const games: GameType[] = [
  {
    id: "minesweeper",
    name: "Minesweeper",
    Icon: PiBombFill,
    Node: Minesweeper,
  },
];

export default games;
