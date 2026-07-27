import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const fieldBase =
  "w-full surface px-4 py-3 text-sm text-cream placeholder:text-cream/55 outline-none transition-colors focus:border-gold focus:bg-white/80 focus-visible:ring-2 focus-visible:ring-gold-light/50";

interface LabelWrapProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, required, hint, error, children }: LabelWrapProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label-track text-cream/80">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      {children}
      {hint && !error && <span className="text-xs text-cream/65">{hint}</span>}
      {error && (
        <span id={`${id}-error`} className="text-xs text-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

export function Input({ id, label, required, hint, error, ...rest }: InputProps) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldBase}
        {...rest}
      />
    </Field>
  );
}

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

export function Textarea({
  id,
  label,
  required,
  hint,
  error,
  rows = 4,
  ...rest
}: TextareaProps) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldBase} resize-y`}
        {...rest}
      />
    </Field>
  );
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export function Select({
  id,
  label,
  required,
  hint,
  error,
  children,
  ...rest
}: SelectProps) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldBase} appearance-none bg-[right_1rem_center] bg-no-repeat pr-10`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23D65C44' d='M6 8 0 0h12z'/%3E%3C/svg%3E\")",
        }}
        {...rest}
      >
        {children}
      </select>
    </Field>
  );
}
