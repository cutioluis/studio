"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import type { ZodType } from "zod";
import { Button } from "@/components/ui/button";
import { confirmEnrollment } from "../actions/confirm-enrollment";
import {
  billingSchema,
  contactSchema,
  flattenIssues,
  paymentSchema,
  type BillingData,
  type ContactData,
} from "../domain/schemas";
import type { BankAccount, Career, EnrollmentResult } from "../domain/types";
import { ErrorText, fieldId } from "./atoms";
import { BillingStep } from "./billing-step";
import { CareerPicker } from "./career-picker";
import { ContactStep } from "./contact-step";
import { emptyBilling, emptyContact, type FormErrors, type PaymentState } from "./form-state";
import { PaymentStep } from "./payment-step";
import { SelectionRecap } from "./selection-recap";
import { Stepper } from "./stepper";
import { SuccessPanel } from "./success-panel";

type Group = "contact" | "billing" | "payment";

// Step 0 (career) has no form group: it is valid once a modality is selected.
const STEP_GROUPS: (Group | null)[] = [null, "contact", "billing", "payment"];
const LAST_STEP = STEP_GROUPS.length - 1;

const STEP_COPY = [
  { title: "¿Qué quieres estudiar?", helper: "Elige una carrera y luego tu horario." },
  { title: "¿Quién se inscribe?", helper: "Usaremos estos datos para contactarte por WhatsApp." },
  { title: "¿A nombre de quién emitimos la factura?", helper: null },
  { title: "Paga tu inscripción", helper: "Haz una transferencia y súbenos el comprobante." },
] as const;

const FOCUS_ORDER: Record<Group, string[]> = {
  contact: ["nombres", "apellidos", "numeroDocumento", "celular", "email"],
  billing: ["identificacion", "razonSocial", "email", "telefono", "direccion"],
  payment: ["cuentaBancariaId", "receipt", "comentario", "aceptaTerminos"],
};
const SCHEMAS: Record<Group, ZodType> = { contact: contactSchema, billing: billingSchema, payment: paymentSchema };

// Sticky navbar height plus breathing room; matches the wizard's scroll-mt-28.
const NAVBAR_CLEARANCE = 112;

const NO_SELECTION_MESSAGE = "Elige una carrera y un horario para continuar.";

type Props = { careers: Career[]; accounts: BankAccount[]; initialModalityId?: string; initialCareerSlug?: string };

const validate = (group: Group, data: unknown): FormErrors => {
  const result = SCHEMAS[group].safeParse(data);
  return result.success ? {} : flattenIssues(result.error);
};

const withPrefix = (group: Group, errors: FormErrors): FormErrors =>
  Object.fromEntries(Object.entries(errors).map(([key, message]) => [`${group}.${key}`, message]));

const scopedErrors = (all: FormErrors, group: Group): FormErrors =>
  Object.fromEntries(
    Object.entries(all)
      .filter(([key]) => key.startsWith(`${group}.`))
      .map(([key, message]) => [key.slice(group.length + 1), message]),
  );

// A career slug with a single modality is a complete choice: the wizard starts at the contact step.
function findInitialSelection(careers: Career[], modalityId?: string, careerSlug?: string) {
  const bySlug = careers.find((career) => career.slug === careerSlug);
  if (bySlug) {
    const single = bySlug.modalities.length === 1 ? bySlug.modalities[0].id : null;
    return { careerId: bySlug.id, modalityId: single, step: single ? 1 : 0 };
  }
  const byModality = careers.find((career) => career.modalities.some((modality) => modality.id === modalityId));
  return { careerId: byModality?.id ?? null, modalityId: byModality ? (modalityId ?? null) : null, step: 0 };
}

