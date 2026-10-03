import { formatDuration } from "@/features/enrollment/domain/format";
import type { Horario, Programa, WeekDay } from "./types";

export type ScheduleRow = { dia_semana: number; hora_inicio: string; hora_fin: string };

type AreaRef = { nombre: string };

export type CareerRow = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string | null;
  duracion_meses: number;
  icono: string | null;
  destacada: boolean;
  orden: number | null;
  carrera_areas: { orden: number | null; areas: AreaRef | AreaRef[] | null }[];
  modalidades: {
    nombre: string;
    orden: number | null;
    activa: boolean;
    horarios_modalidad: ScheduleRow[];
  }[];
  modulos: { numero: number; nombre: string; temas: { orden: number; descripcion: string }[] }[];
};

const byOrder = <T extends { orden: number | null }>(a: T, b: T) => (a.orden ?? 0) - (b.orden ?? 0);

/** "09:00:00" -> "09:00" */
export function trimTime(time: string): string {
  return time.slice(0, 5);
}

/** Groups the days of one modality that share the same hours into a single entry. */
export function groupSchedules(modality: string, rows: ScheduleRow[]): Horario[] {
  const groups = new Map<string, Horario>();
  for (const row of [...rows].sort((a, b) => a.dia_semana - b.dia_semana)) {
    const inicio = trimTime(row.hora_inicio);
    const fin = trimTime(row.hora_fin);
    const key = `${inicio}-${fin}`;
    const group = groups.get(key) ?? { modalidad: modality, dias: [], inicio, fin };
    group.dias.push(row.dia_semana as WeekDay);
    groups.set(key, group);
  }
  return Array.from(groups.values());
}

export function mapCareerRow(row: CareerRow): Programa {
  return {
    id: row.slug,
    nombre: row.nombre,
    duracion: formatDuration(row.duracion_meses),
    descripcion: row.descripcion ?? "",
    icono: row.icono ?? undefined,
    mostSell: row.destacada,
    areas: [...row.carrera_areas]
      .sort(byOrder)
      .map(({ areas }) => (Array.isArray(areas) ? areas[0]?.nombre : areas?.nombre))
      .filter((name): name is string => Boolean(name)),
    horarios: [...row.modalidades]
      .filter((modality) => modality.activa)
      .sort(byOrder)
      .flatMap((modality) => groupSchedules(modality.nombre, modality.horarios_modalidad)),
    modulos: [...row.modulos]
      .sort((a, b) => a.numero - b.numero)
      .map((module) => ({
        numero: module.numero,
        nombre: module.nombre,
        temario: [...module.temas].sort((a, b) => a.orden - b.orden).map((topic) => topic.descripcion),
      })),
  };
}
