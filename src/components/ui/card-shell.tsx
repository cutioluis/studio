import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Shared dark card used across landing sections.
// isolate + transform-gpu keep scaled images clipped to the rounded corners while the card lifts,
// and the border is an overlay so it always sits above images instead of being covered by them.
export function CardShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <article
      className={cn(
        "group relative isolate h-full transform-gpu overflow-hidden rounded-2xl bg-card shadow-xl shadow-black/40 transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-white/[0.08] transition-colors duration-300 group-hover:border-primary-deep/50"
      />
      {children}
    </article>
  );
}
