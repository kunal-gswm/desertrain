import { useState } from "react";
import { Lock, Check, ChevronLeft, ArrowRight, Truck, CreditCard, FileText, Building, AlertCircle, Plus } from "lucide-react";
import type { Screen } from "../../types";
import { Btn } from "../components/shared/Btn";
import { FieldInput } from "../components/shared/FieldInput";

export function CheckoutPage({ onNav }: { onNav: (s: Screen) => void }) {
  const [step, setStep] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState("");

  const steps = [{ n: 1, label: "Shipping" }, { n: 2, label: "Delivery" }, { n: 3, label: "Payment" }];

  const deliveryMethods = [
    { id: "std", label: "Aramex GCC Standard Ground", carrier: "Aramex Logistics Partner", days: "3–5 business days", eta: "Est. delivery: Jul 8, 2025", price: 24.95 },
    { id: "exp", label: "DHL Express Medical Air", carrier: "DHL Healthcare Priority", days: "1–2 business days", eta: "Est. delivery: Jul 3, 2025", price: 54.95 },
    { id: "ovn", label: "FedEx Healthcare Priority Next Day", carrier: "FedEx Medical Courier", days: "Next business day morning", eta: "Est. delivery: Jul 1, 2025", price: 94.95 },
    { id: "frgt", label: "Kuehne + Nagel Pallet Freight", carrier: "LTL Heavy / Bulk orders over 150 lbs", days: "5–10 business days", eta: "Est. delivery: Jul 10, 2025", price: 0 },
  ];

  const paymentMethods = [
    { id: "cc", label: "Credit / Debit Card (Visa, Mastercard, Amex)", icon: CreditCard },
    { id: "tabby", label: "Tabby — Split into 4 interest-free payments (GCC)", icon: Building },
    { id: "tamara", label: "Tamara — Split into 3 installments without fees (GCC)", icon: Building },
    { id: "po", label: "Purchase Order Number (Hospital & Institutional)", icon: FileText },
    { id: "net30", label: "Net 30 Terms (Approved B2B Distributor Accounts)", icon: Building },
  ];

  const subtotal = 654.83;
  const selectedShipping = deliveryMethods.find((d) => d.id === selectedDelivery);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const shippingLabel = selectedShipping ? (selectedShipping.price > 0 ? `$${selectedShipping.price.toFixed(2)}` : "Quoted") : "—";
  const tax = (subtotal + shippingCost) * 0.0875;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = () => {
    if (!selectedDelivery || !selectedPayment) {
      setCheckoutError("Please select both a delivery method and payment method.");
      return;
    }
    setCheckoutError("");
    onNav("tracking");
  };

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      {/* Checkout header */}
      <header className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNav("home")}>
            <img src="https://desertrainllc.com/images/desertrain-logo.png" alt="Desert Rain" className="h-8 w-auto" />
          </div>
          <div className="text-[13px] text-[#94A3B8] flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Secure Checkout</div>
        </div>
      </header>

      {/* Stepper */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[700px] mx-auto px-6 py-4 flex items-center justify-center gap-0">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[13px] font-semibold ${step > s.n ? "bg-[#1B2332] border-[#1B2332] text-white" : step === s.n ? "bg-white border-[#1B2332] text-[#1B2332]" : "bg-white border-[#E5E7EB] text-[#94A3B8]"}`}>
                  {step > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
                </div>
                <span className={`text-[14px] font-medium ${step === s.n ? "text-[#1B2332]" : "text-[#94A3B8]"}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-16 h-px mx-4 ${step > s.n ? "bg-[#1B2332]" : "bg-[#E5E7EB]"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Currency display */}
      <div className="max-w-[1100px] mx-auto px-6 pt-4 flex justify-end">
        <span className="text-[13px] text-[#94A3B8]">Prices shown in USD</span>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-6">
            {step === 1 && (
              <div>
                <h2 className="text-[17px] font-semibold text-[#1B2332] mb-5">Shipping Address</h2>
                <div className="mb-5">
                  <div className="text-[13px] font-medium text-[#475569] mb-3">Saved Addresses</div>
                  <div className="grid gap-2">
                    {[{ l: "HQ — Main Facility", a: "1200 Industrial Blvd, Suite 400, Chicago, IL 60601" }, { l: "Branch — Denver", a: "4500 Medical Center Dr, Denver, CO 80204" }].map((addr, i) => (
                      <label key={i} className={`flex items-start gap-3 p-3 border-2 rounded-[6px] cursor-pointer transition-colors ${i === 0 ? "border-[#1B2332] bg-[#F8F9FA]" : "border-[#E5E7EB] hover:border-[#94A3B8]"}`}>
                        <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${i === 0 ? "border-[#1B2332]" : "border-[#E5E7EB]"}`}>
                          {i === 0 && <div className="w-2 h-2 rounded-full bg-[#1B2332]" />}
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-[#1B2332]">{addr.l}</div>
                          <div className="text-[13px] text-[#94A3B8] mt-0.5">{addr.a}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <button className="text-[13px] text-[#1B2332] font-medium mt-2 flex items-center gap-1 hover:underline"><Plus className="w-3 h-3" /> Add New Address</button>
                </div>
                <div className="border-t border-[#E5E7EB] pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FieldInput label="First Name" placeholder="John" />
                  <FieldInput label="Last Name" placeholder="Smith" />
                  <FieldInput label="Company" placeholder="Acme Corp (optional)" className="sm:col-span-2" />
                  <FieldInput label="Address Line 1" placeholder="1200 Industrial Blvd" className="sm:col-span-2" />
                  <FieldInput label="City" placeholder="Chicago" />
                  <FieldInput label="State / Province" placeholder="IL" />
                  <FieldInput label="ZIP / Postal Code" placeholder="60601" inputMode="numeric" />
                  <FieldInput label="Country" placeholder="United States" />
                </div>
                <div className="flex justify-end mt-6">
                  <Btn size="lg" onClick={() => setStep(2)}>Continue to Delivery <ArrowRight className="w-4 h-4" /></Btn>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-[17px] font-semibold text-[#1B2332] mb-5">Delivery Method</h2>
                <div className="space-y-3">
                  {deliveryMethods.map((m) => (
                    <label key={m.id} className={`flex items-start gap-3 p-4 border-2 rounded-[6px] cursor-pointer transition-colors ${selectedDelivery === m.id ? "border-[#1B2332] bg-[#F8F9FA]" : "border-[#E5E7EB] hover:border-[#94A3B8]"}`} onClick={() => setSelectedDelivery(m.id)}>
                      <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${selectedDelivery === m.id ? "border-[#1B2332]" : "border-[#E5E7EB]"}`}>
                        {selectedDelivery === m.id && <div className="w-2 h-2 rounded-full bg-[#1B2332]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-[14px] font-medium text-[#1B2332]">{m.label}</div>
                          <div className="text-[14px] font-semibold text-[#1B2332]">{m.price > 0 ? `$${m.price.toFixed(2)}` : "Quoted"}</div>
                        </div>
                        <div className="text-[13px] text-[#94A3B8] mt-0.5">{m.carrier} · {m.days}</div>
                        <div className="text-[13px] text-[#16A34A] mt-1 flex items-center gap-1"><Truck className="w-3 h-3" />{m.eta}</div>
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
                <h2 className="text-[17px] font-semibold text-[#1B2332] mb-5">Payment</h2>
                <div className="space-y-3 mb-5">
                  {paymentMethods.map((m) => (
                    <div key={m.id} className={`border-2 rounded-[6px] overflow-hidden transition-colors ${selectedPayment === m.id ? "border-[#1B2332]" : "border-[#E5E7EB]"}`}>
                      <label className={`flex items-center gap-3 p-3 cursor-pointer ${selectedPayment === m.id ? "bg-[#F8F9FA]" : "bg-white"}`} onClick={() => { setSelectedPayment(m.id); setCheckoutError(""); }}>
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${selectedPayment === m.id ? "border-[#1B2332]" : "border-[#E5E7EB]"}`}>
                          {selectedPayment === m.id && <div className="w-2 h-2 rounded-full bg-[#1B2332]" />}
                        </div>
                        <m.icon className="w-4 h-4 text-[#475569]" />
                        <span className="text-[14px] font-medium text-[#1B2332]">{m.label}</span>
                      </label>
                      {selectedPayment === m.id && m.id === "cc" && (
                        <div className="px-4 pb-4 pt-2 border-t border-[#E5E7EB] bg-white grid gap-3">
                          <FieldInput label="Card Number" placeholder="1234 5678 9012 3456" inputMode="numeric" />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <FieldInput label="Expiry" placeholder="MM / YY" inputMode="numeric" />
                            <FieldInput label="CVV" placeholder="•••" inputMode="numeric" />
                          </div>
                          <FieldInput label="Name on Card" placeholder="John Smith" />
                        </div>
                      )}
                      {selectedPayment === m.id && (m.id === "tabby" || m.id === "tamara") && (
                        <div className="px-4 py-4 border-t border-[#E5E7EB] bg-[#F8FAFC] space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-bold text-[#1B2332]">4 Interest-Free Payments of ${(total / 4).toFixed(2)}</span>
                            <span className="text-[10px] font-bold bg-[#E0F2FE] text-[#0369A1] px-2 py-0.5 rounded uppercase">GCC BNPL Ready</span>
                          </div>
                          <p className="text-[12.5px] text-[#475569] leading-relaxed">
                            {m.id === "tabby" ? "Tabby" : "Tamara"} installment widget will initialize automatically upon clicking Place Order. No hidden fees or interest charges for healthcare institutions and retail orders.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {checkoutError && (
                  <div className="flex items-center gap-1.5 text-[13px] text-[#DC2626] mb-4">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {checkoutError}
                  </div>
                )}
                <div className="flex justify-between mt-6">
                  <Btn variant="secondary" size="lg" onClick={() => setStep(2)}><ChevronLeft className="w-4 h-4" /> Back</Btn>
                  <Btn size="lg" disabled={!selectedDelivery || !selectedPayment} onClick={handlePlaceOrder}>
                    Place Order — ${total.toFixed(2)}
                  </Btn>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 sticky top-8">
            <h3 className="text-[14px] font-semibold text-[#1B2332] mb-4">Order Summary</h3>
            <div className="space-y-2.5 mb-4">
              {[["Prestan Adult Manikin × 2", "$379.98"], ["3M N95 8210 × 5", "$124.95"], ["Nitrile Gloves L × 10", "$149.90"]].map(([n, p], i) => (
                <div key={i} className="flex justify-between gap-2 text-[13px]">
                  <span className="text-[#94A3B8] leading-snug">{n}</span>
                  <span className="font-medium text-[#1B2332] shrink-0">{p}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E5E7EB] pt-3 space-y-1.5 text-[13px]">
              <div className="flex justify-between text-[#94A3B8]"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[#94A3B8]"><span>Shipping</span><span>{shippingLabel}</span></div>
              <div className="flex justify-between text-[#94A3B8]"><span>Tax (8.75%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold text-[15px] text-[#1B2332] pt-2 border-t border-[#E5E7EB] mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
