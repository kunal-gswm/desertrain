// ──────────────────────────────────────────────
// SHARED TYPES — Desert Rain Design System
// ──────────────────────────────────────────────

export type Screen =
  | "home" | "category" | "product" | "cart" | "checkout"
  | "tracking" | "account" | "admin-cms" | "admin-ims"
  | "notifications" | "components" | "rfq"
  | "distributor-register" | "distributor-pricing";

/**
 * Stock status — four states only.
 * Each can carry an optional delivery estimate as a secondary text line.
 *
 * - in-stock:        ● green dot + "In Stock"
 * - limited-stock:   ● amber dot + "Limited Stock"
 * - back-order:      no dot, "Available on Back Order"
 * - lead-time:       no dot, "Production Lead Time"
 *
 * Optional: deliveryEstimate shown as muted secondary line,
 * e.g. "Est. ships Aug 12" or "Est. delivery in 4–6 weeks"
 */
export type StockStatus = "in-stock" | "limited-stock" | "back-order" | "lead-time";

export type OrderStatus = "processing" | "packed" | "shipped" | "delivered" | "cancelled";

export type Currency = "USD" | "AED";

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: StockStatus;
  deliveryEstimate?: string;
  qty: number;
  image: string;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  label: string;
  count: number;
  image?: string;
}

export interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
}

export interface StockItem {
  sku: string;
  name: string;
  current: number;
  reserved: number;
  available: number;
  reorder: number;
  supplier: string;
}

export interface Quote {
  id: string;
  date: string;
  expiry: string;
  total: number;
  status: "active" | "expired" | "converted";
}
