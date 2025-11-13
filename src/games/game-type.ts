import type { JSX } from "react";
import type { IconType } from "react-icons";

export type GameType = {
  id: string;
  name: string;
  Icon: IconType;
  Node: () => JSX.Element;
};
