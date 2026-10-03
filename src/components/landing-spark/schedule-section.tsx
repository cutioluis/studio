import Link from "next/link";
import { Clock } from "lucide-react";
import type { Horario, Programa, WeekDay } from "@/features/catalog/domain/types";
import { CalendlyLink } from "@/components/utils/calendly-link";
import { CardShell } from "@/components/ui/card-shell";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { IconSwap } from "@/components/ui/button-effects";

const WEEK: { day: WeekDay; short: string; long: string }[] = [
  { day: 1, short: "L", long: "Lunes" },
  { day: 2, short: "M", long: "Martes" },
  { day: 3, short: "X", long: "Miércoles" },
  { day: 4, short: "J", long: "Jueves" },
  { day: 5, short: "V", long: "Viernes" },
  { day: 6, short: "S", long: "Sábado" },
  { day: 7, short: "D", long: "Domingo" },
];

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime(time: string) {
  return time.replace(/^0/, "");
}

function formatDuration(start: string, end: string) {
  const minutes = toMinutes(end) - toMinutes(start);
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

function formatDays(days: WeekDay[]) {
  const names = WEEK.filter(({ day }) => days.includes(day)).map(({ long }) => long.toLowerCase());
  const text = names.length > 1 ? `${names.slice(0, -1).join(", ")} y ${names.at(-1)}` : names[0];
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function ScheduleSection({ programas }: { programas: Programa[] }) {
  if (programas.length === 0) return null;

  return (
    <section id="schedule" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <RevealGroup as="header" className="text-center mb-14 md:mb-20">
          <RevealItem variant="text">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Horarios</p>
          </RevealItem>
          <RevealItem variant="text">
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Elige tu{" "}
              <span className="bg-gradient-to-r from-primary to-primary-deep bg-clip-text text-transparent">
                horario de clases
              </span>
            </h2>
          </RevealItem>
          <RevealItem variant="text">
            <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground">
              Cada carrera tiene sus días fijos. Encuentra la que mejor se adapta a tu semana.
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup as="ul" stagger={0.15} className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {programas.map((programa) => (
            <RevealItem as="li" key={programa.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.334rem)]">
              <ScheduleCard programa={programa} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal as="div" className="mt-14 text-center text-muted-foreground">
          ¿Tienes dudas sobre qué horario te conviene?{" "}
          <CalendlyLink className="font-semibold text-primary underline-offset-4 hover:underline">
            Agenda una asesoría gratuita
          </CalendlyLink>
        </Reveal>
      </div>
    </section>
  );
}

function ScheduleCard({ programa }: { programa: Programa }) {
  return (
    <CardShell className="flex flex-col">
      <div className="border-b border-white/[0.06] px-7 py-6">
        <p className="text-sm font-medium text-primary-deep">{programa.duracion}</p>
        <h3 className="mt-1 text-xl font-bold leading-snug text-white">{programa.nombre}</h3>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-7 py-6">
        {programa.horarios.map((horario) => (
          <ModalityBlock key={`${horario.modalidad}-${horario.inicio}`} horario={horario} />
        ))}

        <Link
          href={`/programs/${programa.id}`}
          className="group/btn relative z-20 mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-white"
        >
          Ver carrera
          <IconSwap direction="right" />
        </Link>
      </div>
    </CardShell>
  );
}

function ModalityBlock({ horario }: { horario: Horario }) {
  const { modalidad: label, dias: days, inicio: start, fin: end } = horario;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">{label}</p>

      <ol className="flex gap-1.5" aria-label={`Días: ${formatDays(days)}`}>
        {WEEK.map(({ day, short, long }) => {
          const active = days.includes(day);
          return (
            <li
              key={day}
              title={long}
              aria-hidden
              className={cn(
                "flex h-9 flex-1 items-center justify-center rounded-lg text-xs font-semibold",
                active
                  ? "bg-gradient-to-br from-primary to-primary-deep text-primary-foreground"
                  : "border border-white/[0.06] text-muted-foreground/40"
              )}
            >
              {short}
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
        <span className="flex items-center gap-2 text-white">
          <Clock className="h-4 w-4 text-primary" />
          {formatTime(start)} – {formatTime(end)}
        </span>
        <span className="text-xs text-muted-foreground">{formatDuration(start, end)} por clase</span>
      </div>
      <p className="text-xs text-muted-foreground">{formatDays(days)}</p>
    </div>
  );
}