export function EnrollmentCheckout({ careers, accounts, initialModalityId, initialCareerSlug }: Props) {
  const initial = useMemo(
    () => findInitialSelection(careers, initialModalityId, initialCareerSlug),
    [careers, initialModalityId, initialCareerSlug],
  );
  const [careerId, setCareerId] = useState<string | null>(initial.careerId);
  const [modalityId, setModalityId] = useState<string | null>(initial.modalityId);
  const [step, setStep] = useState(initial.step);
  const [contact, setContact] = useState<ContactData>(emptyContact);
  const [billing, setBilling] = useState<BillingData>(emptyBilling);
  const [payment, setPayment] = useState<PaymentState>({
    cuentaBancariaId: accounts[0]?.id ?? "",
    comentario: "",
    aceptaTerminos: false,
    aceptaPromociones: false,
  });
  const [receipt, setReceipt] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Extract<EnrollmentResult, { ok: true }> | null>(null);

  // One idempotency key per checkout session: a retried request can never create a second order.
  const idempotencyKey = useRef<string>();
  const wizardRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  const career = careers.find((item) => item.id === careerId);
  const modality = career?.modalities.find((item) => item.id === modalityId);

  // On step change: keep the stepper visible below the sticky navbar (only scroll when it is not) and
  // move focus to the step heading for screen readers.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const wizard = wizardRef.current;
    if (wizard && wizard.getBoundingClientRect().top < NAVBAR_CLEARANCE) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      wizard.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const focusFirstInvalid = useCallback((group: Group, groupErrors: FormErrors) => {
    const field = FOCUS_ORDER[group].find((name) => groupErrors[name]);
    if (field) requestAnimationFrame(() => document.getElementById(fieldId(group, field))?.focus());
  }, []);

  const selectCareer = (id: string) => {
    const next = careers.find((item) => item.id === id);
    setCareerId(id);
    setModalityId(next && next.modalities.length === 1 ? next.modalities[0].id : null);
    setErrors((prev) => {
      const { career: _removed, ...rest } = prev;
      return rest;
    });
  };

  const selectModality = (id: string) => {
    setModalityId(id);
    setErrors((prev) => {
      const { career: _removed, ...rest } = prev;
      return rest;
    });
  };

  const dataFor = (group: Group): unknown => (group === "contact" ? contact : group === "billing" ? billing : payment);

  const patch = <T extends object>(group: Group, setter: (updater: (prev: T) => T) => void, change: Partial<T>) => {
    setter((prev) => ({ ...prev, ...change }));
    // Re-check fields that already show an error so the message disappears as soon as it is fixed.
    const touched = Object.keys(change).filter((key) => errors[`${group}.${key}`]);
    if (touched.length === 0) return;
    const next = validate(group, { ...(dataFor(group) as object), ...change });
    setErrors((prev) => {
      const copy = { ...prev };
      for (const key of touched) {
        if (next[key]) copy[`${group}.${key}`] = next[key];
        else delete copy[`${group}.${key}`];
      }
      return copy;
    });
  };

  const blurField = (group: Group, field: string) => {
    const message = validate(group, dataFor(group))[field];
    setErrors((prev) => {
      const copy = { ...prev };
      if (message) copy[`${group}.${field}`] = message;
      else delete copy[`${group}.${field}`];
      return copy;
    });
  };

  const validateStep = (index: number): boolean => {
    const group = STEP_GROUPS[index];
    if (!group) {
      if (modalityId) return true;
      setErrors((prev) => ({ ...prev, career: NO_SELECTION_MESSAGE }));
      return false;
    }
    const groupErrors = validate(group, dataFor(group));
    if (group === "payment" && !receipt) groupErrors.receipt = "Adjunta el comprobante de tu transferencia";
    setErrors((prev) => {
      const kept = Object.fromEntries(Object.entries(prev).filter(([key]) => !key.startsWith(`${group}.`)));
      return { ...kept, ...withPrefix(group, groupErrors) };
    });
    focusFirstInvalid(group, groupErrors);
    return Object.keys(groupErrors).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) setStep((current) => current + 1);
  };

  const goTo = (index: number) => {
    setSubmitError(null);
    setStep(index);
  };

  const submit = async () => {
    if (pending || !modalityId || !validateStep(LAST_STEP)) return;
    const contactOk = Object.keys(validate("contact", contact)).length === 0;
    const billingOk = Object.keys(validate("billing", billing)).length === 0;
    if (!contactOk || !billingOk) {
      const target = contactOk ? 2 : 1;
      validateStep(target);
      setStep(target);
      return;
    }

    idempotencyKey.current ??= crypto.randomUUID();
    const formData = new FormData();
    formData.set(
      "payload",
      JSON.stringify({ modalidadId: modalityId, idempotencyKey: idempotencyKey.current, contact, billing, payment }),
    );
    if (receipt) formData.set("receipt", receipt);

    setPending(true);
    setSubmitError(null);
    try {
      const response = await confirmEnrollment(formData);
      if (response.ok) {
        setResult(response);
        window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        setSubmitError(response.message);
      }
    } catch {
      setSubmitError("No pudimos registrar tu inscripción. Inténtalo de nuevo o escríbenos por WhatsApp.");
    } finally {
      setPending(false);
    }
  };

  if (result) return <SuccessPanel code={result.code} amount={result.amount} />;

  const copy = STEP_COPY[step];
  const isLast = step === LAST_STEP;

  return (
    <section ref={wizardRef} aria-label="Inscripción" className="flex scroll-mt-28 flex-col gap-8">
      <Stepper current={step} onGo={goTo} />

      {step > 0 && career && modality ? (
        <SelectionRecap career={career} modality={modality} onChange={() => goTo(0)} />
      ) : null}

      <div className="flex flex-col gap-1.5">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-balance text-2xl font-bold tracking-tight text-white focus:outline-none"
        >
          {copy.title}
        </h2>
        {copy.helper ? <p className="max-w-[65ch] text-muted-foreground">{copy.helper}</p> : null}
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (isLast) void submit();
          else goNext();
        }}
        className="flex flex-col gap-8"
      >
        {step === 0 ? (
          <CareerPicker
            careers={careers}
            careerId={careerId}
            modalityId={modalityId}
            error={errors.career}
            onSelectCareer={selectCareer}
            onSelectModality={selectModality}
          />
        ) : null}
        {step === 1 ? (
          <ContactStep
            value={contact}
            errors={scopedErrors(errors, "contact")}
            onChange={(change) => patch("contact", setContact, change)}
            onBlur={(field) => blurField("contact", field)}
          />
        ) : null}
        {step === 2 ? (
          <BillingStep
            value={billing}
            contact={contact}
            errors={scopedErrors(errors, "billing")}
            onChange={(change) => patch("billing", setBilling, change)}
            onBlur={(field) => blurField("billing", field)}
          />
        ) : null}
        {step === 3 && career ? (
          <PaymentStep
            value={payment}
            errors={scopedErrors(errors, "payment")}
            accounts={accounts}
            amount={career.enrollmentFee}
            receipt={receipt}
            receiptError={errors["payment.receipt"]}
            onChange={(change) => patch("payment", setPayment, change)}
            onBlur={(field) => blurField("payment", field)}
            onReceiptChange={(file) => {
              setReceipt(file);
              setErrors((prev) => {
                const { "payment.receipt": _removed, ...rest } = prev;
                return rest;
              });
            }}
            onReceiptError={(message) => setErrors((prev) => ({ ...prev, "payment.receipt": message }))}
          />
        ) : null}

        {submitError ? (
          <div role="alert" className="rounded-lg border border-destructive/60 bg-destructive/10 px-4 py-3">
            <ErrorText id="submit-error">{submitError}</ErrorText>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          {step > 0 ? (
            <Button type="button" variant="outline" size="lg" disabled={pending} onClick={() => goTo(step - 1)}>
              <ArrowLeft aria-hidden />
              Atrás
            </Button>
          ) : null}
          <Button type="submit" size="lg" disabled={isLast && (pending || accounts.length === 0)} className="ml-auto">
            {isLast ? (
              <>
                {pending ? <Loader2 aria-hidden className="animate-spin" /> : null}
                {pending ? "Enviando…" : "Confirmar compra"}
              </>
            ) : (
              <>
                Continuar
                <ArrowRight aria-hidden />
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
