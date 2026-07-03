import { useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Building2,
  Truck,
  Award,
  FileText,
  Phone,
  Mail,
  MapPin,
  Search,
  ExternalLink,
  Send,
  Stethoscope
} from "lucide-react";
import type { Screen, Product } from "../../types";
import { PRODUCTS, CATEGORIES } from "../data/mockData";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Btn } from "../components/shared/Btn";
import { ProductCard } from "../components/shared/ProductCard";
import { ProductPlaceholder } from "../components/shared/ProductPlaceholder";
import { CartToast, MiniCartDrawer } from "../components/shared/CartToast";

/**
 * HomePage — Clean, Minimal, and Elegant Medical Distribution Portal
 *
 * Redesigned to remove all badges, tags, pill chips, numbered prefixes,
 * and visual clutter. Emphasizes clean typography, generous spacing,
 * clear content hierarchy, and professional medical design.
 */
export function HomePage({ onNav }: { onNav: (s: Screen) => void }) {
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);
  
  // Interactive Hub Switcher State
  const [activeHub, setActiveHub] = useState<"mea" | "na" | "eu" | "apac">("mea");
  
  // Interactive Procurement Sector State
  const [activeSector, setActiveSector] = useState<"gov" | "hosp" | "ems" | "dist">("gov");

  // Hero Search Quick State
  const [quickSearch, setQuickSearch] = useState("");
  const [quickCategory, setQuickCategory] = useState("All");

  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    email: "",
    type: "Hospital Tender BOQ",
    message: ""
  });

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { product, qty: 1 }];
    });
    setToastProduct(product);
    setTimeout(() => setMiniCartOpen(true), 300);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({ name: "", org: "", email: "", type: "Hospital Tender BOQ", message: "" });
    }, 5000);
  };

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNav("search");
  };

  const hubData = {
    mea: {
      name: "Middle East & GCC Logistics Headquarters",
      city: "Dubai Silicon Oasis, United Arab Emirates",
      facility: "50,000 sq. ft. Bonded Warehouse & Cold Chain Facility",
      coverage: "GCC, Levant, North & East Africa, Indian Subcontinent",
      leadTime: "Same-Day Dispatch • 24–48hr Regional Air Freight",
      compliance: "MOH UAE Registered • CE MDR • SFDA Compliant",
      contact: "mea-tenders@desertrainllc.com",
      phone: "+971 4 800 DESERT (337378)"
    },
    na: {
      name: "North American Distribution Hub",
      city: "Houston, Texas, United States",
      facility: "Direct Factory Dispatch & Container Consolidator",
      coverage: "United States, Canada, Mexico, Caribbean Healthcare Networks",
      leadTime: "Direct Factory Allocation • 2–4 Day Ground / Express Air",
      compliance: "FDA 510(k) Cleared • AHA 2020 CPR Guidelines • OSHA",
      contact: "americas-rfq@desertrainllc.com",
      phone: "+1 (800) 555-DSRT"
    },
    eu: {
      name: "European Medical Gateway",
      city: "Rotterdam, Netherlands",
      facility: "Europool Customs-Bonded Medical Distribution Center",
      coverage: "European Union, UK, Scandinavia, Eastern Europe",
      leadTime: "1–3 Day Trans-European Road Express & Air Cargo",
      compliance: "CE MDR Class IIa/IIb • ISO 13485:2016 • RoHS",
      contact: "europe-desk@desertrainllc.com",
      phone: "+31 10 555 8900"
    },
    apac: {
      name: "Asia-Pacific Regional Supply Hub",
      city: "Changi Logistics Centre, Singapore",
      facility: "ASEAN Medical Tender & Rapid Resuscitation Depot",
      coverage: "Singapore, Malaysia, Australasia, Japan, South Korea",
      leadTime: "24hr Express Air Cargo • Sea Freight Containerization",
      compliance: "HSA Singapore Registered • TGA Australia • CE",
      contact: "apac-supply@desertrainllc.com",
      phone: "+65 6789 0123"
    }
  };

  const sectorData = {
    gov: {
      title: "Government Health Ministries & Public Health Agencies",
      desc: "Tailored bilateral procurement agreements designed for national healthcare infrastructure projects, emergency stockpile reserves, and regional hospital networks.",
      requirements: "Requires formal Ministry Bill of Quantities (BOQ), Tender Reference Number, and letter of intent.",
      terms: "Net 60–90 Sovereign Letters of Credit (LC) • Direct Port CIF/FOB Delivery • 100% Serial Lot Tracking",
      cta: "Submit Ministry BOQ Dossier"
    },
    hosp: {
      title: "Private Hospital Networks & Clinical Groups",
      desc: "Streamlined wholesale replenishment for ICU departments, cardiology suites, emergency rooms, and clinical simulation laboratories.",
      requirements: "Requires valid Hospital Operating License and Chief Medical Officer / Purchasing Director authorization.",
      terms: "Net 30 Institutional Credit Terms • Dedicated Account Manager • Automated Stock Replenishment",
      cta: "Open Hospital Account"
    },
    ems: {
      title: "EMS, Ambulance Services & Fire Departments",
      desc: "Heavy-duty pre-hospital immobilization, automated mechanical CPR devices, portable AED defibrillators, and trauma field bags built for rugged field deployment.",
      requirements: "Requires municipal agency tax exemption ID or department procurement requisition form.",
      terms: "Volume Tier Discounting • Immediate Factory Warranty Advance Replacement • Field Training Support",
      cta: "Request EMS Fleet Quotation"
    },
    dist: {
      title: "Authorized Regional Resellers & B2B Distributors",
      desc: "Join Desert Rain LLC's global distribution tier. Gain direct access to manufacturer wholesale pricing, marketing assets, and regional tender protection.",
      requirements: "Requires commercial trade license, medical device import clearance, and annual volume commitment.",
      terms: "Wholesale Margin Protection • Co-Op Tender Support • Priority Production Allocation",
      cta: "Apply for Distributor Status"
    }
  };

  return (
    <div className="bg-[#FAFBFC] min-h-screen flex flex-col font-sans text-[#1B2332]">
      <SiteHeader onNav={onNav} showCategories />
      <CartToast product={toastProduct} onClose={() => setToastProduct(null)} />
      <MiniCartDrawer
        open={miniCartOpen}
        onClose={() => setMiniCartOpen(false)}
        items={cartItems}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO & QUICK CATALOG SEARCH
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] text-white border-b border-[#1E293B]">
        <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Clean Typography & Search */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.1] tracking-tight text-white">
                Clinical Equipment & Emergency Resuscitation Supply Hub.
              </h1>
              
              <p className="text-[17px] md:text-[18px] text-[#94A3B8] leading-relaxed max-w-xl font-normal">
                Serving hospital networks, health ministries, and emergency response teams with direct-ship distribution for Prestan, Zoll, Ferno, Defibtech, Ambu, and 3M Healthcare.
              </p>

              {/* Clean Catalog Search Bar */}
              <div className="bg-[#1E293B] border border-[#334155] rounded-[10px] p-2 shadow-lg max-w-xl">
                <form onSubmit={handleQuickSearchSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex items-center px-3 py-2 bg-[#0F172A] rounded-[6px] border border-[#334155] sm:w-44 shrink-0">
                    <select
                      value={quickCategory}
                      onChange={(e) => setQuickCategory(e.target.value)}
                      className="bg-transparent text-[13px] text-white font-medium w-full focus:outline-none cursor-pointer"
                    >
                      <option value="All" className="bg-[#0F172A] text-white">All Categories</option>
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.label} className="bg-[#0F172A] text-white">{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 relative flex items-center">
                    <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={quickSearch}
                      onChange={(e) => setQuickSearch(e.target.value)}
                      placeholder="Search by SKU, name, or keyword..."
                      className="w-full pl-10 pr-4 py-2.5 bg-transparent text-[14px] text-white placeholder:text-[#64748B] focus:outline-none"
                    />
                  </div>

                  <Btn type="submit" size="md" className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-2.5 font-semibold text-[13.5px] shrink-0">
                    Search
                  </Btn>
                </form>
              </div>
              
              {/* Clean Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Btn size="lg" onClick={() => onNav("rfq")} className="bg-white text-[#0F172A] hover:bg-[#F1F5F9] px-7 py-3.5 font-bold text-[14.5px] shadow-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0284C7]" /> Initiate Bulk Tender RFQ
                </Btn>
                <Btn size="lg" variant="secondary" onClick={() => onNav("store")} className="bg-transparent hover:bg-white/5 text-white border border-white/25 px-7 py-3.5 text-[14.5px] font-semibold">
                  Browse Store Catalog
                </Btn>
              </div>
            </div>

            {/* Right Column: Clean Showroom Image */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="rounded-[12px] overflow-hidden border border-[#334155] bg-[#1E293B] shadow-xl aspect-[4/3]">
                <img 
                  loading="lazy" 
                  src="/images/hero-banner.png" 
                  alt="Medical Equipment Showroom" 
                  className="w-full h-full object-cover opacity-90 hover:scale-103 transition-transform duration-500" 
                />
              </div>
            </div>

          </div>

          {/* Clean Highlights Strip */}
          <div className="mt-16 pt-8 border-t border-[#1E293B] grid grid-cols-2 sm:grid-cols-4 gap-6 text-[14px] text-[#CBD5E1]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#38BDF8] shrink-0" />
              <span>CE MDR & FDA Cleared</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#38BDF8] shrink-0" />
              <span>Direct Manufacturer Warranties</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0" />
              <span>Net 30/60 Institutional Credit</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#38BDF8] shrink-0" />
              <span>Global Cold-Chain Logistics</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: ABOUT US (CLEAN EDITORIAL PROFILE)
         ───────────────────────────────────────────────────────────── */}
      <section id="about" className="bg-white py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-3xl mb-14 space-y-4">
            <h2 className="text-[32px] md:text-[38px] font-bold text-[#1B2332] tracking-tight">
              About Desert Rain LLC
            </h2>
            <p className="text-[17px] text-[#475569] leading-relaxed">
              Headquartered in Dubai Silicon Oasis with distribution hubs in North America, Europe, and Asia-Pacific, Desert Rain LLC serves as the primary distribution link between clinical medical device manufacturers and healthcare institutions worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] p-8 space-y-4">
              <Globe2 className="w-7 h-7 text-[#0284C7]" />
              <h3 className="text-[20px] font-bold text-[#1B2332]">Our Vision</h3>
              <p className="text-[15px] text-[#475569] leading-relaxed">
                To create a seamless, reliable supply chain where hospitals, emergency medical units, and training academies have uninterrupted access to critical resuscitation and life-saving equipment.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] p-8 space-y-4">
              <ShieldCheck className="w-7 h-7 text-[#0284C7]" />
              <h3 className="text-[20px] font-bold text-[#1B2332]">Our Mission</h3>
              <p className="text-[15px] text-[#475569] leading-relaxed">
                To uphold strict regulatory compliance, quality management, and cold-chain integrity across every international shipment, ensuring serial-tracked reliability for institutional healthcare providers.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] p-8 space-y-4">
              <Award className="w-7 h-7 text-[#0284C7]" />
              <h3 className="text-[20px] font-bold text-[#1B2332]">Why Partner With Us</h3>
              <p className="text-[15px] text-[#475569] leading-relaxed">
                Operating as a primary authorized distributor allows us to eliminate intermediary costs, guarantee direct factory warranties, and provide dedicated bidding desks for health ministry tenders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: OUR BRANDS (CLEAN BRAND SHOWCASE)
         ───────────────────────────────────────────────────────────── */}
      <section id="brands" className="bg-[#F8FAFC] py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="text-[32px] font-bold text-[#1B2332]">
                Authorized Manufacturer Partnerships
              </h2>
              <p className="text-[16px] text-[#475569] mt-2 max-w-xl">
                We maintain direct bilateral distribution agreements with the medical industry's most respected resuscitation and safety device manufacturers.
              </p>
            </div>
            <Btn size="md" variant="secondary" onClick={() => onNav("store")} className="self-start sm:self-auto font-semibold text-[14px]">
              View All Products
            </Btn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Prestan Products",
                origin: "United States",
                desc: "The global standard in professional CPR training manikins equipped with AHA guideline rate and depth feedback monitors, infant manikins, and AED training simulators.",
                image: "/images/cpr-manikin.png"
              },
              {
                name: "Zoll Medical",
                origin: "United States",
                desc: "Pioneering clinical resuscitation defibrillators, automated mechanical chest compression devices, and hospital cardiac monitoring systems.",
                image: "/images/aed-plus.png"
              },
              {
                name: "Ferno EMS",
                origin: "United States",
                desc: "World leader in emergency medical patient transport, ambulance cot stretchers, stair chairs, spinal boards, and heavy-duty trauma immobilization hardware.",
                image: "/images/first-aid-200.png"
              },
              {
                name: "Defibtech",
                origin: "United States",
                desc: "Designers of the Lifeline series of AEDs, recognized for ergonomic simplicity, rugged durability, and intuitive voice prompts for responders.",
                image: "/images/aed-plus.png"
              },
              {
                name: "Ambu",
                origin: "Denmark",
                desc: "Inventors of the legendary Ambu Bag resuscitator, disposable single-use visualization bronchoscopes, airway laryngeal masks, and training manikins.",
                image: "/images/airway-bvm.png"
              },
              {
                name: "3M Healthcare",
                origin: "United States",
                desc: "Hospital-grade infection control supplies, N95 surgical respirators, Littmann cardiology stethoscopes, sterile surgical drapes, and skin integrity products.",
                image: "/images/n95-8210.png"
              }
            ].map((b, idx) => (
              <div 
                key={idx}
                onClick={() => onNav("store")}
                className="bg-white border border-[#E5E7EB] rounded-[12px] p-7 shadow-xs hover:shadow-md hover:border-[#0284C7] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[20px] font-bold text-[#1B2332] group-hover:text-[#0284C7] transition-colors">
                      {b.name}
                    </h3>
                    <span className="text-[13px] text-[#64748B] font-medium">{b.origin}</span>
                  </div>
                  <p className="text-[15px] text-[#475569] leading-relaxed mb-6">
                    {b.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-[14px] font-semibold text-[#0284C7]">
                  <span>Explore Brand Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: SOURCE & SUPPLY (CLEAN PROCUREMENT SELECTOR)
         ───────────────────────────────────────────────────────────── */}
      <section id="source-supply" className="bg-white py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-3xl mb-12 space-y-3">
            <h2 className="text-[32px] md:text-[38px] font-bold text-[#1B2332] tracking-tight">
              Institutional Sourcing & Tender Workflows
            </h2>
            <p className="text-[16px] text-[#475569] leading-relaxed">
              Select your organization sector below to review specific billing terms, regulatory documentation workflows, and volume quoting procedures.
            </p>
          </div>

          <div className="bg-[#0F172A] text-white rounded-[14px] p-8 shadow-lg">
            {/* Clean Tabs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8 bg-[#1E293B] p-1.5 rounded-[8px]">
              {[
                { id: "gov", label: "Government Health Ministries", icon: Building2 },
                { id: "hosp", label: "Private Hospital Networks", icon: Stethoscope },
                { id: "ems", label: "EMS & Ambulance Fleets", icon: Truck },
                { id: "dist", label: "Authorized B2B Resellers", icon: Globe2 }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSector === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSector(tab.id as any)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-[6px] text-[14px] font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#0284C7] text-white shadow-xs"
                        : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1E293B]/50 border border-[#334155] p-8 rounded-[10px]">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-[24px] md:text-[28px] font-bold text-white">
                  {sectorData[activeSector].title}
                </h3>
                <p className="text-[16px] text-[#CBD5E1] leading-relaxed">
                  {sectorData[activeSector].desc}
                </p>

                <div className="space-y-3 pt-4 border-t border-[#334155] text-[14.5px]">
                  <div className="text-[#E2E8F0]">
                    <strong className="text-white">Documentation Required:</strong> {sectorData[activeSector].requirements}
                  </div>
                  <div className="text-[#E2E8F0]">
                    <strong className="text-white">Financial & Delivery Terms:</strong> {sectorData[activeSector].terms}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#0F172A] border border-[#334155] p-6 rounded-[8px] space-y-4 text-center flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-[18px] font-bold text-white">Ready to Initiate Quoting?</h4>
                  <p className="text-[13.5px] text-[#94A3B8]">
                    Transmit your Bill of Quantities (BOQ) or item list for immediate evaluation.
                  </p>
                </div>
                <Btn
                  size="lg"
                  onClick={() => onNav("rfq")}
                  className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white py-3.5 font-bold shadow-sm text-[14.5px]"
                >
                  {sectorData[activeSector].cta} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: STORE CATALOG & FEATURED PRODUCTS
         ───────────────────────────────────────────────────────────── */}
      <section id="store" className="bg-[#FAFBFC] py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-[32px] font-bold text-[#1B2332]">
                Explore Our Equipment Catalog
              </h2>
              <p className="text-[16px] text-[#475569] mt-2">
                Browse clinical categories or view top-rated equipment below.
              </p>
            </div>
            <Btn size="md" onClick={() => onNav("store")} className="bg-[#0F172A] hover:bg-[#1E293B] text-white self-start sm:self-auto font-semibold">
              View Full 1,000+ SKU Store <ArrowRight className="w-4 h-4 ml-2" />
            </Btn>
          </div>

          {/* Clean Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNav("category")}
                className="text-left bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden hover:border-[#0284C7] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#F1F5F9] overflow-hidden">
                    {cat.image ? (
                      <img loading="lazy" src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                    ) : (
                      <ProductPlaceholder category={cat.label} className="w-full h-full" />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-[16px] font-bold text-[#1B2332] group-hover:text-[#0284C7] transition-colors">
                      {cat.label}
                    </div>
                    <div className="text-[13px] text-[#64748B] mt-0.5">
                      {cat.count} products available
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4 text-[13px] font-semibold text-[#0284C7] flex items-center justify-between">
                  <span>Browse Category</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {/* Clean Best Sellers */}
          <div className="space-y-6">
            <h3 className="text-[24px] font-bold text-[#1B2332] border-b border-[#E2E8F0] pb-4">
              Featured Clinical Best Sellers
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.slice(0, 4).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onNav={onNav}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: DISTRIBUTOR LOCATOR (CLEAN REGIONAL SWITCHER)
         ───────────────────────────────────────────────────────────── */}
      <section id="locator" className="bg-white py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-[32px] font-bold text-[#1B2332]">
                Global Distribution Network & Regional Hubs
              </h2>
              <p className="text-[16px] text-[#475569] mt-2">
                Strategically located customs-bonded warehouses ensuring rapid worldwide freight dispatch.
              </p>
            </div>
            <Btn size="md" onClick={() => onNav("distributor-register")} className="bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold self-start lg:self-auto">
              Register as Authorized Distributor
            </Btn>
          </div>

          {/* Clean Hub Switcher */}
          <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-[12px] overflow-hidden shadow-xs">
            
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#CBD5E1] bg-[#F1F5F9]">
              {[
                { id: "mea", label: "Middle East & GCC", subtitle: "Dubai HQ" },
                { id: "na", label: "North America Hub", subtitle: "Houston" },
                { id: "eu", label: "European Gateway", subtitle: "Rotterdam" },
                { id: "apac", label: "Asia-Pacific Depot", subtitle: "Singapore" }
              ].map((hub) => {
                const isActive = activeHub === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHub(hub.id as any)}
                    className={`p-4 text-left font-sans transition-all cursor-pointer border-r last:border-r-0 border-[#CBD5E1] ${
                      isActive
                        ? "bg-white text-[#0284C7] font-bold border-t-2 border-t-[#0284C7]"
                        : "text-[#475569] hover:bg-white/50 hover:text-[#1B2332]"
                    }`}
                  >
                    <div className="text-[13px] text-[#64748B] font-medium">{hub.subtitle}</div>
                    <div className="text-[16px]">{hub.label}</div>
                  </button>
                );
              })}
            </div>

            <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-[26px] font-bold text-[#1B2332]">
                    {hubData[activeHub].name}
                  </h3>
                  <div className="text-[16px] text-[#64748B] flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4 text-[#0284C7]" /> {hubData[activeHub].city}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-[14.5px]">
                  <div className="bg-[#F8FAFC] p-4 rounded-[8px] border border-[#E2E8F0]">
                    <strong className="text-[#1B2332] block text-[13px] mb-1">Facility Specification</strong>
                    <span className="text-[#475569]">{hubData[activeHub].facility}</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-[8px] border border-[#E2E8F0]">
                    <strong className="text-[#1B2332] block text-[13px] mb-1">Territory Coverage</strong>
                    <span className="text-[#475569]">{hubData[activeHub].coverage}</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-[8px] border border-[#E2E8F0]">
                    <strong className="text-[#1B2332] block text-[13px] mb-1">Dispatch Lead Time</strong>
                    <span className="text-[#475569]">{hubData[activeHub].leadTime}</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-[8px] border border-[#E2E8F0]">
                    <strong className="text-[#1B2332] block text-[13px] mb-1">Regulatory Compliance</strong>
                    <span className="text-[#475569]">{hubData[activeHub].compliance}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0F172A] text-white p-7 rounded-[10px] space-y-6 shadow-md">
                <div>
                  <h4 className="text-[20px] font-bold text-white">Contact {activeHub.toUpperCase()} Regional Desk</h4>
                  <p className="text-[14px] text-[#94A3B8] mt-2">
                    Our logistics coordinators can provide customized container freight rates and customs documentation.
                  </p>
                </div>

                <div className="space-y-3 text-[14.5px] border-t border-[#334155] pt-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#38BDF8]" />
                    <span>{hubData[activeHub].contact}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#38BDF8]" />
                    <span>{hubData[activeHub].phone}</span>
                  </div>
                </div>

                <Btn size="md" onClick={() => onNav("contact")} className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold py-3 text-[14.5px]">
                  Send Inquiry to this Hub <Send className="w-4 h-4 ml-1.5" />
                </Btn>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: CONTACT US (CLEAN INQUIRY DESK)
         ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#0F172A] text-white py-20 scroll-mt-14 border-t border-[#1E293B]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Headquarters Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-[32px] md:text-[38px] font-bold tracking-tight mb-4 text-white">
                  Get in Touch with Our Procurement Specialists
                </h2>
                <p className="text-[#94A3B8] text-[16px] leading-relaxed">
                  Whether you require official manufacturer authorization letters, custom tender pricing, or technical device specifications, our team is ready to assist.
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-[#1E293B] text-[15px]">
                <div className="flex items-start gap-4">
                  <Building2 className="w-6 h-6 text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Global Headquarters</div>
                    <div className="text-[#CBD5E1] mt-0.5">Desert Rain LLC • Dubai Silicon Oasis</div>
                    <div className="text-[#64748B] text-[13.5px]">P.O. Box 342001, Dubai, United Arab Emirates</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Direct Telephone & Tenders</div>
                    <div className="text-[#CBD5E1] mt-0.5">+971 4 800 DESERT (+971 4 800 337378)</div>
                    <div className="text-[#64748B] text-[13.5px]">Mon–Sat • 08:00 – 18:00 (GMT+4)</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Official Department Mail</div>
                    <div className="text-[#CBD5E1] mt-0.5">tenders@desertrainllc.com (Government & Tenders)</div>
                    <div className="text-[#CBD5E1]">support@desertrainllc.com (Wholesale & Logistics)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Inquiry Form */}
            <div className="lg:col-span-7 bg-white text-[#1B2332] rounded-[12px] p-8 md:p-10 shadow-xl border border-[#CBD5E1]">
              <h3 className="text-[24px] font-bold text-[#1B2332] mb-2">Direct B2B Procurement Inquiry</h3>
              <p className="text-[#64748B] text-[14.5px] mb-6">
                Fill out the details below. A regional procurement officer will respond within 4 business hours.
              </p>

              {contactSubmitted ? (
                <div className="bg-[#ECFDF5] border border-[#10B981] text-[#065F46] p-6 rounded-[8px] flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[16px]">Inquiry Successfully Transmitted</div>
                    <div className="text-[14.5px] mt-1 leading-relaxed">
                      Thank you! Your project request has been logged into our institutional dispatch queue. You will receive an electronic confirmation shortly.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-bold text-[#334155] block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Alistair Vance"
                        className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#CBD5E1] text-[14.5px] focus:outline-none focus:border-[#0284C7]"
                      />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-[#334155] block mb-1.5">
                        Institution or Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        placeholder="Ministry of Health / St. Jude Hospital"
                        className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#CBD5E1] text-[14.5px] focus:outline-none focus:border-[#0284C7]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-bold text-[#334155] block mb-1.5">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@hospital.org"
                        className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#CBD5E1] text-[14.5px] focus:outline-none focus:border-[#0284C7]"
                      />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-[#334155] block mb-1.5">
                        Inquiry Category *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#CBD5E1] text-[14.5px] bg-white focus:outline-none focus:border-[#0284C7] cursor-pointer"
                      >
                        <option value="Hospital Tender BOQ">Hospital Tender / BOQ Submission</option>
                        <option value="Wholesale Bulk Quoting">Wholesale Bulk Quoting</option>
                        <option value="Distributor Application">Authorized Distributor Application</option>
                        <option value="Product Specification">Product Specification & Technical Query</option>
                        <option value="Customs & Logistics">Customs Tariff & Shipping Logistics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[13px] font-bold text-[#334155] block mb-1.5">
                      Project Specifications or BOQ Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify target SKU numbers, required quantities, target destination port, or tender reference ID..."
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#CBD5E1] text-[14.5px] focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div className="pt-2">
                    <Btn type="submit" size="lg" className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white py-3.5 text-[15px] font-bold shadow-sm">
                      Transmit Procurement Inquiry <Send className="w-4 h-4 ml-2" />
                    </Btn>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
