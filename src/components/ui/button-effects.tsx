import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Hover effects shared by every call-to-action. The interactive parent must carry the
// `group/btn` class; effects only react to that named group, so hovering a card never
// triggers the buttons inside it.

type SwapDirection = "right" | "up-right";

const OUT: Record<SwapDirection, string> = {
  right: "group-hover/btn:translate-x-[150%]",
  "up-right": "group-hover/btn:translate-x-[150%] group-hover/btn:-translate-y-[150%]",
};

const IN: Record<SwapDirection, string> = {
  right: "-translate-x-[150%]",
  "up-right": "-translate-x-[150%] translate-y-[150%]",
};

interface IconSwapProps {
  /** Icon at rest. Defaults to the arrow matching the direction. */
  icon?: ReactNode;
  /** Icon that slides in on hover. Defaults to the arrow matching the direction. */
  hoverIcon?: ReactNode;
  direction?: SwapDirection;
  className?: string;
}

/** The resting icon slides out while a second one slides in from the opposite side. */
export function IconSwap({ icon, hoverIcon, direction = "up-right", className }: IconSwapProps) {
  const Arrow = direction === "right" ? ArrowRight : ArrowUpRight;
  const rest = icon ?? <Arrow className="h-full w-full" />;
  const hover = hoverIcon ?? <Arrow className="h-full w-full" />;

  return (
    <span aria-hidden className={cn("relative inline-flex h-4 w-4 shrink-0 overflow-hidden", className)}>
      <span
        className={cn(
          "absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          OUT[direction]
        )}
      >
        {rest}
      </span>
      <span
        className={cn(
          "absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0",
          IN[direction]
        )}
      >
        {hover}
      </span>
    </span>
  );
}

/** Diagonal light band that crosses the button on hover. Parent needs `relative overflow-hidden`. */
export function ShineSweep({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-[300%]",
        className
      )}
    />
  );
}
