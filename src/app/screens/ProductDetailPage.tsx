import { useState } from "react";
import {
  ChevronRight, Star, Minus, Plus, ShoppingCart, FileText, Truck,
  CheckCircle, Download, AlertCircle,
} from "lucide-react";
import type { Screen, Product } from "../../types";
import { PRODUCTS, VOLUME_TIERS } from "../data/mockData";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Btn } from "../components/shared/Btn";
import { StockStatusDisplay } from "../components/shared/StockStatus";
import { ProductCard } from "../components/shared/ProductCard";
import { CartToast } from "../components/shared/CartToast";
import { ProductPlaceholder } from "../components/shared/ProductPlaceholder";

export function ProductDetailPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [tab, setTab] = useState("description");
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [variantError, setVariantError] = useState(false);
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const product = PRODUCTS[0];

  const variantSizes = ["Standard", "Medium", "Large", "Infant"];

  const isVariantSelected = selectedSize !== null;

  const handleAddToCart = () => {
    if (!isVariantSelected) { setVariantError(true); return; }
    setVariantError(false);
    setToastProduct(product);
  };

  // Placeholder image slots
  const images = [null, null, null, null];

  return (
    <div className="bg-[#FAFBFC] min-h-screen pb-20">
      <SiteHeader onNav={onNav} showCategories />
      <CartToast product={toastProduct} onClose={() => setToastProduct(null)} />

      <div className="max-w-[1280px] mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#94A3B8] mb-6">
          <span className="cursor-pointer hover:text-[#1B2332]" onClick={() => onNav("home")}>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="cursor-pointer hover:text-[#1B2332]" onClick={() => onNav("category")}>CPR & AED</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1B2332]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Gallery ── */}
          <div>
            <div className="bg-white rounded-[6px] border border-[#E5E7EB] overflow-hidden aspect-square mb-3">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ProductPlaceholder category={product.category} className="w-full h-full" />
              )}
            </div>
            <div className="flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`w-16 h-16 bg-[#F1F3F5] rounded-[6px] overflow-hidden border-2 transition-colors ${imgIdx === i ? "border-[#1B2332]" : "border-[#E5E7EB] hover:border-[#94A3B8]"}`}
                  onClick={() => setImgIdx(i)}
                >
                  {i === 0 && product.image ? (
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ProductPlaceholder className="w-full h-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Product Info ── */}
          <div>
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-2 text-[13px] text-[#94A3B8]">
              <span>SKU: <strong className="text-[#475569]">{product.sku}</strong></span>
              {product.itemCode && (
                <>
                  <span className="text-[#E5E7EB]">·</span>
                  <span>Distributor Code: <strong className="text-[#0284C7] font-mono">{product.itemCode}</strong></span>
                </>
              )}
              <span className="text-[#E5E7EB]">·</span>
              <span>{product.brand}</span>
            </div>

            {/* Title */}
            <h1 className="text-[28px] md:text-[32px] font-semibold text-[#1B2332] leading-[1.15] tracking-tight mb-4">
              {product.name}
            </h1>

            {/* Rating + Stock */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-[#E5E7EB] text-[#E5E7EB]"}`} />
                ))}
                <span className="text-[14px] text-[#94A3B8] ml-1">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <span className="text-[#E5E7EB]">|</span>
              <StockStatusDisplay status={product.stock} deliveryEstimate={product.deliveryEstimate} size="md" />
            </div>

            {/* Price — clean, no gray box */}
            <div className="mb-6">
              <div className="text-[28px] font-semibold text-[#1B2332]">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-[13px] text-[#94A3B8] mt-1">
                Price adjusts with quantity
              </div>
            </div>

            {/* Volume Pricing Table — no "Save X%!" callouts */}
            <div className="mb-6">
              <h4 className="text-[13px] font-medium text-[#1B2332] mb-2">Volume Pricing</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-[#E5E7EB] rounded-[6px] overflow-hidden text-[14px]">
                  <thead>
                    <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                      <th className="text-left px-4 py-2.5 font-medium text-[#475569]">Quantity</th>
                      <th className="text-left px-4 py-2.5 font-medium text-[#475569]">Unit Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VOLUME_TIERS.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"}>
                        <td className="px-4 py-2.5 text-[#475569]">{row.range}</td>
                        <td className="px-4 py-2.5 font-medium text-[#1B2332]">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Variant Selectors */}
            <div className="mb-6 space-y-4">
              <div>
                <div className="text-[13px] font-medium text-[#1B2332] mb-2">
                  Size {selectedSize && <span className="text-[#94A3B8] font-normal">— {selectedSize}</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {variantSizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2.5 text-[14px] border rounded-[6px] transition-colors min-h-[44px] ${
                        selectedSize === size
                          ? "border-[#1B2332] bg-[#1B2332] text-white"
                          : "border-[#E5E7EB] text-[#475569] hover:border-[#94A3B8]"
                      }`}
                      onClick={() => { setSelectedSize(size); setVariantError(false); }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {variantError && (
                <div className="flex items-center gap-1.5 text-[13px] text-[#DC2626]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Please select a size before adding to cart.
                </div>
              )}
            </div>

            {/* 30-day returns — plain text */}
            <div className="text-[14px] text-[#475569] mb-6">
              <span className="font-medium text-[#1B2332]">30-day returns</span> — satisfaction guaranteed
            </div>

            {/* Qty + CTA */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                <button className="w-[46px] h-[46px] flex items-center justify-center hover:bg-[#F1F3F5] text-[#475569]" onClick={() => setQty(Math.max(1, qty - 1))}>
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2.5 text-[15px] font-semibold text-[#1B2332] min-w-[46px] text-center">{qty}</span>
                <button className="w-[46px] h-[46px] flex items-center justify-center hover:bg-[#F1F3F5] text-[#475569]" onClick={() => setQty(qty + 1)}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Btn size="lg" className="flex-1" disabled={!isVariantSelected} onClick={handleAddToCart}>
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </Btn>
              <Btn size="lg" variant="secondary" onClick={() => onNav("rfq")}>
                <FileText className="w-4 h-4" /> Quote
              </Btn>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
              {[["Category", "CPR Training"], ["Standard", "AHA 2020"], ["Weight", "3.2 lbs"], ["Warranty", "2 Years"]].map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <span className="text-[#94A3B8]">{k}:</span>
                  <span className="text-[#475569]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-12 border-t border-[#E5E7EB]">
          <div className="flex gap-0 border-b border-[#E5E7EB]">
            {["description", "specifications", "documents", "reviews", "related"].map((t) => (
              <button
                key={t}
                className={`px-5 py-3 text-[14px] font-medium capitalize border-b-2 -mb-px transition-colors ${tab === t ? "border-[#1B2332] text-[#1B2332]" : "border-transparent text-[#94A3B8] hover:text-[#475569]"}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="py-8">
            {tab === "description" && (
              <div className="max-w-3xl space-y-4 text-[15px] text-[#475569] leading-relaxed">
                <p>The Prestan Adult Manikin with CPR Rate Monitor is specifically designed for CPR training with immediate visual feedback. The built-in CPR rate monitor provides a visual cue to the student and instructor when the correct compression rate has been reached.</p>
                <p>Designed to meet all American Heart Association (AHA) 2020 guidelines. Lightweight design and easy assembly makes these manikins perfect for mass-training scenarios.</p>
                <ul className="space-y-2">
                  {["CPR Rate Monitor — confirms 100–120 compressions/min visually", "Realistic jaw thrust and head-tilt chin lift feel", "Lightweight at 3.2 lbs for easy transport and storage", "Replaceable lung bags — no separate face shields needed", "Compatible with all Prestan carry bags and accessories"].map((f) => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />{f}</li>
                  ))}
                </ul>
              </div>
            )}
            {tab === "specifications" && (
              <div className="max-w-2xl overflow-x-auto">
                <table className="w-full border border-[#E5E7EB] rounded-[6px] overflow-hidden text-[14px]">
                  <tbody>
                    {[["SKU", "PRE-101-01"], ["Brand", "Prestan Products"], ["Model", "PP-AM-100M"], ["Weight", "3.2 lbs (1.45 kg)"], ["Dimensions", '19" × 7" × 4" assembled'], ["CPR Standard", "AHA 2020 Guidelines"], ["Compression Depth", "2.0–2.4 inches"], ["Rate Feedback", "100–120 compressions/min"], ["Lung Bags Included", "5-pack"], ["Warranty", "2 Years Limited"], ["Country of Origin", "United States"], ["UNSPSC Code", "42272202"]].map(([k, v], i) => (
                      <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"}>
                        <td className="px-4 py-3 font-medium text-[#475569] border-b border-[#E5E7EB] w-48">{k}</td>
                        <td className="px-4 py-3 text-[#94A3B8] border-b border-[#E5E7EB]">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {tab === "documents" && (
              <div className="space-y-4 max-w-xl">
                <div className="p-4 bg-[#E0F2FE]/40 border border-[#BAE6FD] rounded-[8px] mb-4">
                  <div className="text-[13px] font-bold text-[#0369A1] uppercase tracking-wider mb-1">Official Clinical Attachments</div>
                  <p className="text-[13px] text-[#475569]">Includes physical dimensions, shipping weights, and AHA compliance certificates for corporate procurement.</p>
                </div>

                <div className="flex items-center justify-between p-3.5 border border-[#E5E7EB] rounded-[8px] bg-white hover:border-[#0284C7] transition-all shadow-2xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-[#FEF2F2] rounded-[6px] flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-[#DC2626]" /></div>
                    <div>
                      <div className="text-[14px] font-bold text-[#1B2332]">Product Datasheet PDF</div>
                      <div className="text-[12px] text-[#64748B] mt-0.5">Weight: 3.2 lbs · Dimensions: 19"×7"×4" · 1.2 MB</div>
                    </div>
                  </div>
                  <Btn size="sm" variant="secondary" onClick={() => alert("Downloading Official Datasheet PDF...")}><Download className="w-3.5 h-3.5 mr-1" /> Download</Btn>
                </div>

                <div className="flex items-center justify-between p-3.5 border border-[#E5E7EB] rounded-[8px] bg-white hover:border-[#0284C7] transition-all shadow-2xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-[#EFF6FF] rounded-[6px] flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-[#2563EB]" /></div>
                    <div>
                      <div className="text-[14px] font-bold text-[#1B2332]">User Manual & Clinical Setup Guide</div>
                      <div className="text-[12px] text-[#64748B] mt-0.5">Comprehensive assembly & maintenance instructions · PDF 4.1 MB</div>
                    </div>
                  </div>
                  <Btn size="sm" variant="secondary" onClick={() => alert("Downloading User Manual PDF...")}><Download className="w-3.5 h-3.5 mr-1" /> Download</Btn>
                </div>

                <div className="flex items-center justify-between p-3.5 border border-[#E5E7EB] rounded-[8px] bg-white hover:border-[#0284C7] transition-all shadow-2xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-[#F0FDF4] rounded-[6px] flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-[#16A34A]" /></div>
                    <div>
                      <div className="text-[14px] font-bold text-[#1B2332]">Video Demonstration & Maintenance Guide</div>
                      <div className="text-[12px] text-[#64748B] mt-0.5">HD Video Stream · AHA 2020 Rate Monitor Calibration</div>
                    </div>
                  </div>
                  <Btn size="sm" onClick={() => alert("Opening Video Guide Stream...")}>Watch Video</Btn>
                </div>
              </div>
            )}
            {tab === "reviews" && (
              <div className="max-w-2xl space-y-6">
                {/* Photo upload indication */}
                <div className="flex items-center gap-2 text-[13px] text-[#94A3B8] mb-4">
                  Reviews are moderated before publishing. Photo uploads accepted.
                </div>
                {[
                  { user: "Jennifer K. — Training Manager, Rush University Medical", rating: 5, date: "Jun 12, 2025", body: "We purchased 20 units for our hospital training center. The CPR rate monitor is excellent — gives students immediate feedback without constant instructor intervention. Build quality is outstanding." },
                  { user: "Michael R. — EMS Director, Chicago Fire Dept.", rating: 5, date: "May 28, 2025", body: "Best manikin we've used for department-wide CPR recertification. Realistic feel, easy to clean. Replacement lung bags are affordable. Highly recommend for any EMS agency." },
                  { user: "Sarah T. — Corporate Safety Coordinator", rating: 4, date: "May 10, 2025", body: "Solid quality and ships fast. The CPR feedback light is very helpful. Knocked one star because the carry bag is sold separately — would prefer it bundled at this price point." },
                ].map((r, i) => (
                  <div key={i} className="border-b border-[#E5E7EB] pb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`w-3.5 h-3.5 ${j < r.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-[#E5E7EB] text-[#E5E7EB]"}`} />
                        ))}
                      </div>
                      <span className="text-[13px] text-[#94A3B8]">{r.date}</span>
                    </div>
                    <p className="text-[15px] text-[#475569] leading-relaxed mb-1.5">{r.body}</p>
                    <span className="text-[13px] text-[#94A3B8]">— {r.user}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "related" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRODUCTS.slice(1, 5).map((p) => (
                  <ProductCard key={p.id} product={p} onNav={onNav} onAddToCart={() => setToastProduct(p)} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Required Scope: Suggested Accessories & Consumables Cross-Sell Section ── */}
        <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[12px] font-bold text-[#0284C7] uppercase tracking-wider">Frequently Bought Together</span>
              <h3 className="text-[22px] font-bold text-[#1B2332] mt-0.5">Suggested Accessories & Clinical Consumables</h3>
            </div>
            <span className="text-[13px] text-[#64748B] hidden sm:inline">Add compatible replacement bags, shields, and carrying cases</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {PRODUCTS.slice(3, 7).map((p) => (
              <ProductCard key={p.id} product={p} onNav={onNav} onAddToCart={() => setToastProduct(p)} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Add-to-Cart — retained, restyled quiet ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-30">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F1F3F5] rounded-[6px] overflow-hidden shrink-0 flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <ProductPlaceholder className="w-full h-full" />
              )}
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#1B2332] line-clamp-1">{product.name}</div>
              <StockStatusDisplay status={product.stock} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[20px] font-semibold text-[#1B2332]">${product.price.toFixed(2)}</span>
            <Btn variant="secondary" disabled={!isVariantSelected} onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
