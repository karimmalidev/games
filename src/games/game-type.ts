import type { LucideProps } from "lucide-react";
import type { JSX } from "react";

export type GameType = {
  id: string;
  name: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  Node: () => JSX.Element;
};
