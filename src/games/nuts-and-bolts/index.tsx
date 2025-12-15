import clsx from "clsx";
import { useLocalStorage } from "../../ui/hooks/use-local-storage";
import Game from "../../ui/templates/game";
import { generateSpace } from "./space";
import type { Color, Nut } from "./space-type";

export default function NutsAndBolts() {
  const [level, setLevel] = useLocalStorage("level", 1);
  const [space, setSpace] = useLocalStorage("space", generateSpace());

  function doRestartAction() {
    setSpace(generateSpace());
  }

  return (
    <Game status={[["Level", level]]} onRestart={doRestartAction}>
      <div className="flex h-full w-full flex-wrap items-center justify-evenly gap-x-4 rounded-sm bg-slate-700 p-8">
        {space.nuts.map(Bolt)}
      </div>
    </Game>
  );
}

function Bolt({ colors, size, state }: Nut, index: number) {
  return (
    <div
      key={index}
      style={{ aspectRatio: 4 / 1 / (size + 0.5) }}
      className="relative flex flex-1/6 grow-0 flex-col justify-end"
    >
      {/* bolt body */}
      <div className="absolute inset-0 left-1/2 w-1/3 -translate-x-1/2 rounded-tl-sm rounded-tr-sm border-r-2 border-l-2 border-black/10 bg-slate-600"></div>

      {/* bolt head */}
      <div className="absolute aspect-6/1 w-full translate-y-full rounded-sm border-t border-b border-black/10 bg-current text-slate-600 shadow-black/10 *:border *:border-current">
        <div className="absolute inset-0 left-0 w-1/4 rounded-sm bg-white/5"></div>
        <div className="absolute inset-0 left-1/4 w-2/4 rounded-sm bg-white/10"></div>
        <div className="absolute inset-0 left-3/4 w-1/4 rounded-sm bg-black/5"></div>
      </div>

      {colors.map((color, index) => (
        <Nut color={color} key={index} />
      ))}
    </div>
  );
}

function Nut({ color }: { color: Color }) {
  return (
    <div
      className={clsx(
        "*:border-bg relative z-1 mx-auto aspect-3/1 w-3/4 rounded-sm bg-current *:border *:border-current",
        "border-t border-b border-black/10",
        color == "red" && "text-red-500",
        color == "yellow" && "text-yellow-500",
        color == "green" && "text-green-500",
        color == "fuchsia" && "text-fuchsia-500",
        color == "blue" && "text-blue-500",
        color == "cyan" && "text-cyan-500",
        color == "white" && "text-neutral-300",
        color == "black" && "text-neutral-700",
      )}
    >
      <div className="absolute left-0 h-full w-1/4 rounded-sm backdrop-brightness-110"></div>
      <div className="absolute left-1/2 h-full w-1/2 -translate-x-1/2 rounded-sm backdrop-brightness-120"></div>
      <div className="absolute left-3/4 h-full w-1/4 rounded-sm backdrop-brightness-95"></div>
    </div>
  );
}
