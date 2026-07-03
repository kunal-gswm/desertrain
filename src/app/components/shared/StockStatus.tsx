import type { StockStatus } from "../../types";

/**
 * StockStatus — Four states, plain text with optional dot.
 *
 * NOT a badge. NOT a pill. NOT uppercase. NOT colored background.
 * Just a small dot (where applicable) + plain text + optional secondary date line.
 *
 * States:
 * - in-stock:       ● green dot + "In Stock"
 * - limited-stock:  ● amber dot + "Limited Stock"
 * - back-order:     no dot, "Available on Back Order"
 * - lead-time:      no dot, "Production Lead Time"
 */
export function StockStatusDisplay({
  status,
  deliveryEstimate,
  size = "sm",
}: {
  status: StockStatus;
  deliveryEstimate?: string;
  size?: "sm" | "md";
}) {
  const config: Record<StockStatus, { label: string; dot?: string }> = {
    "in-stock": { label: "In Stock", dot: "bg-[#16A34A]" },
    "limited-stock": { label: "Limited Stock", dot: "bg-[#D97706]" },
    "back-order": { label: "Available on Back Order" },
    "lead-time": { label: "Production Lead Time" },
  };

  const { label, dot } = config[status];

  const textSize = size === "sm" ? "text-[13px]" : "text-[14px]";
  const subSize = size === "sm" ? "text-[11px]" : "text-[12px]";

  return (
    <div className="flex flex-col gap-0.5">
      <span className={`inline-flex items-center gap-1.5 ${textSize} text-[#475569]`}>
        {dot && <span className={`w-[6px] h-[6px] rounded-full ${dot} shrink-0`} />}
        {label}
      </span>
      {deliveryEstimate && (
        <span className={`${subSize} text-[#94A3B8] leading-tight ${dot ? "ml-[14px]" : ""}`}>
          {deliveryEstimate}
        </span>
      )}
    </div>
  );
}
