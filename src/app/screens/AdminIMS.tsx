import type { Screen } from "../../types";
import { AdminPortal } from "./AdminPortal";

/**
 * AdminIMS — Unified Admin Portal starting on the Stock Overview view.
 */
export function AdminIMS({ onNav }: { onNav: (s: Screen) => void }) {
  return <AdminPortal onNav={onNav} initialView="stock" />;
}
