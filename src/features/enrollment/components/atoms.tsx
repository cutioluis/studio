import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const fieldId = (group: string, field: string) => `ec-${group}-${field}`;

export const inputClass = (hasError?: boolean) =>
  cn(
    "w-full min-w-0 rounded-lg border bg-background/60 px-3 text-sm text-foreground transition-colors",
    "placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "read-only:cursor-not-allowed read-only:bg-muted/60 read-only:text-muted-foreground",
    hasError ? "border-destructive" : "border-border hover:border-primary-deep/40",
  );

export function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm text-destructive">
      <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
      <span className="min-w-0">{children}</span>
    </p>
  );
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export const describedBy = (id: string, error?: string, hint?: string) =>
  [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;

/** Visible label + control + hint + error. The control wires aria itself through `describedBy`. */
export function Field({ id, label, required, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? <span aria-hidden className="text-primary-deep"> *</span> : <span className="font-normal text-muted-foreground"> (opcional)</span>}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string; hint?: string };

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { id, error, hint, className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hint)}
      className={cn("h-11", inputClass(Boolean(error)), className)}
      {...props}
    />
  );
});

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string; error?: string };

export function TextArea({ id, error, className, ...props }: TextAreaProps) {
  return (
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error)}
      className={cn("min-h-24 resize-y py-2.5", inputClass(Boolean(error)), className)}
      {...props}
    />
  );
}

type SegmentedProps<T extends string> = {
  name: string;
  legend: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
};

/** Native radios styled as a segmented control: keyboard and screen reader behavior come for free. */
export function SegmentedControl<T extends string>({ name, legend, value, options, onChange }: SegmentedProps<T>) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-1.5">
      <legend className="mb-1.5 text-sm font-medium text-foreground">
        {legend}
        <span aria-hidden className="text-primary-deep"> *</span>
      </legend>
      <div className="flex gap-1 rounded-lg border border-border bg-background/60 p-1">
        {options.map((option) => (
          <label key={option.value} className="relative min-w-0 flex-1 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
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
  );
}

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  id: string;
  label: ReactNode;
  error?: string;
};

export function Checkbox({ id, label, error, className, ...props }: CheckboxProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className={cn("flex cursor-pointer items-start gap-3 text-sm text-foreground", className)}>
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-border accent-[hsl(var(--primary-deep))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...props}
        />
        <span className="min-w-0">{label}</span>
      </label>
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}
