import games from "../../games";
import Button from "../components/Button";
import { useGame } from "./router";

export default function Home() {
  const [_, setGame] = useGame();

  return (
    <>
      <header className="flex flex-col-reverse items-center justify-center pt-40 pb-32 text-white">
        <h1 className="-mt-4 text-6xl font-black text-white/80 select-none">
          Games
        </h1>
        <a
          href="https://github.com/karimmalidev/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <span className="select-none">@</span>karimmalidev
        </a>
      </header>
      <main className="container mx-auto w-full max-w-md">
        <div className="mx-8 mb-16 flex flex-col">
          {games.map((game) => (
            <div className="h-20" key={game.id}>
              <Button onClick={() => setGame(game)} Icon={game.Icon}>
                {game.name}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
