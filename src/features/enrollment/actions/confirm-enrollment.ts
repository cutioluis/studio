"use server";

import { safeError } from "@/lib/log-error";
import { MissingSupabaseConfigError } from "@/lib/supabase/server";
import { MAX_RECEIPT_BYTES, flattenIssues, resolveBilling, submissionSchema } from "../domain/schemas";
import type { EnrollmentResult } from "../domain/types";
import { detectFileType } from "../domain/validators";
import {
  EnrollmentRpcError,
  assertEnrollable,
  createEnrollment,
  removeReceipt,
  uploadReceipt,
} from "../infrastructure/enrollment-repository";

const GENERIC_ERROR = "No pudimos registrar tu inscripción. Inténtalo de nuevo o escríbenos por WhatsApp.";

const fail = (message: string, fieldErrors?: Record<string, string>): EnrollmentResult => ({
  ok: false,
  message,
  fieldErrors,
});

function messageFor(error: unknown): string {
  if (error instanceof EnrollmentRpcError) {
    switch (error.reason) {
      case "ORDEN_ABIERTA":
        return "No pudimos completar tu inscripción con estos datos. Escríbenos por WhatsApp y te ayudamos.";
      case "MODALIDAD_NO_DISPONIBLE":
        return "La modalidad elegida ya no está disponible. Recarga la página y elige otra.";
      case "CUENTA_NO_DISPONIBLE":
        return "La cuenta bancaria elegida ya no está disponible. Recarga la página e inténtalo de nuevo.";
    }
  }
  return GENERIC_ERROR;
}

export async function confirmEnrollment(formData: FormData): Promise<EnrollmentResult> {
  const rawPayload = formData.get("payload");
  const receipt = formData.get("receipt");
  if (typeof rawPayload !== "string") return fail(GENERIC_ERROR);

  let json: unknown;
  try {
    json = JSON.parse(rawPayload);
  } catch {
    return fail(GENERIC_ERROR);
  }

  const parsed = submissionSchema.safeParse(json);
  if (!parsed.success) {
    return fail("Revisa los datos marcados e inténtalo de nuevo.", flattenIssues(parsed.error));
  }

  if (!(receipt instanceof File) || receipt.size === 0) return fail("Adjunta el comprobante de transferencia.");
  if (receipt.size > MAX_RECEIPT_BYTES) return fail("El comprobante supera los 2 MB. Elige un archivo más liviano.");

  const bytes = new Uint8Array(await receipt.arrayBuffer());
  const fileType = detectFileType(bytes);
  if (!fileType) return fail("El comprobante debe ser una imagen JPG, PNG, WebP o un PDF.");

  let receiptPath: string | null = null;
  try {
    await assertEnrollable(parsed.data.modalidadId, parsed.data.payment.cuentaBancariaId);
    receiptPath = await uploadReceipt(bytes, fileType);
    const result = await createEnrollment({
      submission: parsed.data,
      billing: resolveBilling(parsed.data.contact, parsed.data.billing),
      receiptPath,
    });
    return { ok: true, code: result.code, amount: result.amount };
  } catch (error) {
    if (error instanceof MissingSupabaseConfigError) console.error("[enrollment]", error.message);
    else if (error instanceof EnrollmentRpcError) {
      console.error("[enrollment] confirm failed", { reason: error.reason, cause: safeError(error.cause) });
    } else console.error("[enrollment] confirm failed", safeError(error));
    if (receiptPath) await removeReceipt(receiptPath);
    return fail(messageFor(error));
  }
}
