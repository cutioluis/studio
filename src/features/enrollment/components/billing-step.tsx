import { CONSUMER_FINAL_ID, CONSUMER_FINAL_NAME, type BillingData, type ContactData } from "../domain/schemas";
import { Checkbox, Field, TextInput, fieldId } from "./atoms";
import type { StepProps } from "./form-state";
import { cn } from "@/lib/utils";

const id = (field: keyof BillingData) => fieldId("billing", field);

const ID_TYPES: { value: BillingData["tipoIdentificacion"]; label: string }[] = [
  { value: "cedula", label: "Cédula" },
  { value: "ruc", label: "RUC" },
  { value: "pasaporte", label: "Pasaporte" },
  { value: "consumidor_final", label: "Consumidor final" },
];

type Props = StepProps<BillingData> & { contact: ContactData };

export function BillingStep({ value, errors, onChange, onBlur, contact }: Props) {
  const isConsumerFinal = value.tipoIdentificacion === "consumidor_final";

  const selectIdType = (tipoIdentificacion: BillingData["tipoIdentificacion"]) => {
    onChange(
      tipoIdentificacion === "consumidor_final"
        ? { tipoIdentificacion, identificacion: CONSUMER_FINAL_ID, razonSocial: CONSUMER_FINAL_NAME }
        : {
            tipoIdentificacion,
            identificacion: "",
            razonSocial: isConsumerFinal ? "" : value.razonSocial,
          },
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <Checkbox
        id={id("usarDatosContacto")}
        checked={value.usarDatosContacto}
        onChange={(event) => onChange({ usarDatosContacto: event.target.checked })}
        label="Usar mis datos de contacto"
      />

      {value.usarDatosContacto ? (
        <p className="rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-muted-foreground">
          Factura a{" "}
          <span className="font-medium text-foreground">
            {contact.nombres} {contact.apellidos}
          </span>{" "}
          · {contact.tipoDocumento === "cedula" ? "cédula" : "pasaporte"}{" "}
          <span className="tabular-nums text-foreground">{contact.numeroDocumento}</span>
        </p>
      ) : (
        <>
          <fieldset className="flex min-w-0 flex-col gap-1.5">
            <legend className="mb-1.5 text-sm font-medium text-foreground">
              Tipo de identificación<span aria-hidden className="text-primary-deep"> *</span>
            </legend>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-1 rounded-lg border border-border bg-background/60 p-1">
              {ID_TYPES.map((option) => (
                <label key={option.value} className="relative min-w-0 cursor-pointer">
                  <input
                    type="radio"
                    name="tipoIdentificacion"
                    value={option.value}
                    checked={value.tipoIdentificacion === option.value}
                    onChange={() => selectIdType(option.value)}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors",
                      "hover:text-foreground peer-checked:bg-primary peer-checked:text-primary-foreground",
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                    )}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap gap-x-4 gap-y-5">
            <Field id={id("identificacion")} label="Identificación" required error={errors.identificacion} className="basis-56 grow">
              <TextInput
                id={id("identificacion")}
                value={value.identificacion}
                error={errors.identificacion}
                readOnly={isConsumerFinal}
                maxLength={20}
                autoComplete="off"
                className="tabular-nums"
                onChange={(event) => onChange({ identificacion: event.target.value.replace(/\s/g, "") })}
                onBlur={() => onBlur("identificacion")}
              />
            </Field>
            <Field id={id("razonSocial")} label="Nombre o razón social" required error={errors.razonSocial} className="basis-56 grow">
              <TextInput
                id={id("razonSocial")}
                value={value.razonSocial}
                error={errors.razonSocial}
                readOnly={isConsumerFinal}
                autoComplete="organization"
                onChange={(event) => onChange({ razonSocial: event.target.value })}
                onBlur={() => onBlur("razonSocial")}
              />
            </Field>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-5">
            <Field id={id("email")} label="Correo electrónico" required error={errors.email} className="basis-56 grow">
              <TextInput
                id={id("email")}
                type="email"
                value={value.email}
                error={errors.email}
                autoComplete="off"
                onChange={(event) => onChange({ email: event.target.value })}
                onBlur={() => onBlur("email")}
              />
            </Field>
            <Field id={id("telefono")} label="Teléfono" error={errors.telefono} className="basis-56 grow">
              <TextInput
                id={id("telefono")}
                type="tel"
                inputMode="tel"
                value={value.telefono}
                error={errors.telefono}
                autoComplete="off"
                onChange={(event) => onChange({ telefono: event.target.value })}
                onBlur={() => onBlur("telefono")}
              />
            </Field>
          </div>
        </>
      )}

      <Field id={id("direccion")} label="Dirección" required error={errors.direccion}>
        <TextInput
          id={id("direccion")}
          value={value.direccion}
          error={errors.direccion}
          placeholder="Quito, Av. Amazonas y Naciones Unidas"
          autoComplete="street-address"
          maxLength={300}
          onChange={(event) => onChange({ direccion: event.target.value })}
          onBlur={() => onBlur("direccion")}
        />
      </Field>
    </div>
  );
}
