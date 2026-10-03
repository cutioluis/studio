import { z } from "zod";
import {
  isValidCedula,
  isValidEmail,
  isValidPassport,
  isValidRuc,
  normalizeEcuadorMobile,
} from "./validators";

export const TERMS_VERSION = "2026-10";
export const CONSUMER_FINAL_ID = "9999999999999";
export const CONSUMER_FINAL_NAME = "CONSUMIDOR FINAL";
export const MAX_RECEIPT_BYTES = 2 * 1024 * 1024;
export const MAX_COMMENT_LENGTH = 500;

const name = (label: string) =>
  z.string().trim().min(2, `Ingresa tus ${label}`).max(80, `Tus ${label} son demasiado largos`);

const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const EMAIL_TOO_LONG = "El correo es demasiado largo (máximo 254 caracteres)";
const PHONE_TOO_LONG = "El número es demasiado largo (máximo 30 caracteres)";

const email = z
  .string()
  .trim()
  .min(1, "Ingresa tu correo electrónico")
  .max(MAX_EMAIL_LENGTH, EMAIL_TOO_LONG)
  .refine(isValidEmail, "Ingresa un correo válido, por ejemplo nombre@correo.com");

const address = z
  .string()
  .trim()
  .min(5, "Ingresa una dirección de al menos 5 caracteres")
  .max(300, "La dirección es demasiado larga (máximo 300 caracteres)");

export const contactSchema = z
  .object({
    nombres: name("nombres"),
    apellidos: name("apellidos"),
    tipoDocumento: z.enum(["cedula", "pasaporte"]),
    numeroDocumento: z.string().trim(),
    celular: z.string().trim().max(MAX_PHONE_LENGTH, PHONE_TOO_LONG),
    email,
  })
  .superRefine((value, ctx) => {
    if (value.tipoDocumento === "cedula" && !isValidCedula(value.numeroDocumento)) {
      ctx.addIssue({ code: "custom", path: ["numeroDocumento"], message: "Ingresa una cédula válida de 10 dígitos" });
    }
    if (value.tipoDocumento === "pasaporte" && !isValidPassport(value.numeroDocumento)) {
      ctx.addIssue({
        code: "custom",
        path: ["numeroDocumento"],
        message: "Ingresa un pasaporte de 5 a 20 letras o números, sin espacios",
      });
    }
    if (!normalizeEcuadorMobile(value.celular)) {
      ctx.addIssue({ code: "custom", path: ["celular"], message: "Ingresa un celular válido, por ejemplo 99 123 4567" });
    }
  });

export const billingSchema = z
  .object({
    usarDatosContacto: z.boolean(),
    tipoIdentificacion: z.enum(["cedula", "ruc", "pasaporte", "consumidor_final"]),
    identificacion: z.string().trim(),
    razonSocial: z.string().trim(),
    email: z.string().trim().max(MAX_EMAIL_LENGTH, EMAIL_TOO_LONG),
    telefono: z.string().trim().max(MAX_PHONE_LENGTH, PHONE_TOO_LONG),
    direccion: address,
  })
  .superRefine((value, ctx) => {
    if (value.usarDatosContacto) return;
    const issue = (path: string, message: string) => ctx.addIssue({ code: "custom", path: [path], message });

    if (value.tipoIdentificacion === "cedula" && !isValidCedula(value.identificacion)) {
      issue("identificacion", "Ingresa una cédula válida de 10 dígitos");
    } else if (value.tipoIdentificacion === "ruc" && !isValidRuc(value.identificacion)) {
      issue("identificacion", "Ingresa un RUC válido de 13 dígitos que termine en 001");
    } else if (value.tipoIdentificacion === "pasaporte" && !isValidPassport(value.identificacion)) {
      issue("identificacion", "Ingresa un pasaporte de 5 a 20 letras o números, sin espacios");
    } else if (value.tipoIdentificacion === "consumidor_final" && value.identificacion !== CONSUMER_FINAL_ID) {
      issue("identificacion", "La identificación de consumidor final es 9999999999999");
    }

    if (value.razonSocial.length < 2) issue("razonSocial", "Ingresa el nombre o razón social");
    if (value.razonSocial.length > 200) issue("razonSocial", "El nombre o razón social es demasiado largo");
    if (!isValidEmail(value.email)) issue("email", "Ingresa un correo válido para la factura");
    if (value.telefono && !/^\+?\d{7,15}$/.test(value.telefono.replace(/[\s\-()]/g, ""))) {
      issue("telefono", "Ingresa un teléfono de 7 a 15 dígitos o déjalo vacío");
    }
  });

export const paymentSchema = z.object({
  cuentaBancariaId: z.string().uuid("Elige una cuenta bancaria"),
  comentario: z.string().max(MAX_COMMENT_LENGTH, `El comentario admite hasta ${MAX_COMMENT_LENGTH} caracteres`),
  aceptaTerminos: z.literal(true, { message: "Debes aceptar los términos y condiciones para continuar" }),
  aceptaPromociones: z.boolean(),
});

export const submissionSchema = z.object({
  modalidadId: z.string().uuid(),
  idempotencyKey: z.string().uuid(),
  contact: contactSchema,
  billing: billingSchema,
  payment: paymentSchema,
});

export type ContactData = z.infer<typeof contactSchema>;
export type BillingData = z.infer<typeof billingSchema>;
export type PaymentData = z.infer<typeof paymentSchema>;
export type Submission = z.infer<typeof submissionSchema>;

export type ResolvedBilling = {
  tipoIdentificacion: "cedula" | "ruc" | "pasaporte" | "consumidor_final";
  identificacion: string;
  razonSocial: string;
  email: string;
  telefono: string | null;
  direccion: string;
};

/** Final billing data: either derived from the contact data or taken from the billing form. */
export function resolveBilling(contact: ContactData, billing: BillingData): ResolvedBilling {
  if (billing.usarDatosContacto) {
    return {
      tipoIdentificacion: contact.tipoDocumento,
      identificacion: contact.numeroDocumento,
      razonSocial: `${contact.nombres} ${contact.apellidos}`.trim(),
      email: contact.email,
      telefono: normalizeEcuadorMobile(contact.celular),
      direccion: billing.direccion,
    };
  }
  return {
    tipoIdentificacion: billing.tipoIdentificacion,
    identificacion: billing.identificacion,
    razonSocial: billing.razonSocial,
    email: billing.email,
    telefono: billing.telefono || null,
    direccion: billing.direccion,
  };
}

/** Flattens a zod error into `{ "contact.email": "message" }` keeping the first message per field. */
export function flattenIssues(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!(key in result)) result[key] = issue.message;
  }
  return result;
}
