import type { Schedule } from "./types";

const DAYS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  return `${Number(hours)}:${minutes}`;
}

export function formatMoney(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

export function formatDuration(months: number): string {
  return months === 1 ? "1 mes" : `${months} meses`;
}

function joinDays(days: string[]): string {
  if (days.length <= 1) return days.join("");
  return `${days.slice(0, -1).join(", ")} y ${days[days.length - 1]}`;
}

/** "Lunes, miércoles y viernes · 9:00 – 12:00"; days with different time ranges become separate groups. */
export function formatSchedule(schedules: Schedule[]): string {
  const groups = new Map<string, number[]>();
  for (const schedule of [...schedules].sort((a, b) => a.dayOfWeek - b.dayOfWeek)) {
    const range = `${formatTime(schedule.startTime)} – ${formatTime(schedule.endTime)}`;
    groups.set(range, [...(groups.get(range) ?? []), schedule.dayOfWeek]);
  }

  return Array.from(groups, ([range, days]) => `${joinDays(days.map((day) => DAYS[day - 1] ?? ""))} · ${range}`)
    .map((text, index) => (index === 0 ? capitalize(text) : text))
    .join("; ");
}
