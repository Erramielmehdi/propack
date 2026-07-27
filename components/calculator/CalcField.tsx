import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

/** Dark-themed field styling, mirroring components/ui/Input.tsx's shape. */
const fieldBase =
  "w-full rounded-lg border border-[#C9A22744] bg-white/[0.03] px-4 py-3 text-sm text-[#E8D5A3] placeholder:text-[#C9A22755] outline-none transition-colors focus:border-[#C9A227] focus-visible:ring-2 focus-visible:ring-[#E8C547]/40";

interface FieldWrapProps {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}

function FieldWrap({ id, label, hint, children }: FieldWrapProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[0.65rem] font-medium uppercase tracking-tech text-[#C9A22799]"
      >
        {label}
      </label>
      {children}
      {hint && <span className="text-xs text-[#C9A22799]">{hint}</span>}
    </div>
  );
}

interface CalcInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  hint?: string;
}

export function CalcInput({ id, label, hint, ...rest }: CalcInputProps) {
  return (
    <FieldWrap id={id} label={label} hint={hint}>
      <input id={id} className={fieldBase} {...rest} />
    </FieldWrap>
  );
}

interface CalcTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  id: string;
  label: string;
  hint?: string;
}

export function CalcTextarea({
  id,
  label,
  hint,
  rows = 3,
  ...rest
}: CalcTextareaProps) {
  return (
    <FieldWrap id={id} label={label} hint={hint}>
      <textarea id={id} rows={rows} className={`${fieldBase} resize-y`} {...rest} />
    </FieldWrap>
  );
}
