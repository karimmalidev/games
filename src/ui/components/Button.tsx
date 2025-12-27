import { cn } from "../../lib/utils";

export default function Button({
  children,
  onClick,
  className,
  disabled = false,
}: {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex cursor-pointer items-center justify-center gap-1 rounded-xl px-4 py-1 duration-100 ease-out *:shrink-0 *:duration-200 *:ease-in-out",
        "border-r-3 border-b-3 border-black/10 bg-emerald-700 shadow-[3px_3px_rgb(0,0,0,0.1)]",
        disabled && "cursor-not-allowed text-emerald-800 opacity-50",
        !disabled &&
          "hover:bg-emerald-600 hover:shadow-[2px_2px_rgb(0,0,0,0.1)]",
        !disabled &&
          "active:border-t-3 active:border-r-0 active:border-b-0 active:border-l-3 active:bg-emerald-800 active:shadow-none",
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
