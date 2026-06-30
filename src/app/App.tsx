import { useState, useEffect } from "react";
import {
  Menu, Search, ShoppingCart, User, ChevronDown, ChevronRight, ChevronLeft, ChevronUp,
  Bell, Package, Truck, CheckCircle, AlertTriangle, XCircle, Info,
  Star, Download, Eye, Edit, Archive, Plus, Minus, BarChart2, Settings,
  FileText, X, Tag, Phone, Shield, Award, Headphones, Zap, RefreshCw,
  ExternalLink, Check, ArrowRight, Building, CreditCard, AlertCircle,
  BookOpen, Activity, LogOut, Heart, Repeat2, MessageSquare, Lock,
  Upload, Trash2, Layers, Sliders, ShoppingBag, Banknote, Receipt,
  MapPin, Facebook, Linkedin, Youtube, Twitter, LayoutGrid, AlignJustify,
  MoreHorizontal, Clock, HeartPulse, Cross, ShieldAlert, UserCheck, Box,
} from "lucide-react";

// ──────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────

type Screen =
  | "home" | "category" | "product" | "cart" | "checkout"
  | "tracking" | "account" | "admin-cms" | "admin-ims"
  | "notifications" | "components";

type StockStatus = "in-stock" | "low-stock" | "out-of-stock";
type OrderStatus = "processing" | "packed" | "shipped" | "delivered" | "cancelled";

interface Product {
  id: string; sku: string; name: string; brand: string;
  category: string; price: number; stock: StockStatus;
  qty: number; image: string; rating: number; reviews: number;
}

