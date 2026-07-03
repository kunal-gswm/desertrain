import { useState } from "react";
import {
  BarChart2, AlertTriangle, Receipt, Sliders, Clock, Package,
  XCircle, Download, Plus,
} from "lucide-react";
import type { Screen } from "../../types";
import { STOCK_ITEMS } from "../data/mockData";
import { Btn } from "../components/shared/Btn";
import { FieldInput } from "../components/shared/FieldInput";

/**
 * AdminIMS — Light token cleanup only. Dashboard conventions kept.
 */
export function AdminIMS({ onNav }: { onNav: (s: Screen) => void }) {
  const [view, setView] = useState("stock");
  const lowStock = STOCK_ITEMS.filter((i) => i.current <= i.reorder);

  const pos = [
    { id: "PO-2024-089", supplier: "Prestan Products", items: 3, expected: "Jul 5, 2025", status: "confirmed" },
    { id: "PO-2024-088", supplier: "3M Health", items: 2, expected: "Jun 30, 2025", status: "in-transit" },
    { id: "PO-2024-085", supplier: "MCR Medical", items: 7, expected: "Jun 28, 2025", status: "received" },
  ];

  const imsNav = [
    { id: "stock", icon: BarChart2, label: "Stock Overview" },
    { id: "low-stock", icon: AlertTriangle, label: "Low Stock Alerts", badge: lowStock.length },
    { id: "po", icon: Receipt, label: "Purchase Orders" },
    { id: "adjustments", icon: Sliders, label: "Adjustments" },
    { id: "history", icon: Clock, label: "Stock History" },
  ];

  return (
    <div className="bg-[#FAFBFC] min-h-screen flex">
      <aside className="w-56 bg-[#1B2332] text-white shrink-0 min-h-screen flex flex-col">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-[6px] flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-[#1B2332]" />
          </div>
          <div>
            <div className="font-semibold text-[14px]">Desert Rain</div>
            <div className="text-[11px] text-white/40 uppercase tracking-wider">Inventory</div>
          </div>
        </div>
        <nav className="flex-1 py-2">
          {imsNav.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[14px] transition-colors ${
                view === item.id ? "bg-white/10 text-white font-medium border-r-2 border-white" : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => setView(item.id)}
            >
              <item.icon className="w-4 h-4 shrink-0" /> {item.label}
              {item.badge ? (
                <span className="ml-auto text-[11px] bg-[#D97706] text-white px-1.5 py-0.5 rounded-[4px]">{item.badge}</span>
              ) : null}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="text-[13px] text-white/40 hover:text-white transition-colors" onClick={() => onNav("home")}>← Back to Store</button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-auto">
        <div className="bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between">
          <div className="text-[14px] font-semibold text-[#1B2332]">
            {view === "stock" ? "Stock Overview" : view === "low-stock" ? "Low Stock Alerts" : view === "po" ? "Purchase Orders" : view === "adjustments" ? "Stock Adjustments" : "Stock History"}
          </div>
          <div className="flex gap-2">
            <Btn size="sm" variant="secondary"><Download className="w-3.5 h-3.5" /> Export CSV</Btn>
            {view === "po" && <Btn size="sm"><Plus className="w-3.5 h-3.5" /> New PO</Btn>}
            {view === "adjustments" && <Btn size="sm"><Plus className="w-3.5 h-3.5" /> New Adjustment</Btn>}
          </div>
        </div>

        <div className="p-6 space-y-5">
          {view === "stock" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total SKUs", value: "1,247", icon: Package, cls: "text-[#1B2332] bg-[#F1F3F5]" },
                  { label: "Low Stock", value: String(lowStock.length), icon: AlertTriangle, cls: "text-[#D97706] bg-[#FFFBEB]", clickable: true },
                  { label: "Out of Stock", value: "8", icon: XCircle, cls: "text-[#DC2626] bg-[#FEF2F2]" },
                  { label: "Pending POs", value: "3", icon: Receipt, cls: "text-[#7C3AED] bg-[#F5F3FF]" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-white border border-[#E5E7EB] rounded-[6px] p-4 ${stat.clickable ? "cursor-pointer hover:border-[#D97706]" : ""}`}
                    onClick={() => stat.clickable && setView("low-stock")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] text-[#94A3B8]">{stat.label}</span>
                      <div className={`w-7 h-7 rounded-[6px] flex items-center justify-center ${stat.cls}`}>
                        <stat.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-[28px] font-semibold text-[#1B2332] tracking-tight">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E7EB]">
                  <input placeholder="Search SKU or product..." className="px-3 py-1.5 text-[13px] border border-[#E5E7EB] rounded-[6px] outline-none focus:border-[#1B2332] w-64" />
                  <select className="px-3 py-1.5 text-[13px] border border-[#E5E7EB] rounded-[6px] bg-white outline-none">
                    <option>All Suppliers</option>
                    <option>Prestan Products</option>
                    <option>3M Health</option>
                    <option>MCR Medical</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                        {["SKU", "Product Name", "Current", "Reserved", "Available", "Reorder Pt.", "Supplier", "Actions"].map((col) => (
                          <th key={col} className="text-left px-4 py-2.5 font-medium text-[#475569] whitespace-nowrap">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {STOCK_ITEMS.map((item) => {
                        const isOut = item.current === 0;
                        const isLow = item.current > 0 && item.current <= item.reorder;
                        return (
                          <tr key={item.sku} className={`border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFBFC] ${isOut ? "bg-[#FEF2F2]" : isLow ? "bg-[#FFFBEB]" : ""}`}>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#94A3B8]">{item.sku}</td>
                            <td className="px-4 py-3 font-medium text-[#1B2332]">{item.name}</td>
                            <td className={`px-4 py-3 font-semibold ${isOut ? "text-[#DC2626]" : isLow ? "text-[#D97706]" : "text-[#1B2332]"}`}>{item.current}</td>
                            <td className="px-4 py-3 text-[#94A3B8]">{item.reserved}</td>
                            <td className="px-4 py-3 font-medium text-[#1B2332]">{item.available}</td>
                            <td className="px-4 py-3 text-[#94A3B8]">{item.reorder}</td>
                            <td className="px-4 py-3 text-[#94A3B8]">{item.supplier}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button className="text-[#1B2332] font-medium hover:underline" onClick={() => setView("adjustments")}>Adjust</button>
                                <span className="text-[#E5E7EB]">|</span>
                                <button className="text-[#1B2332] font-medium hover:underline" onClick={() => setView("history")}>History</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {view === "low-stock" && (
            <>
              <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-[6px] p-4 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />
                <span className="text-[14px] text-[#92400E]"><strong>{lowStock.length} products</strong> are at or below their reorder point.</span>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                        {["SKU", "Product Name", "Available", "Reorder Pt.", "Supplier", "Action"].map((col) => (
                          <th key={col} className="text-left px-4 py-2.5 font-medium text-[#475569]">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {lowStock.map((item) => (
                        <tr key={item.sku} className={`border-b border-[#E5E7EB] last:border-0 ${item.current === 0 ? "bg-[#FEF2F2]" : "bg-[#FFFBEB]"}`}>
                          <td className="px-4 py-3 font-mono text-[12px] text-[#94A3B8]">{item.sku}</td>
                          <td className="px-4 py-3 font-medium text-[#1B2332]">{item.name}</td>
                          <td className={`px-4 py-3 font-semibold ${item.current === 0 ? "text-[#DC2626]" : "text-[#D97706]"}`}>{item.available}</td>
                          <td className="px-4 py-3 text-[#94A3B8]">{item.reorder}</td>
                          <td className="px-4 py-3 text-[#94A3B8]">{item.supplier}</td>
                          <td className="px-4 py-3"><Btn size="sm" variant="secondary" onClick={() => setView("po")}><Plus className="w-3 h-3" /> Create PO</Btn></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {view === "po" && (
            <div className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                      {["PO #", "Supplier", "Items", "Expected Delivery", "Status", "Actions"].map((col) => (
                        <th key={col} className="text-left px-4 py-2.5 font-medium text-[#475569]">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pos.map((po) => (
                      <tr key={po.id} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFBFC]">
                        <td className="px-4 py-3 font-medium text-[#1B2332]">{po.id}</td>
                        <td className="px-4 py-3 text-[#475569]">{po.supplier}</td>
                        <td className="px-4 py-3 text-[#94A3B8]">{po.items} items</td>
                        <td className="px-4 py-3 text-[#94A3B8]">{po.expected}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[12px] font-medium px-2 py-0.5 rounded-[4px] ${po.status === "received" ? "text-[#16A34A] bg-[#F0FDF4]" : po.status === "in-transit" ? "text-[#D97706] bg-[#FFFBEB]" : "text-[#1B2332] bg-[#F1F3F5]"}`}>
                            {po.status.replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button className="text-[#1B2332] font-medium hover:underline">View</button>
                            {po.status !== "received" && <><span className="text-[#E5E7EB]">|</span><button className="text-[#1B2332] font-medium hover:underline">Receive</button></>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === "adjustments" && (
            <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6 max-w-lg">
              <h3 className="text-[14px] font-semibold text-[#1B2332] mb-5">New Stock Adjustment</h3>
              <div className="space-y-4">
                <FieldInput label="Product SKU or Name" placeholder="Search SKU or product..." />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Adjustment Type</label>
                  <select className="border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] bg-white outline-none focus:border-[#1B2332] min-h-[46px]">
                    <option>+ Add Stock (received shipment)</option>
                    <option>– Remove Stock (damaged/write-off)</option>
                    <option>Audit Correction</option>
                    <option>Transfer Between Locations</option>
                  </select>
                </div>
                <FieldInput label="Quantity" placeholder="0" inputMode="numeric" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Reason Code</label>
                  <select className="border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] bg-white outline-none focus:border-[#1B2332] min-h-[46px]">
                    <option>Received — Purchase Order</option>
                    <option>Damaged / Defective</option>
                    <option>Annual Audit Correction</option>
                    <option>Customer Return</option>
                    <option>Promotional Sample</option>
                    <option>Lost / Stolen</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Notes</label>
                  <textarea rows={3} className="w-full border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] outline-none focus:border-[#1B2332] resize-none placeholder:text-[#94A3B8]" placeholder="Add context for this adjustment..." />
                </div>
                <div className="flex gap-3">
                  <Btn>Save Adjustment</Btn>
                  <Btn variant="secondary">Cancel</Btn>
                </div>
              </div>
            </div>
          )}

          {view === "history" && (
            <div className="text-[14px] text-[#94A3B8] text-center py-12">Stock history log coming soon</div>
          )}
        </div>
      </div>
    </div>
  );
}
