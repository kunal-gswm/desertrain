import type { OrderStatus } from "../../types";

/**
 * OrderBadge — Order status as plain text with subtle visual.
 * Simpler than a colored pill — just text with a muted style.
 */
export function OrderBadge({ status }: { status: OrderStatus }) {
  const config: Record<OrderStatus, { label: string; cls: string }> = {
    processing: { label: "Processing", cls: "text-[#475569]" },
    packed: { label: "Packed", cls: "text-[#475569]" },
    shipped: { label: "Shipped", cls: "text-[#D97706]" },
    delivered: { label: "Delivered", cls: "text-[#16A34A]" },
    cancelled: { label: "Cancelled", cls: "text-[#DC2626]" },
  };

  const { label, cls } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${cls}`}>
      <span
        className={`w-[6px] h-[6px] rounded-full ${
          status === "delivered"
            ? "bg-[#16A34A]"
            : status === "shipped"
            ? "bg-[#D97706]"
            : status === "cancelled"
            ? "bg-[#DC2626]"
            : "bg-[#94A3B8]"
        }`}
      />
      {label}
    </span>
  );
}
