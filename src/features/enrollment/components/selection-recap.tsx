import { formatMoney, formatSchedule } from "../domain/format";
import type { Career, Modality } from "../domain/types";

type Props = { career: Career; modality: Modality; onChange: () => void };

export function SelectionRecap({ career, modality, onChange }: Props) {
  const schedule = formatSchedule(modality.schedules);
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg bg-muted/50 px-4 py-3">
      <div className="flex min-w-0 grow basis-56 flex-col gap-0.5">
        <p className="text-balance text-sm font-medium text-white">
          {career.name} · {modality.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {schedule ? `${schedule} · ` : ""}
          <span className="tabular-nums">{formatMoney(modality.monthlyFee)} / mes</span> al iniciar clases
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Hoy pagas <span className="font-bold tabular-nums text-primary">{formatMoney(career.enrollmentFee)}</span>
      </p>
      <button
        type="button"
        onClick={onChange}
        className="rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Cambiar
      </button>
    </div>
  );
}
