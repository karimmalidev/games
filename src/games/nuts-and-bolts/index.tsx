import { cn } from "../../lib/utils";
import { useLocalStorage } from "../../ui/hooks/use-local-storage";
import Game from "../../ui/templates/game";
import { clickBolt, generateSpace, mergeSpace } from "./space";
import type { BoltType, NutType, SpaceType } from "./space-type";
import "./styles.css";
import Button from "../../ui/components/Button";
import {
  ChevronRightIcon,
  CircleIcon,
  DiamondIcon,
  HeartIcon,
  HexagonIcon,
  OctagonIcon,
  SquareIcon,
  StarIcon,
  TriangleIcon,
  UndoIcon,
} from "lucide-react";

export default function NutsAndBolts() {
  const [level, setLevel] = useLocalStorage("level", 1);
  const [spaces, setSpaces] = useLocalStorage("spaces", [generateSpace(level)]);

  const space = spaces[spaces.length - 1];

  function doRestartAction() {
    if (spaces.length <= 1) {
      return;
    }
    setSpaces([spaces[0]]);
  }

  function doUndo() {
    if (spaces.length <= 1) {
      return;
    }
    setSpaces(spaces.slice(0, spaces.length - 1));
  }

  function goToNextLevel() {
    if (space.state != "complete") {
      return;
    }
    setLevel(level + 1);
    setSpaces([generateSpace(level + 1)]);
  }

  return (
    <Game
      status={[["Level", level]]}
      onRestart={doRestartAction}
      disableRestart={spaces.length == 1 || space.state == "complete"}
    >
      <div className="flex h-full w-full flex-col">
        <div className="relative flex h-full flex-1 items-center justify-center rounded-sm bg-slate-700">
          <div
            className="grid h-full w-full content-evenly justify-evenly *:justify-self-center"
            style={{
              gridTemplateColumns: `repeat(${calcSpaceColumns(space)}, 1fr)`,
            }}
          >
            {space.bolts.map((bolt, index) => (
              <BoltNode
                bolt={bolt}
                spaces={spaces}
                setSpaces={setSpaces}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 px-4">
          {space.state == "playing" && (
            <Button
              onClick={doUndo}
              className="w-fit"
              disabled={spaces.length == 1}
            >
              <UndoIcon />
              Undo
            </Button>
          )}
          {space.state == "complete" && (
            <Button
              onClick={goToNextLevel}
              className="w-full bg-green-600 hover:bg-green-600/80 active:bg-green-700"
            >
              Next Level <ChevronRightIcon />
            </Button>
          )}
        </div>
      </div>
    </Game>
  );
}

function BoltNode({
  bolt,
  spaces,
  setSpaces,
}: {
  bolt: BoltType;
  spaces: SpaceType[];
  setSpaces: React.Dispatch<React.SetStateAction<SpaceType[]>>;
}) {
  const space = spaces[spaces.length - 1];

  function onClick() {
    if (space.state == "complete" || bolt.state == "complete") {
      return;
    }
    const deepCopy = JSON.parse(JSON.stringify(spaces)) as SpaceType[];
    clickBolt(space, bolt);
    setSpaces(mergeSpace(deepCopy, space));
  }

  return (
    <button
      style={{
        aspectRatio: 4 / 1 / (bolt.size + 0.5),
        width: `${(calcSpaceColumns(space) / 5) * 80}%`,
      }}
      className={cn(
        "relative flex flex-1/6 grow-0 flex-col justify-end duration-500",
        space.state != "complete" &&
          bolt.state != "complete" &&
          "hover:cursor-pointer",
      )}
      onClick={onClick}
    >
      {/* bolt body */}
      <div className="absolute inset-0 left-1/2 w-1/3 -translate-x-1/2 rounded-tl-sm rounded-tr-sm border-r-2 border-l-2 border-black/10 bg-slate-600"></div>

      {/* bolt head */}
      <div className="absolute aspect-6/1 w-full translate-y-full rounded-sm border-t border-b border-black/10 bg-current text-slate-600 shadow-black/10 *:border *:border-current">
        <div className="absolute inset-0 left-0 w-1/4 rounded-sm bg-white/3"></div>
        <div className="absolute inset-0 left-1/4 w-2/4 rounded-sm bg-white/6"></div>
        <div className="absolute inset-0 left-3/4 w-1/4 rounded-sm bg-black/3"></div>
      </div>

      {/* complete bolt */}
      {bolt.state == "complete" && (
        <div className="absolute inset-0 left-1/2 aspect-4/1 w-1/2 -translate-x-1/2 rounded-tl-full rounded-tr-full border-r-2 border-b-2 border-l-2 border-black/10 bg-slate-500">
          <div className="absolute inset-0 top-0 left-1/2 aspect-8/1 w-1/2 -translate-x-1/2 rounded-br-full rounded-bl-full bg-black/10"></div>
        </div>
      )}

      {bolt.nuts.map((nut) => (
        <NutNode
          nut={nut}
          bolt={bolt}
          spaces={spaces}
          setSpaces={setSpaces}
          key={nut.id}
        />
      ))}
    </button>
  );
}

function NutNode({
  nut,
  bolt,
}: {
  nut: NutType;
  bolt: BoltType;
  spaces: SpaceType[];
  setSpaces: React.Dispatch<React.SetStateAction<SpaceType[]>>;
}) {
  const ShapeIcon = {
    black: StarIcon,
    red: HeartIcon,
    yellow: TriangleIcon,
    green: SquareIcon,
    fuchsia: HexagonIcon,
    blue: CircleIcon,
    cyan: DiamondIcon,
    white: OctagonIcon,
  }[nut.color];

  const steps = 1 + (bolt.size - bolt.nuts.length);

  return (
    <div
      style={{
        transform: `translateY(${nut.state == "hold" ? -100 * steps : 0}%)`,
      }}
      className={cn(
        "duration-400 ease-in",
        nut.state == "hold" && "duration-200 ease-linear",
      )}
    >
      <div
        className={cn(
          "relative z-1 mx-auto aspect-3/1 w-3/4 rounded-sm border-t border-b border-black/10 bg-current",
          "*:absolute *:h-full *:rounded-sm *:border *:border-current",
          nut.state == "hold" && "animate-[wiggle_2s_ease-in-out_infinite]",
          nut.color == "red" && "text-red-500",
          nut.color == "yellow" && "text-yellow-500",
          nut.color == "green" && "text-green-500",
          nut.color == "fuchsia" && "text-fuchsia-500",
          nut.color == "blue" && "text-blue-500",
          nut.color == "cyan" && "text-cyan-500",
          nut.color == "white" && "text-neutral-300",
          nut.color == "black" && "text-neutral-600",
        )}
      >
        <div
          className={cn(
            "left-0 w-1/4",
            nut.color == "red" && "bg-red-400",
            nut.color == "yellow" && "bg-yellow-400",
            nut.color == "green" && "bg-green-400",
            nut.color == "fuchsia" && "bg-fuchsia-400",
            nut.color == "blue" && "bg-blue-400",
            nut.color == "cyan" && "bg-cyan-400",
            nut.color == "white" && "bg-neutral-200",
            nut.color == "black" && "bg-neutral-500",
          )}
        ></div>
        <div
          className={cn(
            "left-1/2 w-1/2 -translate-x-1/2",
            nut.color == "red" && "bg-red-300",
            nut.color == "yellow" && "bg-yellow-300",
            nut.color == "green" && "bg-green-300",
            nut.color == "fuchsia" && "bg-fuchsia-300",
            nut.color == "blue" && "bg-blue-300",
            nut.color == "cyan" && "bg-cyan-300",
            nut.color == "white" && "bg-neutral-100",
            nut.color == "black" && "bg-neutral-400",
          )}
        ></div>
        <div
          className={cn(
            "left-3/4 w-1/4",
            nut.color == "red" && "bg-red-600",
            nut.color == "yellow" && "bg-yellow-600",
            nut.color == "green" && "bg-green-600",
            nut.color == "fuchsia" && "bg-fuchsia-600",
            nut.color == "blue" && "bg-blue-600",
            nut.color == "cyan" && "bg-cyan-600",
            nut.color == "white" && "bg-neutral-400",
            nut.color == "black" && "bg-neutral-700",
          )}
        ></div>

        <ShapeIcon
          className="absolute top-1/2 left-1/2 size-3/4! -translate-x-1/2 -translate-y-1/2 border-none opacity-50"
          strokeWidth="3px"
        />
      </div>
    </div>
  );
}

function calcSpaceColumns(space: SpaceType) {
  let columns = Math.ceil(Math.sqrt(space.bolts.length));
  let rows = Math.ceil(space.bolts.length / columns);
  if (rows >= columns && columns >= 3) {
    columns++;
  }
  return columns;
}