// ──────────────────────────────────────────────
// MOCK DATA
// ──────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: "1", sku: "PRE-101-01", name: "Prestan Adult Manikin with CPR Rate Monitor", brand: "Prestan", category: "CPR Training", price: 189.99, stock: "in-stock", qty: 245, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&auto=format", rating: 4.8, reviews: 127 },
  { id: "2", sku: "ZOL-AED-PLUS", name: "Zoll AED Plus Automated External Defibrillator", brand: "Zoll", category: "AED", price: 1549.00, stock: "in-stock", qty: 18, image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&auto=format", rating: 4.9, reviews: 89 },
  { id: "3", sku: "MCR-FA-200", name: "Professional First Aid Kit — 200 Piece", brand: "MCR Medical", category: "First Aid", price: 74.95, stock: "low-stock", qty: 7, image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop&auto=format", rating: 4.6, reviews: 214 },
  { id: "4", sku: "3M-N95-8210", name: "3M N95 Particulate Respirator 8210 (20pk)", brand: "3M", category: "Respiratory", price: 24.99, stock: "in-stock", qty: 1200, image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=400&fit=crop&auto=format", rating: 4.7, reviews: 532 },
  { id: "5", sku: "MCR-NITRILE-L", name: "Nitrile Exam Gloves Powder-Free Large 100pk", brand: "MCR Medical", category: "Gloves", price: 14.99, stock: "in-stock", qty: 3400, image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=400&fit=crop&auto=format", rating: 4.5, reviews: 871 },
  { id: "6", sku: "LSP-BVM-ADULT", name: "LSP Bag Valve Mask — Adult Resuscitator", brand: "LSP", category: "Airway", price: 28.50, stock: "out-of-stock", qty: 0, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop&auto=format", rating: 4.4, reviews: 156 },
  { id: "7", sku: "FRN-35-F", name: "Ferno Model 35 EMS Folding Stretcher", brand: "Ferno", category: "Transport", price: 449.00, stock: "in-stock", qty: 32, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&auto=format", rating: 4.7, reviews: 67 },
  { id: "8", sku: "PPE-GOWN-XL", name: "Disposable Isolation Gown Level 2 — XL (50pk)", brand: "SafeGuard PPE", category: "PPE", price: 49.99, stock: "in-stock", qty: 580, image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop&auto=format", rating: 4.3, reviews: 193 },
];

const CATEGORIES = [
  { id: "cpr", label: "CPR & AED", icon: Heart, count: 124 },
  { id: "first-aid", label: "First Aid", icon: Package, count: 287 },
  { id: "ppe", label: "PPE & Safety", icon: Shield, count: 415 },
  { id: "airway", label: "Airway Mgmt", icon: Activity, count: 98 },
  { id: "transport", label: "Patient Transport", icon: Truck, count: 76 },
  { id: "diagnostics", label: "Diagnostics", icon: Zap, count: 203 },
  { id: "training", label: "Training Supplies", icon: BookOpen, count: 145 },
  { id: "industrial", label: "Industrial Safety", icon: Building, count: 338 },
];

const ORDERS = [
  { id: "ORD-10042", date: "Jun 18, 2025", items: 4, total: 689.94, status: "shipped" as OrderStatus },
  { id: "ORD-10038", date: "Jun 10, 2025", items: 2, total: 224.50, status: "delivered" as OrderStatus },
  { id: "ORD-10031", date: "May 29, 2025", items: 6, total: 1324.00, status: "delivered" as OrderStatus },
  { id: "ORD-10027", date: "May 15, 2025", items: 1, total: 189.99, status: "delivered" as OrderStatus },
  { id: "ORD-10019", date: "Apr 28, 2025", items: 8, total: 2189.45, status: "delivered" as OrderStatus },
];

const STOCK_ITEMS = [
  { sku: "PRE-101-01", name: "Prestan Adult Manikin w/ CPR Monitor", current: 245, reserved: 12, available: 233, reorder: 50, supplier: "Prestan Products" },
  { sku: "ZOL-AED-PLUS", name: "Zoll AED Plus Defibrillator", current: 18, reserved: 3, available: 15, reorder: 20, supplier: "Zoll Medical" },
  { sku: "MCR-FA-200", name: "Professional First Aid Kit 200pc", current: 7, reserved: 2, available: 5, reorder: 25, supplier: "MCR Medical" },
  { sku: "3M-N95-8210", name: "3M N95 Particulate Respirator 8210 20pk", current: 1200, reserved: 85, available: 1115, reorder: 200, supplier: "3M Health" },
  { sku: "MCR-NITRILE-L", name: "Nitrile Exam Gloves L 100pk", current: 3400, reserved: 244, available: 3156, reorder: 500, supplier: "MCR Medical" },
  { sku: "LSP-BVM-ADULT", name: "LSP Bag Valve Mask Adult", current: 0, reserved: 0, available: 0, reorder: 30, supplier: "LSP Medical" },
  { sku: "FRN-35-F", name: "Ferno Model 35 Folding Stretcher", current: 32, reserved: 5, available: 27, reorder: 10, supplier: "Ferno" },
  { sku: "PPE-GOWN-XL", name: "Disposable Isolation Gown Level 2 XL 50pk", current: 580, reserved: 40, available: 540, reorder: 100, supplier: "SafeGuard PPE" },
];

// ──────────────────────────────────────────────
// PRIMITIVE UI COMPONENTS
// ──────────────────────────────────────────────

function Btn({
  children, variant = "primary", size = "md", disabled = false,
  loading = false, onClick, className = "",
}: {
  children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg"; disabled?: boolean; loading?: boolean;
  onClick?: () => void; className?: string;
}) {
  const base = "font-heading inline-flex items-center justify-center gap-1.5 font-bold rounded-[2px] transition-all cursor-pointer select-none border leading-none min-h-[44px] md:min-h-0 active:scale-[0.98]";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-2.5 text-[15px]" };
  const variants = {
    primary: "bg-[#0f4c5c] text-white border-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_2px_rgba(15,76,92,0.4)] hover:bg-[#12647a] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(15,76,92,0.3)] active:bg-[#083a4a]",
    secondary: "bg-white text-[#0f4c5c] border-[#e2e4e8] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-[#0f4c5c] hover:text-[#0f4c5c] hover:shadow-[0_2px_8px_rgba(15,76,92,0.1)]",
    ghost: "bg-transparent text-[#4b5563] border-transparent hover:text-[#0f4c5c] hover:bg-[#f5f6f8]",
    destructive: "bg-[#b91c1c] text-white border-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_2px_rgba(185,28,28,0.4)] hover:bg-[#991818]",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${(disabled || loading) ? "opacity-40 cursor-not-allowed pointer-events-none" : ""} ${className}`}
    >
      {loading && <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}

function StockBadge({ status }: { status: StockStatus }) {
  const cfg = {
    "in-stock": { label: "In Stock", cls: "text-green-700 bg-green-50 border-green-200", dot: "bg-green-600" },
    "low-stock": { label: "Low Stock", cls: "text-amber-700 bg-amber-50 border-amber-200", dot: "bg-amber-500" },
    "out-of-stock": { label: "Out of Stock", cls: "text-red-700 bg-red-50 border-red-200", dot: "bg-red-600" },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase border rounded-[3px] ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
    </span>
  );
}

function OrderBadge({ status }: { status: OrderStatus }) {
  const cfg = {
    processing: "text-[#0f4c5c] bg-[#0f4c5c]/10 border-[#0f4c5c]/20",
    packed: "text-purple-700 bg-purple-50 border-purple-200",
    shipped: "text-amber-700 bg-amber-50 border-amber-200",
    delivered: "text-green-700 bg-green-50 border-green-200",
    cancelled: "text-red-700 bg-red-50 border-red-200",
  }[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border rounded-[3px] ${cfg}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function FieldInput({ label, placeholder, type = "text", inputMode, error, disabled, prefix, className = "" }: {
  label?: string; placeholder?: string; type?: string; inputMode?: "text" | "numeric" | "tel" | "search" | "email" | "url"; error?: string;
  disabled?: boolean; prefix?: React.ReactNode; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-[10px] font-semibold text-[#1c2438] uppercase tracking-widest">{label}</label>}
      <div className={`flex items-center border rounded-[4px] bg-white transition-colors ${error ? "border-red-500" : "border-[#e2e4e8]"} ${disabled ? "opacity-50" : ""} focus-within:border-[#0f4c5c] focus-within:ring-1 focus-within:ring-[#0f4c5c]/20`}>
        {prefix && <span className="pl-3 text-[#4b5563]">{prefix}</span>}
        <input type={type} inputMode={inputMode} placeholder={placeholder} disabled={disabled}
          className="flex-1 px-3 py-2 text-sm text-[#1c2438] bg-transparent outline-none placeholder:text-[#9ca3af] min-h-[44px]" />
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}

// ──────────────────────────────────────────────
// CART TOAST & MINI-CART DRAWER
// ──────────────────────────────────────────────

function CartToast({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (!product) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [product, onClose]);
  if (!product) return null;
  return (
    <div className="fixed top-14 right-4 z-[200] animate-[slideInRight_0.3s_ease-out] bg-white border border-[#e2e4e8] rounded-[4px] shadow-xl p-4 w-80">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-[#f5f6f8] rounded-[3px] overflow-hidden shrink-0">
          <img loading="lazy" src={product.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-green-700 font-semibold mb-1">
            <CheckCircle className="w-3.5 h-3.5" /> Added to Cart
          </div>
          <div className="text-sm font-medium text-[#1c2438] line-clamp-1">{product.name}</div>
          <div className="text-xs text-[#4b5563]">${product.price.toFixed(2)}</div>
        </div>
        <button onClick={onClose} className="text-[#4b5563] hover:text-[#1c2438]"><X className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

function MiniCartDrawer({ open, onClose, items }: { open: boolean; onClose: () => void; items: { product: Product; qty: number }[] }) {
  if (!open) return null;
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[190]" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-96 max-w-full bg-white shadow-2xl z-[200] flex flex-col animate-[slideInRight_0.3s_ease-out]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e4e8]">
          <h3 className="text-sm font-bold text-[#1c2438]">Cart ({items.length} items)</h3>
          <button onClick={onClose} className="text-[#4b5563] hover:text-[#1c2438]"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3 pb-3 border-b border-[#e2e4e8] last:border-0">
              <div className="w-14 h-14 bg-[#f5f6f8] rounded-[3px] overflow-hidden shrink-0">
                <img loading="lazy" src={item.product.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#1c2438] line-clamp-1">{item.product.name}</div>
                <div className="text-xs text-[#4b5563]">Qty: {item.qty} × ${item.product.price.toFixed(2)}</div>
              </div>
              <div className="text-sm font-bold text-[#1c2438] shrink-0">${(item.product.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#e2e4e8] p-5">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-bold text-[#1c2438]">Subtotal</span>
            <span className="text-lg font-bold text-[#1c2438]">${total.toFixed(2)}</span>
          </div>
          <Btn size="lg" className="w-full" onClick={onClose}><ShoppingCart className="w-4 h-4" /> View Cart</Btn>
        </div>
      </div>
    </>
  );
}

function ProductCard({ product, onNav, onAddToCart }: { product: Product; onNav?: (s: Screen) => void; onAddToCart?: (product: Product) => void }) {
  return (
    <div className="bg-white border border-[#e2e4e8] rounded-[4px] hover:border-[#0f4c5c]/30 hover:shadow-sm transition-all group">
      <div className="relative bg-[#f5f6f8] aspect-square overflow-hidden rounded-t-[3px]">
        <img loading="lazy" src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
        <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-[3px] border border-[#e2e4e8] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[#0f4c5c]">
          <Heart className="w-3.5 h-3.5 text-[#6b7280]" />
        </button>
        <button
          className="absolute bottom-2 left-2 right-2 bg-white/90 border border-[#e2e4e8] text-xs font-semibold py-1.5 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 hover:bg-[#f5f6f8]"
          onClick={() => onNav?.("product")}
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </button>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <div className="font-mono text-[10px] text-[#4b5563] uppercase tracking-wide">{product.sku}</div>
            <div className="text-xs font-semibold text-[#6b7280]">{product.brand}</div>
          </div>
          <StockBadge status={product.stock} />
        </div>
        <h3 className="text-sm font-medium text-[#1c2438] leading-snug line-clamp-2 mb-2 cursor-pointer hover:text-[#0f4c5c]" onClick={() => onNav?.("product")}>
          {product.name}
        </h3>
        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-[#e2e4e8] fill-[#e2e4e8]"}`} />
          ))}
          <span className="text-[10px] text-[#4b5563] ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-bold text-[#1c2438]">${product.price.toFixed(2)}</div>
            <div className="text-[10px] text-[#4b5563]">per unit</div>
          </div>
          <Btn size="sm" onClick={() => onAddToCart?.(product)}>Add to Cart</Btn>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// LAYOUT: HEADER
// ──────────────────────────────────────────────

function SiteHeader({ onNav }: { onNav: (s: Screen) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <div className="sticky top-0 md:top-9 z-40">
      {/* Announcement bar - hidden on very small screens, responsive */}
      <div className="hidden sm:flex bg-[#1c2438] text-white text-xs py-2 px-4 items-center justify-center gap-8 font-medium tracking-wide">
        <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Free shipping on orders over $250</span>
        <span className="hidden md:flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Code <strong>Desert Rain10</strong> — 10% off first order</span>
        <span className="hidden lg:flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> 1-800-MCR-4321 · Mon–Fri 7AM–7PM EST</span>
      </div>

      {/* Main header */}
      <header className="bg-white border-b border-[#e2e4e8]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center gap-3 md:gap-4 justify-between md:justify-start">
          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 -ml-2 text-[#374151]" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => onNav("home")}>
            <img src="https://desertrainllc.com/images/desertrain-logo.png" alt="Desert Rain Logo" className="h-8 md:h-10 w-auto" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center ml-2 relative group">
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-[#374151] hover:text-[#0f4c5c] font-medium whitespace-nowrap">
              Our Profile <ChevronDown className="w-3.5 h-3.5 text-[#4b5563]" />
            </button>
            <div className="group relative">
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-[#374151] hover:text-[#0f4c5c] font-medium whitespace-nowrap">
                Products <ChevronDown className="w-3.5 h-3.5 text-[#4b5563]" />
              </button>
              {/* Desktop Mega-Menu */}
              <div className="absolute top-full left-0 w-[600px] bg-white border border-[#e2e4e8] rounded-[4px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-6 grid grid-cols-2 gap-x-8 gap-y-4">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} className="flex items-start gap-3 text-left group/item" onClick={() => onNav("category")}>
                    <div className="w-8 h-8 rounded-full bg-[#f5f6f8] flex items-center justify-center shrink-0 group-hover/item:bg-[#0f4c5c] group-hover/item:text-white transition-colors">
                      <cat.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1c2438] group-hover/item:text-[#0f4c5c]">{cat.label}</div>
                      <div className="text-xs text-[#6b7280] mt-0.5">{cat.count} items</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {["Store Locator", "Contact Us"].map(item => (
              <button key={item} className="flex items-center gap-1 px-3 py-2 text-sm text-[#374151] hover:text-[#0f4c5c] font-medium whitespace-nowrap">
                {item}
              </button>
            ))}
          </nav>

          {/* Search - Hidden on mobile, shown on desktop — primary search point */}
          <div className="hidden md:block flex-1 max-w-2xl mx-4">
            <div className="flex items-center border-2 border-[#e2e4e8] rounded-[2px] bg-white focus-within:border-[#0f4c5c] focus-within:shadow-[0_0_0_3px_rgba(15,76,92,0.1)] transition-all">
              <Search className="w-4 h-4 text-[#4b5563] ml-3 shrink-0" />
              <input placeholder="Search by SKU, product name, brand, or keyword..." className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-[#9ca3af] min-h-[44px]" />
              <button className="mr-1.5 bg-[#0f4c5c] text-white text-xs font-bold font-heading px-4 py-1.5 rounded-[2px] hover:bg-[#12647a] shrink-0">Search</button>
            </div>
          </div>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-1 shrink-0 ml-auto md:ml-0">
            <button className="md:hidden p-2 text-[#374151]">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden md:flex flex-col items-center gap-0.5 px-2.5 py-2 text-[#374151] hover:text-[#0f4c5c] hover:bg-[#f5f6f8] rounded-[4px]" onClick={() => onNav("account")}>
              <User className="w-5 h-5" />
              <span className="text-[10px] font-medium hidden lg:block">Account</span>
            </button>
            <button className="hidden md:flex flex-col items-center gap-0.5 px-2.5 py-2 text-[#374151] hover:text-[#0f4c5c] hover:bg-[#f5f6f8] rounded-[4px] relative" onClick={() => onNav("notifications")}>
              <Bell className="w-5 h-5" />
              <span className="text-[10px] font-medium hidden lg:block">Alerts</span>
              <span className="absolute top-1.5 right-1 w-4 h-4 bg-[#c84b0b] text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="flex items-center md:flex-col md:items-center gap-0.5 p-2 md:px-2.5 md:py-2 text-[#374151] hover:text-[#0f4c5c] hover:bg-[#f5f6f8] rounded-[4px] relative" onClick={() => onNav("cart")}>
              <ShoppingCart className="w-5 h-5" />
              <span className="text-[10px] font-medium hidden lg:block">Cart</span>
              <span className="absolute top-1 md:top-1.5 -right-1 md:right-1 w-4 h-4 md:w-4 md:h-4 bg-[#c84b0b] text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="hidden md:block h-8 w-px bg-[#e2e4e8] mx-1" />
            <div className="hidden md:block">
              <Btn size="sm" onClick={() => {}}>Request Quote</Btn>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Visible only on mobile below the main header row */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center border border-[#e2e4e8] rounded-[4px] bg-[#f5f6f8]">
            <Search className="w-4 h-4 text-[#4b5563] ml-3 shrink-0" />
            <input placeholder="Search..." className="flex-1 px-3 py-2 text-sm bg-transparent outline-none placeholder:text-[#9ca3af]" />
          </div>
        </div>

        {/* Category strip - Desktop only */}
        <div className="hidden md:block border-t border-[#e2e4e8] bg-white">
          <div className="max-w-[1440px] mx-auto px-6 flex items-center overflow-x-auto">
            {CATEGORIES.map(cat => (
              <button key={cat.id} className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#374151] hover:text-[#0f4c5c] hover:bg-[#f5f6f8] whitespace-nowrap border-b-2 border-transparent hover:border-[#0f4c5c] transition-colors" onClick={() => onNav("category")}>
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            ))}
            <button className="flex items-center gap-1 px-4 py-2.5 text-xs font-medium text-[#374151] hover:text-[#0f4c5c] whitespace-nowrap ml-auto">
              All Categories <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-[85%] max-w-sm bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-left">
            <div className="flex items-center justify-between p-4 border-b border-[#e2e4e8]">
              <img src="https://desertrainllc.com/images/desertrain-logo.png" alt="Logo" className="h-7 w-auto" />
              <button className="p-2 -mr-2 text-[#4b5563]" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-[#1c2438] hover:bg-[#f5f6f8]">
                Our Profile
              </button>
              <div>
                <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#1c2438] hover:bg-[#f5f6f8]" onClick={() => setProductsOpen(!productsOpen)}>
                  Products
                  <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                {productsOpen && (
                  <div className="bg-[#f5f6f8] py-2">
                    {CATEGORIES.map(cat => (
                      <button key={cat.id} className="w-full flex items-center gap-3 px-6 py-2.5 text-sm text-[#374151] hover:text-[#0f4c5c]" onClick={() => { setMobileMenuOpen(false); onNav("category"); }}>
                        <cat.icon className="w-4 h-4" /> {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-[#1c2438] hover:bg-[#f5f6f8]">
                Store Locator
              </button>
              <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-[#1c2438] hover:bg-[#f5f6f8]">
                Contact Us
              </button>
              <div className="border-t border-[#e2e4e8] mt-2 pt-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#1c2438] hover:bg-[#f5f6f8]" onClick={() => { setMobileMenuOpen(false); onNav("account"); }}>
                  <User className="w-4 h-4" /> My Account
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#1c2438] hover:bg-[#f5f6f8]">
                  <FileText className="w-4 h-4" /> Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// LAYOUT: FOOTER
// ──────────────────────────────────────────────

function SiteFooter() {
  return (
    <footer className="bg-[#0f4c5c] text-white mt-16">
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 py-8 flex items-center justify-between gap-8 flex-wrap">
          <div>
            <div className="font-semibold">Stay informed on product updates &amp; promotions</div>
            <div className="text-sm text-white/80 mt-0.5">Join 12,000+ procurement professionals</div>
          </div>
          <div className="flex gap-2">
            <input placeholder="Enter your work email" className="px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-[4px] text-white placeholder:text-white/60 outline-none focus:border-white w-64" />
            <Btn variant="secondary" size="sm">Subscribe</Btn>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img loading="lazy" src="https://desertrainllc.com/images/desertrain-logo.png" alt="Desert Rain Logo" className="h-8 w-auto bg-white p-1 rounded" />
          </div>
          <p className="text-xs text-white/80/80 leading-relaxed">ISO 9001 certified distributor of medical, EMS, and industrial safety products. Serving healthcare and industry since 1998.</p>
          <div className="flex gap-2 mt-4">
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-7 h-7 bg-white/10 rounded-[3px] flex items-center justify-center hover:bg-white/20 transition-colors">
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Products", links: ["CPR & AED", "First Aid", "PPE & Safety", "Airway Management", "Patient Transport", "Diagnostics"] },
          { title: "Company", links: ["About Us", "Careers", "Press", "Partners", "Blog", "Contact"] },
          { title: "Account", links: ["My Account", "Order History", "Track Order", "Request Quote", "Reorder Lists", "Net 30 Terms"] },
          { title: "Support", links: ["Help Center", "Shipping Policy", "Returns & Exchanges", "Product Recalls", "Compliance Docs", "MSDS Sheets"] },
        ].map(col => (
          <div key={col.title}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/80/60 mb-4">{col.title}</div>
            <ul className="space-y-2">
              {col.links.map(link => (
                <li key={link}><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap text-xs text-white/60/60">
          <div>© 2025 Desert Rain LLC All rights reserved.</div>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> ISO 9001:2015</span>
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> SSL Secured</span>
            <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> FDA Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────
// SCREEN 01: HOME PAGE
// ──────────────────────────────────────────────

function HomePage({ onNav }: { onNav: (s: Screen) => void }) {
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    setToastProduct(product);
    setTimeout(() => setMiniCartOpen(true), 300);
  };

  return (
    <div className="bg-white">
      <SiteHeader onNav={onNav} />
      <CartToast product={toastProduct} onClose={() => setToastProduct(null)} />
      <MiniCartDrawer open={miniCartOpen} onClose={() => setMiniCartOpen(false)} items={cartItems} />

      {/* Operational Status Bar */}
      <div className="bg-[#1c2438] text-white border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 py-2 flex items-center justify-between text-[11px] font-mono tracking-wide overflow-x-auto gap-4">
          <div className="flex items-center gap-5 shrink-0">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> ALL SYSTEMS OPERATIONAL</span>
            <span className="text-white/20">|</span>
            <span className="hidden sm:inline">IN-STOCK SKUs: <strong className="text-white">14,248</strong></span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden md:inline">AVG FULFILLMENT: <strong className="text-white">4.2 HRS</strong></span>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <span className="hidden lg:inline">ORDERS THIS WEEK: <strong className="text-white">1,847</strong></span>
            <span className="hidden lg:inline text-white/20">|</span>
            <span>ISO 9001:2015 &bull; FDA REGISTERED</span>
          </div>
        </div>
      </div>

      {/* ─── HERO ZONE: Static Promo Strip + Quick Reorder ─── */}
      <section className="bg-[#0f4c5c] text-white">
        <div className="max-w-[1440px] mx-auto px-6 py-4 md:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">Q3 Compliance Bundle</div>
            <div className="text-sm md:text-base font-heading font-bold leading-snug">
              AED + First Aid + CPR Manikin Training Kit &mdash; save 18% when bundled.
            </div>
            <div className="text-xs text-white/70 mt-1">
              Pre-configured to meet 2025 AHA guidelines. Ships as single PO. Valid through Sept 30.
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden md:block">
              <div className="text-xs text-white/50 line-through">$2,412.00</div>
              <div className="text-lg font-heading font-extrabold">$1,977.84</div>
            </div>
            <Btn size="md" className="!bg-white !text-[#0f4c5c] !border-white hover:!bg-white/90 !shadow-none font-heading" onClick={() => onNav("product")}>View Bundle</Btn>
          </div>
        </div>
      </section>

      {/* ─── SHOP BY CATEGORY: Horizontal scroll row with product thumbnails ─── */}
      <section className="border-b border-[#e2e4e8] bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-5">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xs font-mono text-[#4b5563] uppercase tracking-widest">Shop by Category</h2>
            <button onClick={() => onNav("category")} className="text-xs text-[#0f4c5c] font-semibold hover:underline">All Categories &rarr;</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-thin">
            {[
              { label: "CPR & AED", count: 124, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=140&fit=crop&auto=format" },
              { label: "First Aid Kits", count: 287, img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=200&h=140&fit=crop&auto=format" },
              { label: "PPE & Safety", count: 415, img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=200&h=140&fit=crop&auto=format" },
              { label: "Airway Mgmt", count: 98, img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&h=140&fit=crop&auto=format" },
              { label: "Patient Transport", count: 76, img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=140&fit=crop&auto=format" },
              { label: "Diagnostics", count: 203, img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=140&fit=crop&auto=format" },
              { label: "Training Supplies", count: 145, img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&h=140&fit=crop&auto=format" },
              { label: "Industrial Safety", count: 338, img: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=200&h=140&fit=crop&auto=format" },
            ].map(cat => (
              <div
                key={cat.label}
                onClick={() => onNav("category")}
                className="shrink-0 w-[140px] md:w-[160px] cursor-pointer group snap-start"
              >
                <div className="aspect-[10/7] rounded-[2px] overflow-hidden bg-[#f5f6f8] mb-2 border border-[#e2e4e8] group-hover:border-[#0f4c5c]/30 transition-colors">
                  <img loading="lazy" src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="text-xs font-semibold text-[#1c2438] group-hover:text-[#0f4c5c] transition-colors leading-tight">{cat.label}</div>
                <div className="text-[10px] text-[#6b7280] font-mono">{cat.count} items</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS RAIL: Horizontal scroll product cards with bulk pricing ─── */}
      <section className="bg-[#f5f6f8] border-b border-[#e2e4e8]">
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-baseline gap-3">
              <h2 className="font-heading text-base md:text-lg font-extrabold text-[#1c2438] tracking-tight">Best Sellers This Month</h2>
              <span className="text-[10px] font-mono text-[#6b7280] uppercase tracking-wide hidden sm:inline">Based on 1,847 orders</span>
            </div>
            <button onClick={() => onNav("category")} className="text-xs text-[#0f4c5c] font-semibold hover:underline">View All &rarr;</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory scrollbar-thin">
            {PRODUCTS.map(p => {
              const bulkSave = p.price > 100 ? 15 : p.price > 30 ? 12 : 8;
              const bulkMin = p.price > 100 ? 5 : 10;
              return (
                <div key={p.id} className="shrink-0 w-[220px] md:w-[240px] bg-white border border-[#e2e4e8] rounded-[2px] overflow-hidden group hover:border-[#0f4c5c]/30 hover:shadow-[0_4px_16px_rgba(15,76,92,0.08)] transition-all snap-start flex flex-col">
                  {/* Image */}
                  <div className="relative bg-[#f5f6f8] aspect-[4/3] overflow-hidden">
                    <img loading="lazy" src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                    <StockBadge status={p.stock} />
                  </div>
                  {/* Info */}
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="font-mono text-[9px] text-[#4b5563] uppercase tracking-wide mb-0.5">{p.sku}</div>
                    <h3 className="text-xs font-semibold text-[#1c2438] leading-snug line-clamp-2 mb-2 cursor-pointer hover:text-[#0f4c5c] transition-colors" onClick={() => onNav("product")}>{p.name}</h3>
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(p.rating) ? "fill-amber-400 text-amber-400" : "text-[#e2e4e8] fill-[#e2e4e8]"}`} />
                      ))}
                      <span className="text-[9px] text-[#6b7280] ml-1">({p.reviews})</span>
                    </div>
                    {/* Price + Bulk Tier */}
                    <div className="mt-auto">
                      <div className="text-sm font-bold text-[#1c2438]">${p.price.toFixed(2)}</div>
                      {p.stock !== "out-of-stock" && (
                        <div className="text-[10px] text-[#0f4c5c] font-semibold mt-0.5">
                          Buy {bulkMin}+ save {bulkSave}%
                        </div>
                      )}
                    </div>
                    {/* CTA */}
                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={p.stock === "out-of-stock"}
                      className={`mt-2.5 w-full text-xs font-bold py-2 rounded-[2px] transition-colors ${p.stock === "out-of-stock" ? "bg-[#f5f6f8] text-[#9ca3af] cursor-not-allowed" : "bg-[#0f4c5c] text-white hover:bg-[#12647a]"}`}
                    >
                      {p.stock === "out-of-stock" ? "Notify When Available" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP: Compact, inline, no decorative icon-circles ─── */}
      <section className="border-b border-[#e2e4e8] bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-[#4b5563]">
          {[
            { icon: Award, text: "ISO 9001:2015 Certified" },
            { icon: Truck, text: "Same-day ship before 3 PM EST" },
            { icon: Tag, text: "Volume pricing from 5+ units" },
            { icon: Headphones, text: "Dedicated account managers" },
            { icon: Shield, text: "FDA registered distributor" },
            { icon: RefreshCw, text: "30-day returns on all items" },
          ].map(item => (
            <span key={item.text} className="flex items-center gap-1.5 whitespace-nowrap">
              <item.icon className="w-3.5 h-3.5 text-[#0f4c5c]" />
              {item.text}
            </span>
          ))}
        </div>
      </section>

      {/* ─── RECENTLY VIEWED: Horizontal scroll, same card treatment ─── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-heading text-base md:text-lg font-extrabold text-[#1c2438] tracking-tight">Recently Viewed</h2>
            <button className="text-xs text-[#6b7280] hover:text-[#4b5563]">Clear history</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory scrollbar-thin">
            {PRODUCTS.slice(4, 8).map(p => (
              <div key={p.id} className="shrink-0 w-[220px] md:w-[240px] bg-white border border-[#e2e4e8] rounded-[2px] overflow-hidden group hover:border-[#0f4c5c]/30 transition-all snap-start flex flex-col">
                <div className="relative bg-[#f5f6f8] aspect-[4/3] overflow-hidden">
                  <img loading="lazy" src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <div className="font-mono text-[9px] text-[#4b5563] uppercase tracking-wide mb-0.5">{p.sku}</div>
                  <h3 className="text-xs font-semibold text-[#1c2438] leading-snug line-clamp-2 mb-1 cursor-pointer hover:text-[#0f4c5c] transition-colors" onClick={() => onNav("product")}>{p.name}</h3>
                  <div className="mt-auto text-sm font-bold text-[#1c2438]">${p.price.toFixed(2)}</div>
                  <button onClick={() => handleAddToCart(p)} className="mt-2 w-full text-xs font-bold py-1.5 rounded-[2px] bg-[#0f4c5c] text-white hover:bg-[#12647a] transition-colors">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

// ──────────────────────────────────────────────
// SCREEN 02: CATEGORY PAGE
// ──────────────────────────────────────────────

function CategoryPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    setToastProduct(product);
    setTimeout(() => setMiniCartOpen(true), 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <SiteHeader onNav={onNav} />
      <CartToast product={toastProduct} onClose={() => setToastProduct(null)} />
      <MiniCartDrawer open={miniCartOpen} onClose={() => setMiniCartOpen(false)} items={cartItems} />
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#4b5563] mb-5">
          <span className="cursor-pointer hover:text-[#0f4c5c]" onClick={() => onNav("home")}>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1c2438] font-medium">CPR &amp; AED Equipment</span>
        </div>
        <div className="flex gap-6">
          {/* Filters sidebar */}
          
        <aside className={`fixed inset-0 z-50 lg:static lg:z-auto lg:block w-full lg:w-56 shrink-0 bg-white lg:bg-transparent overflow-y-auto lg:overflow-visible transition-transform ${filtersOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#e2e4e8] bg-white sticky top-0 z-10">
            <span className="text-base font-bold text-[#1c2438]">Filters</span>
            <button className="p-2 -mr-2 text-[#4b5563]" onClick={() => setFiltersOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 lg:p-0">

            <div className="sticky top-[calc(theme(spacing.9)+96px)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#1c2438]">Filters</span>
                <button className="text-xs text-[#c84b0b] font-medium">Clear all</button>
              </div>
              {[
                { title: "Brand", items: ["Prestan (42)", "Zoll (18)", "Physio-Control (14)", "Cardiac Science (11)", "MCR Medical (67)"], checked: [0] },
                { title: "Certification", items: ["FDA Cleared (89)", "CE Marked (45)", "AHA Compliant (78)", "OSHA Compliant (34)"], checked: [] },
              ].map(section => (
                <div key={section.title} className="border-b border-[#e2e4e8] pb-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest">{section.title}</span>
                    <ChevronUp className="w-3.5 h-3.5 text-[#4b5563]" />
                  </div>
                  <div className="space-y-2">
                    {section.items.map((item, i) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-3.5 h-3.5 border rounded-[2px] flex items-center justify-center shrink-0 transition-colors ${section.checked.includes(i) ? "bg-[#0f4c5c] border-[#0f4c5c]" : "border-[#e2e4e8] group-hover:border-[#0f4c5c]"}`}>
                          {section.checked.includes(i) && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="text-xs text-[#374151]">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              {/* Price */}
              <div className="border-b border-[#e2e4e8] pb-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest">Price Range</span>
                  <ChevronUp className="w-3.5 h-3.5 text-[#4b5563]" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <input className="w-full border border-[#e2e4e8] rounded-[3px] px-2 py-1 text-xs text-center outline-none focus:border-[#0f4c5c]" defaultValue="$0" />
                  <span className="text-[#4b5563]">–</span>
                  <input className="w-full border border-[#e2e4e8] rounded-[3px] px-2 py-1 text-xs text-center outline-none focus:border-[#0f4c5c]" defaultValue="$2,000" />
                </div>
                <div className="h-1 bg-[#e2e4e8] rounded-full relative">
                  <div className="absolute left-[5%] right-[28%] h-full bg-[#0f4c5c] rounded-full" />
                  <div className="absolute left-[4%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#0f4c5c] rounded-full border-2 border-white shadow cursor-pointer" />
                  <div className="absolute right-[27%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#0f4c5c] rounded-full border-2 border-white shadow cursor-pointer" />
                </div>
              </div>
              {/* In stock toggle */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#374151]">In Stock Only</span>
                <div className="w-8 h-[18px] bg-[#0f4c5c] rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow" />
                </div>
              </div>
            </div>
          </div>
        </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-heading text-xl md:text-[28px] font-extrabold tracking-tight text-[#0f4c5c] mb-1">CPR &amp; AED Equipment</h1>
                <p className="text-sm text-[#6b7280] mt-0.5">124 products found</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="lg:hidden px-3 py-1.5 border border-[#e2e4e8] rounded-[4px] text-xs font-medium text-[#374151] hover:bg-[#f5f6f8] min-h-[44px]" onClick={() => setFiltersOpen(true)}><Sliders className="w-4 h-4 inline-block mr-1.5" />Filters</button>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-[#e2e4e8] rounded-[4px] px-3 py-1.5 text-xs text-[#374151] bg-white outline-none focus:border-[#0f4c5c]">
                  <option value="relevance">Sort: Relevance</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <div className="flex border border-[#e2e4e8] rounded-[4px] overflow-hidden">
                  <button className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-[#0f4c5c] text-white" : "bg-white text-[#6b7280] hover:bg-[#f5f6f8]"}`} onClick={() => setViewMode("grid")}><LayoutGrid className="w-4 h-4" /></button>
                  <button className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-[#0f4c5c] text-white" : "bg-white text-[#6b7280] hover:bg-[#f5f6f8]"}`} onClick={() => setViewMode("list")}><AlignJustify className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            {/* Active filters */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-[#4b5563]">Active:</span>
              {["Brand: Prestan", "In Stock"].map(f => (
                <span key={f} className="flex items-center gap-1 bg-[#0f4c5c]/10 text-[#0f4c5c] text-xs font-medium px-2 py-1 rounded-[3px] border border-[#0f4c5c]/20">
                  {f} <X className="w-2.5 h-2.5 cursor-pointer" />
                </span>
              ))}
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onNav={onNav} onAddToCart={handleAddToCart} />)}
              </div>
            ) : (
              <div className="space-y-3">
                {PRODUCTS.map(p => (
                  <div key={p.id} className="flex gap-4 p-4 border border-[#e2e4e8] rounded-[4px] bg-white hover:border-[#0f4c5c]/30 hover:shadow-sm transition-all">
                    <div className="w-24 h-24 bg-[#f5f6f8] rounded-[3px] overflow-hidden shrink-0">
                      <img loading="lazy" src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-[#4b5563] uppercase">{p.sku} · {p.brand}</div>
                      <h3 className="text-sm font-semibold text-[#1c2438] mt-0.5 hover:text-[#0f4c5c] cursor-pointer" onClick={() => onNav("product")}>{p.name}</h3>
                      <p className="text-xs text-[#6b7280] mt-1 line-clamp-1">Professional-grade product meeting all AHA and regulatory standards. ISO certified, FDA cleared.</p>
                    </div>
                    <div className="flex flex-col items-end justify-between shrink-0 gap-2">
                      <div className="text-right">
                        <StockBadge status={p.stock} />
                        <div className="text-lg font-bold text-[#1c2438] mt-1">${p.price.toFixed(2)}</div>
                        <div className="text-[10px] text-[#4b5563]">per unit</div>
                      </div>
                      <div className="flex gap-2">
                        <Btn size="sm" variant="secondary" onClick={() => onNav("product")}>View</Btn>
                        <Btn size="sm" onClick={() => {}}>Add to Cart</Btn>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-[#e2e4e8]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6b7280]">Per page:</span>
                {[24, 48, 96].map(n => (
                  <button key={n} className={`w-8 h-8 text-xs font-medium rounded-[3px] border transition-colors ${n === 24 ? "bg-[#0f4c5c] text-white border-[#0f4c5c]" : "border-[#e2e4e8] text-[#374151] hover:border-[#0f4c5c]"}`}>{n}</button>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 border border-[#e2e4e8] rounded-[3px] flex items-center justify-center hover:border-[#0f4c5c]"><ChevronLeft className="w-3.5 h-3.5 text-[#6b7280]" /></button>
                {[1, 2, 3, "…", 6].map((p, i) => (
                  <button key={i} className={`w-8 h-8 border text-xs font-medium rounded-[3px] transition-colors ${p === 1 ? "bg-[#0f4c5c] text-white border-[#0f4c5c]" : "border-[#e2e4e8] text-[#374151] hover:border-[#0f4c5c]"}`}>{p}</button>
                ))}
                <button className="w-8 h-8 border border-[#e2e4e8] rounded-[3px] flex items-center justify-center hover:border-[#0f4c5c]"><ChevronRight className="w-3.5 h-3.5 text-[#6b7280]" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCREEN 03: PRODUCT DETAIL
// ──────────────────────────────────────────────

function ProductDetailPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [tab, setTab] = useState("description");
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [variantError, setVariantError] = useState(false);
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const product = PRODUCTS[0];

  // TODO: replace with real data — variant options from product API
  const variantSizes = ["Standard", "Medium", "Large", "Infant"];
  const variantColors = [
    { name: "Dark Skin", hex: "#8B6914" },
    { name: "Medium Skin", hex: "#C4956A" },
    { name: "Light Skin", hex: "#F5D6BA" },
  ];

  const isVariantSelected = selectedSize !== null && selectedColor !== null;

  const handleAddToCart = () => {
    if (!isVariantSelected) {
      setVariantError(true);
      return;
    }
    setVariantError(false);
    setToastProduct(product);
  };

  const images = [
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=700&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=700&h=700&fit=crop&auto=format",
  ];
  const bulk = [
    { range: "1 – 9 units", price: "$189.99", note: null },
    { range: "10 – 49 units", price: "$174.99", note: "Save 8%" },
    { range: "50 – 99 units", price: "$159.99", note: "Save 16%" },
    { range: "100+ units", price: "Call for quote", note: "Best price" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <SiteHeader onNav={onNav} />
      <CartToast product={toastProduct} onClose={() => setToastProduct(null)} />
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#4b5563] mb-6">
          <span className="cursor-pointer hover:text-[#0f4c5c]" onClick={() => onNav("home")}>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="cursor-pointer hover:text-[#0f4c5c]" onClick={() => onNav("category")}>CPR &amp; AED</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1c2438]">{product.name}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="bg-[#f5f6f8] rounded-[4px] border border-[#e2e4e8] overflow-hidden aspect-square mb-3">
              <img src={images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button key={i} className={`w-16 h-16 bg-[#f5f6f8] rounded-[3px] overflow-hidden border-2 transition-colors ${imgIdx === i ? "border-[#0f4c5c]" : "border-[#e2e4e8] hover:border-[#0f4c5c]/40"}`} onClick={() => setImgIdx(i)}>
                  <img loading="lazy" src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-[#4b5563] uppercase tracking-wide">
              <span>SKU: {product.sku}</span><span className="text-[#e2e4e8]">·</span>
              <span>Brand: <span className="font-semibold text-[#374151]">{product.brand}</span></span>
            </div>
            <h1 className="font-heading text-2xl md:text-[34px] font-extrabold tracking-tight text-[#1c2438] leading-[1.1] mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-[#e2e4e8] text-[#e2e4e8]"}`} />
                ))}
              </div>
              <span className="text-sm text-[#6b7280]"><strong className="text-[#1c2438]">{product.rating}</strong> ({product.reviews} reviews)</span>
              <span className="text-[#e2e4e8]">|</span>
              <StockBadge status={product.stock} />
            </div>
            {/* Price box */}
            <div className="bg-[#f5f6f8] border border-[#e2e4e8] rounded-[4px] p-4 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#1c2438]">${product.price.toFixed(2)}</span>
                <span className="text-sm text-[#4b5563]">/ unit</span>
              </div>
              <div className="text-xs text-[#6b7280] mt-1">Price updates automatically with quantity</div>
            </div>
            {/* Bulk pricing */}
            <div className="mb-5">
              <div className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest mb-2">Volume Pricing</div>
              <div className="overflow-x-auto">
<table className="w-full border border-[#e2e4e8] rounded-[4px] overflow-hidden text-xs">
                <thead>
                  <tr className="bg-[#f5f6f8] border-b border-[#e2e4e8]">
                    <th className="text-left px-3 py-2 font-semibold text-[#374151]">Quantity</th>
                    <th className="text-left px-3 py-2 font-semibold text-[#374151]">Unit Price</th>
                    <th className="text-right px-3 py-2 font-semibold text-[#374151]">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {bulk.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-[#fafbfc]"}`}>
                      <td className="px-3 py-2 text-[#374151]">{row.range}</td>
                      <td className="px-3 py-2 font-semibold text-[#1c2438]">{row.price}</td>
                      <td className="px-3 py-2 text-right">
                        {row.note && <span className={`text-xs font-medium ${row.note === "Best price" ? "text-[#c84b0b]" : "text-green-700"}`}>{row.note}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
            {/* Variant Selectors */}
            <div className="mb-5 space-y-4">
              {/* Size selector */}
              <div>
                <div className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest mb-2">Size {selectedSize && <span className="text-[#0f4c5c] normal-case tracking-normal">— {selectedSize}</span>}</div>
                <div className="flex flex-wrap gap-2">
                  {variantSizes.map(size => (
                    <button
                      key={size}
                      className={`px-4 py-2 text-xs font-medium border rounded-[4px] transition-colors ${
                        selectedSize === size
                          ? "border-[#0f4c5c] bg-[#0f4c5c] text-white"
                          : "border-[#e2e4e8] text-[#374151] hover:border-[#0f4c5c]"
                      }`}
                      onClick={() => { setSelectedSize(size); setVariantError(false); }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Color selector */}
              <div>
                <div className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest mb-2">Skin Tone {selectedColor && <span className="text-[#0f4c5c] normal-case tracking-normal">— {selectedColor}</span>}</div>
                <div className="flex flex-wrap gap-2">
                  {variantColors.map(color => (
                    <button
                      key={color.name}
                      className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border rounded-[4px] transition-colors ${
                        selectedColor === color.name
                          ? "border-[#0f4c5c] bg-[#f0f4ff]"
                          : "border-[#e2e4e8] text-[#374151] hover:border-[#0f4c5c]"
                      }`}
                      onClick={() => { setSelectedColor(color.name); setVariantError(false); }}
                    >
                      <span className="w-4 h-4 rounded-full border border-[#e2e4e8]" style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
              {variantError && (
                <div className="flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Please select both a size and skin tone before adding to cart.
                </div>
              )}
            </div>
            {/* Returns Badge */}
            <div className="flex items-center gap-2 mb-6 text-sm text-[#4b5563]">
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-3.5 h-3.5 text-green-700" />
              </div>
              <span className="font-semibold text-[#1c2438]">30-Day Easy Returns</span> — Satisfaction guaranteed
            </div>
            {/* Qty + CTA */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex items-center border border-[#e2e4e8] rounded-[4px] overflow-hidden">
                <button className="w-[44px] h-[44px] flex items-center justify-center hover:bg-[#f5f6f8] text-[#374151]" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="w-4 h-4" /></button>
                <span className="px-4 py-2.5 text-sm font-bold text-[#1c2438] min-w-[44px] text-center">{qty}</span>
                <button className="w-[44px] h-[44px] flex items-center justify-center hover:bg-[#f5f6f8] text-[#374151]" onClick={() => setQty(qty + 1)}><Plus className="w-4 h-4" /></button>
              </div>
              <Btn size="lg" className="flex-1" disabled={!isVariantSelected} onClick={handleAddToCart}><ShoppingCart className="w-4 h-4" /> Add to Cart</Btn>
              <Btn size="lg" variant="secondary" onClick={() => {}}><FileText className="w-4 h-4" /> Quote</Btn>
            </div>
            {/* Shipping estimate */}
            <div className="border border-[#e2e4e8] rounded-[4px] p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-[#0f4c5c]" />
                <span className="text-xs font-semibold text-[#1c2438]">Estimate Shipping</span>
              </div>
              <div className="flex gap-2">
                <input placeholder="Enter ZIP code" className="flex-1 px-3 py-1.5 text-xs border border-[#e2e4e8] rounded-[3px] outline-none focus:border-[#0f4c5c]" />
                <Btn size="sm" variant="secondary">Check</Btn>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-green-700">
                <CheckCircle className="w-3.5 h-3.5" />
                Ships by tomorrow, Jun 30 · Standard (3–5 days)
              </div>
            </div>
            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#6b7280]">
              {[["Category", "CPR Training"], ["Standard", "AHA 2020"], ["Weight", "3.2 lbs"], ["Warranty", "2 Years"]].map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <span className="text-[#4b5563]">{k}:</span>
                  <span className="font-medium text-[#374151]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 border-t border-[#e2e4e8]">
          <div className="flex gap-0 border-b border-[#e2e4e8]">
            {["description", "specifications", "documents", "reviews", "related"].map(t => (
              <button key={t} className={`px-5 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${tab === t ? "border-[#0f4c5c] text-[#0f4c5c]" : "border-transparent text-[#6b7280] hover:text-[#1c2438]"}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <div className="py-6">
            {tab === "description" && (
              <div className="max-w-3xl space-y-3 text-sm text-[#374151] leading-relaxed">
                <p>The Prestan Adult Manikin with CPR Rate Monitor is specifically designed for CPR training with immediate visual feedback. The built-in CPR rate monitor provides a visual cue to the student and instructor when the correct compression rate has been reached.</p>
                <p>Designed to meet all American Heart Association (AHA) 2020 guidelines. Lightweight design and easy assembly makes these manikins perfect for mass-training scenarios.</p>
                <ul className="space-y-2">
                  {["CPR Rate Monitor — confirms 100–120 compressions/min visually", "Realistic jaw thrust and head-tilt chin lift feel", "Lightweight at 3.2 lbs for easy transport and storage", "Replaceable lung bags — no separate face shields needed", "Compatible with all Prestan carry bags and accessories"].map(f => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{f}</li>
                  ))}
                </ul>
              </div>
            )}
            {tab === "specifications" && (
              <div className="max-w-2xl">
                <div className="overflow-x-auto">
<table className="w-full border border-[#e2e4e8] rounded-[4px] overflow-hidden text-sm">
                  <tbody>
                    {[["SKU", "PRE-101-01"], ["Brand", "Prestan Products"], ["Model", "PP-AM-100M"], ["Weight", "3.2 lbs (1.45 kg)"], ["Dimensions", "19\" × 7\" × 4\" assembled"], ["CPR Standard", "AHA 2020 Guidelines"], ["Compression Depth", "2.0–2.4 inches"], ["Rate Feedback", "100–120 compressions/min"], ["Lung Bags Included", "5-pack"], ["Warranty", "2 Years Limited"], ["Country of Origin", "United States"], ["UNSPSC Code", "42272202"]].map(([k, v], i) => (
                      <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f6f8]"}>
                        <td className="px-4 py-2.5 font-medium text-[#374151] border-b border-[#e2e4e8] w-48">{k}</td>
                        <td className="px-4 py-2.5 text-[#6b7280] border-b border-[#e2e4e8]">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
</div>
              </div>
            )}
            {tab === "documents" && (
              <div className="space-y-2 max-w-lg">
                {[["Product Data Sheet", "1.2 MB"], ["Safety Data Sheet (SDS)", "0.8 MB"], ["User Manual", "4.1 MB"], ["CE Declaration of Conformity", "0.4 MB"]].map(([name, size]) => (
                  <div key={name} className="flex items-center justify-between p-3 border border-[#e2e4e8] rounded-[4px] bg-white hover:border-[#0f4c5c]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-50 border border-red-200 rounded-[3px] flex items-center justify-center"><FileText className="w-4 h-4 text-red-600" /></div>
                      <div>
                        <div className="text-sm font-medium text-[#1c2438]">{name}</div>
                        <div className="text-xs text-[#4b5563]">PDF · {size}</div>
                      </div>
                    </div>
                    <Btn size="sm" variant="ghost"><Download className="w-3.5 h-3.5" /> Download</Btn>
                  </div>
                ))}
              </div>
            )}
            {tab === "reviews" && (
              <div className="max-w-2xl space-y-5">
                {[
                  { user: "Jennifer K. — Training Manager, Rush University Medical", rating: 5, date: "Jun 12, 2025", body: "We purchased 20 units for our hospital training center. The CPR rate monitor is excellent — gives students immediate feedback without constant instructor intervention. Build quality is outstanding." },
                  { user: "Michael R. — EMS Director, Chicago Fire Dept.", rating: 5, date: "May 28, 2025", body: "Best manikin we've used for department-wide CPR recertification. Realistic feel, easy to clean. Replacement lung bags are affordable. Highly recommend for any EMS agency." },
                  { user: "Sarah T. — Corporate Safety Coordinator, Caterpillar Inc.", rating: 4, date: "May 10, 2025", body: "Solid quality and ships fast. The CPR feedback light is very helpful. Knocked one star because the carry bag is sold separately — would prefer it bundled at this price point." },
                ].map((r, i) => (
                  <div key={i} className="border-b border-[#e2e4e8] pb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`w-3.5 h-3.5 ${j < r.rating ? "fill-amber-400 text-amber-400" : "fill-[#e2e4e8] text-[#e2e4e8]"}`} />)}</div>
                      <span className="text-xs text-[#4b5563]">{r.date}</span>
                    </div>
                    <p className="text-sm text-[#374151] leading-relaxed mb-1.5">{r.body}</p>
                    <span className="text-xs text-[#4b5563]">— {r.user}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "related" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRODUCTS.slice(1, 5).map(p => <ProductCard key={p.id} product={p} onNav={onNav} onAddToCart={(p) => { setToastProduct(p); }} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e4e8] shadow-lg z-30">
        <div className="max-w-[1440px] mx-auto px-6 py-2.5 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f5f6f8] rounded-[3px] overflow-hidden shrink-0"><img loading="lazy" src={product.image} alt="" className="w-full h-full object-cover" /></div>
            <div>
              <div className="text-sm font-semibold text-[#1c2438] line-clamp-1">{product.name}</div>
              <StockBadge status={product.stock} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-[#1c2438]">${product.price.toFixed(2)}</span>
            <Btn disabled={!isVariantSelected} onClick={handleAddToCart}><ShoppingCart className="w-4 h-4" /> Add to Cart</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCREEN 04: CART
// ──────────────────────────────────────────────

function CartPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [promoOpen, setPromoOpen] = useState(false);
  const items = [
    { ...PRODUCTS[0], cartQty: 2 },
    { ...PRODUCTS[3], cartQty: 5 },
    { ...PRODUCTS[4], cartQty: 10 },
  ];
  const sub = items.reduce((s, i) => s + i.price * i.cartQty, 0);
  const ship = 24.95;
  const tax = sub * 0.0875;

  return (
    <div className="bg-[#f5f6f8] min-h-screen">
      <SiteHeader onNav={onNav} />
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => onNav("category")} className="text-xs text-[#4b5563] hover:text-[#0f4c5c] flex items-center gap-1"><ChevronLeft className="w-3.5 h-3.5" /> Continue Shopping</button>
          <span className="text-[#e2e4e8]">|</span>
          <h1 className="font-heading text-xl md:text-[28px] font-extrabold tracking-tight text-[#0f4c5c] mb-1">Shopping Cart</h1>
          <span className="text-sm text-[#4b5563]">({items.length} items)</span>
        </div>
        {items.length === 0 ? (
          <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-[#f5f6f8] rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-8 h-8 text-[#4b5563]" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#1c2438] mb-2">Your procurement cart is empty</h2>
            <p className="text-[#4b5563] max-w-md mb-8">You haven't added any medical or industrial supplies yet. Browse our catalog to equip your facility.</p>
            <Btn size="lg" onClick={() => onNav("category")}>Shop Catalog</Btn>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {items.map((item, i) => (
              <div key={i} className="bg-white border border-[#e2e4e8] rounded-[4px] p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-[#f5f6f8] rounded-[3px] overflow-hidden shrink-0"><img loading="lazy" src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-mono text-[10px] text-[#4b5563] uppercase">{item.sku}</div>
                        <h3 className="text-sm font-semibold text-[#1c2438] hover:text-[#0f4c5c] cursor-pointer" onClick={() => onNav("product")}>{item.name}</h3>
                        <div className="text-xs text-[#4b5563] mt-0.5">Brand: {item.brand}</div>
                      </div>
                      <button className="text-[#4b5563] hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#e2e4e8] rounded-[3px] overflow-hidden">
                        <button className="w-[44px] h-[44px] flex items-center justify-center hover:bg-[#f5f6f8]"><Minus className="w-4 h-4 text-[#374151]" /></button>
                        <span className="px-3 py-1.5 text-sm font-bold text-[#1c2438] min-w-[40px] text-center">{item.cartQty}</span>
                        <button className="w-[44px] h-[44px] flex items-center justify-center hover:bg-[#f5f6f8]"><Plus className="w-4 h-4 text-[#374151]" /></button>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#4b5563]">${item.price.toFixed(2)} each</div>
                        <div className="text-base font-bold text-[#1c2438]">${(item.price * item.cartQty).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-[#0f4c5c]/10 border border-[#0f4c5c]/20 rounded-[4px] p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-[#0f4c5c]">Need bulk pricing or Net 30 terms?</div>
                <div className="text-xs text-[#0f4c5c] mt-0.5">Request a formal quote for volume orders</div>
              </div>
              <Btn variant="secondary" size="sm">Request a Quote</Btn>
            </div>
          </div>
          {/* Summary */}
          <div>
            <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-5 sticky top-32">
              <h2 className="text-xs font-bold text-[#1c2438] uppercase tracking-widest mb-4">Order Summary</h2>
              <div className="flex gap-2 mb-4">
                <input placeholder="Coupon / promo code" className="flex-1 px-3 py-2 text-xs border border-[#e2e4e8] rounded-[3px] outline-none focus:border-[#0f4c5c]" />
                <Btn size="sm" variant="secondary">Apply</Btn>
              </div>
              <div className="space-y-2 mb-4 pb-4 border-b border-[#e2e4e8]">
                <div className="flex justify-between text-sm"><span className="text-[#6b7280]">Subtotal ({items.length} items)</span><span className="font-medium text-[#1c2438]">${sub.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6b7280]">Estimated Shipping</span><span className="font-medium text-[#1c2438]">${ship.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6b7280]">Estimated Tax (8.75%)</span><span className="font-medium text-[#1c2438]">${tax.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between mb-5">
                <span className="font-bold text-[#1c2438]">Total</span>
                <span className="text-xl font-bold text-[#1c2438]">${(sub + ship + tax).toFixed(2)}</span>
              </div>
              <Btn size="lg" className="w-full" onClick={() => onNav("checkout")}>Proceed to Checkout <ArrowRight className="w-4 h-4" /></Btn>
              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-[#4b5563]">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Secure</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Buyer Protection</span>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCREEN 05: CHECKOUT
// ──────────────────────────────────────────────

function CheckoutPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [step, setStep] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState("");

  const checkoutSteps = [{ n: 1, label: "Shipping" }, { n: 2, label: "Delivery" }, { n: 3, label: "Payment" }];

  const deliveryMethods = [
    { id: "std", label: "Standard Ground", carrier: "UPS Ground / FedEx Ground", days: "5–7 business days", eta: "Est. delivery: Jul 8, 2025", price: 24.95 },
    { id: "exp", label: "Express 2-Day Air", carrier: "UPS 2nd Day Air / FedEx 2Day", days: "2 business days", eta: "Est. delivery: Jul 3, 2025", price: 54.95 },
    { id: "ovn", label: "Overnight Priority", carrier: "UPS Next Day Air / FedEx Priority", days: "Next business day", eta: "Est. delivery: Jul 1, 2025", price: 94.95 },
    { id: "frgt", label: "LTL Freight", carrier: "For heavy/large orders over 150 lbs", days: "5–10 business days", eta: "Est. delivery: Jul 10, 2025", price: 0 },
  ];

  const paymentMethods = [
    { id: "cc", label: "Credit / Debit Card", icon: CreditCard },
    { id: "po", label: "Purchase Order Number", icon: FileText },
    { id: "net30", label: "Net 30 Terms (Approved Accounts Only)", icon: Building },
  ];

  const subtotal = 654.83;
  const selectedShipping = deliveryMethods.find(d => d.id === selectedDelivery);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const shippingLabel = selectedShipping ? (selectedShipping.price > 0 ? `$${selectedShipping.price.toFixed(2)}` : "Quoted") : "—";
  const tax = (subtotal + shippingCost) * 0.0875;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = () => {
    if (!selectedDelivery || !selectedPayment) {
      setCheckoutError("Please select both a delivery method and payment method before placing your order.");
      return;
    }
    setCheckoutError("");
    onNav("tracking");
  };

  return (
    <div className="bg-[#f5f6f8] min-h-screen">
      <header className="bg-white border-b border-[#e2e4e8]">
        <div className="max-w-[1440px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNav("home")}>
            <div className="w-7 h-7 bg-[#0f4c5c] rounded-[3px] flex items-center justify-center"><Plus className="w-4 h-4 text-white" /></div>
            <span className="font-bold text-sm text-[#0f4c5c]">Desert Rain</span>
          </div>
          <div className="text-xs text-[#4b5563] flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Secure Checkout</div>
        </div>
      </header>
      {/* Stepper */}
      <div className="bg-white border-b border-[#e2e4e8]">
        <div className="max-w-[700px] mx-auto px-6 py-4 flex items-center justify-center gap-0">
          {checkoutSteps.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${step > s.n ? "bg-[#0f4c5c] border-[#0f4c5c] text-white" : step === s.n ? "bg-white border-[#0f4c5c] text-[#0f4c5c]" : "bg-white border-[#e2e4e8] text-[#4b5563]"}`}>
                  {step > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
                </div>
                <span className={`text-sm font-medium ${step === s.n ? "text-[#0f4c5c]" : "text-[#4b5563]"}`}>{s.label}</span>
              </div>
              {i < checkoutSteps.length - 1 && <div className={`w-20 h-px mx-4 ${step > s.n ? "bg-[#0f4c5c]" : "bg-[#e2e4e8]"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-6">
            {step === 1 && (
              <div>
                <h2 className="text-base font-bold text-[#1c2438] mb-5">Shipping Address</h2>
                <div className="mb-5">
                  <div className="text-[10px] font-bold text-[#374151] uppercase tracking-widest mb-3">Saved Addresses</div>
                  <div className="grid gap-2">
                    {[{ l: "HQ — Main Facility", a: "1200 Industrial Blvd, Suite 400, Chicago, IL 60601" }, { l: "Branch — Denver", a: "4500 Medical Center Dr, Denver, CO 80204" }].map((addr, i) => (
                      <label key={i} className={`flex items-start gap-3 p-3 border-2 rounded-[4px] cursor-pointer ${i === 0 ? "border-[#0f4c5c] bg-[#f0f4ff]" : "border-[#e2e4e8] hover:border-[#0f4c5c]/40"}`}>
                        <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${i === 0 ? "border-[#0f4c5c]" : "border-[#e2e4e8]"}`}>
                          {i === 0 && <div className="w-2 h-2 rounded-full bg-[#0f4c5c]" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#1c2438]">{addr.l}</div>
                          <div className="text-xs text-[#6b7280] mt-0.5">{addr.a}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <button className="text-xs text-[#0f4c5c] font-medium mt-2 flex items-center gap-1"><Plus className="w-3 h-3" /> Add New Address</button>
                </div>
                <div className="border-t border-[#e2e4e8] pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FieldInput label="First Name" placeholder="John" />
                  <FieldInput label="Last Name" placeholder="Smith" />
                  <FieldInput label="Company" placeholder="Acme Corp (optional)" className="col-span-2" />
                  <FieldInput label="Address Line 1" placeholder="1200 Industrial Blvd" className="col-span-2" />
                  <FieldInput label="City" placeholder="Chicago" />
                  <FieldInput label="State" placeholder="IL" />
                  <FieldInput label="ZIP Code" placeholder="60601" inputMode="numeric" />
                  <FieldInput label="Country" placeholder="United States" />
                </div>
                <div className="flex justify-end mt-6">
                  <Btn size="lg" onClick={() => setStep(2)}>Continue to Delivery <ArrowRight className="w-4 h-4" /></Btn>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-base font-bold text-[#1c2438] mb-5">Delivery Method</h2>
                <div className="space-y-3">
                  {deliveryMethods.map(m => (
                    <label key={m.id} className={`flex items-start gap-3 p-4 border-2 rounded-[4px] cursor-pointer transition-colors ${selectedDelivery === m.id ? "border-[#0f4c5c] bg-[#f0f4ff]" : "border-[#e2e4e8] hover:border-[#0f4c5c]/40"}`} onClick={() => setSelectedDelivery(m.id)}>
                      <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${selectedDelivery === m.id ? "border-[#0f4c5c]" : "border-[#e2e4e8]"}`}>
                        {selectedDelivery === m.id && <div className="w-2 h-2 rounded-full bg-[#0f4c5c]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-[#1c2438]">{m.label}</div>
                          <div className="text-sm font-bold text-[#1c2438]">{m.price > 0 ? `$${m.price.toFixed(2)}` : "Quoted at checkout"}</div>
                        </div>
                        <div className="text-xs text-[#6b7280] mt-0.5">{m.carrier} · {m.days}</div>
                        <div className="text-xs text-green-700 mt-1 flex items-center gap-1"><Truck className="w-3 h-3" />{m.eta}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Btn variant="secondary" size="lg" onClick={() => setStep(1)}><ChevronLeft className="w-4 h-4" /> Back</Btn>
                  <Btn size="lg" disabled={!selectedDelivery} onClick={() => setStep(3)}>Continue to Payment <ArrowRight className="w-4 h-4" /></Btn>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-base font-bold text-[#1c2438] mb-5">Payment</h2>
                <div className="space-y-3 mb-5">
                  {paymentMethods.map(m => (
                    <div key={m.id} className={`border-2 rounded-[4px] overflow-hidden ${selectedPayment === m.id ? "border-[#0f4c5c]" : "border-[#e2e4e8]"}`}>
                      <label className={`flex items-center gap-3 p-3 cursor-pointer ${selectedPayment === m.id ? "bg-[#f0f4ff]" : "bg-white"}`} onClick={() => { setSelectedPayment(m.id); setCheckoutError(""); }}>
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${selectedPayment === m.id ? "border-[#0f4c5c]" : "border-[#e2e4e8]"}`}>
                          {selectedPayment === m.id && <div className="w-2 h-2 rounded-full bg-[#0f4c5c]" />}
                        </div>
                        <m.icon className="w-4 h-4 text-[#374151]" />
                        <span className="text-sm font-medium text-[#1c2438]">{m.label}</span>
                      </label>
                      {selectedPayment === m.id && m.id === "cc" && (
                        <div className="px-4 pb-4 pt-2 border-t border-[#e2e4e8] bg-white grid gap-3">
                          <FieldInput label="Card Number" placeholder="1234 5678 9012 3456" inputMode="numeric" />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <FieldInput label="Expiry" placeholder="MM / YY" inputMode="numeric" />
                            <FieldInput label="CVV" placeholder="•••" inputMode="numeric" />
                          </div>
                          <FieldInput label="Name on Card" placeholder="John Smith" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {checkoutError && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 mb-4">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {checkoutError}
                  </div>
                )}
                <div className="flex justify-between mt-6">
                  <Btn variant="secondary" size="lg" onClick={() => setStep(2)}><ChevronLeft className="w-4 h-4" /> Back</Btn>
                  <Btn size="lg" disabled={!selectedDelivery || !selectedPayment} onClick={handlePlaceOrder}>Place Order — ${total.toFixed(2)}</Btn>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Summary panel */}
        <div>
          <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-5 sticky top-8">
            <h3 className="text-xs font-bold text-[#1c2438] uppercase tracking-widest mb-4">Order Summary</h3>
            <div className="space-y-2.5 mb-4">
              {[["Prestan Adult Manikin × 2", "$379.98"], ["3M N95 8210 × 5", "$124.95"], ["Nitrile Gloves L × 10", "$149.90"]].map(([n, p], i) => (
                <div key={i} className="flex justify-between gap-2 text-xs">
                  <span className="text-[#6b7280] leading-snug">{n}</span>
                  <span className="font-medium text-[#1c2438] shrink-0">{p}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e2e4e8] pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6b7280]"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[#6b7280]"><span>Shipping</span><span>{shippingLabel}</span></div>
              <div className="flex justify-between text-[#6b7280]"><span>Tax (8.75%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-sm text-[#1c2438] pt-2 border-t border-[#e2e4e8] mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCREEN 06: ORDER TRACKING
// ──────────────────────────────────────────────

function OrderTrackingPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [tracked, setTracked] = useState(false);
  const steps = [
    { label: "Order Placed", date: "Jun 18, 2025 9:14 AM", done: true },
    { label: "Processing", date: "Jun 18, 2025 11:30 AM", done: true },
    { label: "Packed", date: "Jun 18, 2025 3:45 PM", done: true },
    { label: "Shipped", date: "Jun 19, 2025 7:22 AM", done: true },
    { label: "Delivered", date: "Expected: Jun 26, 2025", done: false },
  ];

  return (
    <div className="bg-[#f5f6f8] min-h-screen">
      <SiteHeader onNav={onNav} />
      <div className="max-w-[900px] mx-auto px-6 py-10">
        <h1 className="font-heading text-2xl md:text-[32px] font-extrabold tracking-tight text-[#0f4c5c] mb-2">Track Your Order</h1>
        <p className="text-sm text-[#6b7280] mb-6">No account required. Enter your order number and email address.</p>
        {!tracked ? (
          <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-8 max-w-md">
            <div className="space-y-4">
              <FieldInput label="Order Number" placeholder="e.g. ORD-10042" />
              <FieldInput label="Email Address" type="email" placeholder="you@company.com" />
              <Btn size="lg" className="w-full" onClick={() => setTracked(true)}><Search className="w-4 h-4" /> Track Order</Btn>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Delay banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-[4px] p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-amber-800">Minor Carrier Delay</div>
                <div className="text-xs text-amber-700 mt-0.5">UPS is experiencing delays in the Midwest region. Estimated delivery updated to Jun 26, 2025. We apologize for the inconvenience.</div>
              </div>
            </div>
            {/* Header */}
            <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-5">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
                {[["Order Number", "ORD-10042", true], ["Order Date", "Jun 18, 2025", false], ["Carrier", "UPS Ground", false], ["Tracking #", "1Z2345ABCD6789000", true], ["Est. Delivery", "Jun 26, 2025 (delayed)", false]].map(([k, v, mono]) => (
                  <div key={String(k)}>
                    <div className="text-[10px] text-[#4b5563] uppercase tracking-widest">{k}</div>
                    <div className={`text-sm font-semibold mt-0.5 ${String(k) === "Order Number" ? "text-[#0f4c5c] text-xl font-bold" : String(k) === "Est. Delivery" ? "text-amber-700" : "text-[#1c2438]"} ${mono ? "flex items-center gap-1" : ""}`}>
                      {v} {String(mono) === "true" && String(k) === "Tracking #" && <ExternalLink className="w-3.5 h-3.5 text-[#0f4c5c]" />}
                    </div>
                  </div>
                ))}
              </div>
              {/* Stepper */}
              <div className="flex items-start justify-between relative">
                <div className="absolute top-3.5 left-[10%] right-[10%] h-0.5 bg-[#e2e4e8]">
                  <div className="h-full bg-[#0f4c5c]" style={{ width: "80%" }} />
                </div>
                {steps.map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 z-10" style={{ width: "20%" }}>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${s.done ? "bg-[#0f4c5c] border-[#0f4c5c]" : i === 4 ? "bg-white border-[#e2e4e8]" : "bg-white border-[#e2e4e8]"}`}>
                      {s.done ? <Check className="w-3.5 h-3.5 text-white" /> : <div className="w-2 h-2 rounded-full bg-[#e2e4e8]" />}
                    </div>
                    <div className="text-center">
                      <div className={`text-xs font-semibold ${s.done ? "text-[#1c2438]" : "text-[#4b5563]"}`}>{s.label}</div>
                      <div className="text-[10px] text-[#4b5563] mt-0.5 leading-tight">{s.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Map */}
            <div className="bg-white border border-[#e2e4e8] rounded-[4px] overflow-hidden">
              <div className="h-44 bg-[#e8eef5] flex items-center justify-center flex-col gap-2 text-[#4b5563]">
                <MapPin className="w-8 h-8" />
                <span className="text-sm">Live carrier map embed (UPS / FedEx)</span>
                <a href="#" className="text-xs text-[#0f4c5c] font-medium flex items-center gap-1">View on UPS.com <ExternalLink className="w-3 h-3" /></a>
              </div>
            </div>
            {/* Items */}
            <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-5">
              <h3 className="text-sm font-bold text-[#1c2438] mb-4">Items in This Order</h3>
              <div className="space-y-3">
                {[{ ...PRODUCTS[0], ordQty: 2 }, { ...PRODUCTS[3], ordQty: 5 }, { ...PRODUCTS[4], ordQty: 10 }].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 pb-3 border-b border-[#e2e4e8] last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-[#f5f6f8] rounded-[3px] overflow-hidden shrink-0"><img loading="lazy" src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[10px] text-[#4b5563] uppercase">{item.sku}</div>
                      <div className="text-sm font-medium text-[#1c2438] truncate">{item.name}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-[#4b5563]">Qty: {item.ordQty}</div>
                      <div className="text-sm font-semibold text-[#1c2438]">${(item.price * item.ordQty).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-[#e2e4e8] flex justify-between items-center mt-3">
                <a href="#" className="text-xs text-[#0f4c5c] font-medium flex items-center gap-1 hover:underline"><MessageSquare className="w-3.5 h-3.5" /> Contact Support</a>
                <Btn size="sm" variant="secondary" onClick={() => onNav("cart")}>Reorder</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCREEN 07: ACCOUNT DASHBOARD
// ──────────────────────────────────────────────

function AccountDashboard({ onNav }: { onNav: (s: Screen) => void }) {
  const [section, setSection] = useState("orders");
  const navItems = [
    { id: "overview", icon: BarChart2, label: "Overview" },
    { id: "orders", icon: Package, label: "Orders", badge: 2 },
    { id: "quotes", icon: FileText, label: "Quotes" },
    { id: "addresses", icon: MapPin, label: "Addresses" },
    { id: "settings", icon: Settings, label: "Account Settings" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "reorder", icon: Repeat2, label: "Reorder Lists" },
  ];
  const quotes = [
    { id: "QT-0098", date: "Jun 20, 2025", expiry: "Jul 20, 2025", total: 4250.00, status: "active" },
    { id: "QT-0089", date: "May 15, 2025", expiry: "Jun 15, 2025", total: 1890.50, status: "expired" },
    { id: "QT-0081", date: "Apr 30, 2025", expiry: "May 30, 2025", total: 7540.00, status: "converted" },
  ];

  return (
    <div className="bg-[#f5f6f8] min-h-screen">
      <SiteHeader onNav={onNav} />
      <div className="max-w-[1440px] mx-auto px-6 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="w-52 shrink-0">
          <div className="bg-white border border-[#e2e4e8] rounded-[4px] overflow-hidden">
            <div className="p-4 border-b border-[#e2e4e8]">
              <div className="w-10 h-10 bg-[#0f4c5c] rounded-full flex items-center justify-center text-white font-bold text-sm mb-2">JS</div>
              <div className="text-sm font-semibold text-[#1c2438]">John Smith</div>
              <div className="text-xs text-[#4b5563]">Acme Corp · Pro Account</div>
            </div>
            <nav className="py-1">
              {navItems.map(item => (
                <button key={item.id} className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${section === item.id ? "bg-[#0f4c5c]/10 text-[#0f4c5c] font-semibold border-r-2 border-[#0f4c5c]" : "text-[#374151] hover:bg-[#f5f6f8]"}`} onClick={() => setSection(item.id)}>
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.label}
                  {item.badge && <span className="ml-auto text-[10px] bg-[#0f4c5c] text-white px-1.5 py-0.5 rounded-[2px]">{item.badge}</span>}
                </button>
              ))}
            </nav>
            <div className="border-t border-[#e2e4e8] p-1">
              <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"><LogOut className="w-4 h-4" /> Sign Out</button>
            </div>
          </div>
        </aside>
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Stats always visible on overview/orders */}
          {(section === "overview" || section === "orders") && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Orders", value: "47", icon: ShoppingBag, sub: "+3 this month" },
                  { label: "Pending Shipments", value: "2", icon: Truck, sub: "Ships by Jun 30" },
                  { label: "Saved Items", value: "18", icon: Heart, sub: "In Wishlist" },
                  { label: "Account Credit", value: "$350.00", icon: Banknote, sub: "Expires Aug 2025" },
                ].map(stat => (
                  <div key={stat.label} className="bg-white border border-[#e2e4e8] rounded-[4px] p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-[10px] text-[#4b5563] uppercase tracking-widest">{stat.label}</div>
                      <stat.icon className="w-4 h-4 text-[#4b5563]" />
                    </div>
                    <div className="font-heading text-2xl md:text-[32px] font-extrabold tracking-tight text-[#0f4c5c] mb-1">{stat.value}</div>
                    <div className="text-xs text-[#4b5563] mt-1">{stat.sub}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-[#e2e4e8] rounded-[4px] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#e2e4e8]">
                  <h2 className="text-sm font-bold text-[#1c2438]">Order History</h2>
                  <input placeholder="Search orders..." className="px-3 py-1.5 text-xs border border-[#e2e4e8] rounded-[3px] outline-none focus:border-[#0f4c5c] w-44" />
                </div>
                <div className="overflow-x-auto">
<table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#f5f6f8] border-b border-[#e2e4e8]">
                      {["Order #", "Date", "Items", "Total", "Status", "Actions"].map(col => (
                        <th key={col} className="text-left px-4 py-2.5 font-semibold text-[#374151] uppercase tracking-widest text-[10px] whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map((o, i) => (
                      <tr key={o.id} className={`border-b border-[#e2e4e8] last:border-0 hover:bg-[#fafbfc] ${i % 2 !== 0 ? "bg-[#fafbfc]" : ""}`}>
                        <td className="px-4 py-3 font-mono font-semibold text-[#0f4c5c]">{o.id}</td>
                        <td className="px-4 py-3 text-[#374151]">{o.date}</td>
                        <td className="px-4 py-3 text-[#374151]">{o.items} items</td>
                        <td className="px-4 py-3 font-semibold text-[#1c2438]">${o.total.toFixed(2)}</td>
                        <td className="px-4 py-3"><OrderBadge status={o.status} /></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button className="text-[#0f4c5c] hover:underline font-medium" onClick={() => onNav("tracking")}>Track</button>
                            <span className="text-[#e2e4e8]">|</span>
                            <button className="text-[#0f4c5c] hover:underline font-medium">Reorder</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
</div>
              </div>
            </>
          )}
          {section === "quotes" && (
            <div className="bg-white border border-[#e2e4e8] rounded-[4px] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#e2e4e8]">
                <h2 className="text-sm font-bold text-[#1c2438]">Saved Quotes</h2>
                <Btn size="sm" onClick={() => {}}>Request New Quote</Btn>
              </div>
              <div className="overflow-x-auto">
<table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#f5f6f8] border-b border-[#e2e4e8]">
                    {["Quote #", "Date", "Expiry", "Total", "Status", "Actions"].map(col => (
                      <th key={col} className="text-left px-4 py-2.5 font-semibold text-[#374151] uppercase tracking-widest text-[10px]">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q, i) => (
                    <tr key={q.id} className={`border-b border-[#e2e4e8] last:border-0 hover:bg-[#fafbfc] ${i % 2 !== 0 ? "bg-[#fafbfc]" : ""}`}>
                      <td className="px-4 py-3 font-mono font-semibold text-[#0f4c5c]">{q.id}</td>
                      <td className="px-4 py-3 text-[#374151]">{q.date}</td>
                      <td className="px-4 py-3 text-[#374151]">{q.expiry}</td>
                      <td className="px-4 py-3 font-semibold text-[#1c2438]">${q.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border rounded-[3px] ${q.status === "active" ? "text-green-700 bg-green-50 border-green-200" : q.status === "expired" ? "text-red-700 bg-red-50 border-red-200" : "text-[#0f4c5c] bg-[#0f4c5c]/10 border-[#0f4c5c]/20"}`}>{q.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="text-[#0f4c5c] hover:underline font-medium flex items-center gap-1"><Download className="w-3 h-3" /> PDF</button>
                          {q.status === "active" && <><span className="text-[#e2e4e8]">|</span><button className="text-[#0f4c5c] hover:underline font-medium">Convert to Order</button></>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          )}
          {(section === "addresses" || section === "settings" || section === "reorder") && (
            <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#f5f6f8] rounded-[4px] flex items-center justify-center mb-4"><Settings className="w-6 h-6 text-[#4b5563]" /></div>
              <div className="text-sm font-semibold text-[#1c2438] mb-1">{section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " ")}</div>
              <div className="text-xs text-[#4b5563]">This section is available in the full implementation.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCREEN 08: ADMIN CMS
// ──────────────────────────────────────────────

function AdminCMS({ onNav }: { onNav: (s: Screen) => void }) {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [navSec, setNavSec] = useState("products");
  const adminNav = [
    { id: "dashboard", icon: BarChart2, label: "Dashboard" },
    { id: "products", icon: Package, label: "Products" },
    { id: "categories", icon: Layers, label: "Categories" },
    { id: "pages", icon: FileText, label: "Pages" },
    { id: "blog", icon: BookOpen, label: "Blog" },
    { id: "banners", icon: Eye, label: "Banners" },
    { id: "menus", icon: AlignJustify, label: "Menus" },
    { id: "media", icon: Upload, label: "Media Library" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="bg-[#f5f6f8] min-h-screen flex">
      <aside className="w-56 bg-[#0f4c5c] text-white shrink-0 min-h-screen flex flex-col">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-[3px] flex items-center justify-center"><Plus className="w-4 h-4 text-[#0f4c5c]" /></div>
          <div><div className="font-bold text-sm">Desert Rain</div><div className="text-[10px] text-white/40 uppercase tracking-[0.15em]">Admin CMS</div></div>
        </div>
        <nav className="flex-1 py-2">
          {adminNav.map(item => (
            <button key={item.id} className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${navSec === item.id ? "bg-white/10 text-white font-semibold border-r-2 border-white" : "text-white/55 hover:bg-white/5 hover:text-white"}`} onClick={() => setNavSec(item.id)}>
              <item.icon className="w-4 h-4 shrink-0" />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 text-xs text-white/40">sales@desertrainllc.com</div>
      </aside>
      <div className="flex-1 min-w-0 overflow-auto">
        <div className="bg-white border-b border-[#e2e4e8] px-6 py-3 flex items-center justify-between">
          <div className="text-sm font-bold text-[#1c2438]">{editMode ? "Edit Product — PRE-101-01" : "Products"}</div>
          <div className="flex gap-2">
            {!editMode && <Btn size="sm" onClick={() => setEditMode(true)}><Plus className="w-3.5 h-3.5" /> Add Product</Btn>}
            {editMode && <><Btn size="sm" variant="secondary" onClick={() => setEditMode(false)}>Cancel</Btn><Btn size="sm" onClick={() => setEditMode(false)}>Save Changes</Btn></>}
          </div>
        </div>
        <div className="p-6">
          {!editMode ? (
            <div className="bg-white border border-[#e2e4e8] rounded-[4px] overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e2e4e8] flex-wrap">
                <input placeholder="Search SKU, name, category..." className="px-3 py-1.5 text-xs border border-[#e2e4e8] rounded-[3px] outline-none focus:border-[#0f4c5c] w-64" />
                <select className="px-3 py-1.5 text-xs border border-[#e2e4e8] rounded-[3px] bg-white outline-none">
                  <option>All Categories</option>
                  {CATEGORIES.map(c => <option key={c.id}>{c.label}</option>)}
                </select>
                <select className="px-3 py-1.5 text-xs border border-[#e2e4e8] rounded-[3px] bg-white outline-none">
                  <option>All Status</option><option>Published</option><option>Draft</option><option>Archived</option>
                </select>
                <span className="ml-auto text-xs text-[#4b5563]">Showing 8 of 1,247</span>
              </div>
              <div className="overflow-x-auto">
<table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#f5f6f8] border-b border-[#e2e4e8]">
                    <th className="px-4 py-2.5 w-8"><div className="w-3.5 h-3.5 border border-[#e2e4e8] rounded-[2px]" /></th>
                    {["SKU", "Name", "Category", "Price", "Stock", "Status", "Actions"].map(col => (
                      <th key={col} className="text-left px-3 py-2.5 font-semibold text-[#374151] uppercase tracking-widest text-[10px] whitespace-nowrap">
                        <div className="flex items-center gap-1">{col} <ChevronDown className="w-3 h-3 text-[#d1d5db]" /></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p, i) => (
                    <tr key={p.id} className={`border-b border-[#e2e4e8] last:border-0 hover:bg-[#fafbfc] ${i % 2 !== 0 ? "bg-[#fafbfc]" : ""}`}>
                      <td className="px-4 py-3"><div className="w-3.5 h-3.5 border border-[#e2e4e8] rounded-[2px]" /></td>
                      <td className="px-3 py-3 font-mono text-[#4b5563]">{p.sku}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-[#f5f6f8] rounded-[2px] overflow-hidden shrink-0"><img loading="lazy" src={p.image} alt="" className="w-full h-full object-cover" /></div>
                          <span className="font-medium text-[#1c2438] line-clamp-1">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[#6b7280]">{p.category}</td>
                      <td className="px-3 py-3 font-semibold text-[#1c2438]">${p.price.toFixed(2)}</td>
                      <td className="px-3 py-3"><StockBadge status={p.stock} /></td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border rounded-[3px] ${i % 3 === 2 ? "text-amber-700 bg-amber-50 border-amber-200" : "text-green-700 bg-green-50 border-green-200"}`}>{i % 3 === 2 ? "Draft" : "Published"}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <button className="text-[#0f4c5c] font-medium hover:underline flex items-center gap-1" onClick={() => setEditMode(true)}><Edit className="w-3 h-3" /> Edit</button>
                          <span className="text-[#e2e4e8]">|</span>
                          <button className="text-[#4b5563] font-medium hover:text-[#374151] flex items-center gap-1"><Archive className="w-3 h-3" /> Archive</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="col-span-2 space-y-4">
                <div className="bg-white border border-[#e2e4e8] rounded-[4px] overflow-hidden">
                  <div className="flex border-b border-[#e2e4e8]">
                    {["general", "pricing", "inventory", "images", "seo", "attributes"].map(t => (
                      <button key={t} className={`px-4 py-2.5 text-xs font-medium capitalize border-b-2 -mb-px transition-colors ${activeTab === t ? "border-[#0f4c5c] text-[#0f4c5c]" : "border-transparent text-[#6b7280] hover:text-[#1c2438]"}`} onClick={() => setActiveTab(t)}>{t}</button>
                    ))}
                  </div>
                  <div className="p-5">
                    {activeTab === "general" && (
                      <div className="space-y-4">
                        <FieldInput label="Product Name" placeholder="Prestan Adult Manikin with CPR Rate Monitor" />
                        <div className="grid grid-cols-2 gap-4">
                          <FieldInput label="SKU" placeholder="PRE-101-01" />
                          <FieldInput label="Brand" placeholder="Prestan" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest block mb-1">Description</label>
                          <textarea rows={5} className="w-full border border-[#e2e4e8] rounded-[4px] px-3 py-2 text-sm text-[#1c2438] outline-none focus:border-[#0f4c5c] resize-none" defaultValue="The Prestan Adult Manikin with CPR Rate Monitor is specifically designed for CPR training with immediate visual feedback." />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest block mb-1.5">Status</label>
                          <select className="border border-[#e2e4e8] rounded-[4px] px-3 py-2 text-sm bg-white outline-none focus:border-[#0f4c5c]"><option>Published</option><option>Draft</option><option>Archived</option></select>
                        </div>
                      </div>
                    )}
                    {activeTab === "pricing" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FieldInput label="Regular Price" placeholder="189.99" prefix={<span className="text-sm text-[#4b5563]">$</span>} />
                          <FieldInput label="Sale Price" placeholder="Optional" prefix={<span className="text-sm text-[#4b5563]">$</span>} />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest block mb-3">Volume Pricing Tiers</label>
                          <div className="overflow-x-auto">
<table className="w-full border border-[#e2e4e8] rounded-[4px] overflow-hidden text-sm">
                            <thead><tr className="bg-[#f5f6f8] border-b border-[#e2e4e8]">{["Min Qty", "Max Qty", "Unit Price", ""].map(h => <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-[#374151] border-b border-[#e2e4e8]">{h}</th>)}</tr></thead>
                            <tbody>
                              {[["1", "9", "$189.99"], ["10", "49", "$174.99"], ["50", "99", "$159.99"]].map(([mn, mx, p], i) => (
                                <tr key={i} className="border-b border-[#e2e4e8] last:border-0">
                                  <td className="px-3 py-2"><input className="border border-[#e2e4e8] rounded-[3px] px-2 py-1 text-xs w-16 outline-none" defaultValue={mn} /></td>
                                  <td className="px-3 py-2"><input className="border border-[#e2e4e8] rounded-[3px] px-2 py-1 text-xs w-16 outline-none" defaultValue={mx} /></td>
                                  <td className="px-3 py-2"><input className="border border-[#e2e4e8] rounded-[3px] px-2 py-1 text-xs w-24 outline-none" defaultValue={p} /></td>
                                  <td className="px-3 py-2"><button className="text-red-500 hover:text-red-700"><Trash2 className="w-3.5 h-3.5" /></button></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
</div>
                          <button className="text-xs text-[#0f4c5c] font-medium mt-2 flex items-center gap-1"><Plus className="w-3 h-3" /> Add Tier</button>
                        </div>
                      </div>
                    )}
                    {activeTab === "inventory" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <FieldInput label="Current Stock" placeholder="245" />
                          <FieldInput label="Reorder Point" placeholder="50" />
                          <FieldInput label="Max Stock Level" placeholder="500" />
                        </div>
                        <FieldInput label="Primary Supplier" placeholder="Prestan Products LLC" />
                        <div className="grid grid-cols-2 gap-4">
                          <FieldInput label="Weight (lbs)" placeholder="3.2" />
                          <FieldInput label="Lead Time (days)" placeholder="5" />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <div className="w-8 h-[18px] bg-[#0f4c5c] rounded-full relative shrink-0"><div className="absolute right-0.5 top-0.5 w-3.5 h-3.5 bg-white rounded-full" /></div>
                          <span className="text-sm text-[#374151]">Track inventory for this product</span>
                        </label>
                      </div>
                    )}
                    {!["general", "pricing", "inventory"].includes(activeTab) && (
                      <div className="text-sm text-[#4b5563] text-center py-8">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings for this product</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-4">
                  <div className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest mb-3">Category</div>
                  <select className="w-full border border-[#e2e4e8] rounded-[4px] px-3 py-2 text-sm bg-white outline-none focus:border-[#0f4c5c]">{CATEGORIES.map(c => <option key={c.id}>{c.label}</option>)}</select>
                </div>
                <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-4">
                  <div className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest mb-3">Featured Image</div>
                  <div className="aspect-square bg-[#f5f6f8] rounded-[3px] overflow-hidden mb-2"><img loading="lazy" src={PRODUCTS[0].image} alt="" className="w-full h-full object-cover" /></div>
                  <button className="w-full text-xs text-[#0f4c5c] font-medium flex items-center justify-center gap-1 py-1.5 border border-[#e2e4e8] rounded-[3px] hover:bg-[#f5f6f8]"><Upload className="w-3.5 h-3.5" /> Change Image</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCREEN 09: ADMIN IMS
// ──────────────────────────────────────────────

function AdminIMS({ onNav }: { onNav: (s: Screen) => void }) {
  const [view, setView] = useState("stock");
  const lowStock = STOCK_ITEMS.filter(i => i.current <= i.reorder);
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
    <div className="bg-[#f5f6f8] min-h-screen flex">
      <aside className="w-56 bg-[#0f4c5c] text-white shrink-0 min-h-screen flex flex-col">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-[3px] flex items-center justify-center"><Plus className="w-4 h-4 text-[#0f4c5c]" /></div>
          <div><div className="font-bold text-sm">Desert Rain</div><div className="text-[10px] text-white/40 uppercase tracking-[0.15em]">Inventory</div></div>
        </div>
        <nav className="flex-1 py-2">
          {imsNav.map(item => (
            <button key={item.id} className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${view === item.id ? "bg-white/10 text-white font-semibold border-r-2 border-white" : "text-white/55 hover:bg-white/5 hover:text-white"}`} onClick={() => setView(item.id)}>
              <item.icon className="w-4 h-4 shrink-0" />{item.label}
              {item.badge ? <span className="ml-auto text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-[2px]">{item.badge}</span> : null}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 text-xs text-white/40">Inventory Management</div>
      </aside>
      <div className="flex-1 min-w-0 overflow-auto">
        <div className="bg-white border-b border-[#e2e4e8] px-6 py-3 flex items-center justify-between">
          <div className="text-sm font-bold text-[#1c2438]">
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
                  { label: "Total SKUs", value: "1,247", icon: Package, cls: "text-[#0f4c5c] bg-[#0f4c5c]/10", clickable: false },
                  { label: "Low Stock", value: String(lowStock.length), icon: AlertTriangle, cls: "text-amber-700 bg-amber-50", clickable: true },
                  { label: "Out of Stock", value: "8", icon: XCircle, cls: "text-red-700 bg-red-50", clickable: false },
                  { label: "Pending POs", value: "3", icon: Receipt, cls: "text-purple-700 bg-purple-50", clickable: false },
                ].map(stat => (
                  <div key={stat.label} className={`bg-white border border-[#e2e4e8] rounded-[4px] p-4 ${stat.clickable ? "cursor-pointer hover:border-amber-300" : ""}`} onClick={() => stat.clickable && setView("low-stock")}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-[#4b5563] uppercase tracking-widest">{stat.label}</span>
                      <div className={`w-7 h-7 rounded-[3px] flex items-center justify-center ${stat.cls}`}><stat.icon className="w-4 h-4" /></div>
                    </div>
                    <div className="font-heading text-2xl md:text-[32px] font-extrabold tracking-tight text-[#0f4c5c] mb-1">{stat.value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-[#e2e4e8] rounded-[4px] overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e2e4e8]">
                  <input placeholder="Search SKU or product..." className="px-3 py-1.5 text-xs border border-[#e2e4e8] rounded-[3px] outline-none focus:border-[#0f4c5c] w-72" />
                  <select className="px-3 py-1.5 text-xs border border-[#e2e4e8] rounded-[3px] bg-white outline-none"><option>All Suppliers</option><option>Prestan Products</option><option>3M Health</option><option>MCR Medical</option></select>
                </div>
                <div className="overflow-x-auto">
<table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#f5f6f8] border-b border-[#e2e4e8]">
                      {["SKU", "Product Name", "Current", "Reserved", "Available", "Reorder Pt.", "Supplier", "Actions"].map(col => (
                        <th key={col} className="text-left px-4 py-2.5 font-semibold text-[#374151] uppercase tracking-widest text-[10px] whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {STOCK_ITEMS.map((item, i) => {
                      const isOut = item.current === 0;
                      const isLow = item.current > 0 && item.current <= item.reorder;
                      return (
                        <tr key={item.sku} className={`border-b border-[#e2e4e8] last:border-0 hover:bg-[#fafbfc] ${isOut ? "bg-red-50/30" : isLow ? "bg-amber-50/30" : ""}`}>
                          <td className="px-4 py-3 font-mono text-[#4b5563]">{item.sku}</td>
                          <td className="px-4 py-3 font-medium text-[#1c2438]">{item.name}</td>
                          <td className={`px-4 py-3 font-bold ${isOut ? "text-red-600" : isLow ? "text-amber-600" : "text-[#1c2438]"}`}>{item.current}</td>
                          <td className="px-4 py-3 text-[#6b7280]">{item.reserved}</td>
                          <td className="px-4 py-3 font-medium text-[#1c2438]">{item.available}</td>
                          <td className="px-4 py-3 text-[#6b7280]">{item.reorder}</td>
                          <td className="px-4 py-3 text-[#6b7280]">{item.supplier}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button className="text-[#0f4c5c] font-medium hover:underline" onClick={() => setView("adjustments")}>Adjust</button>
                              <span className="text-[#e2e4e8]">|</span>
                              <button className="text-[#0f4c5c] font-medium hover:underline" onClick={() => setView("history")}>History</button>
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
              <div className="bg-amber-50 border border-amber-200 rounded-[4px] p-4 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-sm text-amber-800"><strong>{lowStock.length} products</strong> are at or below their reorder point and require immediate attention.</span>
              </div>
              <div className="bg-white border border-[#e2e4e8] rounded-[4px] overflow-hidden">
                <div className="overflow-x-auto">
<table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#f5f6f8] border-b border-[#e2e4e8]">
                      {["SKU", "Product Name", "Available", "Reorder Pt.", "Supplier", "Action"].map(col => (
                        <th key={col} className="text-left px-4 py-2.5 font-semibold text-[#374151] uppercase tracking-widest text-[10px]">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lowStock.map(item => (
                      <tr key={item.sku} className={`border-b border-[#e2e4e8] last:border-0 ${item.current === 0 ? "bg-red-50/30" : "bg-amber-50/30"}`}>
                        <td className="px-4 py-3 font-mono text-[#4b5563]">{item.sku}</td>
                        <td className="px-4 py-3 font-medium text-[#1c2438]">{item.name}</td>
                        <td className={`px-4 py-3 font-bold ${item.current === 0 ? "text-red-600" : "text-amber-600"}`}>{item.available}</td>
                        <td className="px-4 py-3 text-[#6b7280]">{item.reorder}</td>
                        <td className="px-4 py-3 text-[#6b7280]">{item.supplier}</td>
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
            <div className="bg-white border border-[#e2e4e8] rounded-[4px] overflow-hidden">
              <div className="overflow-x-auto">
<table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#f5f6f8] border-b border-[#e2e4e8]">
                    {["PO #", "Supplier", "Items", "Expected Delivery", "Status", "Actions"].map(col => (
                      <th key={col} className="text-left px-4 py-2.5 font-semibold text-[#374151] uppercase tracking-widest text-[10px]">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pos.map((po, i) => (
                    <tr key={po.id} className={`border-b border-[#e2e4e8] last:border-0 hover:bg-[#fafbfc] ${i % 2 !== 0 ? "bg-[#fafbfc]" : ""}`}>
                      <td className="px-4 py-3 font-mono font-semibold text-[#0f4c5c]">{po.id}</td>
                      <td className="px-4 py-3 font-medium text-[#1c2438]">{po.supplier}</td>
                      <td className="px-4 py-3 text-[#374151]">{po.items} items</td>
                      <td className="px-4 py-3 text-[#374151]">{po.expected}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border rounded-[3px] ${po.status === "received" ? "text-green-700 bg-green-50 border-green-200" : po.status === "in-transit" ? "text-amber-700 bg-amber-50 border-amber-200" : "text-[#0f4c5c] bg-[#0f4c5c]/10 border-[#0f4c5c]/20"}`}>{po.status.replace("-", " ")}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="text-[#0f4c5c] font-medium hover:underline">View</button>
                          {po.status !== "received" && <><span className="text-[#e2e4e8]">|</span><button className="text-[#0f4c5c] font-medium hover:underline">Receive Stock</button></>}
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
            <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-6 max-w-lg">
              <h3 className="text-sm font-bold text-[#1c2438] mb-5">New Stock Adjustment</h3>
              <div className="space-y-4">
                <FieldInput label="Product SKU or Name" placeholder="Search SKU or product..." />
                <div>
                  <label className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest block mb-1.5">Adjustment Type</label>
                  <select className="w-full border border-[#e2e4e8] rounded-[4px] px-3 py-2 text-sm bg-white outline-none focus:border-[#0f4c5c]"><option>+ Add Stock (received shipment)</option><option>– Remove Stock (damaged/write-off)</option><option>Audit Correction</option><option>Transfer Between Locations</option></select>
                </div>
                <FieldInput label="Quantity" placeholder="0" />
                <div>
                  <label className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest block mb-1.5">Reason Code</label>
                  <select className="w-full border border-[#e2e4e8] rounded-[4px] px-3 py-2 text-sm bg-white outline-none focus:border-[#0f4c5c]"><option>Received — Purchase Order</option><option>Damaged / Defective</option><option>Annual Audit Correction</option><option>Customer Return</option><option>Promotional Sample</option><option>Lost / Stolen</option></select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#1c2438] uppercase tracking-widest block mb-1.5">Notes</label>
                  <textarea rows={3} className="w-full border border-[#e2e4e8] rounded-[4px] px-3 py-2 text-sm outline-none focus:border-[#0f4c5c] resize-none" placeholder="Add context for this adjustment..." />
                </div>
                <div className="flex gap-3"><Btn>Save Adjustment</Btn><Btn variant="secondary">Cancel</Btn></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCREEN 10: NOTIFICATIONS
// ──────────────────────────────────────────────

function NotificationsCenter({ onNav }: { onNav: (s: Screen) => void }) {
  const [filter, setFilter] = useState("all");
  const [settingsView, setSettingsView] = useState(false);

  const notifs = [
    { id: 1, type: "order", icon: Package, title: "Order ORD-10042 has shipped", time: "2 hours ago", read: false, body: "Your order of 3 items is on its way via UPS Ground. Tracking: 1Z2345ABCD6789000" },
    { id: 2, type: "stock", icon: AlertTriangle, title: "Low stock alert: LSP Bag Valve Mask", time: "5 hours ago", read: false, body: "SKU LSP-BVM-ADULT is out of stock. 0 units remaining. Create a purchase order." },
    { id: 3, type: "shipping", icon: Truck, title: "Delivery confirmed: ORD-10038", time: "Yesterday", read: true, body: "Your order was delivered Jun 18, 2025 at 2:34 PM. Signed by: J. SMITH" },
    { id: 4, type: "promo", icon: Tag, title: "Volume pricing: N95 respirators", time: "2 days ago", read: true, body: "Order 100+ units of 3M N95 8210 and save 22%. Promotion ends Jul 31, 2025." },
    { id: 5, type: "system", icon: Info, title: "Scheduled system maintenance", time: "3 days ago", read: true, body: "Maintenance window: Sun Jun 29, 2:00–4:00 AM EST. Brief outages expected." },
    { id: 6, type: "stock", icon: AlertCircle, title: "Reorder point reached: MCR-FA-200", time: "4 days ago", read: true, body: "First Aid Kit 200pc (MCR-FA-200) is at 7 units — below reorder point of 25." },
  ];

  const filtered = filter === "all" ? notifs : notifs.filter(n => n.type === filter);
  const typeColor: Record<string, string> = {
    order: "bg-[#0f4c5c]/10 text-[#0f4c5c]", stock: "bg-amber-50 text-amber-600",
    shipping: "bg-green-50 text-green-600", promo: "bg-orange-50 text-orange-600", system: "bg-[#f5f6f8] text-[#6b7280]"
  };
  const notifSettings = [
    { cat: "Order Updates", desc: "Confirmation, status changes, and delivery" },
    { cat: "Shipping Alerts", desc: "Tracking updates and delivery confirmations" },
    { cat: "Stock Alerts", desc: "Low stock and reorder point notifications" },
    { cat: "Promotions", desc: "Volume pricing deals and limited-time offers" },
    { cat: "System", desc: "Maintenance windows and platform updates" },
    { cat: "Account Security", desc: "Login alerts and password changes" },
  ];

  return (
    <div className="bg-[#f5f6f8] min-h-screen">
      <SiteHeader onNav={onNav} />
      <div className="max-w-[900px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl md:text-[32px] font-extrabold tracking-tight text-[#0f4c5c] mb-1">Notifications</h1>
            <p className="text-sm text-[#6b7280] mt-0.5"><strong className="text-[#1c2438]">2 unread</strong> notifications</p>
          </div>
          <div className="flex gap-2">
            <Btn variant="ghost" size="sm" onClick={() => setSettingsView(!settingsView)}><Settings className="w-3.5 h-3.5" /> {settingsView ? "View Notifications" : "Settings"}</Btn>
            {!settingsView && <Btn variant="secondary" size="sm">Mark All Read</Btn>}
          </div>
        </div>
        {!settingsView ? (
          <>
            <div className="flex gap-0 border-b border-[#e2e4e8] mb-4">
              {[
                { id: "all", label: "All", count: notifs.length },
                { id: "order", label: "Orders", count: notifs.filter(n => n.type === "order").length },
                { id: "shipping", label: "Shipping", count: notifs.filter(n => n.type === "shipping").length },
                { id: "stock", label: "Stock", count: notifs.filter(n => n.type === "stock").length },
                { id: "promo", label: "Promos", count: notifs.filter(n => n.type === "promo").length },
                { id: "system", label: "System", count: notifs.filter(n => n.type === "system").length },
              ].map(tab => (
                <button key={tab.id} className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${filter === tab.id ? "border-[#0f4c5c] text-[#0f4c5c]" : "border-transparent text-[#6b7280] hover:text-[#1c2438]"}`} onClick={() => setFilter(tab.id)}>
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-[2px] font-semibold ${filter === tab.id ? "bg-[#0f4c5c] text-white" : "bg-[#e2e4e8] text-[#6b7280]"}`}>{tab.count}</span>
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {filtered.map(n => (
                <div key={n.id} className={`bg-white border rounded-[4px] p-4 flex items-start gap-3 hover:border-[#0f4c5c]/20 transition-colors ${!n.read ? "border-[#0f4c5c]/20 bg-[#0f4c5c]/10/30" : "border-[#e2e4e8]"}`}>
                  <div className={`w-9 h-9 rounded-[3px] flex items-center justify-center shrink-0 ${typeColor[n.type] || "bg-[#f5f6f8] text-[#6b7280]"}`}><n.icon className="w-[18px] h-[18px]" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className={`text-sm font-semibold ${!n.read ? "text-[#0f4c5c]" : "text-[#1c2438]"}`}>{n.title}</div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-[#4b5563]">{n.time}</span>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-[#0f4c5c]" />}
                      </div>
                    </div>
                    <p className="text-xs text-[#6b7280] mt-1 leading-relaxed">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white border border-[#e2e4e8] rounded-[4px] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#e2e4e8]">
              <div className="text-sm font-bold text-[#1c2438]">Notification Preferences</div>
              <div className="text-xs text-[#4b5563] mt-0.5">Choose how you receive notifications for each category</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#f5f6f8] border-b border-[#e2e4e8]">
                    <th className="text-left px-5 py-3 font-semibold text-[#374151] uppercase tracking-widest text-[10px] w-64">Category</th>
                    {["Email", "SMS", "In-App"].map(h => <th key={h} className="px-4 py-3 font-semibold text-[#374151] uppercase tracking-widest text-[10px] text-center">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {notifSettings.map((s, i) => (
                    <tr key={s.cat} className={`border-b border-[#e2e4e8] last:border-0 ${i % 2 !== 0 ? "bg-[#fafbfc]" : ""}`}>
                      <td className="px-5 py-3">
                        <div className="font-medium text-[#1c2438]">{s.cat}</div>
                        <div className="text-[#4b5563] mt-0.5">{s.desc}</div>
                      </td>
                      {[true, i % 2 === 0, true].map((on, j) => (
                        <td key={j} className="px-4 py-3 text-center">
                          <div className={`w-8 h-[18px] rounded-full relative mx-auto cursor-pointer transition-colors ${on ? "bg-[#0f4c5c]" : "bg-[#e2e4e8]"}`}>
                            <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow transition-all ${on ? "right-0.5" : "left-0.5"}`} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-[#e2e4e8] flex justify-end gap-2">
              <Btn variant="secondary" size="sm">Reset to Defaults</Btn>
              <Btn size="sm">Save Preferences</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCREEN 11: COMPONENT LIBRARY
// ──────────────────────────────────────────────

function DSSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xs font-bold text-[#374151] uppercase tracking-[0.15em] whitespace-nowrap">{title}</h2>
        <div className="flex-1 h-px bg-[#e2e4e8]" />
      </div>
      <div className="bg-white border border-[#e2e4e8] rounded-[4px] p-5">{children}</div>
    </div>
  );
}

function ComponentLibrary() {
  return (
    <div className="bg-[#f5f6f8] min-h-screen p-8">
      <div className="max-w-[1200px] mx-auto space-y-10">
        <div className="border-b border-[#e2e4e8] pb-6">
          <h1 className="font-heading text-2xl md:text-[32px] font-extrabold tracking-tight text-[#0f4c5c] mb-1">Component Library</h1>
          <p className="text-sm text-[#6b7280] mt-1">Desert Rain Design System · Inter · Navy #0B1F4A · Orange #C84B0B · 4px radius</p>
        </div>

        <DSSection title="Buttons — Variants">
          <div className="flex flex-wrap gap-3 mb-4">
            <Btn>Primary</Btn>
            <Btn variant="secondary">Secondary</Btn>
            <Btn variant="ghost">Ghost</Btn>
            <Btn variant="destructive">Destructive</Btn>
            <Btn disabled>Disabled</Btn>
            <Btn loading>Loading</Btn>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn size="sm"><ShoppingCart className="w-3.5 h-3.5" /> Small + Icon</Btn>
            <Btn size="md"><Download className="w-4 h-4" /> Medium + Icon</Btn>
            <Btn size="lg"><ArrowRight className="w-4 h-4" /> Large + Icon</Btn>
            <Btn size="lg" variant="secondary"><FileText className="w-4 h-4" /> Request Quote</Btn>
          </div>
        </DSSection>

        <DSSection title="Status Badges">
          <div className="flex flex-wrap gap-3 mb-4">
            <StockBadge status="in-stock" />
            <StockBadge status="low-stock" />
            <StockBadge status="out-of-stock" />
          </div>
          <div className="flex flex-wrap gap-3">
            <OrderBadge status="processing" />
            <OrderBadge status="packed" />
            <OrderBadge status="shipped" />
            <OrderBadge status="delivered" />
            <OrderBadge status="cancelled" />
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              { label: "ISO 9001", cls: "text-[#0f4c5c] bg-[#0f4c5c]/10 border-[#0f4c5c]/20" },
              { label: "FDA Cleared", cls: "text-green-700 bg-green-50 border-green-200" },
              { label: "AHA Compliant", cls: "text-purple-700 bg-purple-50 border-purple-200" },
              { label: "Draft", cls: "text-amber-700 bg-amber-50 border-amber-200" },
              { label: "Published", cls: "text-green-700 bg-green-50 border-green-200" },
              { label: "Archived", cls: "text-[#6b7280] bg-[#f5f6f8] border-[#e2e4e8]" },
            ].map(b => (
              <span key={b.label} className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border rounded-[3px] ${b.cls}`}>{b.label}</span>
            ))}
          </div>
        </DSSection>

        <DSSection title="Form Inputs">
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            <FieldInput label="Default Input" placeholder="Enter value..." />
            <FieldInput label="With Prefix" placeholder="0.00" prefix={<span className="text-sm text-[#4b5563] pl-1">$</span>} />
            <FieldInput label="Error State" placeholder="Invalid field" error="This field is required" />
            <FieldInput label="Disabled State" placeholder="Cannot edit this field" disabled />
          </div>
          <div className="mt-4 max-w-lg">
            <div className="flex items-center border border-[#e2e4e8] rounded-[4px] bg-[#f5f6f8] focus-within:border-[#0f4c5c] focus-within:bg-white transition-colors">
              <Search className="w-4 h-4 text-[#4b5563] ml-3 shrink-0" />
              <input placeholder="Search with icon prefix..." className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-[#9ca3af] min-h-[44px]" />
              <button className="mr-1.5 bg-[#0f4c5c] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px]">Search</button>
            </div>
          </div>
        </DSSection>

        <DSSection title="Product Cards">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mb-5">
            {PRODUCTS.slice(0, 3).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-xs font-bold text-[#4b5563] uppercase tracking-widest mb-3">List Variant</div>
          <div className="space-y-2 max-w-2xl">
            {PRODUCTS.slice(0, 2).map(p => (
              <div key={p.id} className="flex gap-4 p-3 border border-[#e2e4e8] rounded-[4px] bg-white hover:border-[#0f4c5c]/30 transition-all">
                <div className="w-16 h-16 bg-[#f5f6f8] rounded-[3px] overflow-hidden shrink-0"><img loading="lazy" src={p.image} alt={p.name} className="w-full h-full object-cover" /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] text-[#4b5563] uppercase">{p.sku}</div>
                  <div className="text-sm font-semibold text-[#1c2438]">{p.name}</div>
                  <div className="flex items-center gap-3 mt-1"><StockBadge status={p.stock} /><span className="text-sm font-bold text-[#1c2438]">${p.price.toFixed(2)}</span></div>
                </div>
                <div className="shrink-0 flex items-center"><Btn size="sm">Add to Cart</Btn></div>
              </div>
            ))}
          </div>
        </DSSection>

        <DSSection title="Alert / Toast Messages">
          <div className="space-y-2 max-w-md">
            {[
              { type: "success", icon: CheckCircle, msg: "Order ORD-10042 has been placed successfully.", bg: "bg-green-50 border-green-200", text: "text-green-800", ic: "text-green-600" },
              { type: "error", icon: XCircle, msg: "Unable to process payment. Please check card details.", bg: "bg-red-50 border-red-200", text: "text-red-800", ic: "text-red-600" },
              { type: "warning", icon: AlertTriangle, msg: "Only 7 units of MCR-FA-200 remaining in stock.", bg: "bg-amber-50 border-amber-200", text: "text-amber-800", ic: "text-amber-600" },
              { type: "info", icon: Info, msg: "Volume pricing available for orders of 10+ units.", bg: "bg-[#0f4c5c]/10 border-[#0f4c5c]/20", text: "text-[#0f4c5c]", ic: "text-[#0f4c5c]" },
            ].map(t => (
              <div key={t.type} className={`flex items-start gap-3 p-3 border rounded-[4px] ${t.bg}`}>
                <t.icon className={`w-4 h-4 mt-0.5 shrink-0 ${t.ic}`} />
                <div className="flex-1">
                  <div className={`text-xs font-semibold capitalize ${t.text}`}>{t.type}</div>
                  <div className={`text-xs mt-0.5 ${t.text} opacity-80`}>{t.msg}</div>
                </div>
                <button className={`shrink-0 ${t.ic} opacity-60 hover:opacity-100`}><X className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </DSSection>

        <DSSection title="Empty States">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Package, title: "No orders yet", desc: "Your order history will appear here once you make a purchase.", cta: "Browse Products" },
              { icon: Search, title: "No results found", desc: "Try adjusting your search terms or removing active filters.", cta: "Clear Filters" },
              { icon: AlertTriangle, title: "No stock alerts", desc: "All products are at healthy inventory levels.", cta: null },
            ].map(s => (
              <div key={s.title} className="border border-[#e2e4e8] rounded-[4px] p-8 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#f5f6f8] rounded-[4px] flex items-center justify-center mb-4"><s.icon className="w-6 h-6 text-[#4b5563]" /></div>
                <div className="text-sm font-semibold text-[#1c2438] mb-1">{s.title}</div>
                <div className="text-xs text-[#4b5563] leading-relaxed mb-4">{s.desc}</div>
                {s.cta && <Btn size="sm" variant="secondary">{s.cta}</Btn>}
              </div>
            ))}
          </div>
        </DSSection>

        <DSSection title="Breadcrumb + Stepper">
          <div className="mb-6">
            <div className="text-[10px] font-bold text-[#4b5563] uppercase tracking-widest mb-2">Breadcrumb</div>
            <div className="flex items-center gap-1.5 text-xs text-[#4b5563]">
              {["Home", "CPR & AED", "Training Manikins", "Prestan Adult Manikin"].map((seg, i, arr) => (
                <span key={seg} className="flex items-center gap-1.5">
                  <span className={`${i === arr.length - 1 ? "text-[#1c2438] font-medium" : "hover:text-[#0f4c5c] cursor-pointer"}`}>{seg}</span>
                  {i < arr.length - 1 && <ChevronRight className="w-3 h-3" />}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#4b5563] uppercase tracking-widest mb-3">Checkout Stepper</div>
            <div className="flex items-center gap-0 max-w-sm">
              {["Shipping", "Delivery", "Payment"].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${i < 2 ? "bg-[#0f4c5c] border-[#0f4c5c] text-white" : "bg-white border-[#0f4c5c] text-[#0f4c5c]"}`}>
                      {i < 2 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-sm font-medium ${i === 2 ? "text-[#0f4c5c]" : "text-[#4b5563]"}`}>{step}</span>
                  </div>
                  {i < 2 && <div className={`w-14 h-px mx-3 ${i < 1 ? "bg-[#0f4c5c]" : "bg-[#e2e4e8]"}`} />}
                </div>
              ))}
            </div>
          </div>
        </DSSection>

        <DSSection title="Typography Scale">
          <div className="space-y-3 max-w-xl">
            <div className="text-4xl font-bold text-[#0f4c5c]">Display H1 — 36px Bold</div>
            <div className="font-heading text-2xl md:text-[32px] font-extrabold tracking-tight text-[#0f4c5c] mb-1">Heading H2 — 24px Bold</div>
            <div className="text-xl font-semibold text-[#1c2438]">Heading H3 — 20px Semibold</div>
            <div className="text-base font-semibold text-[#1c2438]">Heading H4 — 16px Semibold</div>
            <div className="text-sm text-[#374151] leading-relaxed">Body Regular 14px — Product descriptions, table rows, form fields, and all standard content. Comfortable reading at normal distances.</div>
            <div className="text-xs text-[#6b7280]">Body Small 12px — Metadata, timestamps, helper text, secondary information.</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4b5563]">Label / Tag — 10px Uppercase Tracked</div>
            <div className="font-mono text-xs text-[#4b5563]">PRE-101-01 — Mono for SKUs, order IDs, tracking codes</div>
          </div>
        </DSSection>

        <DSSection title="Color Palette">
          <div className="flex flex-wrap gap-4">
            {[
              { name: "Primary Navy", hex: "#0B1F4A" },
              { name: "Navy Dark", hex: "#083a4a" },
              { name: "Accent Orange", hex: "#C84B0B" },
              { name: "Body Text", hex: "#1C2438" },
              { name: "Secondary Text", hex: "#374151" },
              { name: "Muted", hex: "#6B7280" },
              { name: "Placeholder", hex: "#9CA3AF" },
              { name: "Border", hex: "#E2E4E8" },
              { name: "Surface", hex: "#F5F6F8" },
              { name: "Background", hex: "#FFFFFF" },
              { name: "In Stock", hex: "#15803D" },
              { name: "Low Stock", hex: "#D97706" },
              { name: "Out of Stock", hex: "#B91C1C" },
              { name: "Info Blue", hex: "#1D4ED8" },
            ].map(c => (
              <div key={c.name} className="text-center">
                <div className="w-12 h-12 rounded-[3px] mb-1 border border-[#e2e4e8] shadow-sm" style={{ backgroundColor: c.hex }} />
                <div className="text-[10px] font-medium text-[#374151] w-14 leading-tight">{c.name}</div>
                <div className="font-mono text-[9px] text-[#4b5563]">{c.hex}</div>
              </div>
            ))}
          </div>
        </DSSection>

        <DSSection title="Data Table — Dense B2B Style">
          <div className="overflow-x-auto">
<table className="w-full text-xs border border-[#e2e4e8] rounded-[4px] overflow-hidden">
            <thead>
              <tr className="bg-[#f5f6f8] border-b border-[#e2e4e8]">
                <th className="px-3 py-2.5 w-8"><div className="w-3.5 h-3.5 border border-[#e2e4e8] rounded-[2px]" /></th>
                {["SKU", "Product Name", "Stock", "Price", "Status", "Actions"].map(col => (
                  <th key={col} className="text-left px-3 py-2.5 font-semibold text-[#374151] uppercase tracking-widest text-[10px] whitespace-nowrap">
                    <span className="flex items-center gap-1">{col} <ChevronDown className="w-3 h-3 text-[#d1d5db]" /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.slice(0, 5).map((p, i) => (
                <tr key={p.id} className={`border-b border-[#e2e4e8] last:border-0 hover:bg-[#fafbfc] ${i % 2 !== 0 ? "bg-[#fafbfc]" : ""}`}>
                  <td className="px-3 py-2.5"><div className="w-3.5 h-3.5 border border-[#e2e4e8] rounded-[2px]" /></td>
                  <td className="px-3 py-2.5 font-mono text-[#4b5563]">{p.sku}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1c2438]">{p.name}</td>
                  <td className="px-3 py-2.5"><StockBadge status={p.stock} /></td>
                  <td className="px-3 py-2.5 font-semibold text-[#1c2438]">${p.price.toFixed(2)}</td>
                  <td className="px-3 py-2.5"><span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border rounded-[3px] ${i % 3 === 2 ? "text-amber-700 bg-amber-50 border-amber-200" : "text-green-700 bg-green-50 border-green-200"}`}>{i % 3 === 2 ? "Draft" : "Published"}</span></td>
                  <td className="px-3 py-2.5"><div className="flex gap-2"><button className="text-[#0f4c5c] font-medium hover:underline flex items-center gap-1"><Edit className="w-3 h-3" />Edit</button><span className="text-[#e2e4e8]">|</span><button className="text-[#4b5563] hover:text-[#374151] flex items-center gap-1"><Archive className="w-3 h-3" />Archive</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </DSSection>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN APP — SCREEN NAVIGATOR
// ──────────────────────────────────────────────

const SCREENS: { id: Screen; label: string }[] = [
  { id: "home", label: "01 Homepage" },
  { id: "category", label: "02 Category" },
  { id: "product", label: "03 Product Detail" },
  { id: "cart", label: "04 Cart" },
  { id: "checkout", label: "05 Checkout" },
  { id: "tracking", label: "06 Order Tracking" },
  { id: "account", label: "07 Account" },
  { id: "admin-cms", label: "08 Admin CMS" },
  { id: "admin-ims", label: "09 Admin IMS" },
  { id: "notifications", label: "10 Notifications" },
  { id: "components", label: "11 Components" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const idx = SCREENS.findIndex(s => s.id === screen);

  const navigate = (s: Screen) => {
    setScreen(s);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Demo navigation bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#04102b] text-white flex items-center h-9 px-4 border-b border-white/10">
        <div className="text-[10px] font-bold text-white/35 uppercase tracking-[0.2em] mr-3 shrink-0 hidden sm:block">Desert Rain DS</div>
        <div className="flex-1 overflow-x-auto flex items-stretch" style={{ scrollbarWidth: "none" }}>
          {SCREENS.map(s => (
            <button key={s.id} className={`px-3 h-9 text-[10px] font-medium whitespace-nowrap border-b-2 transition-colors shrink-0 ${screen === s.id ? "border-white text-white" : "border-transparent text-white/40 hover:text-white/70"}`} onClick={() => navigate(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-3 shrink-0">
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-white/50 disabled:opacity-20 disabled:cursor-not-allowed" disabled={idx === 0} onClick={() => idx > 0 && navigate(SCREENS[idx - 1].id)}><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-[10px] text-white/35 w-10 text-center">{idx + 1}/{SCREENS.length}</span>
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-white/50 disabled:opacity-20 disabled:cursor-not-allowed" disabled={idx === SCREENS.length - 1} onClick={() => idx < SCREENS.length - 1 && navigate(SCREENS[idx + 1].id)}><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Screen content */}
      <div className="pt-9">
        {screen === "home" && <HomePage onNav={navigate} />}
        {screen === "category" && <CategoryPage onNav={navigate} />}
        {screen === "product" && <ProductDetailPage onNav={navigate} />}
        {screen === "cart" && <CartPage onNav={navigate} />}
        {screen === "checkout" && <CheckoutPage onNav={navigate} />}
        {screen === "tracking" && <OrderTrackingPage onNav={navigate} />}
        {screen === "account" && <AccountDashboard onNav={navigate} />}
        {screen === "admin-cms" && <AdminCMS onNav={navigate} />}
        {screen === "admin-ims" && <AdminIMS onNav={navigate} />}
        {screen === "notifications" && <NotificationsCenter onNav={navigate} />}
        {screen === "components" && <ComponentLibrary />}
      </div>
    </div>
  );
}
