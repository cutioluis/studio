import "server-only";
import { safeError } from "@/lib/log-error";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { TERMS_VERSION, type ResolvedBilling, type Submission } from "../domain/schemas";
import type { BankAccount, Career } from "../domain/types";
import { normalizeEcuadorMobile } from "../domain/validators";

const RECEIPTS_BUCKET = "comprobantes";

type CareerRow = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string | null;
  duracion_meses: number;
  precio_inscripcion: number | string;
  modalidades: {
    id: string;
    nombre: string;
    mensualidad: number | string;
    orden: number | null;
    activa: boolean;
    horarios_modalidad: { dia_semana: number; hora_inicio: string; hora_fin: string }[];
  }[];
};

type BankAccountRow = {
  id: string;
  tipo_cuenta: "ahorros" | "corriente";
  numero_cuenta: string;
  titular: string;
  tipo_identificacion_titular: "cedula" | "ruc";
  identificacion_titular: string;
  orden: number | null;
  bancos: { nombre: string } | { nombre: string }[] | null;
};

export async function getEnrollmentCatalog(): Promise<Career[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("carreras")
    .select(
      "id,slug,nombre,descripcion,duracion_meses,precio_inscripcion,modalidades(id,nombre,mensualidad,orden,activa,horarios_modalidad(dia_semana,hora_inicio,hora_fin))",
    )
    .eq("activa", true)
    .returns<CareerRow[]>();
  if (error) throw error;

  return (data ?? [])
    .map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.nombre,
      description: row.descripcion ?? "",
      durationMonths: row.duracion_meses,
      enrollmentFee: Number(row.precio_inscripcion),
      modalities: row.modalidades
        .filter((modality) => modality.activa)
        .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
        .map((modality) => ({
          id: modality.id,
          name: modality.nombre,
          monthlyFee: Number(modality.mensualidad),
          schedules: modality.horarios_modalidad
            .map((s) => ({ dayOfWeek: s.dia_semana, startTime: s.hora_inicio, endTime: s.hora_fin }))
            .sort((a, b) => a.dayOfWeek - b.dayOfWeek),
        })),
    }))
    .filter((career) => career.modalities.length > 0)
    .sort((a, b) => b.enrollmentFee - a.enrollmentFee || a.name.localeCompare(b.name, "es"));
}

export async function getActiveBankAccounts(): Promise<BankAccount[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("cuentas_bancarias")
    .select(
      "id,tipo_cuenta,numero_cuenta,titular,tipo_identificacion_titular,identificacion_titular,orden,bancos(nombre)",
    )
    .eq("activa", true)
    .order("orden", { ascending: true })
    .returns<BankAccountRow[]>();
  if (error) throw error;

  return (data ?? []).map((row) => {
    const bank = Array.isArray(row.bancos) ? row.bancos[0] : row.bancos;
    return {
      id: row.id,
      bankName: bank?.nombre ?? "Banco",
      accountType: row.tipo_cuenta,
      accountNumber: row.numero_cuenta,
      holder: row.titular,
      holderIdType: row.tipo_identificacion_titular,
      holderId: row.identificacion_titular,
    };
  });
}

export async function uploadReceipt(bytes: Uint8Array, file: { mime: string; ext: string }): Promise<string> {
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${file.ext}`;
  const { error } = await getSupabaseAdmin()
    .storage.from(RECEIPTS_BUCKET)
    .upload(path, bytes, { contentType: file.mime, upsert: false });
  if (error) throw error;
  return path;
}

export async function removeReceipt(path: string): Promise<void> {
  try {
    const { error } = await getSupabaseAdmin().storage.from(RECEIPTS_BUCKET).remove([path]);
    if (error) console.error("[enrollment] could not remove orphan receipt", path, safeError(error));
  } catch (error) {
    console.error("[enrollment] could not remove orphan receipt", path, safeError(error));
  }
}

/** Cheap pre-check so invalid payloads never reach Storage; the RPC still re-checks atomically. */
export async function assertEnrollable(modalityId: string, bankAccountId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const [modality, account] = await Promise.all([
    supabase.from("modalidades").select("id").eq("id", modalityId).eq("activa", true).maybeSingle(),
    supabase.from("cuentas_bancarias").select("id").eq("id", bankAccountId).eq("activa", true).maybeSingle(),
  ]);
  if (modality.error) throw modality.error;
  if (account.error) throw account.error;
  if (!modality.data) throw new EnrollmentRpcError("MODALIDAD_NO_DISPONIBLE");
  if (!account.data) throw new EnrollmentRpcError("CUENTA_NO_DISPONIBLE");
}

export type EnrollmentFailureReason = "MODALIDAD_NO_DISPONIBLE" | "CUENTA_NO_DISPONIBLE" | "ORDEN_ABIERTA" | "UNKNOWN";

export class EnrollmentRpcError extends Error {
  constructor(
    readonly reason: EnrollmentFailureReason,
    cause?: unknown,
  ) {
    super(reason, { cause });
    this.name = "EnrollmentRpcError";
  }
}

const KNOWN_REASONS = ["MODALIDAD_NO_DISPONIBLE", "CUENTA_NO_DISPONIBLE", "ORDEN_ABIERTA"] as const;

export async function createEnrollment(input: {
  submission: Submission;
  billing: ResolvedBilling;
  receiptPath: string;
}): Promise<{ orderId: string; code: string; amount: number }> {
  const { submission, billing, receiptPath } = input;
  const { contact, payment } = submission;

  const { data, error } = await getSupabaseAdmin().rpc("crear_inscripcion", {
    p_tipo_documento: contact.tipoDocumento,
    p_numero_documento: contact.numeroDocumento,
    p_nombres: contact.nombres,
    p_apellidos: contact.apellidos,
    p_celular: normalizeEcuadorMobile(contact.celular),
    p_email: contact.email,
    p_modalidad_id: submission.modalidadId,
    p_factura_tipo_identificacion: billing.tipoIdentificacion,
    p_factura_identificacion: billing.identificacion,
    p_factura_razon_social: billing.razonSocial,
    p_factura_direccion: billing.direccion,
    p_factura_email: billing.email,
    p_factura_telefono: billing.telefono,
    p_cuenta_bancaria_id: payment.cuentaBancariaId,
    p_comprobante_path: receiptPath,
    p_comentario: payment.comentario.trim() || null,
    p_acepta_promociones: payment.aceptaPromociones,
    p_version_terminos: TERMS_VERSION,
    p_idempotency_key: submission.idempotencyKey,
  });

  if (error) {
    const known = KNOWN_REASONS.find((reason) => error.message?.includes(reason));
    throw new EnrollmentRpcError(known ?? "UNKNOWN", error);
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.orden_id) throw new EnrollmentRpcError("UNKNOWN", new Error("Empty RPC result"));
  return { orderId: row.orden_id, code: row.codigo, amount: Number(row.monto) };
}
