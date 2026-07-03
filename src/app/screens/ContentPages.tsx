import { useState } from "react";
import { 
  ShieldCheck, Globe, Award, CheckCircle2, MapPin, Building, Phone, Mail, 
  FileText, Calendar, Download, Users, Briefcase, ExternalLink, SlidersHorizontal, 
  Sparkles, ChevronRight, Layers, HelpCircle, ArrowRight, Check, Search
} from "lucide-react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { PRODUCTS, CATEGORIES } from "../data/mockData";
import type { Screen, Product } from "../types";
import { ProductCard } from "../components/shared/ProductCard";
import { Btn } from "../components/shared/Btn";

// ─────────────────────────────────────────────────────────────
// 1. STORE CATALOGUE PAGE (MCR Medical Structural Reference)
// ─────────────────────────────────────────────────────────────
export function StoreCataloguePage({ onNav }: { onNav: (s: Screen) => void }) {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [skinTone, setSkinTone] = useState<string>("All");
  const [gender, setGender] = useState<string>("All");
  const [productType, setProductType] = useState<string>("All");
  const [series, setSeries] = useState<string>("All");
  const [size, setSize] = useState<string>("All");
  const [showBackordersWithLeadTime, setShowBackordersWithLeadTime] = useState<boolean>(true);

  const filtered = PRODUCTS.filter((p) => {
    const matchesCat = selectedCat === "All" || p.category === selectedCat;
    const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
    const matchesSkin = skinTone === "All" || (p.skinTone && p.skinTone.includes(skinTone));
    const matchesGender = gender === "All" || (p.gender && p.gender.includes(gender));
    const matchesSeries = series === "All" || (p.series && p.series.includes(series));
    const matchesSize = size === "All" || (p.size && p.size.includes(size));
    const matchesBackorder = showBackordersWithLeadTime || p.stock !== "lead-time";
    return matchesCat && matchesBrand && matchesSkin && matchesGender && matchesSeries && matchesSize && matchesBackorder;
  });

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
      <SiteHeader onNav={onNav} showCategories={false} />
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8">
        <div className="bg-[#1B2332] text-white rounded-[12px] p-8 mb-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-[#0284C7] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3 inline-block">
              Official B2B Medical Catalogue
            </span>
            <h1 className="text-[30px] font-bold mb-2">Desert Rain Store & Catalogue</h1>
            <p className="text-white/70 text-[14.5px] leading-relaxed">
              Explore deep category tree hierarchies, specialized clinical filters (skin tone, series, package sizes), and live back-order production lead times.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Expanded Sidebar Filters (Required Scope) */}
          <aside className="space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                <span className="font-bold text-[#1B2332] text-[15px] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#0284C7]" /> Filter Suite
                </span>
                <button onClick={() => { setSelectedCat("All"); setSelectedBrand("All"); setSkinTone("All"); setGender("All"); setSeries("All"); setSize("All"); }} className="text-[12px] text-[#0284C7] hover:underline font-medium">Reset All</button>
              </div>

              {/* Category Tree Depth */}
              <div>
                <label className="text-[13px] font-semibold text-[#1B2332] block mb-2">Category Hierarchy</label>
                <div className="space-y-1">
                  <button onClick={() => setSelectedCat("All")} className={`w-full text-left px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors ${selectedCat === "All" ? "bg-[#E0F2FE] text-[#0369A1] font-semibold" : "text-[#475569] hover:bg-[#F8FAFC]"}`}>All Categories ({PRODUCTS.length})</button>
                  {CATEGORIES.map((c) => (
                    <button key={c.id} onClick={() => setSelectedCat(c.label.split(" ")[0])} className={`w-full text-left px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors flex items-center justify-between ${selectedCat === c.label.split(" ")[0] ? "bg-[#E0F2FE] text-[#0369A1] font-semibold" : "text-[#475569] hover:bg-[#F8FAFC]"}`}>
                      <span>↳ {c.label}</span>
                      <span className="text-[11px] text-[#94A3B8]">{c.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Colour / Skin Tone Filter (Required Scope) */}
              <div>
                <label className="text-[13px] font-semibold text-[#1B2332] block mb-2">Colour / Skin Tone</label>
                <select value={skinTone} onChange={(e) => setSkinTone(e.target.value)} className="w-full px-3 py-2 bg-[#FAFBFC] border border-[#E5E7EB] rounded-[6px] text-[13px]">
                  <option value="All">All Skin Tones / Colors</option>
                  <option value="Medium">Medium / Diverse</option>
                  <option value="Light">Light / Standard</option>
                  <option value="Dark">Dark / Deep Tone</option>
                </select>
              </div>

              {/* Gender & Product Type */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[12px] font-semibold text-[#1B2332] block mb-1">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-2 py-1.5 bg-[#FAFBFC] border border-[#E5E7EB] rounded-[6px] text-[12px]">
                    <option value="All">All</option>
                    <option value="Adult">Adult</option>
                    <option value="Child">Child</option>
                    <option value="Infant">Infant</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#1B2332] block mb-1">Size</label>
                  <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full px-2 py-1.5 bg-[#FAFBFC] border border-[#E5E7EB] rounded-[6px] text-[12px]">
                    <option value="All">All Sizes</option>
                    <option value="Large">Large / XL</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
              </div>

              {/* Series Filter */}
              <div>
                <label className="text-[13px] font-semibold text-[#1B2332] block mb-2">Product Series</label>
                <select value={series} onChange={(e) => setSeries(e.target.value)} className="w-full px-3 py-2 bg-[#FAFBFC] border border-[#E5E7EB] rounded-[6px] text-[13px]">
                  <option value="All">All Series</option>
                  <option value="Professional">Professional Series</option>
                  <option value="AED Plus">AED Plus</option>
                  <option value="Emergency">Emergency Response</option>
                  <option value="3M">3M Health & Safety</option>
                </select>
              </div>

              {/* Back Order with Production Lead Time Inline */}
              <div className="pt-2 border-t border-[#E5E7EB]">
                <label className="flex items-start gap-2.5 cursor-pointer text-[13px] text-[#1B2332] font-medium">
                  <input type="checkbox" checked={showBackordersWithLeadTime} onChange={(e) => setShowBackordersWithLeadTime(e.target.checked)} className="rounded accent-[#0284C7] mt-1 w-4 h-4" />
                  <div>
                    <span>Show Back-Order Products</span>
                    <span className="block text-[11px] text-[#D97706] font-semibold mt-0.5">Displays inline production lead times (e.g., 4–6 weeks)</span>
                  </div>
                </label>
              </div>
            </div>
          </aside>

          {/* Catalog Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between bg-white px-5 py-3.5 border border-[#E5E7EB] rounded-[8px] shadow-2xs">
              <span className="text-[14px] text-[#475569]">Showing <strong className="text-[#1B2332]">{filtered.length}</strong> products in catalogue</span>
              <div className="flex items-center gap-2 text-[13px] text-[#475569]">
                <span>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent font-semibold text-[#1B2332] outline-none">
                  <option value="relevance">Relevance / Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <div key={p.id} className="relative group">
                  <ProductCard product={p} onNav={onNav} />
                  {p.leadTimeInline && (
                    <div className="mt-2 p-2 bg-[#FEF3C7] border border-[#FDE68A] rounded-[6px] text-[11px] font-semibold text-[#92400E] flex items-center justify-center gap-1.5 text-center">
                      <Calendar className="w-3.5 h-3.5 shrink-0 text-[#D97706]" />
                      <span>{p.leadTimeInline}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter onNav={onNav} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. ABOUT US (Vision, Mission, Corporate History)
// ─────────────────────────────────────────────────────────────
export function AboutUsPage({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
      <SiteHeader onNav={onNav} />
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center">
            <span className="text-[#0284C7] font-bold text-[13px] uppercase tracking-wider">About Desert Rain LLC</span>
            <h1 className="text-[36px] font-bold text-[#1B2332] mt-2 mb-4">Empowering Healthcare & Emergency Response Since 1998</h1>
            <p className="text-[16px] text-[#475569] leading-relaxed">
              We are a premier B2B distributor of medical devices, EMS transport equipment, and industrial PPE across the GCC and global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E5E7EB] p-8 rounded-[12px] shadow-2xs space-y-4">
              <div className="w-12 h-12 bg-[#E0F2FE] rounded-[10px] flex items-center justify-center text-[#0284C7]"><Globe className="w-6 h-6" /></div>
              <h2 className="text-[20px] font-bold text-[#1B2332]">Our Vision</h2>
              <p className="text-[14.5px] text-[#475569] leading-relaxed">
                To be the most trusted, clinically verified supply chain benchmark for healthcare institutions, first responders, and distributor networks across the Middle East and beyond.
              </p>
            </div>
            <div className="bg-white border border-[#E5E7EB] p-8 rounded-[12px] shadow-2xs space-y-4">
              <div className="w-12 h-12 bg-[#E0F2FE] rounded-[10px] flex items-center justify-center text-[#0284C7]"><ShieldCheck className="w-6 h-6" /></div>
              <h2 className="text-[20px] font-bold text-[#1B2332]">Our Mission</h2>
              <p className="text-[14.5px] text-[#475569] leading-relaxed">
                To supply lifesaving medical technologies with uncompromising compliance, rapid B2B fulfillment, and transparent production lead-time accuracy for every hospital and clinic we serve.
              </p>
            </div>
          </div>

          <div className="bg-[#1B2332] text-white p-8 rounded-[12px] grid grid-cols-3 gap-6 text-center">
            <div><div className="text-[32px] font-bold text-[#38BDF8]">27+</div><div className="text-[13px] text-white/60">Years in Healthcare</div></div>
            <div><div className="text-[32px] font-bold text-[#38BDF8]">4,500+</div><div className="text-[13px] text-white/60">B2B Partners Served</div></div>
            <div><div className="text-[32px] font-bold text-[#38BDF8]">ISO 9001</div><div className="text-[13px] text-white/60">Certified Quality</div></div>
          </div>
        </div>
      </main>
      <SiteFooter onNav={onNav} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. DISTRIBUTOR LOCATOR PAGE (Map vs. List Toggle — Resolves Q4)
// ─────────────────────────────────────────────────────────────
export function DistributorLocatorPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [selectedRegion, setSelectedRegion] = useState<string>("All GCC");

  const distributors = [
    { name: "Al-Shifa Medical Supply LLC", city: "Dubai, UAE", address: "Healthcare City, Bldg 24", phone: "+971 4 321 0987", status: "Authorized Gold Distributor", lat: "25.2048° N, 55.2708° E" },
    { name: "Gulf MedTech Solutions", city: "Abu Dhabi, UAE", address: "Corniche Medical Tower 4", phone: "+971 2 456 7890", status: "Authorized Partner", lat: "24.4539° N, 54.3773° E" },
    { name: "Saudi Emergency Systems", city: "Riyadh, KSA", address: "King Fahd Road, Suite 302", phone: "+966 11 432 1098", status: "Master Reseller", lat: "24.7136° N, 46.6753° E" },
    { name: "Doha Clinical Sourcing", city: "Doha, Qatar", address: "West Bay Commercial Center", phone: "+974 4 444 3322", status: "Authorized Distributor", lat: "25.2854° N, 51.5310° E" }
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
      <SiteHeader onNav={onNav} />
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 border border-[#E5E7EB] rounded-[12px] shadow-2xs">
          <div>
            <span className="text-[#0284C7] font-bold text-[12px] uppercase tracking-wider">Global B2B Network</span>
            <h1 className="text-[26px] font-bold text-[#1B2332]">Distributor Locator</h1>
            <p className="text-[14px] text-[#475569]">Find authorized Desert Rain medical device distributors across the GCC and internationally.</p>
          </div>

          {/* Map vs List Toggle (Resolves Scope Question #4) */}
          <div className="flex items-center gap-2 bg-[#F1F5F9] p-1 rounded-[8px] border border-[#E5E7EB]">
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded-[6px] text-[13px] font-semibold flex items-center gap-2 transition-all ${
                viewMode === "map" ? "bg-[#0284C7] text-white shadow-2xs" : "text-[#475569] hover:text-[#1B2332]"
              }`}
            >
              <MapPin className="w-4 h-4" /> Interactive Map View
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-[6px] text-[13px] font-semibold flex items-center gap-2 transition-all ${
                viewMode === "list" ? "bg-[#0284C7] text-white shadow-2xs" : "text-[#475569] hover:text-[#1B2332]"
              }`}
            >
              <Building className="w-4 h-4" /> Directory List View
            </button>
          </div>
        </div>

        {viewMode === "map" ? (
          <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden shadow-2xs grid grid-cols-1 lg:grid-cols-3">
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-[#E5E7EB] space-y-4 max-h-[550px] overflow-y-auto">
              <div className="font-bold text-[#1B2332] text-[15px] mb-2">Select Distributor Region</div>
              {distributors.map((d, i) => (
                <div key={i} className="p-4 rounded-[8px] border border-[#E5E7EB] hover:border-[#0284C7] hover:bg-[#F8FAFC] transition-all cursor-pointer space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1B2332] text-[14px]">{d.name}</span>
                    <span className="text-[10px] bg-[#E0F2FE] text-[#0369A1] font-semibold px-2 py-0.5 rounded">{d.status}</span>
                  </div>
                  <div className="text-[12.5px] text-[#475569] flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#0284C7]" /> {d.city} — {d.address}</div>
                  <div className="text-[12.5px] text-[#64748B] flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#0284C7]" /> {d.phone}</div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2 bg-[#E2E8F0] min-h-[450px] flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0C1220]/80 to-[#1E293B]/90 flex flex-col items-center justify-center text-white p-8 text-center">
                <MapPin className="w-16 h-16 text-[#38BDF8] animate-bounce mb-4" />
                <h3 className="text-[22px] font-bold mb-2">Interactive GCC Distributor Map</h3>
                <p className="text-[14px] text-white/70 max-w-md mb-6">
                  Showing 4 authorized distribution hubs in Dubai, Abu Dhabi, Riyadh, and Doha with GPS coordinates and direct B2B inventory feeds.
                </p>
                <Btn size="md" onClick={() => setViewMode("list")}>Switch to Directory List View</Btn>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {distributors.map((d, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] p-6 rounded-[12px] shadow-2xs space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider">{d.status}</span>
                    <h3 className="text-[18px] font-bold text-[#1B2332] mt-0.5">{d.name}</h3>
                  </div>
                  <Building className="w-8 h-8 text-[#0284C7]/20" />
                </div>
                <div className="space-y-2 text-[14px] text-[#475569]">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0284C7]" /> {d.address}, {d.city}</div>
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#0284C7]" /> {d.phone}</div>
                  <div className="flex items-center gap-2 text-[12px] text-[#94A3B8] font-mono">GPS: {d.lat}</div>
                </div>
                <div className="pt-3 border-t border-[#E5E7EB] flex gap-3">
                  <Btn size="sm" variant="secondary" className="flex-1">Contact Hub</Btn>
                  <Btn size="sm" onClick={() => onNav("rfq")} className="flex-1">Send RFQ</Btn>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter onNav={onNav} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. LEGAL PORTAL (6 Tabbed Required Policies)
// ─────────────────────────────────────────────────────────────
export function LegalPortalPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<string>("privacy");

  const policies = [
    { id: "privacy", label: "Privacy Policy", title: "Corporate & B2B Data Privacy Policy", content: "Desert Rain LLC strictly protects corporate partner data, procurement records, and medical device compliance logs in adherence with GCC data protection regulations and international ISO standards." },
    { id: "terms", label: "Terms & Conditions", title: "B2B Distribution Terms & Conditions", content: "All wholesale orders, Net 30 credit terms, and distributor pricing tiers are governed by official bilateral distribution contracts. Prices subject to change based on international shipping tariffs." },
    { id: "returns", label: "Return & Refund Policy", title: "Clinical Goods Return & Refund Policy", content: "Due to sterilization and clinical hygiene regulations, sterile medical consumables cannot be returned once opened. Non-sterile training manikins carry a 30-day RMA return window." },
    { id: "warranty", label: "Warranty Policy", title: "Manufacturer Warranty Policy", content: "Prestan and Zoll training manikins and AEDs carry official 3-year to 5-year manufacturer warranties. Desert Rain handles all regional warranty claims and replacement part dispatches." },
    { id: "cookie", label: "Cookie Policy", title: "Digital Platform Cookie Policy", content: "We use essential session cookies to preserve B2B distributor login states, custom contract pricing tiers, and active shopping carts across devices." },
    { id: "disclaimer", label: "Disclaimer", title: "Clinical & Medical Disclaimer", content: "Products listed on this portal are intended for use by trained healthcare professionals, emergency medical technicians, and certified CPR instructors only." }
  ];

  const current = policies.find((p) => p.id === activeTab) || policies[0];

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
      <SiteHeader onNav={onNav} />
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-10">
        <div className="mb-8">
          <span className="text-[#0284C7] font-bold text-[12px] uppercase tracking-wider">Compliance & Legal Portal</span>
          <h1 className="text-[32px] font-bold text-[#1B2332]">Official Corporate Policies</h1>
          <p className="text-[14px] text-[#475569]">Select a policy below to review Desert Rain LLC's official regulatory documentation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-4 shadow-2xs space-y-1">
            {policies.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`w-full text-left px-4 py-3 rounded-[8px] text-[14px] font-semibold transition-all flex items-center justify-between ${
                  activeTab === p.id ? "bg-[#0284C7] text-white shadow-xs" : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1B2332]"
                }`}
              >
                <span>{p.label}</span>
                <ChevronRight className={`w-4 h-4 ${activeTab === p.id ? "text-white" : "text-[#94A3B8]"}`} />
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 bg-white border border-[#E5E7EB] rounded-[12px] p-8 shadow-2xs space-y-6">
            <div className="border-b border-[#E5E7EB] pb-4 flex items-center justify-between">
              <h2 className="text-[24px] font-bold text-[#1B2332] flex items-center gap-2.5">
                <FileText className="w-6 h-6 text-[#0284C7]" /> {current.title}
              </h2>
              <span className="text-[12px] text-[#94A3B8] font-mono">Last updated: Q3 2025</span>
            </div>
            <div className="text-[15px] text-[#475569] leading-relaxed space-y-4">
              <p>{current.content}</p>
              <p>For official legal correspondence or distributor contract modifications, please contact our Legal Compliance Officer at <strong className="text-[#1B2332]">legal@desertrainllc.com</strong> or via registered post to our Dubai headquarters.</p>
            </div>
            <div className="pt-6 border-t border-[#E5E7EB]">
              <Btn size="sm" variant="secondary" onClick={() => alert("Downloading official signed PDF...")}>
                <Download className="w-4 h-4 mr-2" /> Download Signed PDF Copy
              </Btn>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter onNav={onNav} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. OTHER REQUIRED PAGES (Brands, Source, Events, Resources, Careers, Sitemap, Contact)
// ─────────────────────────────────────────────────────────────
export function GenericContentPage({ screen, onNav }: { screen: Screen; onNav: (s: Screen) => void }) {
  const pageData: Record<string, { title: string; subtitle: string; content: string; cta: string }> = {
    brands: {
      title: "Our Authorized Brands",
      subtitle: "Official distribution partnerships with world-leading medical device manufacturers.",
      content: "We proudly distribute Prestan, Zoll Medical, MCR Medical, 3M Healthcare, Ferno EMS, LSP Airway, and SafeGuard PPE. As primary regional distributors, we guarantee 100% genuine products with full manufacturer warranty coverage.",
      cta: "Explore Store Catalogue"
    },
    "source-supply": {
      title: "Global Source & Supply Chain",
      subtitle: "Uncompromising clinical sourcing and rapid B2B procurement.",
      content: "Desert Rain LLC operates temperature-controlled storage facilities and automated fulfillment centers in Dubai and USA. We provide direct factory procurement for hospitals, government health ministries, and corporate distributors.",
      cta: "Request Bulk Quote (RFQ)"
    },
    events: {
      title: "Events & Healthcare Tradeshows",
      subtitle: "Meet our executive team at upcoming global medical conventions.",
      content: "Visit the Desert Rain LLC booth at Arab Health Dubai (Hall 3, Stand B20), Medlab Middle East, and DIMAQ Expo. Schedule a private distributor meeting to review our 2025/2026 pricing tiers and new product releases.",
      cta: "Schedule Booth Meeting"
    },
    resources: {
      title: "Resource Center & Document Library",
      subtitle: "Download clinical whitepapers, product manuals, and compliance certificates.",
      content: "Access high-resolution product photography, ISO 9001 certificates, FDA compliance letters, and chemical MSDS safety sheets. Designed specifically for our authorized distributors and healthcare procurement officers.",
      cta: "Access Distributor Portal"
    },
    career: {
      title: "Careers at Desert Rain LLC",
      subtitle: "Join our growing team of biomedical specialists and medical sales directors.",
      content: "We are currently hiring Regional Sales Managers (GCC), Biomedical Device Specialists, and Supply Chain Logistics Coordinators. We offer competitive corporate packages and continuous clinical training.",
      cta: "Submit Curriculum Vitae"
    },
    sitemap: {
      title: "Interactive Site Map",
      subtitle: "Complete structural overview of the Desert Rain enterprise platform.",
      content: "Navigate all 20+ official scope pages: Homepage, Store Catalogue, Search Hub, About Us, Our Brands, Source & Supply, Distributor Locator, Legal Portal (6 policies), Events, Resources, Careers, and 3-Way Login portals.",
      cta: "Return to Homepage"
    },
    contact: {
      title: "Contact Us & Global Headquarters",
      subtitle: "24/7 B2B customer support and regional office directory.",
      content: "Dubai Headquarters: Healthcare City, Tower B, Suite 402. Phone: +971 4 321 0987. USA Procurement Office: Columbus, Ohio. Email: support@desertrainllc.com. Our clinical specialists respond to all RFQs within 4 business hours.",
      cta: "Open Live Inquiry Form"
    }
  };

  const current = pageData[screen] || pageData["brands"];

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
      <SiteHeader onNav={onNav} />
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-12">
        <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-10 shadow-2xs max-w-3xl mx-auto space-y-6 text-center">
          <span className="text-[#0284C7] font-bold text-[12px] uppercase tracking-wider bg-[#E0F2FE] px-3 py-1 rounded-full inline-block">Official Scope Page</span>
          <h1 className="text-[34px] font-bold text-[#1B2332]">{current.title}</h1>
          <p className="text-[16px] text-[#0284C7] font-semibold">{current.subtitle}</p>
          <div className="text-[15px] text-[#475569] leading-relaxed text-left bg-[#F8FAFC] p-6 rounded-[10px] border border-[#E5E7EB]">
            {current.content}
          </div>
          <div className="pt-4">
            <Btn size="lg" onClick={() => onNav(screen === "brands" || screen === "sitemap" ? "store" : screen === "source-supply" ? "rfq" : "distributor-register")}>
              {current.cta} <ArrowRight className="w-4 h-4 ml-2" />
            </Btn>
          </div>
        </div>
      </main>
      <SiteFooter onNav={onNav} />
    </div>
  );
}
