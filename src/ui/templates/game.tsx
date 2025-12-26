import { type JSX } from "react";
import { ArrowLeftIcon, RotateCcwIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useGame } from "../views/router";
import Content, { useWide } from "./content";
import Button from "../components/Button";

export default function Game({
  status = [],
  onRestart,
  children,
  disableRestart,
}: {
  status?: [string, string | number][];
  onRestart?: React.MouseEventHandler<HTMLButtonElement>;
  children?: JSX.Element;
  disableRestart?: boolean;
}) {
  const [_, setGame] = useGame();
  const wide = useWide();

  return (
    <Content>
      <Button
        className={cn("absolute top-2 left-2 h-12 w-16")}
        onClick={() => setGame(null)}
      >
        <ArrowLeftIcon className="size-6 group-hover:-translate-x-1 group-active:translate-none" />
      </Button>
      <Button
        className={cn(
          "absolute h-12 w-16",

          wide ? "top-16 left-2" : "top-2 right-2",
        )}
        onClick={onRestart}
        disabled={disableRestart}
      >
        <RotateCcwIcon
          className={cn(
            "size-6",
            !disableRestart && "group-hover:-rotate-15 group-active:-rotate-45",
          )}
        />
      </Button>
      <div
        className={cn(
          "absolute flex items-center gap-2",
          wide
            ? "bottom-2 left-1 h-111 w-16 flex-col"
            : "top-2 left-20 col-span-4 h-12 w-56 justify-evenly",
        )}
      >
        {status.map(([name, value]) => (
          <div
            className={cn(
              "flex flex-col items-center text-center leading-tight *:w-full",
              wide ? "w-16 *:text-right" : "*:text-center",
            )}
            key={name}
          >
            <span className={cn("text-xs text-white/40")}>{name}</span>
            <span className={cn("font-semibold text-white/60")}>{value}</span>
          </div>
        ))}
      </div>

      <div className={cn("absolute h-144 w-96", wide ? "right-0" : "top-16")}>
        {children}
      </div>
    </Content>
  );
}
