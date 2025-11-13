import { IoCaretBack } from "react-icons/io5";
import Button from "../components/Button";
import { VscDebugRestart } from "react-icons/vsc";
import type { JSX } from "react";
import { useGame } from "../views/router";

export default function Game({
  status,
  onRestart,
  children,
}: {
  status?: [string, string | number][];
  onRestart?: React.MouseEventHandler<HTMLButtonElement>;
  children?: JSX.Element;
}) {
  const [game, setGame] = useGame();

  return (
    <div className="flex min-h-dvh w-full flex-col select-none">
      <header className="container mx-auto flex h-20 w-full max-w-xl items-center justify-between gap-4 px-4">
        <Button onClick={() => setGame(null)} Icon={IoCaretBack} />
        <div className="flex grow items-center justify-evenly">
          {status &&
            status.map(([name, value], index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <span className="text-xs font-semibold text-white/40">
                  {name}
                </span>
                <span className="text-lg font-black text-white/60">
                  {value}
                </span>
              </div>
            ))}
          {!status?.length && (
            <div className="flex items-center justify-center gap-2 text-lg text-white/40">
              {game && <game.Icon />}
              {game?.name}
            </div>
          )}
        </div>
        <Button onClick={onRestart} Icon={VscDebugRestart} />
      </header>

      <main className="mx-auto aspect-2/3 w-full max-w-xl border border-black/10">
        {children}
      </main>
    </div>
  );
}
