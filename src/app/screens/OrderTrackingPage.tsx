import { useState } from "react";
import { Search, Check, AlertTriangle, ExternalLink, MessageSquare, MapPin, Truck } from "lucide-react";
import type { Screen } from "../../types";
import { PRODUCTS } from "../data/mockData";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Btn } from "../components/shared/Btn";
import { FieldInput } from "../components/shared/FieldInput";

export function OrderTrackingPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [tracked, setTracked] = useState(false);
  const [npsScore, setNpsScore] = useState<number | null>(null);

  const steps = [
    { label: "Order Placed", date: "Jun 18, 2025 9:14 AM", done: true },
    { label: "Processing", date: "Jun 18, 2025 11:30 AM", done: true },
    { label: "Packed", date: "Jun 18, 2025 3:45 PM", done: true },
    { label: "Shipped", date: "Jun 19, 2025 7:22 AM", done: true },
    { label: "Delivered", date: "Expected: Jun 26, 2025", done: false },
  ];

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      <SiteHeader onNav={onNav} />
      <div className="max-w-[900px] mx-auto px-6 py-10">
        {!tracked ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center mb-6">
              <h1 className="text-[28px] md:text-[32px] font-semibold text-[#1B2332] mb-2">Track Your Order</h1>
              <p className="text-[15px] text-[#64748B]">Enter your order number and email address to view real-time delivery status.</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-8 w-full max-w-md shadow-sm">
              <div className="space-y-4 text-left">
                <FieldInput label="Order Number" placeholder="e.g. ORD-10042" />
                <FieldInput label="Email Address" type="email" placeholder="you@company.com" />
                <Btn size="lg" className="w-full mt-2" onClick={() => setTracked(true)}>
                  <Search className="w-4 h-4" /> Track Order
                </Btn>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <div>
                <h1 className="text-[24px] font-semibold text-[#1B2332]">Order #ORD-10042</h1>
                <p className="text-[13px] text-[#94A3B8]">Placed on Jun 18, 2025</p>
              </div>
              <Btn size="sm" variant="secondary" onClick={() => setTracked(false)}>
                ← Track Another Order
              </Btn>
            </div>
            {/* Delay banner */}
            <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-[6px] p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <div className="text-[14px] font-medium text-[#92400E]">Minor Carrier Delay</div>
                <div className="text-[13px] text-[#A16207] mt-0.5">Estimated delivery updated to Jun 26, 2025.</div>
              </div>
            </div>

            {/* Order details */}
            <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6">
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
                {[
                  ["Order Number", "ORD-10042"],
                  ["Order Date", "Jun 18, 2025"],
                  ["Carrier", "DHL Ground"],
                  ["Tracking #", "1Z2345ABCD6789000"],
                  ["Est. Delivery", "Jun 26, 2025"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[12px] text-[#94A3B8] uppercase tracking-wide">{k}</div>
                    <div className={`text-[14px] font-medium mt-0.5 ${k === "Est. Delivery" ? "text-[#D97706]" : "text-[#1B2332]"} ${k === "Tracking #" ? "flex items-center gap-1" : ""}`}>
                      {v}
                      {k === "Tracking #" && <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8]" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stepper */}
              <div className="flex items-start justify-between relative">
                <div className="absolute top-3.5 left-[10%] right-[10%] h-0.5 bg-[#E5E7EB]">
                  <div className="h-full bg-[#1B2332]" style={{ width: "80%" }} />
                </div>
                {steps.map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 z-10" style={{ width: "20%" }}>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${s.done ? "bg-[#1B2332] border-[#1B2332]" : "bg-white border-[#E5E7EB]"}`}>
                      {s.done ? <Check className="w-3.5 h-3.5 text-white" /> : <div className="w-2 h-2 rounded-full bg-[#E5E7EB]" />}
                    </div>
                    <div className="text-center">
                      <div className={`text-[13px] font-medium ${s.done ? "text-[#1B2332]" : "text-[#94A3B8]"}`}>{s.label}</div>
                      <div className="text-[11px] text-[#94A3B8] mt-0.5 leading-tight">{s.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking details (replaces map placeholder) */}
            <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5">
              <h3 className="text-[14px] font-semibold text-[#1B2332] mb-3">Tracking Details</h3>
              <div className="space-y-3">
                {[
                  { date: "Jun 19, 7:22 AM", loc: "Chicago, IL", event: "Picked up by carrier" },
                  { date: "Jun 19, 2:15 PM", loc: "Indianapolis, IN", event: "In transit" },
                  { date: "Jun 20, 6:00 AM", loc: "Columbus, OH", event: "In transit — arrived at facility" },
                ].map((e, i) => (
                  <div key={i} className="flex gap-4 text-[14px]">
                    <div className="text-[13px] text-[#94A3B8] w-32 shrink-0">{e.date}</div>
                    <div className="flex-1">
                      <div className="text-[#1B2332]">{e.event}</div>
                      <div className="text-[13px] text-[#94A3B8] flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{e.loc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="text-[13px] text-[#1B2332] font-medium flex items-center gap-1 hover:underline mt-3">
                View full tracking on DHL <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Items */}
            <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5">
              <h3 className="text-[14px] font-semibold text-[#1B2332] mb-4">Items in This Order</h3>
              <div className="space-y-3">
                {[{ ...PRODUCTS[0], ordQty: 2 }, { ...PRODUCTS[3], ordQty: 5 }, { ...PRODUCTS[4], ordQty: 10 }].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 pb-3 border-b border-[#E5E7EB] last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-[#F1F3F5] rounded-[6px] overflow-hidden shrink-0 flex items-center justify-center text-[#CBD5E1]">
                      <svg width="20" height="20" viewBox="0 0 48 48" fill="none"><rect x="8" y="12" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-[#94A3B8]">{item.brand}</div>
                      <div className="text-[14px] font-medium text-[#1B2332] truncate">{item.name}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[13px] text-[#94A3B8]">Qty: {item.ordQty}</div>
                      <div className="text-[14px] font-medium text-[#1B2332]">${(item.price * item.ordQty).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-[#E5E7EB] flex justify-between items-center mt-3">
                <a href="#" className="text-[13px] text-[#1B2332] font-medium flex items-center gap-1 hover:underline"><MessageSquare className="w-3.5 h-3.5" /> Contact Support</a>
                <Btn size="sm" variant="secondary" onClick={() => onNav("cart")}>Reorder</Btn>
              </div>
            </div>

            {/* NPS / Feedback — inline card, non-intrusive */}
            <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5">
              <h3 className="text-[14px] font-semibold text-[#1B2332] mb-1">How was your experience?</h3>
              <p className="text-[13px] text-[#94A3B8] mb-4">How likely are you to recommend Desert Rain to a colleague?</p>
              <div className="flex gap-1.5 mb-4">
                {Array.from({ length: 11 }).map((_, i) => (
                  <button
                    key={i}
                    className={`w-9 h-9 rounded-[6px] border text-[13px] font-medium transition-colors ${
                      npsScore === i
                        ? "bg-[#1B2332] border-[#1B2332] text-white"
                        : "border-[#E5E7EB] text-[#475569] hover:border-[#94A3B8]"
                    }`}
                    onClick={() => setNpsScore(i)}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[11px] text-[#94A3B8] mb-4 px-0.5">
                <span>Not likely</span>
                <span>Very likely</span>
              </div>
              <textarea
                rows={2}
                placeholder="Any additional feedback? (optional)"
                className="w-full border border-[#E5E7EB] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#1B2332] resize-none placeholder:text-[#94A3B8]"
              />
              <div className="flex justify-end mt-3">
                <Btn size="sm" variant="secondary">Submit Feedback</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
