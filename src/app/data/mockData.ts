import type { Product, Category, Order, StockItem, Quote } from "../types";

// ──────────────────────────────────────────────
// PRODUCTS
// ──────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  { id: "1", sku: "PRE-101-01", itemCode: "MCR-PRE-ADULT-01", name: "Prestan Adult Manikin with CPR Rate Monitor", brand: "Prestan", category: "CPR Training", price: 189.99, stock: "in-stock", qty: 245, image: "/images/cpr-manikin.png", rating: 4.8, reviews: 127, datasheetPdf: "/docs/prestan-adult-spec-sheet.pdf", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", manualPdf: "/docs/prestan-user-manual.pdf", series: "Professional Series", skinTone: "Medium / Diverse", gender: "Adult Universal", productType: "CPR Training Manikin", size: "Adult Standard", packageSize: "Single Pack" },
  { id: "2", sku: "ZOL-AED-PLUS", itemCode: "MCR-ZOL-AED-PL", name: "Zoll AED Plus Automated External Defibrillator", brand: "Zoll", category: "AED", price: 1549.00, stock: "in-stock", qty: 18, image: "/images/aed-plus.png", rating: 4.9, reviews: 89, datasheetPdf: "/docs/zoll-aed-plus-spec.pdf", manualPdf: "/docs/zoll-aed-manual.pdf", series: "AED Plus", productType: "Defibrillator", packageSize: "Complete Unit + Pads" },
  { id: "3", sku: "MCR-FA-200", itemCode: "MCR-FA-200-PRO", name: "Professional First Aid Kit — 200 Piece", brand: "MCR Medical", category: "First Aid", price: 74.95, stock: "limited-stock", deliveryEstimate: "Only 7 remaining", qty: 7, image: "/images/first-aid-200.png", rating: 4.6, reviews: 214, datasheetPdf: "/docs/mcr-fa-200-contents.pdf", series: "Emergency Response", productType: "First Aid Kit", size: "Large 200-Piece", packageSize: "Hard Case" },
  { id: "4", sku: "3M-N95-8210", itemCode: "MCR-3M-8210-20", name: "3M N95 Particulate Respirator 8210 (20pk)", brand: "3M", category: "Respiratory", price: 24.99, stock: "in-stock", qty: 1200, image: "/images/n95-8210.png", rating: 4.7, reviews: 532, datasheetPdf: "/docs/3m-8210-tech-sheet.pdf", series: "3M Health & Safety", productType: "N95 Respirator", size: "Standard Universal", packageSize: "20 per Box" },
  { id: "5", sku: "MCR-NITRILE-L", itemCode: "MCR-GLOVES-L-100", name: "Nitrile Exam Gloves Powder-Free Large 100pk", brand: "MCR Medical", category: "Gloves", price: 14.99, stock: "in-stock", qty: 3400, image: "", rating: 4.5, reviews: 871, series: "Clinical Care", productType: "Exam Gloves", size: "Large (L)", packageSize: "100 per Box" },
  { id: "6", sku: "LSP-BVM-ADULT", itemCode: "MCR-LSP-BVM-AD", name: "LSP Bag Valve Mask — Adult Resuscitator", brand: "LSP", category: "Airway", price: 28.50, stock: "back-order", deliveryEstimate: "Est. ships Aug 12", leadTimeInline: "Production Lead Time: 10–14 Business Days", qty: 0, image: "/images/airway-bvm.png", rating: 4.4, reviews: 156, datasheetPdf: "/docs/lsp-bvm-specs.pdf", manualPdf: "/docs/lsp-bvm-instructions.pdf", series: "Resuscitation Pro", gender: "Adult", productType: "Bag Valve Mask", packageSize: "Single Disposable" },
  { id: "7", sku: "FRN-35-F", itemCode: "MCR-FRN-35F-STR", name: "Ferno Model 35 EMS Folding Stretcher", brand: "Ferno", category: "Transport", price: 449.00, stock: "in-stock", qty: 32, image: "", rating: 4.7, reviews: 67, datasheetPdf: "/docs/ferno-35-manual.pdf", series: "EMS Transport", productType: "Folding Stretcher", packageSize: "Single Stretcher" },
  { id: "8", sku: "PPE-GOWN-XL", itemCode: "MCR-PPE-ISO-XL", name: "Disposable Isolation Gown Level 2 — XL (50pk)", brand: "SafeGuard PPE", category: "PPE", price: 49.99, stock: "lead-time", deliveryEstimate: "Est. 4–6 weeks from manufacturer", leadTimeInline: "Production Lead Time: 4–6 Weeks (Custom Lot)", qty: 0, image: "", rating: 4.3, reviews: 193, series: "SafeGuard Level 2", size: "X-Large (XL)", packageSize: "50 per Case" },
];

// ──────────────────────────────────────────────
// CATEGORIES
// ──────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { id: "cpr", label: "CPR & AED", count: 124, image: "/images/aed-plus.png" },
  { id: "first-aid", label: "First Aid", count: 287, image: "/images/first-aid-200.png" },
  { id: "ppe", label: "PPE & Safety", count: 415, image: "/images/n95-8210.png" },
  { id: "airway", label: "Airway Management", count: 98, image: "/images/airway-bvm.png" },
  { id: "transport", label: "Patient Transport", count: 76 },
  { id: "diagnostics", label: "Diagnostics", count: 203 },
  { id: "training", label: "Training Supplies", count: 145, image: "/images/cpr-manikin.png" },
  { id: "industrial", label: "Industrial Safety", count: 338 },
];

// ──────────────────────────────────────────────
// ORDERS
// ──────────────────────────────────────────────

export const ORDERS: Order[] = [
  { id: "ORD-10042", date: "Jun 18, 2025", items: 4, total: 689.94, status: "shipped" },
  { id: "ORD-10038", date: "Jun 10, 2025", items: 2, total: 224.50, status: "delivered" },
  { id: "ORD-10031", date: "May 29, 2025", items: 6, total: 1324.00, status: "delivered" },
  { id: "ORD-10027", date: "May 15, 2025", items: 1, total: 189.99, status: "delivered" },
  { id: "ORD-10019", date: "Apr 28, 2025", items: 8, total: 2189.45, status: "delivered" },
];

// ──────────────────────────────────────────────
// STOCK (Admin IMS)
// ──────────────────────────────────────────────

export const STOCK_ITEMS: StockItem[] = [
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
// QUOTES
// ──────────────────────────────────────────────

export const QUOTES: Quote[] = [
  { id: "QT-0098", date: "Jun 20, 2025", expiry: "Jul 20, 2025", total: 4250.00, status: "active" },
  { id: "QT-0089", date: "May 15, 2025", expiry: "Jun 15, 2025", total: 1890.50, status: "expired" },
  { id: "QT-0081", date: "Apr 30, 2025", expiry: "May 30, 2025", total: 7540.00, status: "converted" },
];

// ──────────────────────────────────────────────
// VOLUME PRICING TIERS
// ──────────────────────────────────────────────

export const VOLUME_TIERS = [
  { range: "1 – 9 units", price: "$189.99", distributorPrice: "$169.99" },
  { range: "10 – 49 units", price: "$174.99", distributorPrice: "$154.99" },
  { range: "50 – 99 units", price: "$159.99", distributorPrice: "$139.99" },
  { range: "100+ units", price: "Call for quote", distributorPrice: "Call for quote" },
];
