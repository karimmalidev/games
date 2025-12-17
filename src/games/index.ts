import { BoltIcon, PickaxeIcon } from "lucide-react";
import type { GameType } from "./game-type";
import Minesweeper from "./minesweeper";
import NutsAndBolts from "./nuts-and-bolts";

const games: GameType[] = [
  {
    id: "minesweeper",
    name: "Minesweeper",
    Icon: PickaxeIcon,
    Node: Minesweeper,
  },
  {
    id: "nuts-and-bolts",
    name: "Nuts and Bolts",
    Icon: BoltIcon,
    Node: NutsAndBolts,
  },
];

export default games;
