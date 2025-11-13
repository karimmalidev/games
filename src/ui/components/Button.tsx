import clsx from "clsx";
import type { MouseEventHandler, ReactNode } from "react";
import type { IconType } from "react-icons";

export default function Button({
  children,
  className,
  Icon,
  onClick,
}: {
  children?: ReactNode;
  className?: string;
  Icon?: IconType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group /10 relative flex shrink-0 cursor-pointer items-center justify-center gap-2 border-r-4 border-b-4 border-black/10 bg-slate-500 text-lg font-semibold text-white shadow-[3px_3px_0_rgba(0,0,0,0.1)] shadow-black/10 duration-100 ease-out hover:bg-amber-500 active:border-t-4 active:border-r-0 active:border-b-0 active:border-l-4 active:bg-amber-600 active:shadow-none",
        className,
        children
          ? "w-full rounded-lg px-8 py-4"
          : "aspect-square h-12 w-12 overflow-hidden rounded-full",
      )}
    >
      {children && Icon && (
        <Icon className="absolute left-4 text-[1.5em] text-white/60 group-hover:text-white group-active:text-white" />
      )}
      {!children && Icon && (
        <Icon className="absolute text-[1.5em] text-white/60 group-hover:text-white group-active:text-white" />
      )}
      {children}
    </button>
  );
}
