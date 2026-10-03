import { describe, expect, it } from "vitest";
import { billingSchema, contactSchema } from "./schemas";

const contact = {
  nombres: "Ana",
  apellidos: "Pérez",
  tipoDocumento: "cedula" as const,
  numeroDocumento: "1710034065",
  celular: "0991234567",
  email: "ana@correo.com",
};

const billing = {
  usarDatosContacto: false,
  tipoIdentificacion: "cedula" as const,
  identificacion: "1710034065",
  razonSocial: "Ana Pérez",
  email: "ana@correo.com",
  telefono: "",
  direccion: "Quito, Av. Amazonas",
};

const longEmail = `${"a".repeat(250)}@b.co`;

describe("contactSchema limits", () => {
  it("accepts valid data", () => expect(contactSchema.safeParse(contact).success).toBe(true));
  it("rejects an email over 254 characters", () =>
    expect(contactSchema.safeParse({ ...contact, email: longEmail }).success).toBe(false));
  it("rejects a mobile over 30 characters", () =>
    expect(contactSchema.safeParse({ ...contact, celular: `${"9".repeat(31)}` }).success).toBe(false));
  it("rejects names over 80 characters", () => {
    expect(contactSchema.safeParse({ ...contact, nombres: "a".repeat(81) }).success).toBe(false);
    expect(contactSchema.safeParse({ ...contact, apellidos: "a".repeat(81) }).success).toBe(false);
  });
});

describe("billingSchema limits", () => {
  it("accepts valid data", () => expect(billingSchema.safeParse(billing).success).toBe(true));
  it("rejects an email over 254 characters", () =>
    expect(billingSchema.safeParse({ ...billing, email: longEmail }).success).toBe(false));
  it("rejects a phone over 30 characters", () =>
    expect(billingSchema.safeParse({ ...billing, telefono: "1".repeat(31) }).success).toBe(false));
});
