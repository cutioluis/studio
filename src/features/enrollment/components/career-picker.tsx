import { useState } from "react";
import { Clock } from "lucide-react";
import { formatDuration, formatMoney, formatSchedule } from "../domain/format";
import type { Career } from "../domain/types";
import { ErrorText } from "./atoms";
import { ChoiceRow, OptionCard } from "./molecules";

type Props = {
  careers: Career[];
  careerId: string | null;
  modalityId: string | null;
  error?: string;
  onSelectCareer: (careerId: string) => void;
  onSelectModality: (modalityId: string) => void;
};

function ScheduleChoice({ career, modalityId, onSelect }: { career: Career; modalityId: string | null; onSelect: (id: string) => void }) {
  const single = career.modalities.length === 1 ? career.modalities[0] : null;

  if (single) {
    return (
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-white">{formatSchedule(single.schedules)}</span> · {single.name} ·{" "}
        <span className="tabular-nums">{formatMoney(single.monthlyFee)} / mes</span>
      </p>
    );
  }

  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="mb-2 text-sm font-semibold text-white">¿En qué horario?</legend>
      {career.modalities.map((modality) => (
        <ChoiceRow
          key={modality.id}
          name="modality"
          value={modality.id}
          checked={modality.id === modalityId}
          onSelect={onSelect}
          trailing={
            <span className="font-semibold tabular-nums text-primary">
              {formatMoney(modality.monthlyFee)}
              <span className="text-sm font-normal text-muted-foreground"> / mes</span>
            </span>
          }
        >
          <span className="font-medium">{formatSchedule(modality.schedules)}</span>
          <span className="text-sm text-muted-foreground">{modality.name}</span>
        </ChoiceRow>
      ))}
    </fieldset>
  );
}

export function CareerPicker({ careers, careerId, modalityId, error, onSelectCareer, onSelectModality }: Props) {
  const [showAll, setShowAll] = useState(false);
  const selected = careers.find((career) => career.id === careerId);
  const collapsed = Boolean(selected) && !showAll;
  const visible = collapsed && selected ? [selected] : careers;

  return (
    <div className="flex flex-col gap-3">
      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Carrera</legend>
        {visible.map((career) => (
          <OptionCard
            key={career.id}
            name="career"
            value={career.id}
            checked={career.id === careerId}
            onSelect={(id) => {
              setShowAll(false);
              onSelectCareer(id);
            }}
            footer={career.id === careerId ? <ScheduleChoice career={career} modalityId={modalityId} onSelect={onSelectModality} /> : undefined}
          >
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <div className="flex min-w-0 grow basis-48 flex-col gap-0.5">
                <span className="text-balance font-semibold leading-snug text-white">{career.name}</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock aria-hidden className="h-3.5 w-3.5" />
                  {formatDuration(career.durationMonths)}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Inscripción <span className="text-lg font-bold tabular-nums text-primary">{formatMoney(career.enrollmentFee)}</span>
              </span>
            </div>
          </OptionCard>
        ))}
      </fieldset>

      {collapsed ? (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="self-start rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Ver otras carreras
        </button>
      ) : null}
      <ErrorText id="career-error">{error}</ErrorText>
    </div>
  );
}
