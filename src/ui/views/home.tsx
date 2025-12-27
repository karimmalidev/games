import { SwordsIcon } from "lucide-react";
import games from "../../games";
import { cn } from "../../lib/utils";
import Content from "../templates/content";
import { useGame } from "./router";
import Button from "../components/Button";

export default function Home({ wide }: { wide: boolean }) {
  const [_, setGame] = useGame();

  return (
    <Content>
      <div className="flex h-48 items-center justify-center">
        <a
          href="https://github.com/karimmalidev/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-16 w-40 justify-center *:duration-300 *:ease-in-out"
        >
          <SwordsIcon
            className="group-hover:flip absolute top-0 size-6 text-emerald-700 group-hover:rotate-y-180 group-hover:text-emerald-600"
            strokeWidth={1.5}
            fill="currentColor"
            fillOpacity={0.4}
          />
          <span className="absolute bottom-5 font-medium tracking-wider text-emerald-700 group-hover:tracking-widest group-hover:text-emerald-600">
            Karim's
          </span>
          <span className="absolute -bottom-2 text-4xl font-bold group-hover:tracking-wide group-hover:text-shadow-[0_0_2px_white]">
            Games
          </span>
        </a>
      </div>
      <div
        className={cn(
          "flex flex-col items-center gap-4 overflow-scroll p-4",
          wide ? "h-96" : "h-112",
        )}
      >
        {games.map((game) => (
          <Button
            key={game.id}
            onClick={() => setGame(game)}
            className="h-10 w-64"
          >
            <game.Icon
              className="absolute left-4 size-[1.25em] text-white group-hover:rotate-30 group-active:rotate-none"
              fill="currentColor"
              fillOpacity={0.25}
              strokeWidth={1.5}
            />{" "}
            <span className="text-white group-hover:tracking-wide group-active:tracking-wider">
              {game.name}
            </span>
          </Button>
        ))}
      </div>
    </Content>
  );
}
