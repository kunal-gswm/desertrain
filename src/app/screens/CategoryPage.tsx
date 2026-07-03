import { useState } from "react";
import { ChevronRight, ChevronLeft, ChevronUp, X, Check, LayoutGrid, AlignJustify, Sliders, Eye } from "lucide-react";
import type { Screen, Product } from "../../types";
import { PRODUCTS } from "../data/mockData";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Btn } from "../components/shared/Btn";
import { ProductCard } from "../components/shared/ProductCard";
import { StockStatusDisplay } from "../components/shared/StockStatus";
import { CartToast, MiniCartDrawer } from "../components/shared/CartToast";

export function CategoryPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    setToastProduct(product);
    setTimeout(() => setMiniCartOpen(true), 300);
  };

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      <SiteHeader onNav={onNav} showCategories />
      <CartToast product={toastProduct} onClose={() => setToastProduct(null)} />
      <MiniCartDrawer open={miniCartOpen} onClose={() => setMiniCartOpen(false)} items={cartItems} />

      <div className="max-w-[1280px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#94A3B8] mb-6">
          <span className="cursor-pointer hover:text-[#1B2332] transition-colors" onClick={() => onNav("home")}>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1B2332] font-medium">CPR & AED Equipment</span>
        </div>

        <div className="flex gap-6">
          {/* ── Filters Sidebar ── */}
          <aside className={`fixed inset-0 z-50 lg:static lg:z-auto lg:block w-full lg:w-56 shrink-0 bg-white lg:bg-transparent overflow-y-auto lg:overflow-visible transition-transform ${filtersOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
            {/* Mobile close */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#E5E7EB] bg-white sticky top-0 z-10">
              <span className="text-[16px] font-semibold text-[#1B2332]">Filters</span>
              <button className="p-2 -mr-2 text-[#475569]" onClick={() => setFiltersOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 lg:p-0">
              <div className="sticky top-4">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[14px] font-semibold text-[#1B2332]">Filters</span>
                  <button className="text-[13px] text-[#94A3B8] hover:text-[#475569] transition-colors">Clear all</button>
                </div>

                {/* Brand filter */}
                {[
                  { title: "Brand", items: ["Prestan (42)", "Zoll (18)", "Physio-Control (14)", "Cardiac Science (11)", "MCR Medical (67)"], checked: [0] },
                  { title: "Certification", items: ["FDA Cleared (89)", "CE Marked (45)", "AHA Compliant (78)", "OSHA Compliant (34)"], checked: [] },
                ].map((section) => (
                  <div key={section.title} className="border-b border-[#E5E7EB] pb-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[13px] font-medium text-[#1B2332]">{section.title}</span>
                      <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />
                    </div>
                    <div className="space-y-2.5">
                      {section.items.map((item, i) => (
                        <label key={item} className="flex items-center gap-2.5 cursor-pointer group">
                          <div className={`w-4 h-4 border rounded-[4px] flex items-center justify-center shrink-0 transition-colors ${section.checked.includes(i) ? "bg-[#1B2332] border-[#1B2332]" : "border-[#E5E7EB] group-hover:border-[#94A3B8]"}`}>
                            {section.checked.includes(i) && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-[14px] text-[#475569]">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Price Range */}
                <div className="border-b border-[#E5E7EB] pb-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-medium text-[#1B2332]">Price Range</span>
                    <ChevronUp className="w-3.5 h-3.5 text-[#94A3B8]" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <input className="w-full border border-[#E5E7EB] rounded-[6px] px-2.5 py-1.5 text-[13px] text-center outline-none focus:border-[#1B2332]" defaultValue="$0" />
                    <span className="text-[#94A3B8]">–</span>
                    <input className="w-full border border-[#E5E7EB] rounded-[6px] px-2.5 py-1.5 text-[13px] text-center outline-none focus:border-[#1B2332]" defaultValue="$2,000" />
                  </div>
                  <div className="h-1 bg-[#E5E7EB] rounded-full relative">
                    <div className="absolute left-[5%] right-[28%] h-full bg-[#1B2332] rounded-full" />
                    <div className="absolute left-[4%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#1B2332] rounded-full border-2 border-white shadow cursor-pointer" />
                    <div className="absolute right-[27%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#1B2332] rounded-full border-2 border-white shadow cursor-pointer" />
                  </div>
                </div>

                {/* In stock toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#475569]">In Stock Only</span>
                  <div className="w-9 h-5 bg-[#1B2332] rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h1 className="text-[24px] font-semibold text-[#1B2332] mb-0.5">CPR & AED Equipment</h1>
                <p className="text-[14px] text-[#94A3B8]">124 products</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="lg:hidden px-3 py-2 border border-[#E5E7EB] rounded-[6px] text-[13px] font-medium text-[#475569] hover:bg-[#F1F3F5] min-h-[44px]" onClick={() => setFiltersOpen(true)}>
                  <Sliders className="w-4 h-4 inline-block mr-1.5" />Filters
                </button>
                <select className="border border-[#E5E7EB] rounded-[6px] px-3 py-2 text-[13px] text-[#475569] bg-white outline-none focus:border-[#1B2332]">
                  <option>Sort: Relevance</option>
                  <option>Price: Low → High</option>
                  <option>Price: High → Low</option>
                  <option>Top Rated</option>
                  <option>Newest</option>
                </select>
                <div className="flex border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                  <button className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#1B2332] text-white" : "bg-white text-[#94A3B8] hover:bg-[#F1F3F5]"}`} onClick={() => setViewMode("grid")}>
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button className={`p-2 transition-colors ${viewMode === "list" ? "bg-[#1B2332] text-white" : "bg-white text-[#94A3B8] hover:bg-[#F1F3F5]"}`} onClick={() => setViewMode("list")}>
                    <AlignJustify className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[13px] text-[#94A3B8]">Active:</span>
              {["Brand: Prestan", "In Stock"].map((f) => (
                <span key={f} className="flex items-center gap-1 bg-[#F1F3F5] text-[#475569] text-[13px] font-medium px-2.5 py-1 rounded-[6px]">
                  {f} <X className="w-3 h-3 cursor-pointer hover:text-[#1B2332]" />
                </span>
              ))}
            </div>

            {/* Product Grid */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRODUCTS.map((p) => (
                  <ProductCard key={p.id} product={p} onNav={onNav} onAddToCart={handleAddToCart} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {PRODUCTS.map((p) => (
                  <div key={p.id} className="flex gap-4 p-4 border border-[#E5E7EB] rounded-[6px] bg-white hover:border-[#CBD5E1] transition-colors">
                    <div className="w-24 h-24 bg-[#F1F3F5] rounded-[6px] overflow-hidden shrink-0 flex items-center justify-center">
                      {p.image ? (
                        <img loading="lazy" src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <Eye className="w-6 h-6 text-[#CBD5E1]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-[#94A3B8]">{p.brand}</div>
                      <h3 className="text-[15px] font-medium text-[#1B2332] mt-0.5 hover:text-[#475569] cursor-pointer transition-colors" onClick={() => onNav("product")}>{p.name}</h3>
                      <p className="text-[13px] text-[#94A3B8] mt-1 line-clamp-1">Professional-grade medical product meeting regulatory standards.</p>
                    </div>
                    <div className="flex flex-col items-end justify-between shrink-0 gap-2">
                      <div className="text-right">
                        <StockStatusDisplay status={p.stock} deliveryEstimate={p.deliveryEstimate} />
                        <div className="text-[17px] font-semibold text-[#1B2332] mt-1">${p.price.toFixed(2)}</div>
                      </div>
                      <div className="flex gap-2">
                        <Btn size="sm" variant="secondary" onClick={() => onNav("product")}>View</Btn>
                        <Btn size="sm" onClick={() => handleAddToCart(p)}>Add to Cart</Btn>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#94A3B8]">Per page:</span>
                {[24, 48, 96].map((n) => (
                  <button key={n} className={`w-8 h-8 text-[13px] font-medium rounded-[6px] border transition-colors ${n === 24 ? "bg-[#1B2332] text-white border-[#1B2332]" : "border-[#E5E7EB] text-[#475569] hover:border-[#1B2332]"}`}>{n}</button>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 border border-[#E5E7EB] rounded-[6px] flex items-center justify-center hover:border-[#1B2332]"><ChevronLeft className="w-3.5 h-3.5 text-[#94A3B8]" /></button>
                {[1, 2, 3, "…", 6].map((p, i) => (
                  <button key={i} className={`w-8 h-8 border text-[13px] font-medium rounded-[6px] transition-colors ${p === 1 ? "bg-[#1B2332] text-white border-[#1B2332]" : "border-[#E5E7EB] text-[#475569] hover:border-[#1B2332]"}`}>{p}</button>
                ))}
                <button className="w-8 h-8 border border-[#E5E7EB] rounded-[6px] flex items-center justify-center hover:border-[#1B2332]"><ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
