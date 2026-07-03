import type React from "react";

/**
 * Btn — Primary button component.
 *
 * Variants: primary (accent bg), secondary (outline), ghost, destructive.
 * No inset shadows, no scale animations. 6px radius. 44px min touch target.
 *
 * Accent color is a placeholder pending brand confirmation.
 */
export function Btn({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-[6px] transition-colors cursor-pointer select-none border leading-none min-h-[44px]";

  const sizes: Record<string, string> = {
    sm: "px-3.5 py-1.5 text-[13px]",
    md: "px-5 py-2.5 text-[14px]",
    lg: "px-6 py-3 text-[15px]",
  };

  /* accent color = placeholder pending brand confirmation */
  const variants: Record<string, string> = {
    primary:
      "bg-[#1B2332] text-white border-transparent hover:bg-[#2D3748]",
    secondary:
      "bg-white text-[#1B2332] border-[#E5E7EB] hover:border-[#1B2332] hover:bg-[#F1F3F5]",
    ghost:
      "bg-transparent text-[#475569] border-transparent hover:text-[#1B2332] hover:bg-[#F1F3F5]",
    destructive:
      "bg-[#DC2626] text-white border-transparent hover:bg-[#B91C1C]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${
        disabled || loading
          ? "opacity-40 cursor-not-allowed pointer-events-none"
          : ""
      } ${className}`}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
