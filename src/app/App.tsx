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
import { SearchResultsPage } from "./screens/SearchResultsPage";
import { 
  StoreCataloguePage, AboutUsPage, DistributorLocatorPage, 
  LegalPortalPage, GenericContentPage 
} from "./screens/ContentPages";

// ──────────────────────────────────────────────
// Desert Rain Design System — Screen Navigator
// ──────────────────────────────────────────────

const SCREENS: { id: Screen; label: string }[] = [
  { id: "home", label: "01 Homepage" },
  { id: "store", label: "02 Store (MCR Catalogue)" },
  { id: "search", label: "03 Search & Filter Hub" },
  { id: "category", label: "04 Category" },
  { id: "product", label: "05 Product Detail" },
  { id: "cart", label: "06 Cart" },
  { id: "checkout", label: "07 Checkout" },
  { id: "tracking", label: "08 Order Tracking" },
  { id: "account", label: "09 Account (3-Tier)" },
  { id: "rfq", label: "10 RFQ" },
  { id: "distributor-register", label: "11 Dist. / Reseller Register" },
  { id: "distributor-pricing", label: "12 Dist. Pricing" },
  { id: "about", label: "13 About Us" },
  { id: "brands", label: "14 Our Brands" },
  { id: "source-supply", label: "15 Source & Supply" },
  { id: "locator", label: "16 Distributor Locator" },
  { id: "legal", label: "17 Legal Portal (6 Policies)" },
  { id: "events", label: "18 Events & Tradeshows" },
  { id: "resources", label: "19 Resource Center" },
  { id: "career", label: "20 Careers" },
  { id: "sitemap", label: "21 Site Map" },
  { id: "contact", label: "22 Contact Us" },
  { id: "admin-cms", label: "23 Admin (Catalog)" },
  { id: "admin-ims", label: "24 Admin (Inventory)" },
  { id: "notifications", label: "25 Notifications" },
  { id: "components", label: "26 Components" },
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
    <div className="min-h-screen bg-[#FAFBFC] font-sans antialiased text-[#1B2332]">
      {/* ── Design System Top Bar — Retained for navigation review ── */}
      {showNav ? (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-[#0C1220] text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono border-b border-white/10 shadow-lg">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#38BDF8]" />
            <span className="font-semibold tracking-wide text-white/90">DESERT RAIN LLC</span>
            <span className="text-white/30">|</span>
            <span className="text-[#38BDF8] font-semibold bg-[#38BDF8]/10 px-2 py-0.5 rounded">SCOPE CORRECTION v2.0</span>
          </div>

          {/* Screen selector dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={screen}
              onChange={(e) => navigate(e.target.value as Screen)}
              className="bg-white/10 border border-white/15 rounded px-2.5 py-1 text-white text-[12px] outline-none focus:border-[#38BDF8] cursor-pointer"
            >
              {SCREENS.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0C1220] text-white">
                  {s.label}
                </option>
              ))}
            </select>

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
        {screen === "store" && <StoreCataloguePage onNav={navigate} />}
        {screen === "search" && <SearchResultsPage onNav={navigate} />}
        {screen === "category" && <CategoryPage onNav={navigate} />}
        {screen === "product" && <ProductDetailPage onNav={navigate} />}
        {screen === "cart" && <CartPage onNav={navigate} />}
        {screen === "checkout" && <CheckoutPage onNav={navigate} />}
        {screen === "tracking" && <OrderTrackingPage onNav={navigate} />}
        {screen === "account" && <AccountDashboard onNav={navigate} />}
        {screen === "rfq" && <RFQFlow onNav={navigate} />}
        {screen === "distributor-register" && <DistributorRegistration onNav={navigate} />}
        {screen === "distributor-pricing" && <DistributorPricingView onNav={navigate} />}
        {screen === "about" && <AboutUsPage onNav={navigate} />}
        {screen === "brands" && <GenericContentPage screen="brands" onNav={navigate} />}
        {screen === "source-supply" && <GenericContentPage screen="source-supply" onNav={navigate} />}
        {screen === "locator" && <DistributorLocatorPage onNav={navigate} />}
        {screen === "legal" && <LegalPortalPage onNav={navigate} />}
        {screen === "events" && <GenericContentPage screen="events" onNav={navigate} />}
        {screen === "resources" && <GenericContentPage screen="resources" onNav={navigate} />}
        {screen === "career" && <GenericContentPage screen="career" onNav={navigate} />}
        {screen === "sitemap" && <GenericContentPage screen="sitemap" onNav={navigate} />}
        {screen === "contact" && <GenericContentPage screen="contact" onNav={navigate} />}
        {screen === "admin-cms" && <AdminCMS onNav={navigate} />}
        {screen === "admin-ims" && <AdminIMS onNav={navigate} />}
        {screen === "notifications" && <NotificationsCenter onNav={navigate} />}
        {screen === "components" && <ComponentLibrary />}
      </div>
    </div>
  );
}
