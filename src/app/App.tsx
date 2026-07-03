import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff, Layers } from "lucide-react";
import type { Screen } from "./types";
import { HomePage } from "./screens/HomePage";
import { CategoryPage } from "./screens/CategoryPage";
import { ProductDetailPage } from "./screens/ProductDetailPage";
import { CartPage } from "./screens/CartPage";
import { CheckoutPage } from "./screens/CheckoutPage";
import { OrderTrackingPage } from "./screens/OrderTrackingPage";
import { AccountDashboard } from "./screens/AccountDashboard";
import { AdminCMS } from "./screens/AdminCMS";
import { AdminIMS } from "./screens/AdminIMS";
import { NotificationsCenter } from "./screens/NotificationsCenter";
import { ComponentLibrary } from "./screens/ComponentLibrary";
import { RFQFlow } from "./screens/RFQFlow";
import { DistributorRegistration } from "./screens/DistributorRegistration";
import { DistributorPricingView } from "./screens/DistributorPricingView";

// ──────────────────────────────────────────────
// Desert Rain Design System — Screen Navigator
// ──────────────────────────────────────────────

const SCREENS: { id: Screen; label: string }[] = [
  { id: "home", label: "01 Homepage" },
  { id: "category", label: "02 Category" },
  { id: "product", label: "03 Product Detail" },
  { id: "cart", label: "04 Cart" },
  { id: "checkout", label: "05 Checkout" },
  { id: "tracking", label: "06 Order Tracking" },
  { id: "account", label: "07 Account" },
  { id: "rfq", label: "08 RFQ" },
  { id: "distributor-register", label: "09 Dist. Register" },
  { id: "distributor-pricing", label: "10 Dist. Pricing" },
  { id: "admin-cms", label: "11 Admin (Catalog)" },
  { id: "admin-ims", label: "12 Admin (Inventory)" },
  { id: "notifications", label: "13 Notifications" },
  { id: "components", label: "14 Components" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [showNav, setShowNav] = useState(true);
  const idx = SCREENS.findIndex((s) => s.id === screen);

  const navigate = (s: Screen) => {
    setScreen(s);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Demo navigation bar */}
      {showNav ? (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-[#0C1220] text-white flex items-center h-9 px-4 border-b border-white/10 shadow-sm transition-all">
          <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mr-3 shrink-0 hidden sm:block">
            Desert Rain DS
          </div>
          <div
            className="flex-1 overflow-x-auto flex items-stretch"
            style={{ scrollbarWidth: "none" }}
          >
            {SCREENS.map((s) => (
              <button
                key={s.id}
                className={`px-3 h-9 text-[10px] font-medium whitespace-nowrap border-b-2 transition-colors shrink-0 ${
                  screen === s.id
                    ? "border-white text-white"
                    : "border-transparent text-white/35 hover:text-white/60"
                }`}
                onClick={() => navigate(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 ml-3 shrink-0 border-l border-white/10 pl-3">
            <button
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-white/40 disabled:opacity-20 disabled:cursor-not-allowed"
              disabled={idx === 0}
              onClick={() => idx > 0 && navigate(SCREENS[idx - 1].id)}
              title="Previous Screen"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-white/30 w-10 text-center">
              {idx + 1}/{SCREENS.length}
            </span>
            <button
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-white/40 disabled:opacity-20 disabled:cursor-not-allowed"
              disabled={idx === SCREENS.length - 1}
              onClick={() => idx < SCREENS.length - 1 && navigate(SCREENS[idx + 1].id)}
              title="Next Screen"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              className="ml-2 px-2 py-1 flex items-center gap-1.5 rounded bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-[10px] font-medium transition-colors"
              onClick={() => setShowNav(false)}
              title="Hide Navigation Bar"
            >
              <EyeOff className="w-3 h-3" />
              <span className="hidden sm:inline">Hide</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowNav(true)}
          className="fixed bottom-6 right-6 z-[100] bg-[#0C1220]/95 hover:bg-[#0C1220] text-white px-3.5 py-2.5 rounded-full shadow-xl border border-white/15 flex items-center gap-2 text-[12px] font-medium backdrop-blur-md transition-all hover:scale-105 group"
          title="Show Design System Navigation"
        >
          <Layers className="w-4 h-4 text-white/70 group-hover:text-white" />
          <span>Screen: {SCREENS[idx]?.label.replace(/^\d+\s*/, "")} ({idx + 1}/{SCREENS.length})</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
        </button>
      )}

      {/* Screen content */}
      <div className={showNav ? "pt-9 transition-all" : "pt-0 transition-all"}>
        {screen === "home" && <HomePage onNav={navigate} />}
        {screen === "category" && <CategoryPage onNav={navigate} />}
        {screen === "product" && <ProductDetailPage onNav={navigate} />}
        {screen === "cart" && <CartPage onNav={navigate} />}
        {screen === "checkout" && <CheckoutPage onNav={navigate} />}
        {screen === "tracking" && <OrderTrackingPage onNav={navigate} />}
        {screen === "account" && <AccountDashboard onNav={navigate} />}
        {screen === "rfq" && <RFQFlow onNav={navigate} />}
        {screen === "distributor-register" && <DistributorRegistration onNav={navigate} />}
        {screen === "distributor-pricing" && <DistributorPricingView onNav={navigate} />}
        {screen === "admin-cms" && <AdminCMS onNav={navigate} />}
        {screen === "admin-ims" && <AdminIMS onNav={navigate} />}
        {screen === "notifications" && <NotificationsCenter onNav={navigate} />}
        {screen === "components" && <ComponentLibrary />}
      </div>
    </div>
  );
}
