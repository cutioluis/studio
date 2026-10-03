import type { BillingData, ContactData } from "../domain/schemas";

export type PaymentState = {
  cuentaBancariaId: string;
  comentario: string;
  aceptaTerminos: boolean;
  aceptaPromociones: boolean;
};

export type FormErrors = Record<string, string>;

export const emptyContact: ContactData = {
  nombres: "",
  apellidos: "",
  tipoDocumento: "cedula",
  numeroDocumento: "",
  celular: "",
  email: "",
};

export const emptyBilling: BillingData = {
  usarDatosContacto: true,
  tipoIdentificacion: "cedula",
  identificacion: "",
  razonSocial: "",
  email: "",
  telefono: "",
  direccion: "",
};

export type StepProps<T> = {
  value: T;
  errors: FormErrors;
  onChange: (patch: Partial<T>) => void;
  onBlur: (field: keyof T & string) => void;
};
