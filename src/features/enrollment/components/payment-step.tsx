import { useState, type ReactNode } from "react";
import { MAX_COMMENT_LENGTH } from "../domain/schemas";
import { formatMoney } from "../domain/format";
import type { BankAccount } from "../domain/types";
import { Checkbox, ErrorText, TextArea, fieldId } from "./atoms";
import type { PaymentState, StepProps } from "./form-state";
import { CopyButton, OptionCard, ReceiptDropzone } from "./molecules";

const id = (field: string) => fieldId("payment", field);

type Props = StepProps<PaymentState> & {
  accounts: BankAccount[];
  amount: number;
  receipt: File | null;
  receiptError?: string;
  onReceiptChange: (file: File | null) => void;
  onReceiptError: (message: string) => void;
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-sm font-medium text-foreground">{children}</dd>
    </div>
  );
}

function AccountDetails({ account }: { account: BankAccount }) {
  return (
    <dl className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-x-6 gap-y-4 rounded-xl border border-primary-deep/30 bg-card p-4">
      <Row label="Banco">{account.bankName}</Row>
      <Row label="Tipo de cuenta">{account.accountType === "ahorros" ? "Ahorros" : "Corriente"}</Row>
      <Row label="Número de cuenta">
        <span className="flex items-center gap-1">
          <span className="text-base tabular-nums tracking-wide">{account.accountNumber}</span>
          <CopyButton text={account.accountNumber} label={`Copiar número de cuenta de ${account.bankName}`} />
        </span>
      </Row>
      <Row label="Titular">{account.holder}</Row>
      <Row label={account.holderIdType === "ruc" ? "RUC" : "Cédula"}>
        <span className="tabular-nums">{account.holderId}</span>
      </Row>
    </dl>
  );
}

function Stage({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <li className="flex min-w-0 flex-col gap-3">
      <h3 className="flex items-center gap-3 text-base font-semibold text-white">
        <span
          aria-hidden
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums text-primary"
        >
          {number}
        </span>
        {title}
      </h3>
      <div className="flex min-w-0 flex-col gap-3">{children}</div>
    </li>
  );
}

export function PaymentStep({
  value,
  errors,
  onChange,
  onBlur,
  accounts,
  amount,
  receipt,
  receiptError,
  onReceiptChange,
  onReceiptError,
}: Props) {
  const [showComment, setShowComment] = useState(value.comentario.length > 0);
  const selected = accounts.find((account) => account.id === value.cuentaBancariaId) ?? accounts[0];

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        Método de pago: <span className="font-medium text-foreground">Transferencia bancaria</span>
      </p>

      <ol className="flex flex-col gap-8">
        <Stage number={1} title={`Transfiere ${formatMoney(amount)}`}>
          {accounts.length > 1 ? (
            <fieldset className="flex flex-col gap-2">
              <legend className="sr-only">Cuenta para la transferencia</legend>
              {accounts.map((account) => (
                <OptionCard
                  key={account.id}
                  name="bank-account"
                  value={account.id}
                  checked={account.id === selected?.id}
                  onSelect={(cuentaBancariaId) => onChange({ cuentaBancariaId })}
                >
                  <span className="pr-8 text-sm font-medium text-white">
                    {account.bankName} · {account.accountType === "ahorros" ? "Ahorros" : "Corriente"}
                  </span>
                </OptionCard>
              ))}
              <ErrorText id={id("cuentaBancariaId-error")}>{errors.cuentaBancariaId}</ErrorText>
            </fieldset>
          ) : null}
          {selected ? <AccountDetails account={selected} /> : null}
          <p className="text-sm text-muted-foreground">Usa tu nombre completo como referencia.</p>
        </Stage>

        <Stage number={2} title="Sube tu comprobante">
          <ReceiptDropzone
            id={id("receipt")}
            file={receipt}
            error={receiptError}
            onChange={onReceiptChange}
            onError={onReceiptError}
          />
          <ErrorText id={`${id("receipt")}-error`}>{receiptError}</ErrorText>
        </Stage>

        <Stage number={3} title="Confirma">
          {showComment ? (
            <div className="flex flex-col gap-1.5">
              <label htmlFor={id("comentario")} className="text-sm font-medium text-foreground">
                Comentario <span className="font-normal text-muted-foreground">(opcional)</span>
              </label>
              <TextArea
                id={id("comentario")}
                value={value.comentario}
                error={errors.comentario}
                maxLength={MAX_COMMENT_LENGTH}
                placeholder="¿Algo que debamos saber sobre tu inscripción?"
                onChange={(event) => onChange({ comentario: event.target.value })}
                onBlur={() => onBlur("comentario")}
              />
              <p aria-hidden className="text-right text-xs tabular-nums text-muted-foreground">
                {value.comentario.length}/{MAX_COMMENT_LENGTH}
              </p>
              <ErrorText id={`${id("comentario")}-error`}>{errors.comentario}</ErrorText>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowComment(true)}
              className="self-start rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Agregar un comentario (opcional)
            </button>
          )}
          <Checkbox
            id={id("aceptaTerminos")}
            checked={value.aceptaTerminos}
            error={errors.aceptaTerminos}
            onChange={(event) => onChange({ aceptaTerminos: event.target.checked })}
            label="Acepto los términos y condiciones y el tratamiento de mis datos personales"
          />
          <Checkbox
            id={id("aceptaPromociones")}
            checked={value.aceptaPromociones}
            onChange={(event) => onChange({ aceptaPromociones: event.target.checked })}
            label="Quiero recibir promociones por WhatsApp"
          />
        </Stage>
      </ol>
    </div>
  );
}
