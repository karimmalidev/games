import type { GameType } from "./game-type";
import Minesweeper from "./minesweeper";
import { PiBombFill, PiNutFill } from "react-icons/pi";
import NutsAndBolts from "./nuts-and-bolts";

const games: GameType[] = [
  {
    id: "minesweeper",
    name: "Minesweeper",
    Icon: PiBombFill,
    Node: Minesweeper,
  },
  {
    id: "nuts-and-bolts",
    name: "Nuts and Bolts",
    Icon: PiNutFill,
    Node: NutsAndBolts,
  },
];

export default games;
