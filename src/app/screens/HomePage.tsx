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
  Sparkles,
  UserCheck,
  ExternalLink,
  HeartHandshake,
  Layers,
  Send,
  Users,
  BarChart3,
  Clock,
  Briefcase
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
 * HomePage — Complete B2B Medical Distribution Landing Experience
 *
 * Combines all structural sections into a unified, high-impact homepage:
 * 1. Hero Section (Global B2B Distribution & Tender RFQs)
 * 2. About Us Section (Vision, Mission, Corporate Authority)
 * 3. Our Brands Section (Authorized Manufacturer Partnerships)
 * 4. Source & Supply Section (Institutional Procurement & Workflows)
 * 5. Store & Catalog Section (Featured Categories & Top SKUs)
 * 6. Distributor Locator Section (Global Network & Regional Hubs)
 * 7. Contact Us Section (Direct Procurement Inquiry & Headquarters)
 */
export function HomePage({ onNav }: { onNav: (s: Screen) => void }) {
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);
  
  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    email: "",
    type: "Bulk RFQ / Tender",
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
      setFormData({ name: "", org: "", email: "", type: "Bulk RFQ / Tender", message: "" });
    }, 5000);
  };

  return (
    <div className="bg-[#FAFBFC] min-h-screen flex flex-col">
      <SiteHeader onNav={onNav} showCategories />
      <CartToast product={toastProduct} onClose={() => setToastProduct(null)} />
      <MiniCartDrawer
        open={miniCartOpen}
        onClose={() => setMiniCartOpen(false)}
        items={cartItems}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO & VALUE PROPOSITION
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white overflow-hidden border-b border-[#334155]">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/40 text-[#38BDF8] text-[12px] font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Official Global Medical Supply Hub
              </div>
              
              <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.12] tracking-tight text-white">
                Life-Saving Medical Equipment & Emergency Readiness Solutions
              </h1>
              
              <p className="text-[16px] md:text-[18px] text-white/80 leading-relaxed max-w-xl font-normal">
                Direct-ship clinical supplies, CPR training manikins, AED resuscitation defibrillators, and institutional healthcare equipment. Built for health ministries, hospital networks, and authorized distributors worldwide.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Btn size="lg" onClick={() => onNav("store")} className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-7 py-3.5 shadow-lg shadow-[#0284C7]/30 text-[15px]">
                  Explore Equipment Catalog <ArrowRight className="w-4 h-4 ml-2" />
                </Btn>
                <Btn size="lg" variant="secondary" onClick={() => onNav("rfq")} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-3.5 text-[15px]">
                  Request Bulk Tender RFQ
                </Btn>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-[13px] text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>100% AHA / FDA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>50+ Health Ministries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Net 30 Institutional Terms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>24hr Tender Response</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Presentation */}
            <div className="lg:col-span-5 hidden md:block">
              <div className="relative rounded-[16px] overflow-hidden border border-white/15 shadow-2xl bg-[#1E293B]/80 aspect-[4/3] group">
                <img 
                  loading="lazy" 
                  src="/images/hero-banner.png" 
                  alt="Medical Equipment Showroom & Distribution Hub" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 bg-[#0F172A]/90 backdrop-blur-md border border-white/10 p-4 rounded-[10px]">
                  <div className="text-[12px] font-bold text-[#38BDF8] uppercase tracking-wider">Direct Manufacturer Dispatch</div>
                  <div className="text-[14px] font-semibold text-white mt-0.5">Prestan • Zoll • Ferno • Defibtech • Ambu • 3M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: ABOUT US (VISION, MISSION, WHY US)
         ───────────────────────────────────────────────────────────── */}
      <section id="about" className="bg-white py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-[#0284C7] font-bold text-[12px] uppercase tracking-wider bg-[#E0F2FE] px-3 py-1 rounded-full inline-block">
              About Desert Rain LLC
            </span>
            <h2 className="text-[32px] md:text-[38px] font-bold text-[#1B2332] tracking-tight">
              Empowering Global Healthcare & Emergency Readiness
            </h2>
            <p className="text-[16px] text-[#475569] leading-relaxed">
              Headquartered in Dubai Silicon Oasis with distribution arteries spanning North America, Europe, and Asia, Desert Rain LLC serves as the indispensable bridge between world-leading medical device engineers and frontline clinical professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[16px] p-8 space-y-4 hover:border-[#0284C7]/50 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-[12px] bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-[20px] font-bold text-[#1B2332]">Our Vision</h3>
              <p className="text-[14.5px] text-[#475569] leading-relaxed">
                To create a world where no hospital, emergency response agency, or training academy experiences clinical latency or supply chain delays when sourcing critical resuscitation and life-saving equipment.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[16px] p-8 space-y-4 hover:border-[#0284C7]/50 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-[12px] bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-[20px] font-bold text-[#1B2332]">Our Mission</h3>
              <p className="text-[14.5px] text-[#475569] leading-relaxed">
                Delivering uncompromising regulatory compliance (FDA/CE/ISO), strict cold-chain and storage integrity, and bilateral contractual reliability for institutional hospital tenders and volume wholesale distribution.
              </p>
            </div>

            {/* Why Us */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[16px] p-8 space-y-4 hover:border-[#0284C7]/50 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-[12px] bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-[20px] font-bold text-[#1B2332]">Why Partner With Us</h3>
              <p className="text-[14.5px] text-[#475569] leading-relaxed">
                As an authorized primary distribution tier, we eliminate intermediary markups, guarantee serial-tracked manufacturer warranties, and provide dedicated bidding desks for health ministry tender submissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: OUR BRANDS (AUTHORIZED PARTNERSHIPS)
         ───────────────────────────────────────────────────────────── */}
      <section id="brands" className="bg-[#F8FAFC] py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#0369A1] font-bold text-[12px] uppercase tracking-wider bg-[#E0F2FE] px-3 py-1 rounded-full inline-block mb-3">
                Authorized Distribution
              </span>
              <h2 className="text-[32px] font-bold text-[#1B2332]">
                World-Class Manufacturer Partnerships
              </h2>
            </div>
            <p className="text-[15px] text-[#475569] max-w-md">
              We hold official bilateral distribution agreements with the most respected names in emergency medicine and resuscitation technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Prestan Products",
                origin: "United States • Official Distributor",
                desc: "Global leader in professional CPR training manikins equipped with AHA 2020 guideline-compliant CPR rate monitors and AED training simulators.",
                specialty: "CPR Manikins & Training AEDs"
              },
              {
                name: "Zoll Medical",
                origin: "United States • Authorized Partner",
                desc: "Pioneering clinical resuscitation defibrillators, automated CPR mechanical chest compression devices, and hospital cardiac monitoring systems.",
                specialty: "Clinical Defibrillators & Resuscitation"
              },
              {
                name: "Ferno EMS",
                origin: "United States • Wholesale Hub",
                desc: "Setting the global standard for emergency medical transport, ambulance stretchers, stair chairs, and spinal immobilization systems.",
                specialty: "Emergency Transport & Immobilization"
              },
              {
                name: "Defibtech",
                origin: "United States • Master Tier",
                desc: "Designers of the Lifeline series of AEDs, renowned for award-winning ergonomic simplicity in public access and emergency responder defibrillation.",
                specialty: "Public Access & Responder AEDs"
              },
              {
                name: "Ambu",
                origin: "Denmark • Regional Distribution",
                desc: "Inventors of the legendary Ambu Bag resuscitator, advanced single-use visualization endoscopes, and airway management diagnostics.",
                specialty: "Airway Management & Resuscitators"
              },
              {
                name: "3M Healthcare",
                origin: "United States • Clinical Supplier",
                desc: "Hospital-grade infection prevention supplies, N95 clinical respirators, Littmann diagnostic stethoscopes, and surgical sterile drapes.",
                specialty: "Clinical PPE & Infection Control"
              }
            ].map((b, idx) => (
              <div 
                key={idx}
                onClick={() => onNav("store")}
                className="bg-white border border-[#E5E7EB] rounded-[14px] p-6 shadow-2xs hover:shadow-md hover:border-[#0284C7] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[18px] font-bold text-[#1B2332] group-hover:text-[#0284C7] transition-colors flex items-center gap-1.5">
                      {b.name} <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[11px] font-semibold text-[#0369A1] bg-[#E0F2FE] px-2.5 py-1 rounded-full">
                      {b.specialty}
                    </span>
                  </div>
                  <div className="text-[12px] font-medium text-[#64748B] mb-3 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> {b.origin}
                  </div>
                  <p className="text-[14px] text-[#475569] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-[13px] font-semibold text-[#0284C7]">
                  <span>Explore Brand Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: SOURCE & SUPPLY (PROCUREMENT WORKFLOWS)
         ───────────────────────────────────────────────────────────── */}
      <section id="source-supply" className="bg-white py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[#0284C7] font-bold text-[12px] uppercase tracking-wider bg-[#E0F2FE] px-3 py-1 rounded-full inline-block">
              Supply Chain & Logistics
            </span>
            <h2 className="text-[32px] md:text-[38px] font-bold text-[#1B2332] tracking-tight">
              Institutional Sourcing & Tender Fulfillment Workflows
            </h2>
            <p className="text-[16px] text-[#475569] leading-relaxed">
              We streamline complex international medical procurements through a transparent, 3-pillar architectural supply model built for hospital directors and ministry bidding committees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="relative bg-[#FAFBFC] border border-[#E5E7EB] rounded-[16px] p-8 space-y-4">
              <div className="absolute -top-4 left-8 bg-[#0284C7] text-white text-[13px] font-bold px-3.5 py-1 rounded-full shadow-sm">
                01. Tender Dossiers
              </div>
              <div className="pt-2">
                <FileText className="w-8 h-8 text-[#0284C7] mb-4" />
                <h3 className="text-[19px] font-bold text-[#1B2332] mb-2">Hospital Tender & Compliance</h3>
                <p className="text-[14px] text-[#475569] leading-relaxed">
                  Dedicated bidding desks prepare comprehensive regulatory dossiers, including official Manufacturer Authorization Letters, ISO 13485 audits, CE declarations, and local Ministry of Health registration certificates.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="relative bg-[#FAFBFC] border border-[#E5E7EB] rounded-[16px] p-8 space-y-4">
              <div className="absolute -top-4 left-8 bg-[#0284C7] text-white text-[13px] font-bold px-3.5 py-1 rounded-full shadow-sm">
                02. Volume Quoting
              </div>
              <div className="pt-2">
                <BarChart3 className="w-8 h-8 text-[#0284C7] mb-4" />
                <h3 className="text-[19px] font-bold text-[#1B2332] mb-2">Bulk RFQ & Wholesale Tiering</h3>
                <p className="text-[14px] text-[#475569] leading-relaxed">
                  Our automated RFQ procurement system generates formalized quotations within 24 hours. Benefit from tiered wholesale discounting, customized packaging, and priority factory production allocations.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="relative bg-[#FAFBFC] border border-[#E5E7EB] rounded-[16px] p-8 space-y-4">
              <div className="absolute -top-4 left-8 bg-[#0284C7] text-white text-[13px] font-bold px-3.5 py-1 rounded-full shadow-sm">
                03. Global Dispatch
              </div>
              <div className="pt-2">
                <Truck className="w-8 h-8 text-[#0284C7] mb-4" />
                <h3 className="text-[19px] font-bold text-[#1B2332] mb-2">Regional Hub & Cold Chain</h3>
                <p className="text-[14px] text-[#475569] leading-relaxed">
                  Strategically located customs-bonded warehouses in Dubai, Houston, and Rotterdam ensure rapid freight dispatch via containerized maritime shipping or express air cargo with full serial lot tracking.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 bg-[#1B2332] text-white rounded-[16px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-[22px] font-bold">Managing a Multi-Hospital Procurement or Government Tender?</h3>
              <p className="text-white/70 text-[15px] max-w-xl">
                Submit your project specifications or bill of quantities (BOQ) directly to our institutional bidding desk for an immediate priority evaluation.
              </p>
            </div>
            <Btn size="lg" onClick={() => onNav("rfq")} className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-8 py-4 shrink-0 font-semibold shadow-md">
              Initiate RFQ Workflow <ArrowRight className="w-4 h-4 ml-2" />
            </Btn>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: STORE CATALOG & FEATURED PRODUCTS
         ───────────────────────────────────────────────────────────── */}
      <section id="store" className="bg-[#F1F5F9] py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#0284C7] font-bold text-[12px] uppercase tracking-wider bg-[#E0F2FE] px-3 py-1 rounded-full inline-block mb-3">
                Equipment Showcase
              </span>
              <h2 className="text-[32px] font-bold text-[#1B2332]">
                Explore Our Clinical Catalog
              </h2>
            </div>
            <button
              onClick={() => onNav("store")}
              className="text-[15px] font-semibold text-[#0284C7] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
            >
              View Full 1,000+ SKU Catalog <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNav("category")}
                className="text-left bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden hover:border-[#0284C7] hover:shadow-md transition-all group"
              >
                <div className="aspect-[4/3] bg-[#F8FAFC] overflow-hidden relative">
                  {cat.image ? (
                    <img loading="lazy" src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <ProductPlaceholder category={cat.label} className="w-full h-full" />
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-bold text-[#1B2332]">
                    {cat.count} SKUs
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[15px] font-bold text-[#1B2332] group-hover:text-[#0284C7] transition-colors">
                    {cat.label}
                  </div>
                  <div className="text-[12.5px] text-[#64748B] mt-0.5">
                    AHA Compliant & CE Certified
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Best Sellers Sub-section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <h3 className="text-[22px] font-bold text-[#1B2332] flex items-center gap-2">
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
          SECTION 6: DISTRIBUTOR LOCATOR (GLOBAL NETWORK)
         ───────────────────────────────────────────────────────────── */}
      <section id="locator" className="bg-white py-20 border-b border-[#E5E7EB] scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-[#0284C7] font-bold text-[12px] uppercase tracking-wider bg-[#E0F2FE] px-3 py-1 rounded-full inline-block mb-3">
                Global Reach
              </span>
              <h2 className="text-[32px] font-bold text-[#1B2332]">
                International Network & Regional Hubs
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Btn size="md" onClick={() => onNav("distributor-register")} className="bg-[#0284C7] hover:bg-[#0369A1] text-white">
                Register as Authorized Distributor
              </Btn>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                region: "Middle East & GCC Hub",
                city: "Dubai Silicon Oasis, UAE",
                status: "Primary Distribution HQ",
                cap: "50,000+ sq ft bonded warehouse serving GCC, Levant, and East Africa.",
                contact: "mea@desertrainllc.com"
              },
              {
                region: "North American Hub",
                city: "Houston, Texas, USA",
                status: "Direct Factory Dispatch",
                cap: "Managing factory allocations and North American health system deliveries.",
                contact: "americas@desertrainllc.com"
              },
              {
                region: "European Gateway",
                city: "Rotterdam, Netherlands",
                status: "CE Compliance Hub",
                cap: "Europool logistics center managing CE MDR regulatory compliance and customs.",
                contact: "europe@desertrainllc.com"
              },
              {
                region: "Asia-Pacific Hub",
                city: "Singapore",
                status: "APAC Regional Center",
                cap: "Dedicated tender support and rapid air-cargo dispatch for Southeast Asia.",
                contact: "apac@desertrainllc.com"
              }
            ].map((hub, i) => (
              <div key={i} className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-[14px] p-6 space-y-4 hover:border-[#0284C7] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#0369A1] bg-[#E0F2FE] px-2 py-0.5 rounded uppercase tracking-wider">
                      {hub.status}
                    </span>
                    <MapPin className="w-4 h-4 text-[#0284C7]" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#1B2332]">{hub.region}</h3>
                  <div className="text-[13px] font-semibold text-[#64748B] mb-3">{hub.city}</div>
                  <p className="text-[13.5px] text-[#475569] leading-relaxed">
                    {hub.cap}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5E7EB] text-[12.5px] font-medium text-[#0284C7] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> {hub.contact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: CONTACT US (DIRECT PROCUREMENT INQUIRY)
         ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#1B2332] text-white py-20 scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Headquarters Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[#38BDF8] font-bold text-[12px] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full inline-block mb-3">
                  Procurement Desk
                </span>
                <h2 className="text-[32px] font-bold tracking-tight mb-4">
                  Get in Touch with Our Procurement Team
                </h2>
                <p className="text-white/70 text-[15px] leading-relaxed">
                  Whether you require official manufacturer authorization letters, custom tender pricing, or technical device specifications, our regional officers are ready to assist.
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-white/10 text-[14.5px]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center text-[#38BDF8] shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Global Headquarters</div>
                    <div className="text-white/70 mt-0.5">Desert Rain LLC • Dubai Silicon Oasis</div>
                    <div className="text-white/50 text-[13px]">P.O. Box 342001, Dubai, United Arab Emirates</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center text-[#38BDF8] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Direct Telephone & Tenders</div>
                    <div className="text-white/70 mt-0.5">+971 4 800 DESERT (+971 4 800 337378)</div>
                    <div className="text-white/50 text-[13px]">Mon–Sat • 08:00 – 18:00 (GMT+4)</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center text-[#38BDF8] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Official Electronic Mail</div>
                    <div className="text-white/70 mt-0.5">tenders@desertrainllc.com (Government & Tenders)</div>
                    <div className="text-white/50 text-[13px]">support@desertrainllc.com (Wholesale & Logistics)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Inquiry Form */}
            <div className="lg:col-span-7 bg-white text-[#1B2332] rounded-[18px] p-8 md:p-10 shadow-2xl">
              <h3 className="text-[22px] font-bold mb-2">Direct B2B Inquiry Form</h3>
              <p className="text-[#64748B] text-[14px] mb-6">
                Fill out the details below. A dedicated regional procurement officer will respond within 4 business hours.
              </p>

              {contactSubmitted ? (
                <div className="bg-[#ECFDF5] border border-[#10B981] text-[#065F46] p-6 rounded-[12px] flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[16px]">Inquiry Successfully Transmitted</div>
                    <div className="text-[14px] mt-1">
                      Thank you! Your project request has been logged into our institutional dispatch queue. You will receive an email confirmation with your reference ticket ID shortly.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-semibold text-[#1B2332] block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Alistair Vance"
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CBD5E1] text-[14px] focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                      />
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-[#1B2332] block mb-1.5">
                        Institution or Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        placeholder="Ministry of Health / St. Jude Hospital"
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CBD5E1] text-[14px] focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-semibold text-[#1B2332] block mb-1.5">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@hospital.org"
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CBD5E1] text-[14px] focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                      />
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-[#1B2332] block mb-1.5">
                        Inquiry Category *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CBD5E1] text-[14px] bg-white focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                      >
                        <option value="Bulk RFQ / Tender">Bulk RFQ / Hospital Tender</option>
                        <option value="Distributor Application">Authorized Distributor Application</option>
                        <option value="Product Specification">Product Datasheet & Technical Query</option>
                        <option value="Logistics & Shipping">Customs & Freight Logistics</option>
                        <option value="General Support">General Corporate Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[13px] font-semibold text-[#1B2332] block mb-1.5">
                      Project Specifications or Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify target quantities, delivery timeframe, or tender reference numbers..."
                      className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CBD5E1] text-[14px] focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
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
