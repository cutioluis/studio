"use client";

import { useEffect, useId, useRef, useState, type DragEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { Check, Copy, FileText, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAX_RECEIPT_BYTES } from "../domain/schemas";
import { ImageDecodeError, compressImage } from "../infrastructure/compress-image";
import { describedBy, inputClass } from "./atoms";

/* ------------------------------ Phone input ------------------------------ */

function EcuadorFlag() {
  return (
    <svg aria-hidden viewBox="0 0 24 16" className="h-4 w-6 shrink-0 overflow-hidden rounded-[3px]">
      <rect width="24" height="8" fill="#FFD100" />
      <rect y="8" width="24" height="4" fill="#0072CE" />
      <rect y="12" width="24" height="4" fill="#EF3340" />
    </svg>
  );
}

type PhoneInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> & { id: string; error?: string };

export function PhoneInput({ id, error, className, ...props }: PhoneInputProps) {
  return (
    <div className="flex min-w-0">
      <span
        className={cn(
          "flex h-11 shrink-0 items-center gap-2 rounded-l-lg border border-r-0 bg-muted/60 px-3 text-sm tabular-nums text-muted-foreground",
          error ? "border-destructive" : "border-border",
        )}
      >
        <EcuadorFlag />
        +593
      </span>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="99 123 4567"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error)}
        className={cn("h-11 rounded-l-none", inputClass(Boolean(error)), className)}
        {...props}
      />
    </div>
  );
}

/* ------------------------------ Copy button ------------------------------ */

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  area.remove();
  return copied;
}

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = async () => {
    if (!(await copyText(text))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={copied ? "Copiado" : label}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {copied ? <Check aria-hidden className="h-4 w-4 text-primary" /> : <Copy aria-hidden className="h-4 w-4" />}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copiado" : ""}
      </span>
    </button>
  );
}

/* ----------------------------- Radio options ------------------------------ */

/** Visual radio ring: empty before selection, filled with a dot once selected. */
function RadioDot({ checked, className }: { checked: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        checked ? "border-primary bg-primary" : "border-muted-foreground/60",
        className,
      )}
    >
      <span className={cn("h-1/3 w-1/3 rounded-full bg-primary-foreground", !checked && "opacity-0")} />
    </span>
  );
}

type OptionCardProps = {
  name: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  children: ReactNode;
  /** Content attached below the option, inside the same card (outside the radio label). */
  footer?: ReactNode;
};

/** Radio card: native input (arrow keys, grouping) inside a label, optionally with an attached expanded area. */
export function OptionCard({ name, value, checked, onSelect, children, footer }: OptionCardProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col rounded-xl border bg-card transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
        checked
          ? "border-primary-deep ring-1 ring-primary-deep/60"
          : "border-border hover:border-primary-deep/50 hover:bg-white/[0.03]",
      )}
    >
      <label className="flex cursor-pointer items-start gap-4 p-4">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onSelect(value)}
          className="sr-only"
        />
        <div className="min-w-0 grow">{children}</div>
        <RadioDot checked={checked} className="h-5 w-5" />
      </label>
      {footer ? <div className="border-t border-border px-4 py-4">{footer}</div> : null}
    </div>
  );
}

type ChoiceRowProps = {
  name: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  children: ReactNode;
  trailing?: ReactNode;
};

/** Compact radio row (dot on the left) for choices nested inside a card. */
export function ChoiceRow({ name, value, checked, onSelect, children, trailing }: ChoiceRowProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 rounded-lg px-3 py-2.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
        checked ? "bg-primary/[0.06] text-white" : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        className="sr-only"
      />
      <RadioDot checked={checked} className="h-4 w-4" />
      <div className="flex min-w-0 grow basis-40 flex-col gap-0.5">{children}</div>
      {trailing}
    </label>
  );
}

/* ----------------------------- Receipt dropzone --------------------------- */

const ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";
const ACCEPTED_TYPES = ACCEPT.split(",");

const formatBytes = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

type ReceiptDropzoneProps = {
  id: string;
  file: File | null;
  error?: string;
  onChange: (file: File | null) => void;
  onError: (message: string) => void;
};

export function ReceiptDropzone({ id, file, error, onChange, onError }: ReceiptDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const hintId = useId();

  useEffect(() => {
    if (!file || file.type === "application/pdf") {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFile = async (selected: File | undefined) => {
    if (!selected) return;
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      onError("Adjunta una imagen JPG, PNG o WebP, o un PDF.");
      return;
    }
    if (selected.type === "application/pdf") {
      if (selected.size > MAX_RECEIPT_BYTES) {
        onError("El PDF supera los 2 MB. Adjunta una captura o un archivo más liviano.");
        return;
      }
      onChange(selected);
      return;
    }

    setProcessing(true);
    try {
      const compressed = await compressImage(selected);
      if (compressed.size > MAX_RECEIPT_BYTES) {
        onError("La imagen sigue pesando más de 2 MB. Prueba con una captura de pantalla.");
        return;
      }
      onChange(compressed);
    } catch (caught) {
      onError(
        caught instanceof ImageDecodeError
          ? "No pudimos leer la imagen. Prueba con otro archivo JPG, PNG o WebP."
          : "No pudimos procesar la imagen. Inténtalo de nuevo.",
      );
    } finally {
      setProcessing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    void handleFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span id={`${id}-label`} className="text-sm font-medium text-foreground">
        Comprobante de transferencia
        <span aria-hidden className="text-primary-deep"> *</span>
      </span>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={(event) => void handleFile(event.target.files?.[0])}
      />

      {file ? (
        <div className="flex min-w-0 flex-wrap items-center gap-4 rounded-xl border border-border bg-background/60 p-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- blob: preview, next/image cannot optimize it
              <img src={previewUrl} alt="Vista previa del comprobante" className="h-full w-full object-cover" />
            ) : (
              <FileText aria-hidden className="h-7 w-7 text-primary-deep" />
            )}
          </div>
          <div className="min-w-0 flex-1 basis-40">
            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs tabular-nums text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              id={id}
              onClick={() => inputRef.current?.click()}
              className="h-9 rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:border-primary-deep/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Cambiar
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X aria-hidden className="h-4 w-4" />
              Quitar
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "rounded-xl border border-dashed transition-colors",
            dragging ? "border-primary bg-primary/[0.06]" : error ? "border-destructive" : "border-border",
          )}
        >
          <button
            type="button"
            id={id}
            disabled={processing}
            onClick={() => inputRef.current?.click()}
            aria-describedby={describedBy(id, error) ? `${describedBy(id, error)} ${hintId}` : hintId}
            aria-invalid={error ? true : undefined}
            className="flex w-full flex-col items-center gap-2 rounded-xl px-4 py-8 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          >
            <ImageIcon aria-hidden className="h-7 w-7 text-primary-deep" />
            <span className="text-sm font-medium text-foreground">
              {processing ? "Procesando imagen…" : "Arrastra tu comprobante o haz clic para elegirlo"}
            </span>
            <span id={hintId} className="text-xs text-muted-foreground">
              JPG, PNG, WebP o PDF · máximo 2 MB
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
