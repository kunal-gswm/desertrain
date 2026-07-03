import type React from "react";

/**
 * FieldInput — Form field with label.
 *
 * Labels: 13px, medium weight, sentence case.
 * Input: 46px height for touch targets, clean focus state.
 */
export function FieldInput({
  label,
  placeholder,
  type = "text",
  inputMode,
  error,
  disabled,
  prefix,
  className = "",
  id,
}: {
  label?: string;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "search" | "email" | "url";
  error?: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-medium text-[#1B2332]">
          {label}
        </label>
      )}
      <div
        className={`flex items-center border rounded-[6px] bg-white transition-colors ${
          error ? "border-[#DC2626]" : "border-[#E5E7EB]"
        } ${disabled ? "opacity-50" : ""} focus-within:border-[#1B2332] focus-within:ring-1 focus-within:ring-[#1B2332]/10`}
      >
        {prefix && <span className="pl-3 text-[#475569]">{prefix}</span>}
        <input
          id={inputId}
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 px-3 py-2.5 text-[15px] text-[#1B2332] bg-transparent outline-none placeholder:text-[#94A3B8] min-h-[46px]"
        />
      </div>
      {error && <span className="text-[13px] text-[#DC2626]">{error}</span>}
    </div>
  );
}
