import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const STEPS = ["Carrera", "Datos", "Factura", "Pago"] as const;

type Props = { current: number; onGo: (index: number) => void };

export function Stepper({ current, onGo }: Props) {
  return (
    <nav aria-label="Progreso de la inscripción" className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Paso <span className="tabular-nums">{current + 1}</span> de <span className="tabular-nums">{STEPS.length}</span>
      </p>
      <ol className="flex items-center gap-2">
        {STEPS.map((label, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <Fragment key={label}>
              <li className="shrink-0">
                <button
                  type="button"
                  disabled={!done}
                  onClick={() => onGo(index)}
                  aria-current={active ? "step" : undefined}
                  className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring enabled:cursor-pointer"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold tabular-nums transition-colors",
                      done && "border-primary-deep bg-primary-deep text-primary-foreground",
                      active && "border-primary bg-primary text-primary-foreground",
                      !done && !active && "border-border text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="h-4 w-4" strokeWidth={3} /> : index + 1}
                  </span>
                  <span className={cn("pr-2 text-sm font-medium text-white", !active && "sr-only")}>
                    {label}
                    {done ? <span className="sr-only"> (completado)</span> : null}
                  </span>
                </button>
              </li>
              {index < STEPS.length - 1 ? (
                <li aria-hidden role="presentation" className="h-px min-w-3 flex-1 bg-border">
                  <div
                    className={cn(
                      "h-full bg-primary-deep motion-safe:transition-[width] motion-safe:duration-500",
                      done ? "w-full" : "w-0",
                    )}
                  />
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
