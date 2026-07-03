import type { Screen } from "../../types";
import { AdminPortal } from "./AdminPortal";

/**
 * AdminCMS — Unified Admin Portal starting on the Product Catalog view.
 */
export function AdminCMS({ onNav }: { onNav: (s: Screen) => void }) {
  return <AdminPortal onNav={onNav} initialView="products" />;
}
