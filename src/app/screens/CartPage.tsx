import { useState } from "react";
import { ChevronLeft, Minus, Plus, Trash2, ArrowRight, Lock, Shield } from "lucide-react";
import type { Screen } from "../../types";
import { PRODUCTS } from "../data/mockData";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Btn } from "../components/shared/Btn";

export function CartPage({ onNav }: { onNav: (s: Screen) => void }) {
  const items = [
    { ...PRODUCTS[0], cartQty: 2 },
    { ...PRODUCTS[3], cartQty: 5 },
    { ...PRODUCTS[4], cartQty: 10 },
  ];
  const sub = items.reduce((s, i) => s + i.price * i.cartQty, 0);
  const ship = 24.95;
  const tax = sub * 0.0875;

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      <SiteHeader onNav={onNav} />
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => onNav("category")} className="text-[13px] text-[#94A3B8] hover:text-[#1B2332] flex items-center gap-1 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Continue Shopping
          </button>
          <span className="text-[#E5E7EB]">|</span>
          <h1 className="text-[24px] font-semibold text-[#1B2332]">Shopping Cart</h1>
          <span className="text-[14px] text-[#94A3B8]">({items.length} items)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-[6px] p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-[#F1F3F5] rounded-[6px] overflow-hidden shrink-0 flex items-center justify-center text-[#CBD5E1]">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none"><rect x="8" y="12" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" /><circle cx="18" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[13px] text-[#94A3B8]">{item.brand}</div>
                        <h3 className="text-[15px] font-medium text-[#1B2332] hover:text-[#475569] cursor-pointer transition-colors" onClick={() => onNav("product")}>{item.name}</h3>
                      </div>
                      <button className="text-[#94A3B8] hover:text-[#DC2626] transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                        <button className="w-[44px] h-[44px] flex items-center justify-center hover:bg-[#F1F3F5]"><Minus className="w-4 h-4 text-[#475569]" /></button>
                        <span className="px-3 py-1.5 text-[15px] font-semibold text-[#1B2332] min-w-[40px] text-center">{item.cartQty}</span>
                        <button className="w-[44px] h-[44px] flex items-center justify-center hover:bg-[#F1F3F5]"><Plus className="w-4 h-4 text-[#475569]" /></button>
                      </div>
                      <div className="text-right">
                        <div className="text-[13px] text-[#94A3B8]">${item.price.toFixed(2)} each</div>
                        <div className="text-[17px] font-semibold text-[#1B2332]">${(item.price * item.cartQty).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* RFQ prompt — subtle text link, not a colored banner */}
            <div className="flex items-center justify-between py-3 px-4 bg-white border border-[#E5E7EB] rounded-[6px]">
              <span className="text-[14px] text-[#475569]">Need bulk pricing or Net 30 terms?</span>
              <button className="text-[14px] font-medium text-[#1B2332] hover:underline" onClick={() => onNav("rfq")}>
                Request a quote →
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 sticky top-32">
              <h2 className="text-[14px] font-semibold text-[#1B2332] mb-4">Order Summary</h2>
              <div className="flex gap-2 mb-4">
                <input placeholder="Promo code" className="flex-1 px-3 py-2 text-[14px] border border-[#E5E7EB] rounded-[6px] outline-none focus:border-[#1B2332]" />
                <Btn size="sm" variant="secondary">Apply</Btn>
              </div>
              <div className="space-y-2 mb-4 pb-4 border-b border-[#E5E7EB]">
                <div className="flex justify-between text-[14px]"><span className="text-[#94A3B8]">Subtotal ({items.length} items)</span><span className="font-medium text-[#1B2332]">${sub.toFixed(2)}</span></div>
                <div className="flex justify-between text-[14px]"><span className="text-[#94A3B8]">Shipping</span><span className="font-medium text-[#1B2332]">${ship.toFixed(2)}</span></div>
                <div className="flex justify-between text-[14px]"><span className="text-[#94A3B8]">Tax (8.75%)</span><span className="font-medium text-[#1B2332]">${tax.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between mb-5">
                <span className="font-semibold text-[#1B2332]">Total</span>
                <span className="text-[20px] font-semibold text-[#1B2332]">${(sub + ship + tax).toFixed(2)}</span>
              </div>
              <Btn size="lg" className="w-full" onClick={() => onNav("checkout")}>
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Btn>
              <div className="mt-3 flex items-center justify-center gap-3 text-[12px] text-[#94A3B8]">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Secure</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Buyer Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
