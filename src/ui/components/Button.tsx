import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../../lib/utils";

export default function Button({
  children,
  className,
  onClick,
  size = "default",
  disabled,
}: {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: "default" | "icon";
  disabled?: boolean;
}) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={cn(
        "group /10 relative flex h-12 shrink-0 items-center justify-center gap-3 rounded-full border-r-4 border-b-4 border-black/10 bg-slate-500 text-lg font-semibold text-white shadow-[3px_3px_0_rgba(0,0,0,0.1)] shadow-black/10 duration-100 ease-out",
        !disabled &&
          "cursor-pointer hover:bg-amber-500 active:border-t-4 active:border-r-0 active:border-b-0 active:border-l-4 active:bg-amber-600 active:shadow-none",
        disabled && "opacity-25",
        size == "icon"
          ? "aspect-square w-12 overflow-hidden text-[1.5em]"
          : "rounded-xl p-4 px-6",
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
