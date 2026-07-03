import { useState } from "react";
import { Star, Eye } from "lucide-react";
import type { Screen } from "../../types";
import { PRODUCTS, VOLUME_TIERS } from "../data/mockData";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Btn } from "../components/shared/Btn";
import { ProductCard } from "../components/shared/ProductCard";
import { StockStatusDisplay } from "../components/shared/StockStatus";
import { ProductPlaceholder } from "../components/shared/ProductPlaceholder";

/**
 * DistributorPricingView — B2B pricing gate demonstration.
 *
 * Shows both states:
 * 1. Public view: retail pricing + "Login for distributor pricing" text link
 * 2. Distributor view: "Your Price" column highlighted in volume table
 */
export function DistributorPricingView({ onNav }: { onNav: (s: Screen) => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      <SiteHeader onNav={onNav} showCategories />

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Toggle for demo purposes */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-white border border-[#E5E7EB] rounded-[6px]">
          <span className="text-[14px] font-medium text-[#1B2332]">Pricing View:</span>
          <div className="flex border border-[#E5E7EB] rounded-[6px] overflow-hidden">
            <button
              className={`px-4 py-2 text-[14px] font-medium transition-colors ${!isLoggedIn ? "bg-[#1B2332] text-white" : "bg-white text-[#475569] hover:bg-[#F1F3F5]"}`}
              onClick={() => setIsLoggedIn(false)}
            >
              Public (Retail)
            </button>
            <button
              className={`px-4 py-2 text-[14px] font-medium transition-colors ${isLoggedIn ? "bg-[#1B2332] text-white" : "bg-white text-[#475569] hover:bg-[#F1F3F5]"}`}
              onClick={() => setIsLoggedIn(true)}
            >
              Distributor (Logged In)
            </button>
          </div>
          <span className="text-[13px] text-[#94A3B8]">
            {isLoggedIn ? "Showing distributor pricing with your discount" : "Showing retail pricing — login to see distributor rates"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Detail Preview */}
          <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6">
            <h2 className="text-[17px] font-semibold text-[#1B2332] mb-5">Product Detail — Pricing Section</h2>
            <div className="flex gap-4 mb-5">
              <div className="w-24 h-24 bg-[#F1F3F5] rounded-[6px] overflow-hidden shrink-0">
                {PRODUCTS[0].image ? (
                  <img src={PRODUCTS[0].image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ProductPlaceholder className="w-full h-full" />
                )}
              </div>
              <div>
                <div className="text-[13px] text-[#94A3B8]">{PRODUCTS[0].brand}</div>
                <h3 className="text-[17px] font-semibold text-[#1B2332] mb-2">{PRODUCTS[0].name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-[#E5E7EB] text-[#E5E7EB]"}`} />
                  ))}
                  <span className="text-[13px] text-[#94A3B8] ml-1">(127 reviews)</span>
                </div>
              </div>
            </div>

            {/* Price display */}
            <div className="mb-5 pb-5 border-b border-[#E5E7EB]">
              {isLoggedIn ? (
                <div>
                  <div className="text-[13px] text-[#94A3B8] line-through">${PRODUCTS[0].price.toFixed(2)} retail</div>
                  <div className="text-[28px] font-semibold text-[#16A34A]">
                    $169.99 <span className="text-[14px] font-normal text-[#94A3B8]">Your Price</span>
                  </div>
                  <div className="text-[13px] text-[#94A3B8] mt-1">Your distributor discount: 10.5%</div>
                </div>
              ) : (
                <div>
                  <div className="text-[28px] font-semibold text-[#1B2332]">${PRODUCTS[0].price.toFixed(2)}</div>
                  <button
                    className="text-[14px] text-[#1B2332] font-medium hover:underline mt-1 transition-colors"
                    onClick={() => onNav("distributor-register")}
                  >
                    Login for distributor pricing →
                  </button>
                </div>
              )}
            </div>

            {/* Volume pricing table */}
            <h4 className="text-[13px] font-medium text-[#1B2332] mb-2">Volume Pricing</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-[#E5E7EB] rounded-[6px] overflow-hidden text-[14px]">
                <thead>
                  <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                    <th className="text-left px-4 py-2.5 font-medium text-[#475569]">Quantity</th>
                    <th className="text-left px-4 py-2.5 font-medium text-[#475569]">Retail Price</th>
                    {isLoggedIn && (
                      <th className="text-left px-4 py-2.5 font-medium text-[#16A34A] bg-[#F0FDF4]">Your Price</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {VOLUME_TIERS.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"}>
                      <td className="px-4 py-2.5 text-[#475569]">{row.range}</td>
                      <td className="px-4 py-2.5 text-[#1B2332]">{row.price}</td>
                      {isLoggedIn && (
                        <td className="px-4 py-2.5 font-medium text-[#16A34A] bg-[#F0FDF4]/50">{row.distributorPrice}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Product Card Preview */}
          <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6">
            <h2 className="text-[17px] font-semibold text-[#1B2332] mb-5">Product Card — Pricing Display</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRODUCTS.slice(0, 4).map((p) => (
                <div key={p.id} className="bg-white border border-[#E5E7EB] rounded-[6px] hover:border-[#CBD5E1] transition-colors">
                  <div className="aspect-[4/3] bg-[#F1F3F5] rounded-t-[5px] overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ProductPlaceholder category={p.category} className="w-full h-full" />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-[13px] text-[#94A3B8]">{p.brand}</div>
                    <h3 className="text-[14px] font-medium text-[#1B2332] mt-0.5 line-clamp-2">{p.name}</h3>
                    <div className="mt-2">
                      {isLoggedIn ? (
                        <div>
                          <div className="text-[12px] text-[#94A3B8] line-through">${p.price.toFixed(2)}</div>
                          <div className="text-[17px] font-semibold text-[#16A34A]">
                            ${(p.price * 0.895).toFixed(2)}
                            <span className="text-[11px] font-normal text-[#94A3B8] ml-1">Your Price</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-[17px] font-semibold text-[#1B2332]">${p.price.toFixed(2)}</div>
                          <button
                            className="text-[13px] text-[#475569] hover:text-[#1B2332] transition-colors mt-0.5"
                            onClick={() => onNav("distributor-register")}
                          >
                            Login for distributor pricing
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <StockStatusDisplay status={p.stock} />
                    </div>
                    <Btn size="sm" variant="secondary" className="w-full mt-3">Add to Cart</Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
