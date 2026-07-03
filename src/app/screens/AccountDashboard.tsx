import { useState } from "react";
import {
  Package, FileText, MapPin, Settings, Clock, Tag, RefreshCw, Plus,
  ChevronRight, ArrowRight, Truck, AlertCircle, Upload, Edit, Trash2,
  Eye, Copy, ListOrdered, Download, ShieldCheck, Image, Building, User, Share2
} from "lucide-react";
import type { Screen, OrderStatus } from "../../types";
import { ORDERS, PRODUCTS, QUOTES } from "../data/mockData";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Btn } from "../components/shared/Btn";
import { OrderBadge } from "../components/shared/OrderBadge";
import { FieldInput } from "../components/shared/FieldInput";

export function AccountDashboard({ onNav }: { onNav: (s: Screen) => void }) {
  const [section, setSection] = useState("orders");
  const [accountTier, setAccountTier] = useState<"distributor" | "reseller" | "enduser">("distributor");

  const nav = [
    { id: "orders", icon: Package, label: "Orders" },
    { id: "quotes", icon: FileText, label: "Quotes" },
    { id: "reorder", icon: ListOrdered, label: "Reorder Lists" },
    ...(accountTier === "distributor" ? [{ id: "certificates", icon: ShieldCheck, label: "Certificates & Compliance" }] : []),
    ...(accountTier === "reseller" ? [{ id: "marketing", icon: Image, label: "Marketing Assets & Feeds" }] : []),
    { id: "rma", icon: RefreshCw, label: "Returns / RMA" },
    { id: "addresses", icon: MapPin, label: "Addresses" },
    { id: "settings", icon: Settings, label: "Account Settings" },
  ];

  const rmaItems = [
    { id: "RMA-00312", order: "ORD-10038", item: "3M N95 8210 (20pk)", reason: "Damaged in transit", status: "approved", submitted: "Jun 22, 2025" },
    { id: "RMA-00298", order: "ORD-10031", item: "Prestan Adult Manikin", reason: "Defective CPR rate monitor", status: "pending", submitted: "Jun 15, 2025" },
    { id: "RMA-00267", order: "ORD-10019", item: "Nitrile Gloves L 100pk × 3", reason: "Wrong size shipped", status: "completed", submitted: "May 10, 2025" },
  ];

  const reorderLists = [
    { name: "Monthly PPE Restock", items: 6, lastOrdered: "Jun 1, 2025", total: 189.94 },
    { name: "Training Lab Supplies", items: 12, lastOrdered: "May 15, 2025", total: 1420.00 },
    { name: "Emergency Kit Refresh", items: 4, lastOrdered: "Apr 20, 2025", total: 524.50 },
  ];

  const addresses = [
    { label: "HQ — Main Facility", name: "John Smith", line: "1200 Industrial Blvd, Suite 400", city: "Chicago, IL 60601", isDefault: true },
    { label: "Branch — Denver", name: "Sarah Johnson", line: "4500 Medical Center Dr", city: "Denver, CO 80204", isDefault: false },
    { label: "Warehouse", name: "Mike Chen", line: "8700 Distribution Way", city: "Memphis, TN 38118", isDefault: false },
  ];

  return (
    <div className="bg-[#FAFBFC] min-h-screen flex flex-col">
      <SiteHeader onNav={onNav} />

      {/* ── 3-Tier Account Type Switcher Banner (Required Scope) ── */}
      <div className="bg-[#1B2332] text-white border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px]">
          <div className="flex items-center gap-2">
            <span className="text-[#38BDF8] font-bold uppercase tracking-wider">Active Account Role:</span>
            <span className="font-semibold">{accountTier === "distributor" ? "Authorized Distributor (Wholesale B2B Tier)" : accountTier === "reseller" ? "Reseller Partner (Resale & Asset Tier)" : "End User / Standard Retail Customer"}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-[6px]">
            <button onClick={() => { setAccountTier("distributor"); setSection("orders"); }} className={`px-2.5 py-1 rounded-[4px] font-semibold transition-all ${accountTier === "distributor" ? "bg-[#0284C7] text-white" : "text-white/70 hover:text-white"}`}>Distributor Portal</button>
            <button onClick={() => { setAccountTier("reseller"); setSection("orders"); }} className={`px-2.5 py-1 rounded-[4px] font-semibold transition-all ${accountTier === "reseller" ? "bg-[#D97706] text-white" : "text-white/70 hover:text-white"}`}>Reseller Account</button>
            <button onClick={() => { setAccountTier("enduser"); setSection("orders"); }} className={`px-2.5 py-1 rounded-[4px] font-semibold transition-all ${accountTier === "enduser" ? "bg-white text-[#1B2332]" : "text-white/70 hover:text-white"}`}>End User Login</button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside>
          <div className="mb-6 p-4 bg-white border border-[#E5E7EB] rounded-[8px] shadow-2xs">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center font-bold text-[#0284C7]">JS</div>
              <div>
                <div className="text-[15px] font-bold text-[#1B2332]">John Smith</div>
                <div className="text-[12px] text-[#94A3B8]">Acme Medical Corp</div>
              </div>
            </div>
            <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11.5px]">
              <span className="text-[#64748B]">Account Tier:</span>
              <span className={`font-bold px-2 py-0.5 rounded ${accountTier === "distributor" ? "bg-[#E0F2FE] text-[#0369A1]" : accountTier === "reseller" ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#F1F5F9] text-[#475569]"}`}>
                {accountTier === "distributor" ? "Distributor Gold" : accountTier === "reseller" ? "Reseller Partner" : "Standard"}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[6px] text-[14px] transition-colors ${
                  section === n.id
                    ? "bg-[#1B2332] text-white font-medium shadow-2xs"
                    : "text-[#475569] hover:bg-[#F1F3F5] hover:text-[#1B2332]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <n.icon className="w-4 h-4 shrink-0" />
                  <span>{n.label}</span>
                </div>
                {n.id === "certificates" && <span className="text-[10px] bg-[#0284C7] text-white px-1.5 py-0.5 rounded font-bold">B2B</span>}
                {n.id === "marketing" && <span className="text-[10px] bg-[#D97706] text-white px-1.5 py-0.5 rounded font-bold">ASSET</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          {/* ── Orders ── */}
          {section === "orders" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h1 className="text-[20px] font-semibold text-[#1B2332]">Order History</h1>
                <Btn size="sm" variant="secondary"><Download className="w-3.5 h-3.5" /> Export</Btn>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                        {["Order", "Date", "Items", "Total", "Status", ""].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-[13px] font-medium text-[#475569]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ORDERS.map((o) => (
                        <tr key={o.id} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFBFC]">
                          <td className="px-4 py-3 font-medium text-[#1B2332]">{o.id}</td>
                          <td className="px-4 py-3 text-[#94A3B8]">{o.date}</td>
                          <td className="px-4 py-3 text-[#94A3B8]">{o.items}</td>
                          <td className="px-4 py-3 font-medium text-[#1B2332]">${o.total.toFixed(2)}</td>
                          <td className="px-4 py-3"><OrderBadge status={o.status} /></td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button className="text-[13px] text-[#1B2332] font-medium hover:underline flex items-center gap-1" onClick={() => onNav("tracking")}><Eye className="w-3 h-3" />Track</button>
                              <button className="text-[13px] text-[#94A3B8] hover:text-[#1B2332] flex items-center gap-1"><Copy className="w-3 h-3" />Reorder</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Quotes ── */}
          {section === "quotes" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h1 className="text-[20px] font-semibold text-[#1B2332]">My Quotes</h1>
                <Btn size="sm" onClick={() => onNav("rfq")}><Plus className="w-3.5 h-3.5" /> New Quote</Btn>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                        {["Quote #", "Submitted", "Valid Until", "Total", "Status", ""].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-[13px] font-medium text-[#475569]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {QUOTES.map((q) => (
                        <tr key={q.id} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFBFC]">
                          <td className="px-4 py-3 font-medium text-[#1B2332]">{q.id}</td>
                          <td className="px-4 py-3 text-[#94A3B8]">{q.date}</td>
                          <td className="px-4 py-3 text-[#94A3B8]">{q.expiry}</td>
                          <td className="px-4 py-3 font-medium text-[#1B2332]">${q.total.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[13px] font-medium ${q.status === "active" ? "text-[#16A34A]" : q.status === "expired" ? "text-[#DC2626]" : "text-[#94A3B8]"}`}>
                              {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {q.status === "active" && (
                              <Btn size="sm" variant="secondary" onClick={() => onNav("cart")}>
                                Convert to Order <ArrowRight className="w-3 h-3" />
                              </Btn>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Reorder Lists ── */}
          {section === "reorder" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h1 className="text-[20px] font-semibold text-[#1B2332]">Reorder Lists</h1>
                <Btn size="sm" variant="secondary"><Plus className="w-3.5 h-3.5" /> New List</Btn>
              </div>
              <div className="space-y-3">
                {reorderLists.map((list, i) => (
                  <div key={i} className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[15px] font-medium text-[#1B2332]">{list.name}</div>
                      <div className="flex items-center gap-4 text-[13px] text-[#94A3B8] mt-1">
                        <span>{list.items} items</span>
                        <span>Last ordered: {list.lastOrdered}</span>
                        <span>~${list.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Btn size="sm" variant="secondary"><Edit className="w-3 h-3" /> Edit</Btn>
                      <Btn size="sm" onClick={() => onNav("cart")}>Add All to Cart</Btn>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── RMA / Returns ── */}
          {section === "rma" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h1 className="text-[20px] font-semibold text-[#1B2332]">Returns & RMA</h1>
                <Btn size="sm"><Plus className="w-3.5 h-3.5" /> New Return Request</Btn>
              </div>

              {/* New RMA form */}
              <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 mb-5">
                <h3 className="text-[14px] font-semibold text-[#1B2332] mb-4">Submit Return Request</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <FieldInput label="Order Number" placeholder="e.g. ORD-10042" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#1B2332]">Item</label>
                    <select className="border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] bg-white outline-none focus:border-[#1B2332] min-h-[46px]">
                      <option>Select item from order...</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#1B2332]">Reason</label>
                    <select className="border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] bg-white outline-none focus:border-[#1B2332] min-h-[46px]">
                      <option>Damaged in transit</option>
                      <option>Defective product</option>
                      <option>Wrong item shipped</option>
                      <option>No longer needed</option>
                    </select>
                  </div>
                  <FieldInput label="Quantity" placeholder="1" inputMode="numeric" />
                </div>
                <div className="mb-4">
                  <label className="text-[13px] font-medium text-[#1B2332] block mb-1.5">Description</label>
                  <textarea rows={3} className="w-full border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] outline-none focus:border-[#1B2332] resize-none placeholder:text-[#94A3B8]" placeholder="Describe the issue..." />
                </div>
                <div className="mb-4">
                  <label className="text-[13px] font-medium text-[#1B2332] block mb-1.5">Upload Documents / Photos</label>
                  <div className="border-2 border-dashed border-[#E5E7EB] rounded-[6px] p-6 flex flex-col items-center justify-center hover:border-[#94A3B8] transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-[#94A3B8] mb-2" />
                    <div className="text-[14px] text-[#475569]">Click to upload or drag and drop</div>
                    <div className="text-[12px] text-[#94A3B8] mt-1">PNG, JPG, PDF up to 10MB</div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Btn size="sm" variant="secondary">Cancel</Btn>
                  <Btn size="sm">Submit RMA Request</Btn>
                </div>
              </div>

              {/* RMA history */}
              <div className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                        {["RMA #", "Order", "Item", "Reason", "Status", "Submitted"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-[13px] font-medium text-[#475569]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rmaItems.map((r) => (
                        <tr key={r.id} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFBFC]">
                          <td className="px-4 py-3 font-medium text-[#1B2332]">{r.id}</td>
                          <td className="px-4 py-3 text-[#94A3B8]">{r.order}</td>
                          <td className="px-4 py-3 text-[#475569]">{r.item}</td>
                          <td className="px-4 py-3 text-[#94A3B8]">{r.reason}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[13px] font-medium ${r.status === "approved" ? "text-[#16A34A]" : r.status === "pending" ? "text-[#D97706]" : "text-[#94A3B8]"}`}>
                              {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#94A3B8]">{r.submitted}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Addresses ── */}
          {section === "addresses" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h1 className="text-[20px] font-semibold text-[#1B2332]">Saved Addresses</h1>
                <Btn size="sm" variant="secondary"><Plus className="w-3.5 h-3.5" /> Add Address</Btn>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {addresses.map((a, i) => (
                  <div key={i} className={`bg-white border-2 rounded-[6px] p-4 ${a.isDefault ? "border-[#1B2332]" : "border-[#E5E7EB]"}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-[14px] font-medium text-[#1B2332]">{a.label}</div>
                      {a.isDefault && <span className="text-[11px] font-medium text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded">Default</span>}
                    </div>
                    <div className="text-[14px] text-[#475569] space-y-0.5">
                      <div>{a.name}</div>
                      <div>{a.line}</div>
                      <div>{a.city}</div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E5E7EB]">
                      <button className="text-[13px] text-[#1B2332] hover:underline flex items-center gap-1"><Edit className="w-3 h-3" /> Edit</button>
                      {!a.isDefault && <button className="text-[13px] text-[#94A3B8] hover:text-[#DC2626] flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Account Settings ── */}
          {section === "settings" && (
            <div>
              <h1 className="text-[20px] font-semibold text-[#1B2332] mb-5">Account Settings</h1>
              <div className="space-y-5">
                <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5">
                  <h3 className="text-[14px] font-semibold text-[#1B2332] mb-4">Company Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FieldInput label="Company Name" placeholder="Acme Corporation" />
                    <FieldInput label="Industry" placeholder="Healthcare" />
                    <FieldInput label="Tax ID / VAT" placeholder="XX-XXXXXXX" />
                    <FieldInput label="Phone" placeholder="+1 (555) 000-0000" inputMode="tel" />
                  </div>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5">
                  <h3 className="text-[14px] font-semibold text-[#1B2332] mb-4">Contact Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FieldInput label="First Name" placeholder="John" />
                    <FieldInput label="Last Name" placeholder="Smith" />
                    <FieldInput label="Email" type="email" placeholder="john@acmecorp.com" className="sm:col-span-2" />
                  </div>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5">
                  <h3 className="text-[14px] font-semibold text-[#1B2332] mb-4">Password</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                    <FieldInput label="Current Password" type="password" placeholder="••••••••" className="sm:col-span-2" />
                    <FieldInput label="New Password" type="password" placeholder="••••••••" />
                    <FieldInput label="Confirm Password" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Btn variant="secondary">Cancel</Btn>
                  <Btn>Save Changes</Btn>
                </div>
              </div>
            </div>
          )}

          {/* ── Certificates & Compliance (Distributor B2B Tier Exclusive — Scope Q3) ── */}
          {section === "certificates" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[11px] font-bold text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded uppercase tracking-wider">Authorized Distributor Exclusive</span>
                  <h1 className="text-[20px] font-semibold text-[#1B2332] mt-1">Regulatory & Compliance Documents</h1>
                </div>
                <Btn size="sm" variant="secondary"><Download className="w-3.5 h-3.5" /> Download All ZIP</Btn>
              </div>
              <div className="bg-[#FEF3C7] border border-[#FDE68A] p-4 rounded-[8px] text-[13px] text-[#92400E] mb-6 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 text-[#D97706] mt-0.5" />
                <div>
                  <strong className="font-bold">Distributor Verification Active:</strong> These official compliance certificates are restricted to verified B2B distributor partners for hospital tender submissions and regional health ministry audits.
                </div>
              </div>
              <div className="space-y-3">
                {[
                  ["ISO 9001:2015 Medical Device Distribution Certificate", "Valid through Dec 2027 · Regulatory Body: BSI", "2.4 MB"],
                  ["CE Declaration of Conformity — Prestan & Zoll Lines", "European Medical Device Regulation (MDR) Compliance", "1.8 MB"],
                  ["FDA Medical Device Distributor Registration Letter", "US Food & Drug Administration Official Establishment ID", "0.9 MB"],
                  ["B2B Tax Resale & VAT Zero-Rating Authorization Letter", "GCC & International Trade Customs Clearance Document", "1.1 MB"],
                ].map(([title, sub, size], i) => (
                  <div key={i} className="bg-white border border-[#E5E7EB] rounded-[8px] p-4 flex items-center justify-between hover:border-[#0284C7] transition-all shadow-2xs">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 bg-[#E0F2FE] rounded-[6px] flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5 text-[#0284C7]" /></div>
                      <div>
                        <div className="text-[14.5px] font-bold text-[#1B2332]">{title}</div>
                        <div className="text-[12.5px] text-[#64748B] mt-0.5">{sub} · PDF {size}</div>
                      </div>
                    </div>
                    <Btn size="sm" onClick={() => alert(`Downloading Certified Document: ${title}...`)}><Download className="w-3.5 h-3.5 mr-1" /> Download PDF</Btn>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Marketing Assets & Feeds (Reseller Partner Exclusive) ── */}
          {section === "marketing" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[11px] font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded uppercase tracking-wider">Reseller Partner Exclusive</span>
                  <h1 className="text-[20px] font-semibold text-[#1B2332] mt-1">Marketing Assets & E-Commerce Data Feeds</h1>
                </div>
                <Btn size="sm"><Share2 className="w-3.5 h-3.5" /> API Feed Access</Btn>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 space-y-3 shadow-2xs">
                  <div className="w-10 h-10 bg-[#FEF3C7] rounded-[8px] flex items-center justify-center text-[#D97706] font-bold"><Image className="w-5 h-5" /></div>
                  <h3 className="text-[17px] font-bold text-[#1B2332]">Hi-Res Photography & Studio Pack</h3>
                  <p className="text-[13.5px] text-[#475569]">Over 400 transparent-background PNGs, lifestyle clinic shots, and 360-degree AED product spins for your resale website.</p>
                  <Btn size="sm" variant="secondary" className="w-full mt-2" onClick={() => alert("Downloading Hi-Res Photo ZIP (480 MB)...")}><Download className="w-3.5 h-3.5 mr-1.5" /> Download Studio Pack (480 MB)</Btn>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 space-y-3 shadow-2xs">
                  <div className="w-10 h-10 bg-[#E0F2FE] rounded-[8px] flex items-center justify-center text-[#0284C7] font-bold"><FileText className="w-5 h-5" /></div>
                  <h3 className="text-[17px] font-bold text-[#1B2332]">Live Catalog CSV / XML Feed</h3>
                  <p className="text-[13.5px] text-[#475569]">Automated product data feed with live distributor pricing, EAN/UPC barcodes, weight specifications, and inventory quantities.</p>
                  <Btn size="sm" className="w-full mt-2" onClick={() => alert("Generating automated E-Commerce Data Feed URL...")}><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy CSV Feed URL</Btn>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <SiteFooter onNav={onNav} />
    </div>
  );
}
