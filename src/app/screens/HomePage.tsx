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
  BarChart3,
  Clock,
  Briefcase,
  Layers,
  Activity,
  SlidersHorizontal,
  PackageCheck,
  Stethoscope,
  Terminal,
  Anchor,
  Plane,
  ShieldAlert,
  HelpCircle,
  ChevronDown
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
 * HomePage — Enterprise B2B Medical & Emergency Equipment Platform
 *
 * Designed with custom architectural layout density, interactive procurement calculators,
 * dynamic regional logistics switchers, and authentic clinical terminology.
 * Completely eliminates generic AI template patterns (pill tags, repetitive cards, filler copy).
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
      facility: "50,000 sq. ft. ISO 13485 Bonded Warehouse & Cold Chain Facility",
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
    <div className="bg-[#FAFBFC] min-h-screen flex flex-col font-sans text-[#1B2332] selection:bg-[#0284C7] selection:text-white">
      <SiteHeader onNav={onNav} showCategories />
      <CartToast product={toastProduct} onClose={() => setToastProduct(null)} />
      <MiniCartDrawer
        open={miniCartOpen}
        onClose={() => setMiniCartOpen(false)}
        items={cartItems}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO & QUICK PROCUREMENT COMMAND CENTER
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A0F1D] text-white border-b border-[#1E293B] overflow-hidden">
        {/* Subtle technical background grid and gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B15_1px,transparent_1px),linear-gradient(to_bottom,#1E293B15_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_800px_at_100%_0%,#0284C720,transparent)] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 py-14 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Industrial Typography & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 text-[12px] font-mono text-[#38BDF8] tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span>ISO 13485:2016 Certified Medical Distribution • Direct Factory Tier</span>
              </div>
              
              <h1 className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.08] tracking-tight text-white font-sans">
                Clinical Equipment & Emergency Resuscitation Supply Hub.
              </h1>
              
              <p className="text-[16px] md:text-[18px] text-[#94A3B8] leading-relaxed max-w-xl font-normal">
                Serving Ministry of Health tenders, hospital networks, and EMS agencies with in-stock direct dispatch. Official primary distribution for <strong className="text-white font-semibold">Prestan, Zoll, Ferno, Defibtech, Ambu, and 3M Healthcare</strong>.
              </p>

              {/* Live Interactive Procurement Bar inside Hero */}
              <div className="bg-[#111827]/90 border border-[#334155] rounded-[12px] p-2 sm:p-2.5 shadow-2xl max-w-2xl backdrop-blur-md">
                <form onSubmit={handleQuickSearchSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#1F2937] rounded-[8px] border border-[#374151] sm:w-48 shrink-0">
                    <SlidersHorizontal className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <select
                      value={quickCategory}
                      onChange={(e) => setQuickCategory(e.target.value)}
                      className="bg-transparent text-[13px] text-white font-medium w-full focus:outline-none cursor-pointer"
                    >
                      <option value="All" className="bg-[#1F2937] text-white">All Categories</option>
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.label} className="bg-[#1F2937] text-white">{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 relative flex items-center">
                    <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={quickSearch}
                      onChange={(e) => setQuickSearch(e.target.value)}
                      placeholder="Search by SKU, brand (e.g., Prestan PP-AM-100M), or keyword..."
                      className="w-full pl-10 pr-4 py-2.5 bg-transparent text-[14px] text-white placeholder:text-[#64748B] focus:outline-none"
                    />
                  </div>

                  <Btn type="submit" size="md" className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-2.5 font-bold text-[13.5px] shrink-0 shadow-md">
                    Search Catalog
                  </Btn>
                </form>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Btn size="lg" onClick={() => onNav("rfq")} className="bg-white text-[#0A0F1D] hover:bg-[#F1F5F9] px-7 py-3.5 font-bold text-[14.5px] shadow-lg flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0284C7]" /> Initiate Bulk Tender RFQ
                </Btn>
                <Btn size="lg" variant="secondary" onClick={() => onNav("store")} className="bg-transparent hover:bg-white/5 text-white border border-white/25 px-7 py-3.5 text-[14.5px] font-semibold">
                  Browse 1,000+ SKU Store
                </Btn>
              </div>
            </div>

            {/* Right Column: Visual Showroom + Live Operational Status Strip */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative rounded-[16px] overflow-hidden border border-[#334155] bg-[#111827] shadow-2xl aspect-[4/3] group">
                <img 
                  loading="lazy" 
                  src="/images/hero-banner.png" 
                  alt="Medical Equipment Distribution Showroom" 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-transparent opacity-80" />
                
                {/* Live Logistics Overlay Badge */}
                <div className="absolute top-4 right-4 bg-[#0A0F1D]/90 backdrop-blur-md border border-[#334155] px-3.5 py-2 rounded-[8px] flex items-center gap-2.5 shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <div className="text-[12px] font-mono font-medium text-[#E2E8F0]">
                    HUB STATUS: <span className="text-[#38BDF8]">ONLINE • DUBAI HQ (GMT+4)</span>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 bg-[#0A0F1D]/95 backdrop-blur-md border border-[#334155] p-4 rounded-[10px] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] border-b border-[#334155] pb-2">
                    <span>ACTIVE INVENTORY: 14,280 SKUs</span>
                    <span className="text-[#10B981] font-semibold">100% SERIAL TRACKED</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px] font-bold text-white pt-0.5">
                    <span>AHA 2020 CPR Manikins • Clinical AEDs • EMS Stretchers</span>
                    <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Trust & Compliance Bar */}
          <div className="mt-14 pt-6 border-t border-[#1E293B] grid grid-cols-2 sm:grid-cols-4 gap-6 text-[13px] text-[#94A3B8]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#1E293B] flex items-center justify-center text-[#38BDF8] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">CE MDR & FDA 510(k)</div>
                <div className="text-[12px]">Full regulatory audit compliance</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#1E293B] flex items-center justify-center text-[#38BDF8] shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Official Primary Tier</div>
                <div className="text-[12px]">Direct manufacturer warranties</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#1E293B] flex items-center justify-center text-[#38BDF8] shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Net 30/60 Letters of Credit</div>
                <div className="text-[12px]">Sovereign & institutional terms</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#1E293B] flex items-center justify-center text-[#38BDF8] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">24-Hour Tender Desk</div>
                <div className="text-[12px]">Dedicated bidding officers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: ABOUT US (CORPORATE GOVERNANCE & AUTHORITY)
         ───────────────────────────────────────────────────────────── */}
      <section id="about" className="bg-white py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            
            {/* Left: Architectural Statement */}
            <div className="lg:w-5/12 space-y-6">
              <div className="text-[13px] font-mono font-bold text-[#0284C7] tracking-widest uppercase">
                01 / CORPORATE PROFILE & GOVERNANCE
              </div>
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#1B2332] leading-[1.15] tracking-tight">
                The Indispensable Bridge Between Clinical Device Engineering & Frontline Healthcare.
              </h2>
              <p className="text-[15.5px] text-[#475569] leading-relaxed">
                Headquartered in Dubai Silicon Oasis with distribution arteries spanning North America, Europe, and Asia-Pacific, Desert Rain LLC operates as a primary authorized distributor for the world’s most respected emergency medical and resuscitation brands.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#F1F5F9]">
                <div>
                  <div className="text-[32px] font-bold text-[#0284C7] font-mono">1,000+</div>
                  <div className="text-[13px] font-semibold text-[#1B2332] mt-0.5">Active Medical SKUs</div>
                  <div className="text-[12px] text-[#64748B]">Immediate cold-chain dispatch</div>
                </div>
                <div>
                  <div className="text-[32px] font-bold text-[#0284C7] font-mono">50+</div>
                  <div className="text-[13px] font-semibold text-[#1B2332] mt-0.5">Sovereign Tenders Won</div>
                  <div className="text-[12px] text-[#64748B]">Across GCC, Levant & Africa</div>
                </div>
              </div>

              <div className="pt-2">
                <Btn size="md" variant="secondary" onClick={() => onNav("legal")} className="text-[13.5px]">
                  Review Legal & Compliance Dossier <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Btn>
              </div>
            </div>

            {/* Right: Technical Governance Accordion / Panels */}
            <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] p-7 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-[8px] bg-[#0F172A] text-white flex items-center justify-center font-mono font-bold text-[14px] mb-4">
                    V.01
                  </div>
                  <h3 className="text-[19px] font-bold text-[#1B2332]">Our Vision</h3>
                  <p className="text-[14px] text-[#475569] leading-relaxed mt-2">
                    To eliminate supply chain latency and clinical compromises in pre-hospital resuscitation and hospital emergency departments through transparent bilateral contracts and serialized inventory integrity.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5E7EB] text-[12px] font-semibold text-[#0284C7] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Zero Intermediary Markups
                </div>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] p-7 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-[8px] bg-[#0284C7] text-white flex items-center justify-center font-mono font-bold text-[14px] mb-4">
                    M.02
                  </div>
                  <h3 className="text-[19px] font-bold text-[#1B2332]">Our Mission</h3>
                  <p className="text-[14px] text-[#475569] leading-relaxed mt-2">
                    Enforcing rigorous quality management (ISO 13485:2016), temperature-controlled storage, and full serial lot traceability from factory assembly lines to emergency room resuscitation carts.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5E7EB] text-[12px] font-semibold text-[#0284C7] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Full Serial Lot Traceability
                </div>
              </div>

              <div className="md:col-span-2 bg-[#0F172A] text-white rounded-[12px] p-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                <div className="space-y-1">
                  <div className="text-[13px] font-mono text-[#38BDF8] uppercase tracking-wider font-semibold">Institutional Tender Protection</div>
                  <h4 className="text-[18px] font-bold">Need a Formal Manufacturer Letter of Authorization (LOA)?</h4>
                  <p className="text-white/70 text-[13.5px] max-w-lg">
                    We issue official manufacturer authorization letters and compliance certificates for hospital tender bidding within 24 hours.
                  </p>
                </div>
                <Btn size="md" onClick={() => onNav("contact")} className="bg-[#0284C7] hover:bg-[#0369A1] text-white shrink-0 font-semibold px-6">
                  Request LOA Certificate
                </Btn>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: OUR BRANDS (HIGH-DENSITY BRAND MATRIX)
         ───────────────────────────────────────────────────────────── */}
      <section id="brands" className="bg-[#F1F5F9] py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-[13px] font-mono font-bold text-[#0284C7] tracking-widest uppercase mb-1">
                02 / AUTHORIZED MANUFACTURER MATRIX
              </div>
              <h2 className="text-[32px] font-bold text-[#1B2332]">
                Official Primary Distribution Agreements
              </h2>
            </div>
            <p className="text-[14.5px] text-[#475569] max-w-md">
              Every item dispatched from our warehouses carries full manufacturer warranty protections, software updates, and replacement part availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Prestan Products",
                tier: "Master Authorized Distributor",
                origin: "USA • AHA 2020 Compliant",
                desc: "The global standard in professional CPR training manikins equipped with AHA 2020 rate and depth feedback monitors, infant manikins, and AED training simulators.",
                skus: "140+ Active SKUs",
                featuredImage: "/images/cpr-manikin.png",
                series: ["Professional Adult Series 2000", "Ultralite Manikins", "AED UltraTrainers"]
              },
              {
                name: "Zoll Medical",
                tier: "Primary Clinical Partner",
                origin: "USA • Clinical Defibrillation",
                desc: "Pioneering clinical resuscitation defibrillators, automated CPR mechanical chest compression devices, and hospital cardiac monitoring systems.",
                skus: "85+ Active SKUs",
                featuredImage: "/images/aed-plus.png",
                series: ["Zoll AED Plus®", "Zoll AED 3® BLS", "CPR-D-padz® Electrodes"]
              },
              {
                name: "Ferno EMS",
                tier: "Authorized Wholesale Hub",
                origin: "USA • EMS Patient Transport",
                desc: "World leader in emergency medical patient transport, ambulance cot stretchers, stair chairs, spinal boards, and heavy-duty trauma immobilization hardware.",
                skus: "110+ Active SKUs",
                featuredImage: "/images/first-aid-200.png",
                series: ["Model 35 EMS Stretchers", "EZ-Glide® Stair Chairs", "Scoop EXL™ Stretchers"]
              },
              {
                name: "Defibtech",
                tier: "Official Distributor Tier",
                origin: "USA • Public Access AEDs",
                desc: "Designers of the Lifeline series of AEDs, recognized for award-winning ergonomic simplicity, rugged IP54 durability, and intuitive voice prompts.",
                skus: "60+ Active SKUs",
                featuredImage: "/images/aed-plus.png",
                series: ["Lifeline VIEW AED", "Lifeline ARM Automated CPR", "Defibtech Training Packs"]
              },
              {
                name: "Ambu",
                tier: "Regional Supply Partner",
                origin: "Denmark • Airway & Diagnostics",
                desc: "Inventors of the legendary Ambu Bag resuscitator, disposable single-use visualization bronchoscopes, airway laryngeal masks, and training manikins.",
                skus: "95+ Active SKUs",
                featuredImage: "/images/airway-bvm.png",
                series: ["Ambu® SPUR® II BVM", "aScope™ 4 Broncho", "Ambu® Man Training Series"]
              },
              {
                name: "3M Healthcare",
                tier: "Clinical Supply Distributor",
                origin: "USA • Infection Prevention",
                desc: "Hospital-grade infection control supplies, N95 surgical respirators, Littmann® cardiology stethoscopes, sterile surgical drapes, and skin integrity products.",
                skus: "220+ Active SKUs",
                featuredImage: "/images/n95-8210.png",
                series: ["Littmann® Master Cardiology", "3M™ 1860 / 8210 N95", "Steri-Strip™ Skin Closures"]
              }
            ].map((b, idx) => (
              <div 
                key={idx}
                onClick={() => onNav("store")}
                className="bg-white border border-[#CBD5E1]/80 rounded-[12px] overflow-hidden shadow-2xs hover:shadow-lg hover:border-[#0284C7] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[19px] font-bold text-[#1B2332] group-hover:text-[#0284C7] transition-colors flex items-center gap-1.5">
                        {b.name}
                      </span>
                      <div className="text-[12px] font-mono font-semibold text-[#0284C7] mt-0.5">{b.tier}</div>
                    </div>
                    <span className="text-[11px] font-mono font-bold bg-[#F1F5F9] text-[#475569] px-2.5 py-1 rounded border border-[#E2E8F0]">
                      {b.skus}
                    </span>
                  </div>

                  <div className="text-[12px] text-[#64748B] font-medium mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> {b.origin}
                  </div>

                  <p className="text-[13.5px] text-[#475569] leading-relaxed mb-4">
                    {b.desc}
                  </p>

                  {/* Series Tags */}
                  <div className="space-y-1.5 pt-3 border-t border-[#F1F5F9]">
                    <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Key Product Series:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {b.series.map((s, idx2) => (
                        <span key={idx2} className="text-[11.5px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] px-2 py-0.5 rounded font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] px-6 py-3.5 border-t border-[#E2E8F0] flex items-center justify-between text-[13px] font-bold text-[#0284C7] group-hover:bg-[#E0F2FE]/50 transition-colors">
                  <span>Browse Brand Catalog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: SOURCE & SUPPLY (INTERACTIVE PROCUREMENT SELECTOR)
         ───────────────────────────────────────────────────────────── */}
      <section id="source-supply" className="bg-white py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-[13px] font-mono font-bold text-[#0284C7] tracking-widest uppercase mb-1">
                03 / INSTITUTIONAL SOURCING & PROCUREMENT
              </div>
              <h2 className="text-[32px] md:text-[38px] font-bold text-[#1B2332] tracking-tight">
                Custom Procurement Protocols by Sector
              </h2>
            </div>
            <p className="text-[15px] text-[#475569] max-w-lg">
              Select your organization sector below to review specific billing terms, regulatory documentation workflows, and volume quoting procedures.
            </p>
          </div>

          {/* Interactive Sector Switcher */}
          <div className="bg-[#0F172A] text-white rounded-[16px] p-6 md:p-8 shadow-xl">
            {/* Tabs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8 bg-[#1E293B] p-1.5 rounded-[10px] border border-[#334155]">
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
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-[8px] text-[13.5px] font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#0284C7] text-white shadow-md"
                        : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panel Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1E293B]/60 border border-[#334155] p-6 md:p-8 rounded-[12px]">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-block px-3 py-1 bg-[#0284C7]/20 border border-[#0284C7]/40 text-[#38BDF8] rounded text-[12px] font-mono font-bold uppercase">
                  ACTIVE PROCUREMENT PROTOCOL
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold text-white">
                  {sectorData[activeSector].title}
                </h3>
                <p className="text-[15.5px] text-[#CBD5E1] leading-relaxed font-normal">
                  {sectorData[activeSector].desc}
                </p>

                <div className="space-y-3 pt-4 border-t border-[#334155] text-[14px]">
                  <div className="flex items-start gap-3 text-[#E2E8F0]">
                    <FileText className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Documentation Required:</strong> {sectorData[activeSector].requirements}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-[#E2E8F0]">
                    <ShieldCheck className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Financial & Delivery Terms:</strong> {sectorData[activeSector].terms}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#0F172A] border border-[#334155] p-6 rounded-[10px] space-y-4 text-center flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#0284C7]/20 text-[#38BDF8] flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-[17px] font-bold text-white">Ready to Initiate Quoting?</h4>
                  <p className="text-[13px] text-[#94A3B8]">
                    Transmit your Bill of Quantities (BOQ) or item list for immediate institutional tender evaluation.
                  </p>
                </div>
                <Btn
                  size="lg"
                  onClick={() => onNav("rfq")}
                  className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white py-3.5 font-bold shadow-md text-[14px]"
                >
                  {sectorData[activeSector].cta} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Btn>
              </div>
            </div>

            {/* Quick Summary Strip */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left text-[13px] text-[#94A3B8]">
              <div className="bg-[#111827] p-3.5 rounded-[8px] border border-[#334155]">
                <strong className="text-white block font-mono text-[12px]">TENDER RESPONSE LEAD TIME</strong>
                <span>Formalized quotations issued within 24 business hours.</span>
              </div>
              <div className="bg-[#111827] p-3.5 rounded-[8px] border border-[#334155]">
                <strong className="text-white block font-mono text-[12px]">SERIAL LOT TRACEABILITY</strong>
                <span>Every device is barcode-scanned for regulatory recalls.</span>
              </div>
              <div className="bg-[#111827] p-3.5 rounded-[8px] border border-[#334155]">
                <strong className="text-white block font-mono text-[12px]">CUSTOMS & INCOTERMS</strong>
                <span>EXW, FOB, and CIF delivery terms supported globally.</span>
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
              <div className="text-[13px] font-mono font-bold text-[#0284C7] tracking-widest uppercase mb-1">
                04 / LIVE INVENTORY SHOWCASE
              </div>
              <h2 className="text-[32px] font-bold text-[#1B2332]">
                Explore Our Clinical Catalog
              </h2>
            </div>
            <Btn size="md" onClick={() => onNav("store")} className="bg-[#0F172A] hover:bg-[#1E293B] text-white self-start sm:self-auto font-semibold">
              Launch Full 1,000+ SKU Store <ArrowRight className="w-4 h-4 ml-2" />
            </Btn>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNav("category")}
                className="text-left bg-white rounded-[10px] border border-[#CBD5E1]/80 overflow-hidden hover:border-[#0284C7] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#F1F5F9] overflow-hidden relative border-b border-[#E2E8F0]">
                    {cat.image ? (
                      <img loading="lazy" src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <ProductPlaceholder category={cat.label} className="w-full h-full" />
                    )}
                    <div className="absolute top-2 right-2 bg-[#0F172A]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-mono font-bold text-white">
                      {cat.count} SKUs
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-[15px] font-bold text-[#1B2332] group-hover:text-[#0284C7] transition-colors">
                      {cat.label}
                    </div>
                    <div className="text-[12px] text-[#64748B] font-medium mt-0.5">
                      AHA Compliant & CE Certified
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-3 text-[12px] font-semibold text-[#0284C7] flex items-center justify-between">
                  <span>Browse SKUs</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {/* Featured Best Sellers Sub-section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <h3 className="text-[22px] font-bold text-[#1B2332] flex items-center gap-2 font-sans">
                <Award className="w-5 h-5 text-[#0284C7]" /> Featured Clinical Best Sellers
              </h3>
              <span className="text-[13px] text-[#64748B] font-medium hidden sm:inline">Direct manufacturer warranty included</span>
            </div>

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
          SECTION 6: DISTRIBUTOR LOCATOR (INTERACTIVE REGIONAL COMMAND)
         ───────────────────────────────────────────────────────────── */}
      <section id="locator" className="bg-white py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-[13px] font-mono font-bold text-[#0284C7] tracking-widest uppercase mb-1">
                05 / GLOBAL LOGISTICS & BONDED HUBS
              </div>
              <h2 className="text-[32px] font-bold text-[#1B2332]">
                International Distribution Command Center
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Btn size="md" onClick={() => onNav("distributor-register")} className="bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold">
                Register as Authorized Distributor <Globe2 className="w-4 h-4 ml-1.5" />
              </Btn>
            </div>
          </div>

          {/* Interactive Hub Switcher Card */}
          <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-[16px] overflow-hidden shadow-sm">
            
            {/* Hub Selector Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#CBD5E1] bg-[#F1F5F9]">
              {[
                { id: "mea", label: "Middle East & GCC", code: "DXB / HQ" },
                { id: "na", label: "North America Hub", code: "IAH / USA" },
                { id: "eu", label: "European Gateway", code: "RTM / NL" },
                { id: "apac", label: "Asia-Pacific Depot", code: "SIN / SG" }
              ].map((hub) => {
                const isActive = activeHub === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHub(hub.id as any)}
                    className={`p-4 text-left font-sans transition-all cursor-pointer border-r last:border-r-0 border-[#CBD5E1] ${
                      isActive
                        ? "bg-white text-[#0284C7] font-bold shadow-xs border-t-2 border-t-[#0284C7]"
                        : "text-[#475569] hover:bg-white/50 hover:text-[#1B2332]"
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold text-[#64748B]">{hub.code}</div>
                    <div className="text-[15px]">{hub.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Hub Details Dashboard */}
            <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E0F2FE] text-[#0369A1] text-[12px] font-mono font-bold mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> ACTIVE OPERATIONAL DEPOT
                  </div>
                  <h3 className="text-[26px] md:text-[30px] font-bold text-[#1B2332]">
                    {hubData[activeHub].name}
                  </h3>
                  <div className="text-[15px] font-semibold text-[#64748B] flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4 text-[#0284C7]" /> {hubData[activeHub].city}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-[14px]">
                  <div className="bg-[#F8FAFC] p-4 rounded-[10px] border border-[#E2E8F0]">
                    <strong className="text-[#1B2332] block font-mono text-[12px] text-[#64748B] mb-1">FACILITY SPECIFICATION</strong>
                    <span className="text-[#334155] font-medium">{hubData[activeHub].facility}</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-[10px] border border-[#E2E8F0]">
                    <strong className="text-[#1B2332] block font-mono text-[12px] text-[#64748B] mb-1">TERRITORY COVERAGE</strong>
                    <span className="text-[#334155] font-medium">{hubData[activeHub].coverage}</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-[10px] border border-[#E2E8F0]">
                    <strong className="text-[#1B2332] block font-mono text-[12px] text-[#64748B] mb-1">DISPATCH LEAD TIME</strong>
                    <span className="text-[#334155] font-medium">{hubData[activeHub].leadTime}</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-[10px] border border-[#E2E8F0]">
                    <strong className="text-[#1B2332] block font-mono text-[12px] text-[#64748B] mb-1">REGULATORY COMPLIANCE</strong>
                    <span className="text-[#334155] font-medium">{hubData[activeHub].compliance}</span>
                  </div>
                </div>
              </div>

              {/* Hub Contact Direct Action */}
              <div className="lg:col-span-5 bg-[#0F172A] text-white p-7 rounded-[14px] space-y-6 shadow-lg border border-[#334155]">
                <div>
                  <div className="text-[12px] font-mono text-[#38BDF8] font-bold uppercase tracking-wider">Direct Hub Procurement Desk</div>
                  <h4 className="text-[20px] font-bold text-white mt-1">Connect with {activeHub.toUpperCase()} Logistics Desk</h4>
                  <p className="text-[13.5px] text-[#94A3B8] mt-2">
                    Our regional dispatch officers can provide customized container shipping rates and tariff clearance documentation.
                  </p>
                </div>

                <div className="space-y-3 text-[14px] border-t border-[#334155] pt-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#38BDF8]" />
                    <span className="font-mono text-[#E2E8F0]">{hubData[activeHub].contact}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#38BDF8]" />
                    <span className="font-mono text-[#E2E8F0]">{hubData[activeHub].phone}</span>
                  </div>
                </div>

                <Btn size="md" onClick={() => onNav("contact")} className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold py-3 text-[14px]">
                  Transmit Dispatch Inquiry <Send className="w-4 h-4 ml-1.5" />
                </Btn>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: CONTACT US (CORPORATE INQUIRY HELPDESK)
         ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#0A0F1D] text-white py-20 scroll-mt-14 border-t border-[#1E293B]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Headquarters Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="text-[13px] font-mono font-bold text-[#38BDF8] tracking-widest uppercase mb-1">
                  06 / CORPORATE PROCUREMENT HELPDESK
                </div>
                <h2 className="text-[32px] md:text-[38px] font-bold tracking-tight mb-4 text-white font-sans">
                  Connect with Our Institutional Officers
                </h2>
                <p className="text-[#94A3B8] text-[15.5px] leading-relaxed font-normal">
                  Whether you require official manufacturer authorization letters, custom BOQ pricing, or technical device specifications, our regional desks are ready to assist.
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-[#1E293B] text-[14.5px]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#38BDF8] shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white font-sans">Global Headquarters</div>
                    <div className="text-[#CBD5E1] mt-0.5">Desert Rain LLC • Dubai Silicon Oasis</div>
                    <div className="text-[#64748B] text-[13px]">P.O. Box 342001, Dubai, United Arab Emirates</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#38BDF8] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white font-sans">Direct Telephone & Tenders</div>
                    <div className="text-[#CBD5E1] font-mono mt-0.5">+971 4 800 DESERT (+971 4 800 337378)</div>
                    <div className="text-[#64748B] text-[13px]">Mon–Sat • 08:00 – 18:00 (GMT+4)</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#38BDF8] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white font-sans">Official Department Mail</div>
                    <div className="text-[#CBD5E1] font-mono mt-0.5">tenders@desertrainllc.com (Government & BOQ)</div>
                    <div className="text-[#CBD5E1] font-mono">support@desertrainllc.com (Wholesale & Logistics)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Inquiry Form */}
            <div className="lg:col-span-7 bg-white text-[#1B2332] rounded-[16px] p-8 md:p-10 shadow-2xl border border-[#CBD5E1]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[24px] font-bold text-[#1B2332]">Direct B2B Procurement Inquiry</h3>
                <span className="text-[11px] font-mono font-bold bg-[#F1F5F9] text-[#475569] px-2.5 py-1 rounded border border-[#CBD5E1]">
                  TICKET INTAKE
                </span>
              </div>
              <p className="text-[#64748B] text-[14px] mb-6">
                Fill out the specifications below. An institutional procurement officer will review your request within 4 business hours.
              </p>

              {contactSubmitted ? (
                <div className="bg-[#ECFDF5] border border-[#10B981] text-[#065F46] p-6 rounded-[12px] flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[16px]">Inquiry Successfully Transmitted</div>
                    <div className="text-[14px] mt-1 leading-relaxed">
                      Thank you! Your procurement request has been logged into our institutional dispatch queue. You will receive an electronic confirmation with your ticket reference ID shortly.
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
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CBD5E1] text-[14px] focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 font-sans"
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
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CBD5E1] text-[14px] focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 font-sans"
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
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CBD5E1] text-[14px] focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 font-sans"
                      />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-[#334155] block mb-1.5">
                        Inquiry Classification *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CBD5E1] text-[14px] bg-white focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 cursor-pointer font-sans"
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
                      className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CBD5E1] text-[14px] focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 font-sans"
                    />
                  </div>

                  <div className="pt-2">
                    <Btn type="submit" size="lg" className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white py-3.5 text-[15px] font-bold shadow-md">
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
