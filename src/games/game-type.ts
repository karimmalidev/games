import type { LucideIcon } from "lucide-react";
import type { JSX } from "react";

export type GameType = {
  id: string;
  name: string;
  Icon: LucideIcon;
  Node: (props: { wide: boolean }) => JSX.Element;
};
