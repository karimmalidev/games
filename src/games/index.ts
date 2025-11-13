import { GiFlyingFlag } from "react-icons/gi";
import type { GameType } from "./game-type";
import Minesweeper from "./minesweeper";

const games: GameType[] = [
  {
    id: "minesweeper",
    name: "Minesweeper",
    Icon: GiFlyingFlag,
    Node: Minesweeper,
  },
];

export default games;
