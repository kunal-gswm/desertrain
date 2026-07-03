import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Screen, Product } from "../../types";
import { PRODUCTS, CATEGORIES } from "../data/mockData";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Btn } from "../components/shared/Btn";
import { ProductCard } from "../components/shared/ProductCard";
import { ProductPlaceholder } from "../components/shared/ProductPlaceholder";
import { CartToast, MiniCartDrawer } from "../components/shared/CartToast";

/**
 * HomePage — Redesigned per client brief.
 *
 * Removed: operational status bar, strikethrough pricing, "based on N orders",
 *          mid-page trust strips, discount callouts.
 *
 * Structure: hero → categories → best sellers → recently viewed → footer.
 */
export function HomePage({ onNav }: { onNav: (s: Screen) => void }) {
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);

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

  return (
    <div className="bg-[#FAFBFC]">
      <SiteHeader onNav={onNav} showCategories />
      <CartToast product={toastProduct} onClose={() => setToastProduct(null)} />
      <MiniCartDrawer
        open={miniCartOpen}
        onClose={() => setMiniCartOpen(false)}
        items={cartItems}
      />

      {/* ── Hero ── */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-[32px] md:text-[40px] font-semibold text-[#1B2332] leading-[1.15] tracking-tight mb-4">
                {/* TODO: Final copy from client brief — use actual differentiators */}
                Medical & Safety Equipment for Healthcare Professionals
              </h1>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-8 max-w-lg">
                In-stock and direct-ship medical supplies. Volume pricing for
                institutions, RFQ workflows for bulk and tender orders, dedicated
                distributor pricing on application.
              </p>
              <div className="flex flex-wrap gap-3">
                <Btn size="lg" onClick={() => onNav("category")}>
                  Shop Catalog <ArrowRight className="w-4 h-4" />
                </Btn>
                <Btn size="lg" variant="secondary" onClick={() => onNav("rfq")}>
                  Request a Quote
                </Btn>
              </div>
            </div>
            <div className="lg:col-span-5 hidden md:block">
              <div className="relative rounded-[8px] overflow-hidden border border-[#E5E7EB] shadow-sm aspect-[4/3] bg-[#F1F3F5]">
                <img loading="lazy" src="/images/hero-banner.png" alt="Medical Equipment Showroom" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-[20px] font-semibold text-[#1B2332]">
              Shop by Category
            </h2>
            <button
              onClick={() => onNav("category")}
              className="text-[14px] text-[#475569] hover:text-[#1B2332] transition-colors flex items-center gap-1"
            >
              All Categories <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNav("category")}
                className="text-left bg-[#F1F3F5] rounded-[6px] overflow-hidden hover:bg-[#E5E7EB] transition-colors group"
              >
                <div className="aspect-[4/3] bg-[#E5E7EB]/50 overflow-hidden">
                  {cat.image ? (
                    <img loading="lazy" src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                  ) : (
                    <ProductPlaceholder
                      category={cat.label}
                      className="w-full h-full"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="text-[15px] font-medium text-[#1B2332] group-hover:text-[#475569] transition-colors">
                    {cat.label}
                  </div>
                  <div className="text-[13px] text-[#94A3B8] mt-0.5">
                    {cat.count} products
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="bg-[#FAFBFC]">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-[20px] font-semibold text-[#1B2332]">
              Best Sellers
            </h2>
            <button
              onClick={() => onNav("category")}
              className="text-[14px] text-[#475569] hover:text-[#1B2332] transition-colors flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </section>

      {/* ── Recently Viewed ── */}
      <section className="bg-white border-t border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-[20px] font-semibold text-[#1B2332]">
              Recently Viewed
            </h2>
            <button className="text-[13px] text-[#94A3B8] hover:text-[#475569] transition-colors">
              Clear history
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS.slice(4, 8).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onNav={onNav}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
