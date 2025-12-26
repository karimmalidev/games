import { useLayoutEffect, useState, type JSX } from "react";
import { cn } from "../../lib/utils";

export default function Content({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) {
  const wide = useWide();

  return (
    <div
      id="content"
      className={cn(
        "relative overflow-hidden select-none",
        wide ? "h-144 w-116" : "h-160 w-96",
      )}
    >
      {children}
    </div>
  );
}

export function useWide() {
  const [wide, setWide] = useState(isWide());

  useLayoutEffect(() => {
    const resize = () => {
      setWide(isWide());
      autoScaleContent();
      console.log("resize");
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [wide]);

  return wide;
}

function isWide(): boolean {
  const root = document.getElementById("root");
  if (!root) {
    return false;
  }
  const [w, h] = getSize(root);
  return w / h >= 116 / 144;
}

function autoScaleContent() {
  const root = document.getElementById("root");
  const content = document.getElementById("content");

  if (!root || !content) {
    return;
  }

  const [rw, rh] = getSize(root);
  const [cw, ch] = getSize(content);

  const scale = Math.min(rw / cw, rh / ch);
  content.style.scale = scale.toString();
}

function getSize(element: HTMLElement): [number, number] {
  return [element.offsetWidth, element.offsetHeight];
}
