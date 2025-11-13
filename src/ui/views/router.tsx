import games from "../../games";
import type { GameType } from "../../games/game-type";
import Home from "./home";
import { createContext, useContext, useEffect, useState } from "react";

export default function Router() {
  const [game, setGame] = useState<GameType | null>(
    games.find(({ id }) => id == window.location.search.substring(1)) || null,
  );

  useEffect(() => {
    window.history.replaceState(
      {},
      "",
      game
        ? `${window.location.pathname}?${game.id}`
        : window.location.pathname,
    );
    document.title = game ? game.name : "Games";
  }, [game]);

  return (
    <context.Provider value={[game, setGame]}>
      {game ? <game.Node /> : <Home />}
    </context.Provider>
  );
}

const context = createContext<
  [GameType | null, React.Dispatch<React.SetStateAction<GameType | null>>]
>(null!);

export function useGame() {
  return useContext(context);
}
