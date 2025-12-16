import { BombIcon, PickaxeIcon } from "lucide-react";
import type { GameType } from "./game-type";
import Minesweeper from "./minesweeper";
import NutsAndBolts from "./nuts-and-bolts";

const games: GameType[] = [
  {
    id: "minesweeper",
    name: "Minesweeper",
    Icon: BombIcon,
    Node: Minesweeper,
  },
  {
    id: "nuts-and-bolts",
    name: "Nuts and Bolts",
    Icon: PickaxeIcon,
    Node: NutsAndBolts,
  },
];

export default games;
