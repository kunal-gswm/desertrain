import { useState } from "react";
import {
  Plus, Search, Edit, Archive, Trash2, Upload, ChevronDown,
  Package, Eye,
} from "lucide-react";
import type { Screen } from "../../types";
import { PRODUCTS, CATEGORIES } from "../data/mockData";
import { Btn } from "../components/shared/Btn";
import { FieldInput } from "../components/shared/FieldInput";
import { ProductPlaceholder } from "../components/shared/ProductPlaceholder";

/**
 * AdminCMS — Light token cleanup only. Dashboard UI conventions kept.
 */
export function AdminCMS({ onNav }: { onNav: (s: Screen) => void }) {
  const [view, setView] = useState("products");
  const [activeTab, setActiveTab] = useState("general");

  const sidebar = [
    { id: "products", icon: Package, label: "Products" },
    { id: "categories", icon: Archive, label: "Categories" },
    { id: "pages", icon: Edit, label: "Pages" },
  ];

  return (
    <div className="bg-[#FAFBFC] min-h-screen flex">
      <aside className="w-56 bg-[#1B2332] text-white shrink-0 min-h-screen flex flex-col">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-[6px] flex items-center justify-center">
            <Package className="w-4 h-4 text-[#1B2332]" />
          </div>
          <div>
            <div className="font-semibold text-[14px]">Desert Rain</div>
            <div className="text-[11px] text-white/40 uppercase tracking-wider">Admin CMS</div>
          </div>
        </div>
        <nav className="flex-1 py-2">
          {sidebar.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[14px] transition-colors ${
                view === item.id ? "bg-white/10 text-white font-medium border-r-2 border-white" : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => setView(item.id)}
            >
              <item.icon className="w-4 h-4 shrink-0" /> {item.label}
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
            {view === "products" ? "Product Catalog" : view === "categories" ? "Categories" : "Pages"}
          </div>
          <div className="flex gap-2">
            <div className="flex items-center border border-[#E5E7EB] rounded-[6px] bg-white">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] ml-2.5" />
              <input placeholder="Search..." className="px-2 py-1.5 text-[13px] outline-none w-48" />
            </div>
            <Btn size="sm"><Plus className="w-3.5 h-3.5" /> Add Product</Btn>
          </div>
        </div>

        <div className="p-6">
          {view === "products" && (
            <div className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                      <th className="px-3 py-2.5 w-8"><div className="w-3.5 h-3.5 border border-[#E5E7EB] rounded-[3px]" /></th>
                      {["Image", "SKU", "Product Name", "Category", "Price", "Stock", "Status", "Actions"].map((col) => (
                        <th key={col} className="text-left px-3 py-2.5 font-medium text-[#475569] whitespace-nowrap">
                          <span className="flex items-center gap-1">{col} <ChevronDown className="w-3 h-3 text-[#CBD5E1]" /></span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCTS.map((p, i) => (
                      <tr key={p.id} className={`border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFBFC] ${i % 2 !== 0 ? "bg-[#FAFBFC]" : ""}`}>
                        <td className="px-3 py-2.5"><div className="w-3.5 h-3.5 border border-[#E5E7EB] rounded-[3px]" /></td>
                        <td className="px-3 py-2.5"><div className="w-10 h-10 bg-[#F1F3F5] rounded-[6px] overflow-hidden"><ProductPlaceholder className="w-full h-full" /></div></td>
                        <td className="px-3 py-2.5 font-mono text-[#94A3B8] text-[12px]">{p.sku}</td>
                        <td className="px-3 py-2.5 font-medium text-[#1B2332]">{p.name}</td>
                        <td className="px-3 py-2.5 text-[#94A3B8]">{p.category}</td>
                        <td className="px-3 py-2.5 font-medium text-[#1B2332]">${p.price.toFixed(2)}</td>
                        <td className="px-3 py-2.5 text-[#475569]">{p.qty}</td>
                        <td className="px-3 py-2.5">
                          <span className={`text-[12px] font-medium px-2 py-0.5 rounded-[4px] ${i % 3 === 2 ? "text-[#D97706] bg-[#FFFBEB]" : "text-[#16A34A] bg-[#F0FDF4]"}`}>
                            {i % 3 === 2 ? "Draft" : "Published"}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex gap-2">
                            <button className="text-[#1B2332] font-medium hover:underline flex items-center gap-1 text-[13px]"><Edit className="w-3 h-3" />Edit</button>
                            <span className="text-[#E5E7EB]">|</span>
                            <button className="text-[#94A3B8] hover:text-[#475569] flex items-center gap-1 text-[13px]"><Archive className="w-3 h-3" />Archive</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === "categories" && (
            <div className="bg-white border border-[#E5E7EB] rounded-[6px] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                      {["Category", "Products", "Status", "Actions"].map((col) => (
                        <th key={col} className="text-left px-4 py-2.5 font-medium text-[#475569]">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CATEGORIES.map((c) => (
                      <tr key={c.id} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFBFC]">
                        <td className="px-4 py-3 font-medium text-[#1B2332]">{c.label}</td>
                        <td className="px-4 py-3 text-[#94A3B8]">{c.count}</td>
                        <td className="px-4 py-3"><span className="text-[12px] font-medium text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-[4px]">Active</span></td>
                        <td className="px-4 py-3"><button className="text-[13px] text-[#1B2332] font-medium hover:underline">Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === "pages" && (
            <div className="text-[14px] text-[#94A3B8] text-center py-12">Page management coming soon</div>
          )}
        </div>
      </div>
    </div>
  );
}
