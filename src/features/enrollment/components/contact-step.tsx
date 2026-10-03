import type { ContactData } from "../domain/schemas";
import { Field, SegmentedControl, TextInput, fieldId } from "./atoms";
import type { StepProps } from "./form-state";
import { PhoneInput } from "./molecules";

const id = (field: keyof ContactData) => fieldId("contact", field);

export function ContactStep({ value, errors, onChange, onBlur }: StepProps<ContactData>) {
  const isCedula = value.tipoDocumento === "cedula";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-x-4 gap-y-5">
        <Field id={id("nombres")} label="Nombres" required error={errors.nombres} className="basis-56 grow">
          <TextInput
            id={id("nombres")}
            value={value.nombres}
            error={errors.nombres}
            autoComplete="given-name"
            onChange={(event) => onChange({ nombres: event.target.value })}
            onBlur={() => onBlur("nombres")}
          />
        </Field>
        <Field id={id("apellidos")} label="Apellidos" required error={errors.apellidos} className="basis-56 grow">
          <TextInput
            id={id("apellidos")}
            value={value.apellidos}
            error={errors.apellidos}
            autoComplete="family-name"
            onChange={(event) => onChange({ apellidos: event.target.value })}
            onBlur={() => onBlur("apellidos")}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-3">
        <SegmentedControl
          name="tipoDocumento"
          legend="Tipo de documento"
          value={value.tipoDocumento}
          options={[
            { value: "cedula", label: "Cédula" },
            { value: "pasaporte", label: "Pasaporte" },
          ]}
          onChange={(tipoDocumento) => onChange({ tipoDocumento, numeroDocumento: "" })}
        />
        <Field
          id={id("numeroDocumento")}
          label={isCedula ? "Número de cédula" : "Número de pasaporte"}
          required
          error={errors.numeroDocumento}
        >
          <TextInput
            id={id("numeroDocumento")}
            value={value.numeroDocumento}
            error={errors.numeroDocumento}
            inputMode={isCedula ? "numeric" : "text"}
            maxLength={isCedula ? 10 : 20}
            autoComplete="off"
            className="tabular-nums"
            onChange={(event) =>
              onChange({
                numeroDocumento: isCedula ? event.target.value.replace(/\D/g, "") : event.target.value.replace(/\s/g, ""),
              })
            }
            onBlur={() => onBlur("numeroDocumento")}
          />
        </Field>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-5">
        <Field id={id("celular")} label="Celular" required error={errors.celular} className="basis-56 grow">
          <PhoneInput
            id={id("celular")}
            value={value.celular}
            error={errors.celular}
            maxLength={16}
            onChange={(event) => onChange({ celular: event.target.value })}
            onBlur={() => onBlur("celular")}
          />
        </Field>
        <Field id={id("email")} label="Correo electrónico" required error={errors.email} className="basis-56 grow">
          <TextInput
            id={id("email")}
            type="email"
            value={value.email}
            error={errors.email}
            autoComplete="email"
            onChange={(event) => onChange({ email: event.target.value })}
            onBlur={() => onBlur("email")}
          />
        </Field>
      </div>
    </div>
  );
}
