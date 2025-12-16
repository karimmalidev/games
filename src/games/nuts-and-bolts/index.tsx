import { cn } from "../../lib/utils";
import { useLocalStorage } from "../../ui/hooks/use-local-storage";
import Game from "../../ui/templates/game";
import { clickBolt, generateSpace } from "./space";
import type { BoltType, NutType, SpaceType } from "./space-type";
import "./styles.css";

export default function NutsAndBolts() {
  const [level, setLevel] = useLocalStorage("level", 1);
  const [space, setSpace] = useLocalStorage("space", generateSpace());

  function doRestartAction() {
    setSpace(generateSpace());
  }

  return (
    <Game status={[["Level", level]]} onRestart={doRestartAction}>
      <div className="flex h-full w-full flex-wrap items-center justify-evenly gap-x-4 rounded-sm bg-slate-700 p-8">
        {space.bolts.map((bolt, index) => (
          <BoltNode bolt={bolt} space={space} setSpace={setSpace} key={index} />
        ))}
      </div>
    </Game>
  );
}

function BoltNode({
  bolt,
  space,
  setSpace,
}: {
  bolt: BoltType;
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
}) {
  function onClick() {
    clickBolt(space, bolt);
    setSpace((s) => ({ ...s }));
  }

  return (
    <button
      style={{ aspectRatio: 4 / 1 / (bolt.size + 0.5) }}
      className={cn(
        "relative flex flex-1/6 grow-0 flex-col justify-end",
        bolt.state != "complete" && "hover:cursor-pointer",
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

      {bolt.nuts.map((nut, index) => (
        <NutNode nut={nut} key={index} space={space} setSpace={setSpace} />
      ))}
    </button>
  );
}

function NutNode({
  nut,
}: {
  nut: NutType;
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
}) {
  return (
    <div
      className={cn(
        "*:border-bg relative z-1 mx-auto aspect-3/1 w-3/4 rounded-sm bg-current *:border *:border-current",
        nut.state == "hold" &&
          "-translate-y-1/1 animate-[wiggle_2s_ease-in-out_infinite]",
        "border-t border-b border-black/10",
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
      <div className="absolute left-0 h-full w-1/4 rounded-sm backdrop-brightness-110"></div>
      <div className="absolute left-1/2 h-full w-1/2 -translate-x-1/2 rounded-sm backdrop-brightness-120"></div>
      <div className="absolute left-3/4 h-full w-1/4 rounded-sm backdrop-brightness-95"></div>
    </div>
  );
}
