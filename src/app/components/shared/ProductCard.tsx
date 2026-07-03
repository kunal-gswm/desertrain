import { Star, Heart } from "lucide-react";
import type { Product, Screen } from "../../types";
import { Btn } from "./Btn";
import { StockStatusDisplay } from "./StockStatus";
import { ProductPlaceholder } from "./ProductPlaceholder";

/**
 * ProductCard — Redesigned per client brief.
 *
 * - Uniform 4:3 image area with placeholder when no real photo
 * - Brand as muted small text
 * - Product name as dominant element (15px, weight 500)
 * - Star rating inline, 12px stars
 * - Price bold, no "per unit" suffix
 * - Stock status as dot + plain text (four states)
 * - Add to Cart as full-width outline button
 * - SKU removed from card face (detail-page concern)
 * - No "Buy 10+ save X%" on card
 */
export function ProductCard({
  product,
  onNav,
  onAddToCart,
}: {
  product: Product;
  onNav?: (s: Screen) => void;
  onAddToCart?: (product: Product) => void;
}) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[6px] hover:border-[#CBD5E1] transition-colors group flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[5px] bg-[#F1F3F5]">
        {product.image ? (
          <img
            loading="lazy"
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <ProductPlaceholder
            category={product.category}
            className="w-full h-full"
          />
        )}
        {/* Wishlist — simple, no border circle */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-[6px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-[#94A3B8]" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        {/* Brand */}
        <span className="text-[13px] text-[#94A3B8]">{product.brand}</span>

        {/* Product name — dominant */}
        <h3
          className="text-[15px] font-medium text-[#1B2332] leading-snug line-clamp-2 cursor-pointer hover:text-[#475569] transition-colors"
          onClick={() => onNav?.("product")}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating)
                  ? "fill-[#F59E0B] text-[#F59E0B]"
                  : "text-[#E5E7EB] fill-[#E5E7EB]"
              }`}
            />
          ))}
          <span className="text-[12px] text-[#94A3B8] ml-0.5">
            ({product.reviews})
          </span>
        </div>

        {/* Price + Stock — pushed to bottom */}
        <div className="mt-auto pt-2">
          <div className="text-[17px] font-semibold text-[#1B2332]">
            ${product.price.toFixed(2)}
          </div>
          <div className="mt-1">
            <StockStatusDisplay
              status={product.stock}
              deliveryEstimate={product.deliveryEstimate}
            />
          </div>
        </div>

        {/* CTA — full width outline */}
        <Btn
          size="sm"
          variant="secondary"
          className="w-full mt-2"
          disabled={product.stock === "back-order" || product.stock === "lead-time"}
          onClick={() => onAddToCart?.(product)}
        >
          {product.stock === "back-order" || product.stock === "lead-time"
            ? "Notify When Available"
            : "Add to Cart"}
        </Btn>
      </div>
    </div>
  );
}
