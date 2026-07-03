import { useState } from "react";
import {
  Package, Archive, Edit, BarChart2, AlertTriangle, Receipt, Sliders, Clock,
  Plus, Search, Download, XCircle, ChevronDown, Edit3, Trash2, ArrowLeft,
  FileText, CheckCircle, ExternalLink, RefreshCw, Eye,
} from "lucide-react";
import type { Screen } from "../../types";
import { PRODUCTS, CATEGORIES, STOCK_ITEMS } from "../data/mockData";
import { Btn } from "../components/shared/Btn";
import { FieldInput } from "../components/shared/FieldInput";
import { ProductPlaceholder } from "../components/shared/ProductPlaceholder";

/**
 * AdminPortal — Merged CMS & IMS into a single unified enterprise dashboard.
 * Manages product catalog, categories, content pages, inventory stock levels,
 * low stock alerts, purchase orders, adjustments, and audit history.
 */
export function AdminPortal({
  onNav,
  initialView = "products",
}: {
  onNav: (s: Screen) => void;
  initialView?: string;
}) {
  const [view, setView] = useState(initialView);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("All Suppliers");

  const lowStock = STOCK_ITEMS.filter((i) => i.current <= i.reorder);

  const pos = [
    { id: "PO-2024-089", supplier: "Prestan Products", items: 3, expected: "Jul 5, 2025", status: "confirmed" },
    { id: "PO-2024-088", supplier: "3M Health", items: 2, expected: "Jun 30, 2025", status: "in-transit" },
    { id: "PO-2024-085", supplier: "MCR Medical", items: 7, expected: "Jun 28, 2025", status: "received" },
  ];

  const stockHistory = [
    { id: "ADJ-901", date: "Jun 22, 2025 14:30", sku: "MCR-FA-200", type: "+ Add Stock", change: "+50", reason: "Received — PO-2024-081", user: "J. Miller" },
    { id: "ADJ-900", date: "Jun 21, 2025 11:15", sku: "LSP-BVM-ADULT", type: "– Remove Stock", change: "-2", reason: "Damaged / Defective", user: "S. Davis" },
    { id: "ADJ-899", date: "Jun 20, 2025 09:45", sku: "PPE-N95-8210", type: "+ Add Stock", change: "+500", reason: "Received — PO-2024-080", user: "J. Miller" },
    { id: "ADJ-898", date: "Jun 18, 2025 16:20", sku: "CPR-MAN-ADULT", type: "Audit Correction", change: "+1", reason: "Annual Audit Correction", user: "M. Chen" },
  ];

  const pages = [
    { id: "home", title: "Home Page", slug: "/", lastEdited: "2 hours ago by J. Miller", status: "Published" },
    { id: "about", title: "About Desert Rain", slug: "/about", lastEdited: "Jun 15, 2025 by M. Chen", status: "Published" },
    { id: "shipping", title: "Shipping & Delivery Policy", slug: "/shipping", lastEdited: "May 28, 2025 by S. Davis", status: "Published" },
    { id: "rfq-terms", title: "Institutional Tender Terms", slug: "/rfq-terms", lastEdited: "Yesterday by J. Miller", status: "Draft" },
  ];

  const catalogNav = [
    { id: "products", icon: Package, label: "Product Catalog", count: PRODUCTS.length },
    { id: "categories", icon: Archive, label: "Categories", count: CATEGORIES.length },
    { id: "pages", icon: FileText, label: "Content Pages", count: pages.length },
  ];

  const imsNav = [
    { id: "stock", icon: BarChart2, label: "Stock Overview" },
    { id: "low-stock", icon: AlertTriangle, label: "Low Stock Alerts", badge: lowStock.length },
    { id: "po", icon: Receipt, label: "Purchase Orders", count: pos.length },
    { id: "adjustments", icon: Sliders, label: "Stock Adjustments" },
    { id: "history", icon: Clock, label: "Audit & History" },
  ];

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStock = STOCK_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSupplier =
      selectedSupplier === "All Suppliers" || item.supplier === selectedSupplier;
    return matchesSearch && matchesSupplier;
  });

  return (
    <div className="bg-[#FAFBFC] min-h-screen flex font-sans">
      {/* ── Unified Sidebar ── */}
      <aside className="w-64 bg-[#1B2332] text-white shrink-0 min-h-screen flex flex-col shadow-xl z-10">
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-[6px] flex items-center justify-center shrink-0 shadow-sm">
            <Package className="w-4.5 h-4.5 text-[#1B2332]" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-[15px] leading-tight truncate text-white">Desert Rain</div>
            <div className="text-[11px] text-white/50 uppercase tracking-wider mt-0.5">Unified Admin Portal</div>
          </div>
        </div>

        <nav className="flex-1 py-5 px-3 space-y-6 overflow-y-auto scrollbar-none">
          {/* Section 1: Catalog & CMS */}
          <div>
            <div className="px-3 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
              Catalog & CMS
            </div>
            <div className="space-y-1">
              {catalogNav.map((item) => (
                <button
                  key={item.id}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[6px] text-[14px] transition-all ${
                    view === item.id
                      ? "bg-white/15 text-white font-medium shadow-xs"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => { setView(item.id); setSearchQuery(""); }}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {item.count !== undefined && (
                    <span className="ml-auto text-[12px] bg-black/20 px-2 py-0.5 rounded-full text-white/70">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Inventory & Purchasing (IMS) */}
          <div>
            <div className="px-3 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
              Inventory & Purchasing
            </div>
            <div className="space-y-1">
              {imsNav.map((item) => (
                <button
                  key={item.id}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[6px] text-[14px] transition-all ${
                    view === item.id
                      ? "bg-white/15 text-white font-medium shadow-xs"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => { setView(item.id); setSearchQuery(""); }}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {item.badge ? (
                    <span className="ml-auto text-[11px] bg-[#D97706] text-white font-semibold px-2 py-0.5 rounded-full shadow-2xs">
                      {item.badge}
                    </span>
                  ) : item.count !== undefined ? (
                    <span className="ml-auto text-[12px] bg-black/20 px-2 py-0.5 rounded-full text-white/70">
                      {item.count}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-white/60 hover:text-white hover:bg-white/5 rounded-[6px] transition-colors"
            onClick={() => onNav("home")}
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Storefront
          </button>
        </div>
      </aside>

      {/* ── Main Workspace ── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-[#E5E7EB] px-8 py-4 flex items-center justify-between shrink-0 shadow-2xs">
          <div>
            <h1 className="text-[18px] font-semibold text-[#1B2332] capitalize">
              {view === "products" && "Product Catalog Management"}
              {view === "categories" && "Category Management"}
              {view === "pages" && "Content & Page Management"}
              {view === "stock" && "Real-time Stock Overview"}
              {view === "low-stock" && "Low Stock & Reorder Alerts"}
              {view === "po" && "Purchase Orders & Procurement"}
              {view === "adjustments" && "Inventory Stock Adjustments"}
              {view === "history" && "Audit Log & Stock History"}
            </h1>
            <p className="text-[13px] text-[#64748B] mt-0.5">
              {view === "products" && "Manage product SKUs, pricing, descriptions, and visibility status."}
              {view === "categories" && "Organize catalog hierarchy and medical equipment groupings."}
              {view === "pages" && "Edit storefront landing pages, legal notices, and tender documentation."}
              {view === "stock" && "Monitor real-time warehouse inventory, reserved allocations, and reorder triggers."}
              {view === "low-stock" && "Critical items needing immediate replenishment from suppliers."}
              {view === "po" && "Track incoming shipments and generate new supplier purchase orders."}
              {view === "adjustments" && "Record stock reconciliations, damaged goods, or shipment check-ins."}
              {view === "history" && "Chronological trail of all warehouse inventory movements and edits."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {(view === "products" || view === "stock") && (
              <div className="flex items-center border border-[#E5E7EB] rounded-[6px] bg-[#F8FAFC] focus-within:bg-white focus-within:border-[#1B2332] px-3 py-1.5 transition-colors w-64 shadow-2xs">
                <Search className="w-4 h-4 text-[#94A3B8] mr-2 shrink-0" />
                <input
                  placeholder={view === "products" ? "Search catalog..." : "Search SKU or name..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[13px] text-[#1B2332] outline-none w-full placeholder:text-[#94A3B8]"
                />
              </div>
            )}

            {view === "stock" && (
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="px-3 py-1.5 text-[13px] font-medium border border-[#E5E7EB] rounded-[6px] bg-white outline-none cursor-pointer hover:border-[#94A3B8] transition-colors"
              >
                <option>All Suppliers</option>
                <option>Prestan Products</option>
                <option>3M Health</option>
                <option>MCR Medical</option>
              </select>
            )}

            {(view === "stock" || view === "po" || view === "history") && (
              <Btn size="sm" variant="secondary">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
              </Btn>
            )}

            {view === "products" && (
              <Btn size="sm">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Add New Product
              </Btn>
            )}

            {view === "po" && (
              <Btn size="sm">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Create PO
              </Btn>
            )}

            {view === "adjustments" && (
              <Btn size="sm" variant="secondary" onClick={() => setView("history")}>
                <Clock className="w-3.5 h-3.5 mr-1.5" /> View History
              </Btn>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* ── 1. PRODUCT CATALOG ── */}
          {view === "products" && (
            <div className="bg-white border border-[#E5E7EB] rounded-[8px] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#475569] font-medium">
                      <th className="px-4 py-3.5 w-10"><div className="w-4 h-4 border border-[#CBD5E1] rounded-[4px]" /></th>
                      <th className="text-left px-4 py-3.5">Image</th>
                      <th className="text-left px-4 py-3.5">SKU</th>
                      <th className="text-left px-4 py-3.5">Product Name</th>
                      <th className="text-left px-4 py-3.5">Category</th>
                      <th className="text-left px-4 py-3.5">Price</th>
                      <th className="text-left px-4 py-3.5">Stock Qty</th>
                      <th className="text-left px-4 py-3.5">Status</th>
                      <th className="text-right px-6 py-3.5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {filteredProducts.map((p, i) => (
                      <tr key={p.id} className="hover:bg-[#FAFBFC] transition-colors">
                        <td className="px-4 py-3"><div className="w-4 h-4 border border-[#CBD5E1] rounded-[4px]" /></td>
                        <td className="px-4 py-3">
                          <div className="w-11 h-11 bg-[#F1F3F5] rounded-[6px] overflow-hidden flex items-center justify-center border border-[#E5E7EB]">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <ProductPlaceholder className="w-full h-full" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-[#64748B] text-[12px]">{p.sku}</td>
                        <td className="px-4 py-3 font-medium text-[#1B2332] max-w-[240px] truncate">{p.name}</td>
                        <td className="px-4 py-3 text-[#64748B]"><span className="bg-[#F1F3F5] px-2.5 py-1 rounded-[4px] text-[12px]">{p.category}</span></td>
                        <td className="px-4 py-3 font-semibold text-[#1B2332]">${p.price.toFixed(2)}</td>
                        <td className="px-4 py-3 font-medium text-[#475569]">{p.qty}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${
                            i % 3 === 2 ? "text-[#D97706] bg-[#FFFBEB]" : "text-[#16A34A] bg-[#F0FDF4]"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${i % 3 === 2 ? "bg-[#D97706]" : "bg-[#16A34A]"}`} />
                            {i % 3 === 2 ? "Draft" : "Published"}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button className="text-[#1B2332] hover:text-[#2563EB] font-medium flex items-center gap-1 text-[13px] transition-colors">
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <span className="text-[#CBD5E1]">|</span>
                            <button className="text-[#64748B] hover:text-[#DC2626] flex items-center gap-1 text-[13px] transition-colors">
                              <Archive className="w-3.5 h-3.5" /> Archive
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── 2. CATEGORIES ── */}
          {view === "categories" && (
            <div className="bg-white border border-[#E5E7EB] rounded-[8px] shadow-xs overflow-hidden max-w-4xl">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#475569] font-medium">
                      <th className="text-left px-6 py-3.5">Category Name</th>
                      <th className="text-left px-6 py-3.5">Assigned Products</th>
                      <th className="text-left px-6 py-3.5">Visibility Status</th>
                      <th className="text-right px-6 py-3.5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {CATEGORIES.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FAFBFC] transition-colors">
                        <td className="px-6 py-4 font-semibold text-[#1B2332] text-[14px]">{c.label}</td>
                        <td className="px-6 py-4 text-[#64748B]">
                          <span className="font-medium text-[#1B2332]">{c.count}</span> active items
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[12px] font-semibold text-[#16A34A] bg-[#F0FDF4] px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-[#1B2332] hover:text-[#2563EB] font-medium text-[13px] inline-flex items-center gap-1">
                            <Edit className="w-3.5 h-3.5" /> Edit Hierarchy
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── 3. CONTENT PAGES ── */}
          {view === "pages" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
              {pages.map((pg) => (
                <div key={pg.id} className="bg-white border border-[#E5E7EB] rounded-[8px] p-6 shadow-xs hover:border-[#CBD5E1] transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] font-mono bg-[#F1F3F5] text-[#475569] px-2 py-0.5 rounded-[4px]">
                        {pg.slug}
                      </span>
                      <span className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${
                        pg.status === "Published" ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#FFFBEB] text-[#D97706]"
                      }`}>
                        {pg.status}
                      </span>
                    </div>
                    <h3 className="text-[16px] font-semibold text-[#1B2332] mb-1">{pg.title}</h3>
                    <p className="text-[12px] text-[#64748B]">Last updated: {pg.lastEdited}</p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-[#E5E7EB] flex items-center justify-between">
                    <button className="text-[13px] font-medium text-[#64748B] hover:text-[#1B2332] inline-flex items-center gap-1">
                      <ExternalLink className="w-3.5 h-3.5" /> Preview Page
                    </button>
                    <Btn size="sm" variant="secondary">
                      <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit Content
                    </Btn>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── 4. STOCK OVERVIEW (IMS) ── */}
          {view === "stock" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  { label: "Total Active SKUs", value: "1,247", icon: Package, cls: "text-[#1B2332] bg-[#F1F3F5]" },
                  { label: "Low Stock Items", value: String(lowStock.length), icon: AlertTriangle, cls: "text-[#D97706] bg-[#FFFBEB]", clickable: true },
                  { label: "Out of Stock", value: "8", icon: XCircle, cls: "text-[#DC2626] bg-[#FEF2F2]" },
                  { label: "Pending PO Shipments", value: "3", icon: Receipt, cls: "text-[#7C3AED] bg-[#F5F3FF]" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-white border border-[#E5E7EB] rounded-[8px] p-5 shadow-xs transition-all ${
                      stat.clickable ? "cursor-pointer hover:border-[#D97706] hover:shadow-md" : ""
                    }`}
                    onClick={() => stat.clickable && setView("low-stock")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[13px] font-medium text-[#64748B]">{stat.label}</span>
                      <div className={`w-8 h-8 rounded-[6px] flex items-center justify-center ${stat.cls}`}>
                        <stat.icon className="w-4.5 h-4.5" />
                      </div>
                    </div>
                    <div className="text-[28px] font-bold text-[#1B2332] tracking-tight">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[8px] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#475569] font-medium">
                        <th className="text-left px-5 py-3.5">SKU</th>
                        <th className="text-left px-5 py-3.5">Product Name</th>
                        <th className="text-left px-5 py-3.5">Current Stock</th>
                        <th className="text-left px-5 py-3.5">Reserved</th>
                        <th className="text-left px-5 py-3.5">Available</th>
                        <th className="text-left px-5 py-3.5">Reorder Pt.</th>
                        <th className="text-left px-5 py-3.5">Supplier</th>
                        <th className="text-right px-5 py-3.5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {filteredStock.map((item) => {
                        const isOut = item.current === 0;
                        const isLow = item.current > 0 && item.current <= item.reorder;
                        return (
                          <tr key={item.sku} className={`hover:bg-[#FAFBFC] transition-colors ${isOut ? "bg-[#FEF2F2]/50" : isLow ? "bg-[#FFFBEB]/60" : ""}`}>
                            <td className="px-5 py-3.5 font-mono text-[12px] text-[#64748B]">{item.sku}</td>
                            <td className="px-5 py-3.5 font-medium text-[#1B2332]">{item.name}</td>
                            <td className={`px-5 py-3.5 font-bold ${isOut ? "text-[#DC2626]" : isLow ? "text-[#D97706]" : "text-[#1B2332]"}`}>{item.current}</td>
                            <td className="px-5 py-3.5 text-[#64748B]">{item.reserved}</td>
                            <td className="px-5 py-3.5 font-semibold text-[#1B2332]">{item.available}</td>
                            <td className="px-5 py-3.5 text-[#64748B]">{item.reorder}</td>
                            <td className="px-5 py-3.5 text-[#64748B]">{item.supplier}</td>
                            <td className="px-5 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-2.5">
                                <button className="text-[#1B2332] hover:text-[#2563EB] font-medium transition-colors" onClick={() => setView("adjustments")}>
                                  Adjust
                                </button>
                                <span className="text-[#CBD5E1]">|</span>
                                <button className="text-[#64748B] hover:text-[#1B2332] font-medium transition-colors" onClick={() => setView("history")}>
                                  History
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── 5. LOW STOCK ALERTS ── */}
          {view === "low-stock" && (
            <div className="space-y-6 max-w-5xl">
              <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-[8px] p-4 flex items-center gap-3 shadow-xs">
                <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />
                <span className="text-[14px] text-[#92400E]">
                  <strong>{lowStock.length} products</strong> have reached critical inventory levels and need replenishment purchase orders.
                </span>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-[8px] shadow-xs overflow-hidden">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#475569] font-medium">
                      <th className="text-left px-6 py-3.5">SKU</th>
                      <th className="text-left px-6 py-3.5">Product Name</th>
                      <th className="text-left px-6 py-3.5">Available Stock</th>
                      <th className="text-left px-6 py-3.5">Reorder Point</th>
                      <th className="text-left px-6 py-3.5">Supplier</th>
                      <th className="text-right px-6 py-3.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {lowStock.map((item) => (
                      <tr key={item.sku} className={`hover:bg-[#FAFBFC] transition-colors ${item.current === 0 ? "bg-[#FEF2F2]/60" : "bg-[#FFFBEB]/50"}`}>
                        <td className="px-6 py-4 font-mono text-[12px] text-[#64748B]">{item.sku}</td>
                        <td className="px-6 py-4 font-medium text-[#1B2332]">{item.name}</td>
                        <td className={`px-6 py-4 font-bold ${item.current === 0 ? "text-[#DC2626]" : "text-[#D97706]"}`}>{item.available}</td>
                        <td className="px-6 py-4 text-[#64748B]">{item.reorder}</td>
                        <td className="px-6 py-4 font-medium text-[#475569]">{item.supplier}</td>
                        <td className="px-6 py-4 text-right">
                          <Btn size="sm" onClick={() => setView("po")}>
                            <Plus className="w-3.5 h-3.5 mr-1" /> Create PO
                          </Btn>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── 6. PURCHASE ORDERS ── */}
          {view === "po" && (
            <div className="bg-white border border-[#E5E7EB] rounded-[8px] shadow-xs overflow-hidden max-w-5xl">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#475569] font-medium">
                    <th className="text-left px-6 py-3.5">PO Number</th>
                    <th className="text-left px-6 py-3.5">Supplier</th>
                    <th className="text-left px-6 py-3.5">Items Ordered</th>
                    <th className="text-left px-6 py-3.5">Expected Delivery</th>
                    <th className="text-left px-6 py-3.5">Status</th>
                    <th className="text-right px-6 py-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {pos.map((po) => (
                    <tr key={po.id} className="hover:bg-[#FAFBFC] transition-colors">
                      <td className="px-6 py-4 font-mono font-semibold text-[#1B2332] text-[13px]">{po.id}</td>
                      <td className="px-6 py-4 font-medium text-[#475569]">{po.supplier}</td>
                      <td className="px-6 py-4 text-[#64748B]">{po.items} SKUs</td>
                      <td className="px-6 py-4 text-[#64748B]">{po.expected}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 ${
                          po.status === "received" ? "text-[#16A34A] bg-[#F0FDF4]" : po.status === "in-transit" ? "text-[#D97706] bg-[#FFFBEB]" : "text-[#1B2332] bg-[#F1F3F5]"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${po.status === "received" ? "bg-[#16A34A]" : po.status === "in-transit" ? "bg-[#D97706]" : "bg-[#1B2332]"}`} />
                          {po.status.replace("-", " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button className="text-[#1B2332] hover:underline font-medium text-[13px]">View PO</button>
                          {po.status !== "received" && (
                            <>
                              <span className="text-[#CBD5E1]">|</span>
                              <button className="text-[#16A34A] hover:underline font-semibold text-[13px] inline-flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> Receive
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── 7. STOCK ADJUSTMENTS ── */}
          {view === "adjustments" && (
            <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-8 shadow-xs max-w-xl">
              <h3 className="text-[16px] font-semibold text-[#1B2332] mb-6 pb-4 border-b border-[#E5E7EB] flex items-center gap-2">
                <Sliders className="w-4.5 h-4.5 text-[#64748B]" /> New Stock Adjustment
              </h3>
              <div className="space-y-5">
                <FieldInput label="Product SKU or Name" placeholder="Search product SKU..." />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Adjustment Type</label>
                  <select className="border border-[#E5E7EB] rounded-[6px] px-3.5 py-2.5 text-[14px] bg-white outline-none focus:border-[#1B2332] min-h-[44px]">
                    <option>+ Add Stock (received shipment)</option>
                    <option>– Remove Stock (damaged/write-off)</option>
                    <option>Audit Correction</option>
                    <option>Transfer Between Warehouse Locations</option>
                  </select>
                </div>
                <FieldInput label="Quantity Change" placeholder="e.g. +50 or -5" inputMode="numeric" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Reason Code</label>
                  <select className="border border-[#E5E7EB] rounded-[6px] px-3.5 py-2.5 text-[14px] bg-white outline-none focus:border-[#1B2332] min-h-[44px]">
                    <option>Received — Supplier Purchase Order</option>
                    <option>Damaged / Defective in Transit</option>
                    <option>Annual Physical Inventory Audit</option>
                    <option>Customer Return Check-in</option>
                    <option>Promotional Sample Allocation</option>
                    <option>Write-off / Expired</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Notes & Documentation</label>
                  <textarea
                    rows={3}
                    className="w-full border border-[#E5E7EB] rounded-[6px] px-3.5 py-2.5 text-[14px] outline-none focus:border-[#1B2332] resize-none placeholder:text-[#94A3B8]"
                    placeholder="Add PO number, inspection notes, or supervisor authorization..."
                  />
                </div>
                <div className="flex gap-3 pt-3">
                  <Btn onClick={() => setView("history")}>Save Adjustment</Btn>
                  <Btn variant="secondary" onClick={() => setView("stock")}>Cancel</Btn>
                </div>
              </div>
            </div>
          )}

          {/* ── 8. AUDIT LOG & HISTORY ── */}
          {view === "history" && (
            <div className="bg-white border border-[#E5E7EB] rounded-[8px] shadow-xs overflow-hidden max-w-5xl">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#475569] font-medium">
                    <th className="text-left px-6 py-3.5">Log ID</th>
                    <th className="text-left px-6 py-3.5">Timestamp</th>
                    <th className="text-left px-6 py-3.5">SKU</th>
                    <th className="text-left px-6 py-3.5">Action Type</th>
                    <th className="text-left px-6 py-3.5">Qty Change</th>
                    <th className="text-left px-6 py-3.5">Reason / Ref</th>
                    <th className="text-right px-6 py-3.5">Logged By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {stockHistory.map((log) => (
                    <tr key={log.id} className="hover:bg-[#FAFBFC] transition-colors">
                      <td className="px-6 py-4 font-mono font-semibold text-[#1B2332] text-[12px]">{log.id}</td>
                      <td className="px-6 py-4 text-[#64748B] text-[12px]">{log.date}</td>
                      <td className="px-6 py-4 font-mono text-[#1B2332] font-medium">{log.sku}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[12px] font-semibold px-2 py-0.5 rounded-[4px] ${
                          log.type.startsWith("+") ? "bg-[#F0FDF4] text-[#16A34A]" : log.type.startsWith("–") ? "bg-[#FEF2F2] text-[#DC2626]" : "bg-[#F1F3F5] text-[#475569]"
                        }`}>
                          {log.type}
                        </span>
                      </td>
                      <td className={`px-6 py-4 font-bold font-mono ${
                        log.change.startsWith("+") ? "text-[#16A34A]" : "text-[#DC2626]"
                      }`}>
                        {log.change}
                      </td>
                      <td className="px-6 py-4 text-[#475569] font-medium">{log.reason}</td>
                      <td className="px-6 py-4 text-right text-[#64748B]">{log.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
