import "server-only";
import { cache } from "react";
import { safeError } from "@/lib/log-error";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { mapCareerRow, type CareerRow } from "../domain/career-mapper";
import type { Programa } from "../domain/types";

const SELECT = [
  "id,slug,nombre,descripcion,duracion_meses,icono,destacada,orden",
  "carrera_areas(orden,areas(nombre))",
  "modalidades(nombre,orden,activa,horarios_modalidad(dia_semana,hora_inicio,hora_fin))",
  "modulos(numero,nombre,temas(orden,descripcion))",
].join(",");

/**
 * Active careers ordered by `orden`.
 * Missing env vars return an empty list so builds without credentials still succeed.
 * Database errors are rethrown on purpose: during ISR revalidation Next.js then keeps serving the last
 * successfully generated page instead of caching an empty catalog for the whole revalidate window.
 */
export const getCareers = cache(async (): Promise<Programa[]> => {
  if (!isSupabaseConfigured()) {
    console.error("[catalog] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set; the catalog is empty.");
    return [];
  }
  const { data, error } = await getSupabaseAdmin()
    .from("carreras")
    .select(SELECT)
    .eq("activa", true)
    .order("orden", { ascending: true })
    .returns<CareerRow[]>();
  if (error) {
    console.error("[catalog] could not load careers", safeError(error));
    throw new Error("Could not load the career catalog");
  }
  return (data ?? []).map(mapCareerRow);
});

export async function getCareerBySlug(slug: string): Promise<Programa | null> {
  return (await getCareers()).find((career) => career.id === slug) ?? null;
}
