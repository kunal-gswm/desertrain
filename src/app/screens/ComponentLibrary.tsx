import { Star, ShoppingCart, Download, ArrowRight, FileText, Search, Package, AlertTriangle, Check, ChevronDown, ChevronRight, Edit, Archive, CheckCircle, XCircle, Info, X } from "lucide-react";
import { Btn } from "../components/shared/Btn";
import { StockStatusDisplay } from "../components/shared/StockStatus";
import { OrderBadge } from "../components/shared/OrderBadge";
import { FieldInput } from "../components/shared/FieldInput";
import { ProductCard } from "../components/shared/ProductCard";
import { PRODUCTS } from "../data/mockData";

/**
 * ComponentLibrary — Updated to reflect:
 * - New color palette with placeholder accent
 * - Inter-only typography (400/600)
 * - Four stock states (not five)
 * - All component variants in new styling
 */

function DSSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[13px] font-semibold text-[#475569] uppercase tracking-wide whitespace-nowrap">{title}</h2>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>
      <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5">{children}</div>
    </div>
  );
}

export function ComponentLibrary() {
  return (
    <div className="bg-[#FAFBFC] min-h-screen p-8">
      <div className="max-w-[1200px] mx-auto space-y-10">
        <div className="border-b border-[#E5E7EB] pb-6">
          <h1 className="text-[32px] font-semibold text-[#1B2332] tracking-tight mb-1">Component Library</h1>
          <p className="text-[14px] text-[#94A3B8] mt-1">Desert Rain Design System · Inter 400/600 · Charcoal #1B2332 · Accent pending brand confirmation · 6px radius</p>
        </div>

        {/* ── Buttons ── */}
        <DSSection title="Buttons — Variants">
          <div className="flex flex-wrap gap-3 mb-4">
            <Btn>Primary</Btn>
            <Btn variant="secondary">Secondary</Btn>
            <Btn variant="ghost">Ghost</Btn>
            <Btn variant="destructive">Destructive</Btn>
            <Btn disabled>Disabled</Btn>
            <Btn loading>Loading</Btn>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn size="sm"><ShoppingCart className="w-3.5 h-3.5" /> Small + Icon</Btn>
            <Btn size="md"><Download className="w-4 h-4" /> Medium + Icon</Btn>
            <Btn size="lg"><ArrowRight className="w-4 h-4" /> Large + Icon</Btn>
            <Btn size="lg" variant="secondary"><FileText className="w-4 h-4" /> Request Quote</Btn>
          </div>
        </DSSection>

        {/* ── Stock Status — Four States ── */}
        <DSSection title="Stock Status — Four States">
          <p className="text-[13px] text-[#94A3B8] mb-4">Plain text with optional dot. NOT a badge, NOT a pill. Each state can carry an optional delivery estimate line.</p>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-8 items-start">
              <div>
                <div className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-2">Without estimate</div>
                <div className="space-y-3">
                  <StockStatusDisplay status="in-stock" />
                  <StockStatusDisplay status="limited-stock" />
                  <StockStatusDisplay status="back-order" />
                  <StockStatusDisplay status="lead-time" />
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-2">With delivery estimate</div>
                <div className="space-y-3">
                  <StockStatusDisplay status="in-stock" deliveryEstimate="Ships same day" />
                  <StockStatusDisplay status="limited-stock" deliveryEstimate="Only 7 remaining" />
                  <StockStatusDisplay status="back-order" deliveryEstimate="Est. ships Aug 12" />
                  <StockStatusDisplay status="lead-time" deliveryEstimate="Est. 4–6 weeks from manufacturer" />
                </div>
              </div>
            </div>
          </div>
        </DSSection>

        {/* ── Order Status ── */}
        <DSSection title="Order Status Badges">
          <div className="flex flex-wrap gap-4">
            <OrderBadge status="processing" />
            <OrderBadge status="packed" />
            <OrderBadge status="shipped" />
            <OrderBadge status="delivered" />
            <OrderBadge status="cancelled" />
          </div>
        </DSSection>

        {/* ── Form Inputs ── */}
        <DSSection title="Form Inputs">
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            <FieldInput label="Default Input" placeholder="Enter value..." />
            <FieldInput label="With Prefix" placeholder="0.00" prefix={<span className="text-[14px] text-[#94A3B8]">$</span>} />
            <FieldInput label="Error State" placeholder="Invalid field" error="This field is required" />
            <FieldInput label="Disabled State" placeholder="Cannot edit" disabled />
          </div>
          <div className="mt-4 max-w-lg">
            <div className="flex items-center border border-[#E5E7EB] rounded-[6px] bg-[#F1F3F5] focus-within:border-[#1B2332] focus-within:bg-white transition-colors">
              <Search className="w-4 h-4 text-[#94A3B8] ml-3 shrink-0" />
              <input placeholder="Search with icon prefix..." className="flex-1 px-3 py-2.5 text-[15px] bg-transparent outline-none placeholder:text-[#94A3B8] min-h-[46px]" />
              <button className="mr-1.5 bg-[#1B2332] text-white text-[13px] font-medium px-3 py-1.5 rounded-[6px]">Search</button>
            </div>
          </div>
        </DSSection>

        {/* ── Product Cards ── */}
        <DSSection title="Product Cards">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mb-5">
            {PRODUCTS.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-3">List Variant</div>
          <div className="space-y-2 max-w-2xl">
            {PRODUCTS.slice(0, 2).map((p) => (
              <div key={p.id} className="flex gap-4 p-3 border border-[#E5E7EB] rounded-[6px] bg-white hover:border-[#CBD5E1] transition-colors">
                <div className="w-16 h-16 bg-[#F1F3F5] rounded-[6px] overflow-hidden shrink-0 flex items-center justify-center text-[#CBD5E1]">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-[#94A3B8]">{p.brand}</div>
                  <div className="text-[15px] font-medium text-[#1B2332]">{p.name}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <StockStatusDisplay status={p.stock} />
                    <span className="text-[15px] font-semibold text-[#1B2332]">${p.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center"><Btn size="sm">Add to Cart</Btn></div>
              </div>
            ))}
          </div>
        </DSSection>

        {/* ── Alerts ── */}
        <DSSection title="Alert / Toast Messages">
          <div className="space-y-2 max-w-md">
            {[
              { type: "success", icon: CheckCircle, msg: "Order ORD-10042 has been placed successfully.", bg: "bg-[#F0FDF4] border-[#BBF7D0]", text: "text-[#166534]", ic: "text-[#16A34A]" },
              { type: "error", icon: XCircle, msg: "Unable to process payment. Please check card details.", bg: "bg-[#FEF2F2] border-[#FECACA]", text: "text-[#991B1B]", ic: "text-[#DC2626]" },
              { type: "warning", icon: AlertTriangle, msg: "Only 7 units of MCR-FA-200 remaining in stock.", bg: "bg-[#FFFBEB] border-[#FDE68A]", text: "text-[#92400E]", ic: "text-[#D97706]" },
              { type: "info", icon: Info, msg: "Volume pricing available for orders of 10+ units.", bg: "bg-[#F1F3F5] border-[#E5E7EB]", text: "text-[#1B2332]", ic: "text-[#475569]" },
            ].map((t) => (
              <div key={t.type} className={`flex items-start gap-3 p-3 border rounded-[6px] ${t.bg}`}>
                <t.icon className={`w-4 h-4 mt-0.5 shrink-0 ${t.ic}`} />
                <div className="flex-1">
                  <div className={`text-[13px] font-medium capitalize ${t.text}`}>{t.type}</div>
                  <div className={`text-[13px] mt-0.5 ${t.text} opacity-80`}>{t.msg}</div>
                </div>
                <button className={`shrink-0 ${t.ic} opacity-60 hover:opacity-100`}><X className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </DSSection>

        {/* ── Empty States ── */}
        <DSSection title="Empty States">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Package, title: "No orders yet", desc: "Your order history will appear here once you make a purchase.", cta: "Browse Products" },
              { icon: Search, title: "No results found", desc: "Try adjusting your search terms or removing active filters.", cta: "Clear Filters" },
              { icon: AlertTriangle, title: "No stock alerts", desc: "All products are at healthy inventory levels.", cta: null },
            ].map((s) => (
              <div key={s.title} className="border border-[#E5E7EB] rounded-[6px] p-8 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#F1F3F5] rounded-[6px] flex items-center justify-center mb-4"><s.icon className="w-6 h-6 text-[#94A3B8]" /></div>
                <div className="text-[14px] font-medium text-[#1B2332] mb-1">{s.title}</div>
                <div className="text-[13px] text-[#94A3B8] leading-relaxed mb-4">{s.desc}</div>
                {s.cta && <Btn size="sm" variant="secondary">{s.cta}</Btn>}
              </div>
            ))}
          </div>
        </DSSection>

        {/* ── Breadcrumb + Stepper ── */}
        <DSSection title="Breadcrumb + Stepper">
          <div className="mb-6">
            <div className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-2">Breadcrumb</div>
            <div className="flex items-center gap-1.5 text-[13px] text-[#94A3B8]">
              {["Home", "CPR & AED", "Training Manikins", "Prestan Adult Manikin"].map((seg, i, arr) => (
                <span key={seg} className="flex items-center gap-1.5">
                  <span className={i === arr.length - 1 ? "text-[#1B2332] font-medium" : "hover:text-[#1B2332] cursor-pointer"}>{seg}</span>
                  {i < arr.length - 1 && <ChevronRight className="w-3 h-3" />}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-[#94A3B8] uppercase tracking-wider mb-3">Checkout Stepper</div>
            <div className="flex items-center gap-0 max-w-sm">
              {["Shipping", "Delivery", "Payment"].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-semibold border-2 ${i < 2 ? "bg-[#1B2332] border-[#1B2332] text-white" : "bg-white border-[#1B2332] text-[#1B2332]"}`}>
                      {i < 2 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-[14px] font-medium ${i === 2 ? "text-[#1B2332]" : "text-[#94A3B8]"}`}>{step}</span>
                  </div>
                  {i < 2 && <div className={`w-14 h-px mx-3 ${i < 1 ? "bg-[#1B2332]" : "bg-[#E5E7EB]"}`} />}
                </div>
              ))}
            </div>
          </div>
        </DSSection>

        {/* ── Typography Scale ── */}
        <DSSection title="Typography Scale — Inter 400/600">
          <div className="space-y-3 max-w-xl">
            <div className="text-[32px] font-semibold text-[#1B2332] tracking-tight">H1 — 32px / Inter 600</div>
            <div className="text-[24px] font-semibold text-[#1B2332]">H2 — 24px / Inter 600</div>
            <div className="text-[20px] font-semibold text-[#1B2332]">H3 — 20px / Inter 600</div>
            <div className="text-[15px] font-semibold text-[#1B2332]">H4 — 15px / Inter 600</div>
            <div className="text-[15px] text-[#475569] leading-relaxed">Body Regular 15px — Product descriptions, table rows, form fields. Comfortable reading at normal distances.</div>
            <div className="text-[13px] text-[#94A3B8]">Body Small 13px — Metadata, timestamps, helper text, secondary information.</div>
            <div className="text-[11px] text-[#94A3B8] uppercase tracking-wide">Caption — 11px Uppercase Tracked</div>
            <div className="font-mono text-[13px] text-[#94A3B8]">PRE-101-01 — Mono for SKUs, order IDs, tracking codes</div>
          </div>
        </DSSection>

        {/* ── Color Palette ── */}
        <DSSection title="Color Palette">
          <div className="flex flex-wrap gap-4">
            {[
              { name: "Primary Text", hex: "#1B2332" },
              { name: "Body Text", hex: "#475569" },
              { name: "Muted", hex: "#94A3B8" },
              { name: "Accent", hex: "#64748B", note: "PENDING" },
              { name: "Border", hex: "#E5E7EB" },
              { name: "Surface", hex: "#F1F3F5" },
              { name: "Background", hex: "#FAFBFC" },
              { name: "White", hex: "#FFFFFF" },
              { name: "In Stock", hex: "#16A34A" },
              { name: "Warning", hex: "#D97706" },
              { name: "Error", hex: "#DC2626" },
              { name: "Info", hex: "#475569" },
            ].map((c) => (
              <div key={c.name} className="text-center">
                <div className="w-12 h-12 rounded-[6px] mb-1 border border-[#E5E7EB] shadow-sm relative" style={{ backgroundColor: c.hex }}>
                  {c.note && <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-[#D97706] text-white px-1 rounded font-semibold">{c.note}</span>}
                </div>
                <div className="text-[11px] font-medium text-[#475569] w-14 leading-tight">{c.name}</div>
                <div className="font-mono text-[10px] text-[#94A3B8]">{c.hex}</div>
              </div>
            ))}
          </div>
        </DSSection>

        {/* ── Data Table ── */}
        <DSSection title="Data Table — B2B Style">
          <div className="overflow-x-auto">
            <table className="w-full border border-[#E5E7EB] rounded-[6px] overflow-hidden text-[13px]">
              <thead>
                <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                  <th className="px-3 py-2.5 w-8"><div className="w-3.5 h-3.5 border border-[#E5E7EB] rounded-[3px]" /></th>
                  {["SKU", "Product Name", "Stock", "Price", "Status", "Actions"].map((col) => (
                    <th key={col} className="text-left px-3 py-2.5 font-medium text-[#475569] whitespace-nowrap">
                      <span className="flex items-center gap-1">{col} <ChevronDown className="w-3 h-3 text-[#CBD5E1]" /></span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.slice(0, 5).map((p, i) => (
                  <tr key={p.id} className={`border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFBFC] ${i % 2 !== 0 ? "bg-[#FAFBFC]" : ""}`}>
                    <td className="px-3 py-2.5"><div className="w-3.5 h-3.5 border border-[#E5E7EB] rounded-[3px]" /></td>
                    <td className="px-3 py-2.5 font-mono text-[12px] text-[#94A3B8]">{p.sku}</td>
                    <td className="px-3 py-2.5 font-medium text-[#1B2332]">{p.name}</td>
                    <td className="px-3 py-2.5"><StockStatusDisplay status={p.stock} /></td>
                    <td className="px-3 py-2.5 font-medium text-[#1B2332]">${p.price.toFixed(2)}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[12px] font-medium px-2 py-0.5 rounded-[4px] ${i % 3 === 2 ? "text-[#D97706] bg-[#FFFBEB]" : "text-[#16A34A] bg-[#F0FDF4]"}`}>{i % 3 === 2 ? "Draft" : "Published"}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-2">
                        <button className="text-[#1B2332] font-medium hover:underline flex items-center gap-1"><Edit className="w-3 h-3" />Edit</button>
                        <span className="text-[#E5E7EB]">|</span>
                        <button className="text-[#94A3B8] hover:text-[#475569] flex items-center gap-1"><Archive className="w-3 h-3" />Archive</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DSSection>
      </div>
    </div>
  );
}
