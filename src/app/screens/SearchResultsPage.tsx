import { useState } from "react";
import { Search, Filter, SlidersHorizontal, Tag, Sparkles, Check, ChevronDown, ArrowRight, Star } from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { PRODUCTS } from "../data/mockData";
import type { Screen, Product } from "../types";
import { ProductCard } from "../components/shared/ProductCard";

export function SearchResultsPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [searchQuery, setSearchQuery] = useState("Manikin");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [manikinType, setManikinType] = useState<string>("All"); // Adult / Child / Infant Manikins
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyNewArrivals, setOnlyNewArrivals] = useState<boolean>(false);
  const [onlyPromotions, setOnlyPromotions] = useState<boolean>(false);

  // Filter products based on search criteria
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.itemCode && p.itemCode.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    
    // Explicit Manikin filter specific to CPR training
    let matchesManikin = true;
    if (manikinType === "Adult") matchesManikin = p.name.includes("Adult") || (p.gender === "Adult") || p.category !== "CPR Training";
    if (manikinType === "Child") matchesManikin = p.name.includes("Child") || p.category !== "CPR Training";
    if (manikinType === "Infant") matchesManikin = p.name.includes("Infant") || p.category !== "CPR Training";

    const matchesPrice = p.price <= priceRange;
    const matchesStock = !onlyInStock || p.stock === "in-stock";

    return matchesQuery && matchesBrand && matchesCat && matchesManikin && matchesPrice && matchesStock;
  });

  const suggestions = [
    "Prestan Adult Manikin",
    "Zoll AED Plus",
    "MCR First Aid Kit",
    "N95 Respirators 20pk",
    "Infant CPR Training",
    "Bag Valve Mask Resuscitator"
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
      <SiteHeader onNav={onNav} />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8">
        {/* SEO & Search Header */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-6 mb-8 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#0284C7] mb-1">
                <Sparkles className="w-4 h-4" /> Dedicated Search & Discovery Hub
              </div>
              <h1 className="text-[26px] font-bold text-[#1B2332]">
                Search Results for <span className="text-[#0284C7]">"{searchQuery || "All Products"}"</span>
              </h1>
            </div>
            {/* SEO URL Badge */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] px-3.5 py-2 rounded-[6px] text-[12px] font-mono text-[#475569] flex items-center gap-2">
              <span className="text-[#94A3B8]">SEO URL:</span>
              <span className="text-[#0284C7] font-semibold">/search?q={encodeURIComponent(searchQuery.toLowerCase() || "all")}&filter={manikinType.toLowerCase()}</span>
            </div>
          </div>

          {/* Big Search Bar */}
          <div className="relative flex items-center max-w-3xl">
            <Search className="absolute left-4 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, SKU, distributor item code, or brand..."
              className="w-full pl-12 pr-4 py-3.5 bg-[#FAFBFC] border border-[#E5E7EB] rounded-[8px] text-[15px] text-[#1B2332] outline-none focus:border-[#0284C7] focus:bg-white shadow-2xs transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 text-[12px] text-[#94A3B8] hover:text-[#1B2332] font-medium">
                Clear
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions / Chips */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-[12px] font-semibold text-[#64748B] mr-1">Popular Suggestions:</span>
            {suggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(sug.split(" ")[0])}
                className="px-2.5 py-1 rounded-full text-[12px] bg-[#F1F5F9] text-[#475569] hover:bg-[#E0F2FE] hover:text-[#0369A1] transition-colors flex items-center gap-1"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter Panel */}
          <aside className="space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                <span className="font-bold text-[#1B2332] text-[15px] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#0284C7]" /> Search Filters
                </span>
                <button
                  onClick={() => {
                    setSelectedBrand("All");
                    setSelectedCategory("All");
                    setManikinType("All");
                    setPriceRange(2000);
                    setOnlyInStock(false);
                    setOnlyNewArrivals(false);
                    setOnlyPromotions(false);
                  }}
                  className="text-[12px] text-[#0284C7] hover:underline font-medium"
                >
                  Reset All
                </button>
              </div>

              {/* Explicit CPR Manikin Filter (Required Scope) */}
              <div>
                <label className="text-[13px] font-semibold text-[#1B2332] block mb-2.5">
                  CPR Manikin Type (MCR Model)
                </label>
                <div className="grid grid-cols-2 gap-1.5 bg-[#F8FAFC] p-1 rounded-[6px] border border-[#E5E7EB]">
                  {["All", "Adult", "Child", "Infant"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setManikinType(type)}
                      className={`py-1.5 text-[12px] font-semibold rounded-[4px] transition-all ${
                        manikinType === type
                          ? "bg-[#0284C7] text-white shadow-2xs"
                          : "text-[#475569] hover:text-[#1B2332]"
                      }`}
                    >
                      {type} {type !== "All" && "Manikin"}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-[#94A3B8] block mt-1">Filters training manikins by age & anatomy</span>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="text-[13px] font-semibold text-[#1B2332] block mb-2">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFBFC] border border-[#E5E7EB] rounded-[6px] text-[13px] text-[#1B2332] outline-none focus:border-[#0284C7]"
                >
                  <option value="All">All Brands</option>
                  <option value="Prestan">Prestan</option>
                  <option value="Zoll">Zoll</option>
                  <option value="MCR Medical">MCR Medical</option>
                  <option value="3M">3M</option>
                  <option value="Ferno">Ferno</option>
                  <option value="LSP">LSP</option>
                </select>
              </div>

              {/* Product Category Filter */}
              <div>
                <label className="text-[13px] font-semibold text-[#1B2332] block mb-2">Product Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFBFC] border border-[#E5E7EB] rounded-[6px] text-[13px] text-[#1B2332] outline-none focus:border-[#0284C7]"
                >
                  <option value="All">All Categories</option>
                  <option value="CPR Training">CPR Training</option>
                  <option value="AED">AED Defibrillators</option>
                  <option value="First Aid">First Aid Kits</option>
                  <option value="Respiratory">Respiratory</option>
                  <option value="Gloves">Exam Gloves</option>
                  <option value="Airway">Airway Management</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[13px] font-semibold text-[#1B2332]">Max Price</label>
                  <span className="text-[13px] font-bold text-[#0284C7]">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#0284C7] cursor-pointer"
                />
              </div>

              {/* Status & Promotions Checkboxes */}
              <div className="space-y-2.5 pt-2 border-t border-[#E5E7EB]">
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#475569] hover:text-[#1B2332]">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded accent-[#0284C7] w-4 h-4"
                  />
                  <span>Product Availability (In Stock Only)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#475569] hover:text-[#1B2332]">
                  <input
                    type="checkbox"
                    checked={onlyNewArrivals}
                    onChange={(e) => setOnlyNewArrivals(e.target.checked)}
                    className="rounded accent-[#0284C7] w-4 h-4"
                  />
                  <span>New Arrivals (Q3 2025 Release)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#475569] hover:text-[#1B2332]">
                  <input
                    type="checkbox"
                    checked={onlyPromotions}
                    onChange={(e) => setOnlyPromotions(e.target.checked)}
                    className="rounded accent-[#0284C7] w-4 h-4"
                  />
                  <span>Promotions & Distributor Rebates</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between bg-white px-5 py-3.5 border border-[#E5E7EB] rounded-[8px] shadow-2xs">
              <span className="text-[14px] text-[#475569]">
                Showing <strong className="text-[#1B2332]">{filteredProducts.length}</strong> search results
              </span>
              <div className="flex items-center gap-2 text-[13px] text-[#475569]">
                <span>Sort by:</span>
                <select className="bg-transparent font-semibold text-[#1B2332] outline-none cursor-pointer">
                  <option>Relevance (Best Match)</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Customer Rating</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onNav={onNav}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-12 text-center max-w-lg mx-auto my-8">
                <Search className="w-12 h-12 text-[#94A3B8] mx-auto mb-4 opacity-40" />
                <h3 className="text-[18px] font-bold text-[#1B2332] mb-1">No products found matching filters</h3>
                <p className="text-[14px] text-[#64748B] mb-6">
                  Try broadening your keyword search or removing the CPR Manikin Type filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedBrand("All");
                    setSelectedCategory("All");
                    setManikinType("All");
                  }}
                  className="px-5 py-2.5 bg-[#0284C7] text-white rounded-[6px] text-[13.5px] font-semibold hover:bg-[#0369A1] transition-colors"
                >
                  Reset Search & View All
                </button>
              </div>
            )}

            {/* Related Product Recommendations Block */}
            <div className="border-t border-[#E5E7EB] pt-8 mt-12">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#1B2332] flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#0284C7]" /> Related Product Recommendations
                </h3>
                <button onClick={() => onNav("store")} className="text-[13px] text-[#0284C7] font-semibold hover:underline flex items-center gap-1">
                  View Full Store Catalogue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <ProductCard key={p.id} product={p} onNav={onNav} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter onNav={onNav} />
    </div>
  );
}
