import { useState } from "react";
import { Search, Plus, Trash2, ArrowRight, ChevronLeft, Check, FileText, Package } from "lucide-react";
import type { Screen } from "../../types";
import { PRODUCTS } from "../data/mockData";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Btn } from "../components/shared/Btn";
import { FieldInput } from "../components/shared/FieldInput";

/**
 * RFQ Flow — Request for Quote.
 *
 * Multi-step: product selection → company details → requirements → confirmation.
 * Professional, no decorative elements.
 */
export function RFQFlow({ onNav }: { onNav: (s: Screen) => void }) {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([
    { product: PRODUCTS[0], qty: 50 },
    { product: PRODUCTS[3], qty: 200 },
  ]);

  const steps = [
    { n: 1, label: "Products" },
    { n: 2, label: "Company Details" },
    { n: 3, label: "Requirements" },
    { n: 4, label: "Confirm" },
  ];

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      <SiteHeader onNav={onNav} />
      <div className="max-w-[800px] mx-auto px-6 py-8">
        <h1 className="text-[28px] font-semibold text-[#1B2332] mb-2">Request a Quote</h1>
        <p className="text-[14px] text-[#94A3B8] mb-8">Get volume pricing for bulk or tender orders.</p>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[13px] font-semibold ${
                  step > s.n ? "bg-[#1B2332] border-[#1B2332] text-white" : step === s.n ? "bg-white border-[#1B2332] text-[#1B2332]" : "bg-white border-[#E5E7EB] text-[#94A3B8]"
                }`}>
                  {step > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
                </div>
                <span className={`text-[14px] font-medium hidden sm:block ${step === s.n ? "text-[#1B2332]" : "text-[#94A3B8]"}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-px mx-3 ${step > s.n ? "bg-[#1B2332]" : "bg-[#E5E7EB]"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6">
          {/* Step 1: Products */}
          {step === 1 && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1B2332] mb-4">Select Products</h2>
              <div className="flex items-center border border-[#E5E7EB] rounded-[6px] bg-[#F1F3F5] mb-4">
                <Search className="w-4 h-4 text-[#94A3B8] ml-3 shrink-0" />
                <input placeholder="Search by name, SKU, or brand..." className="flex-1 px-3 py-2.5 text-[15px] bg-transparent outline-none placeholder:text-[#94A3B8]" />
                <Btn size="sm" variant="secondary" className="mr-1.5"><Plus className="w-3 h-3" /> Add</Btn>
              </div>
              <div className="space-y-3 mb-4">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 border border-[#E5E7EB] rounded-[6px]">
                    <div className="w-12 h-12 bg-[#F1F3F5] rounded-[6px] flex items-center justify-center text-[#CBD5E1]">
                      <Package className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-[#94A3B8]">{item.product.sku}</div>
                      <div className="text-[14px] font-medium text-[#1B2332]">{item.product.name}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-[#94A3B8]">Qty</label>
                        <input className="w-20 border border-[#E5E7EB] rounded-[6px] px-2 py-1.5 text-[14px] text-center outline-none focus:border-[#1B2332]" defaultValue={item.qty} />
                      </div>
                      <button className="text-[#94A3B8] hover:text-[#DC2626]"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Btn size="lg" onClick={() => setStep(2)}>Continue <ArrowRight className="w-4 h-4" /></Btn>
              </div>
            </div>
          )}

          {/* Step 2: Company Details */}
          {step === 2 && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1B2332] mb-4">Company Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <FieldInput label="Company Name" placeholder="Acme Medical Group" />
                <FieldInput label="Contact Person" placeholder="John Smith" />
                <FieldInput label="Email" type="email" placeholder="john@acmemedical.com" />
                <FieldInput label="Phone" placeholder="+1 (555) 000-0000" inputMode="tel" />
                <FieldInput label="Industry" placeholder="Healthcare" />
                <FieldInput label="Company Size" placeholder="50-200 employees" />
              </div>
              <div className="flex justify-between mt-6">
                <Btn variant="secondary" size="lg" onClick={() => setStep(1)}><ChevronLeft className="w-4 h-4" /> Back</Btn>
                <Btn size="lg" onClick={() => setStep(3)}>Continue <ArrowRight className="w-4 h-4" /></Btn>
              </div>
            </div>
          )}

          {/* Step 3: Requirements */}
          {step === 3 && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1B2332] mb-4">Requirements</h2>
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#1B2332]">Delivery Timeline</label>
                    <select className="border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] bg-white outline-none focus:border-[#1B2332] min-h-[46px]">
                      <option>Within 1 week</option>
                      <option>Within 2 weeks</option>
                      <option>Within 1 month</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-[#1B2332]">Payment Terms</label>
                    <select className="border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] bg-white outline-none focus:border-[#1B2332] min-h-[46px]">
                      <option>Net 30</option>
                      <option>Net 60</option>
                      <option>Letter of Credit (LC)</option>
                      <option>Credit Card on Delivery</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Certifications Required</label>
                  <div className="flex flex-wrap gap-2">
                    {["FDA Cleared", "CE Marked", "AHA Compliant", "ISO 9001", "OSHA Compliant"].map((c) => (
                      <label key={c} className="flex items-center gap-2 border border-[#E5E7EB] rounded-[6px] px-3 py-2 cursor-pointer hover:border-[#94A3B8]">
                        <div className="w-3.5 h-3.5 border border-[#E5E7EB] rounded-[3px]" />
                        <span className="text-[14px] text-[#475569]">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Additional Notes</label>
                  <textarea rows={3} className="w-full border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] outline-none focus:border-[#1B2332] resize-none placeholder:text-[#94A3B8]" placeholder="Any special requirements, delivery instructions, or questions..." />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Btn variant="secondary" size="lg" onClick={() => setStep(2)}><ChevronLeft className="w-4 h-4" /> Back</Btn>
                <Btn size="lg" onClick={() => setStep(4)}>Review <ArrowRight className="w-4 h-4" /></Btn>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1B2332] mb-4">Review & Submit</h2>
              <div className="space-y-5">
                <div>
                  <div className="text-[13px] text-[#94A3B8] mb-2">Products ({items.length})</div>
                  <div className="border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                    <table className="w-full text-[14px]">
                      <thead>
                        <tr className="bg-[#F1F3F5] border-b border-[#E5E7EB]">
                          <th className="text-left px-4 py-2.5 font-medium text-[#475569]">Product</th>
                          <th className="text-left px-4 py-2.5 font-medium text-[#475569]">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, i) => (
                          <tr key={i} className="border-b border-[#E5E7EB] last:border-0">
                            <td className="px-4 py-2.5 text-[#1B2332]">{item.product.name}</td>
                            <td className="px-4 py-2.5 text-[#475569]">{item.qty} units</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[14px]">
                  {[["Company", "Acme Medical Group"], ["Contact", "John Smith"], ["Email", "john@acmemedical.com"], ["Payment Terms", "Net 30"], ["Delivery Timeline", "Within 2 weeks"], ["Industry", "Healthcare"]].map(([k, v]) => (
                    <div key={k}>
                      <div className="text-[13px] text-[#94A3B8]">{k}</div>
                      <div className="text-[#1B2332] font-medium">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <Btn variant="secondary" size="lg" onClick={() => setStep(3)}><ChevronLeft className="w-4 h-4" /> Back</Btn>
                <Btn size="lg" onClick={() => onNav("account")}><FileText className="w-4 h-4" /> Submit Quote Request</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
