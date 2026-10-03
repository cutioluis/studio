import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { WelcomeEmailRepository, WelcomeOrder } from "../domain/types";

type One<T> = T | T[] | null;

type OrderRow = {
  id: string;
  estado: string;
  bienvenida_enviada_at: string | null;
  personas: One<{ nombres: string; email: string | null }>;
  modalidades: One<{
    nombre: string;
    carreras: One<{ nombre: string }>;
    horarios_modalidad: { dia_semana: number; hora_inicio: string; hora_fin: string }[] | null;
  }>;
  matriculas: One<{ cohortes: One<{ nombre: string; fecha_inicio: string }> }>;
};

const SELECT =
  "id,estado,bienvenida_enviada_at,personas(nombres,email),modalidades(nombre,carreras(nombre),horarios_modalidad(dia_semana,hora_inicio,hora_fin)),matriculas(cohortes(nombre,fecha_inicio))";

const WHITESPACE_RE = /\s+/;
const one = <T>(value: One<T> | undefined): T | null => (Array.isArray(value) ? (value[0] ?? null) : (value ?? null));

export const welcomeEmailRepository: WelcomeEmailRepository = {
  async findOrder(ordenId) {
    const { data, error } = await getSupabaseAdmin().from("ordenes").select(SELECT).eq("id", ordenId).maybeSingle<OrderRow>();
    if (error) throw error;
    if (!data) return null;

    const persona = one(data.personas);
    const modalidad = one(data.modalidades);
    const cohorte = one(one(data.matriculas)?.cohortes);

    const order: WelcomeOrder = {
      id: data.id,
      status: data.estado,
      welcomeSentAt: data.bienvenida_enviada_at,
      student: { firstName: persona?.nombres?.trim().split(WHITESPACE_RE)[0] ?? "", email: persona?.email ?? null },
      programName: one(modalidad?.carreras)?.nombre ?? "",
      modalityName: modalidad?.nombre ?? "",
      cohort: cohorte ? { name: cohorte.nombre, startDate: cohorte.fecha_inicio } : null,
      schedule: (modalidad?.horarios_modalidad ?? []).map((h) => ({ day: h.dia_semana, start: h.hora_inicio, end: h.hora_fin })),
    };
    return order;
  },

  async markWelcomeSent(ordenId, sentAt) {
    const { error } = await getSupabaseAdmin()
      .from("ordenes")
      .update({ bienvenida_enviada_at: sentAt.toISOString() })
      .eq("id", ordenId);
    if (error) throw error;
  },
};
