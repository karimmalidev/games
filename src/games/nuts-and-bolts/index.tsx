import { cn } from "../../lib/utils";
import { useLocalStorage } from "../../ui/hooks/use-local-storage";
import Game from "../../ui/templates/game";
import { clickBolt, generateSpace, mergeSpaces } from "./space";
import type { BoltType, NutType, SpaceType } from "./space-type";
import "./styles.css";
import Button from "../../ui/components/Button";
import { ChevronRightIcon, StarIcon, UndoIcon } from "lucide-react";

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
        <div className="relative flex flex-1 flex-wrap items-center justify-evenly rounded-sm bg-slate-700 p-8">
          {space.bolts.map((bolt, index) => (
            <BoltNode
              bolt={bolt}
              spaces={spaces}
              setSpaces={setSpaces}
              key={index}
            />
          ))}
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
    setSpaces([...deepCopy, space]);
  }

  return (
    <button
      style={{ aspectRatio: 4 / 1 / (bolt.size + 0.5) }}
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
  const steps =
    bolt.size -
    bolt.nuts.length +
    bolt.nuts.filter((nut) => nut.state == "hold").length +
    1;
  return (
    <div
      style={{
        transform: `translateY(${nut.state == "hold" ? -100 * steps : 0}%)`,
      }}
      className={cn(
        "duration-400 ease-in",
        bolt.state == "hold" && "duration-200 ease-linear",
      )}
    >
      <div
        className={cn(
          "relative z-1 mx-auto aspect-3/1 w-3/4 rounded-sm border-t border-b border-black/10 bg-current",
          "*:border-bg *:absolute *:h-full *:rounded-sm *:border *:border-current *:bg-transparent",
          nut.state == "hold" && "animate-[wiggle_2s_ease-in-out_infinite]",
          nut.color == "red" && "text-red-500",
          nut.color == "yellow" && "text-yellow-500",
          nut.color == "green" && "text-green-500",
          nut.color == "fuchsia" && "text-fuchsia-500",
          nut.color == "blue" && "text-blue-500",
          nut.color == "cyan" && "text-cyan-500",
          nut.color == "white" && "text-neutral-300",
          nut.color == "black" && "text-neutral-700",
        )}
      >
        <div className="left-0 w-1/4 backdrop-brightness-110"></div>
        <div className="left-1/2 w-1/2 -translate-x-1/2 backdrop-brightness-120"></div>
        <div className="left-3/4 w-1/4 backdrop-brightness-90"></div>

        <StarIcon
          className="absolute top-1/2 left-1/2 size-3/4! -translate-x-1/2 -translate-y-1/2 border-none opacity-50"
          strokeWidth="3px"
        />
      </div>
    </div>
  );
}
