import { useState } from "react";
import { Check, ArrowRight, ChevronLeft, Upload, FileText, Building, CheckCircle, Clock } from "lucide-react";
import type { Screen } from "../../types";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Btn } from "../components/shared/Btn";
import { FieldInput } from "../components/shared/FieldInput";

/**
 * DistributorRegistration — New flow per client requirement.
 *
 * Multi-step: company info → documentation (Trade License, VAT) → account setup → submission.
 * Post-submission: pending review → approved (unlocks gated pricing).
 */
export function DistributorRegistration({ onNav }: { onNav: (s: Screen) => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [approved, setApproved] = useState(false);

  const steps = [
    { n: 1, label: "Company Info" },
    { n: 2, label: "Documentation" },
    { n: 3, label: "Account Setup" },
    { n: 4, label: "Submit" },
  ];

  if (approved) {
    return (
      <div className="bg-[#FAFBFC] min-h-screen">
        <SiteHeader onNav={onNav} />
        <div className="max-w-[600px] mx-auto px-6 py-20 text-center">
          <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[#16A34A]" />
          </div>
          <h1 className="text-[28px] font-semibold text-[#1B2332] mb-3">Account Approved</h1>
          <p className="text-[15px] text-[#475569] leading-relaxed mb-8 max-w-md mx-auto">
            Your distributor account has been approved. You now have access to distributor pricing across our full catalog.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Btn size="lg" className="w-full" onClick={() => onNav("distributor-pricing")}>
              View Distributor Pricing <ArrowRight className="w-4 h-4" />
            </Btn>
            <Btn size="lg" variant="secondary" className="w-full" onClick={() => onNav("category")}>
              Browse Catalog
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-[#FAFBFC] min-h-screen">
        <SiteHeader onNav={onNav} />
        <div className="max-w-[600px] mx-auto px-6 py-20 text-center">
          <div className="w-16 h-16 bg-[#F1F3F5] rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-[#475569]" />
          </div>
          <h1 className="text-[28px] font-semibold text-[#1B2332] mb-3">Application Submitted</h1>
          <p className="text-[15px] text-[#475569] leading-relaxed mb-4 max-w-md mx-auto">
            Thank you for your application. Our team will review your documentation within 2–3 business days.
          </p>
          <p className="text-[14px] text-[#94A3B8] mb-8 max-w-md mx-auto">
            You'll receive an email notification when your account has been approved. Once approved, distributor pricing will be visible on all product pages.
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-[6px] p-5 text-left max-w-md mx-auto mb-6">
            <h3 className="text-[13px] text-[#94A3B8] mb-3">Application Summary</h3>
            <div className="space-y-2 text-[14px]">
              {[["Company", "Desert Rain Trading LLC"], ["Trade License", "TL-2025-DXB-00412.pdf"], ["VAT Registration", "VAT-AE-100567892.pdf"], ["Status", "Pending Review"]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[#94A3B8]">{k}</span>
                  <span className={`font-medium ${k === "Status" ? "text-[#D97706]" : "text-[#1B2332]"}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Btn variant="secondary" onClick={() => onNav("home")}>Continue Browsing</Btn>
            {/* Demo shortcut — wouldn't exist in production */}
            <Btn variant="ghost" onClick={() => setApproved(true)}>Demo: Simulate Approval</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      <SiteHeader onNav={onNav} />
      <div className="max-w-[700px] mx-auto px-6 py-8">
        <h1 className="text-[28px] font-semibold text-[#1B2332] mb-2">Distributor / Reseller Registration</h1>
        <p className="text-[14px] text-[#94A3B8] mb-8">Apply for a distributor account to access wholesale pricing.</p>

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
          {/* Step 1: Company Info */}
          {step === 1 && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1B2332] mb-5">Company Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldInput label="Company Name" placeholder="Desert Rain Trading LLC" className="sm:col-span-2" />
                <FieldInput label="Contact Person" placeholder="Mohammed Al-Farsi" />
                <FieldInput label="Job Title" placeholder="Procurement Manager" />
                <FieldInput label="Email" type="email" placeholder="m.alfarsi@desertrainllc.ae" />
                <FieldInput label="Phone" placeholder="+971 4 XXX XXXX" inputMode="tel" />
                <FieldInput label="Company Website" placeholder="www.desertrainllc.ae" className="sm:col-span-2" />
                <FieldInput label="Address" placeholder="Dubai Healthcare City, Building 7, Suite 401" className="sm:col-span-2" />
                <FieldInput label="City" placeholder="Dubai" />
                <FieldInput label="Country" placeholder="United Arab Emirates" />
              </div>
              <div className="flex justify-end mt-6">
                <Btn size="lg" onClick={() => setStep(2)}>Continue <ArrowRight className="w-4 h-4" /></Btn>
              </div>
            </div>
          )}

          {/* Step 2: Documentation */}
          {step === 2 && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1B2332] mb-2">Documentation</h2>
              <p className="text-[14px] text-[#94A3B8] mb-5">Upload your business documentation for verification.</p>

              <div className="space-y-4">
                {/* Trade License */}
                <div>
                  <label className="text-[13px] font-medium text-[#1B2332] block mb-1.5">Trade License *</label>
                  <div className="border-2 border-dashed border-[#E5E7EB] rounded-[6px] p-6 flex flex-col items-center justify-center hover:border-[#94A3B8] transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-[#94A3B8] mb-2" />
                    <div className="text-[14px] text-[#475569]">Click to upload Trade License</div>
                    <div className="text-[12px] text-[#94A3B8] mt-1">PDF, JPG, or PNG up to 10MB</div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[13px] text-[#16A34A]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    TL-2025-DXB-00412.pdf uploaded
                  </div>
                </div>

                {/* VAT Registration */}
                <div>
                  <label className="text-[13px] font-medium text-[#1B2332] block mb-1.5">VAT Registration Certificate (UAE) *</label>
                  <div className="border-2 border-dashed border-[#E5E7EB] rounded-[6px] p-6 flex flex-col items-center justify-center hover:border-[#94A3B8] transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-[#94A3B8] mb-2" />
                    <div className="text-[14px] text-[#475569]">Click to upload VAT Certificate</div>
                    <div className="text-[12px] text-[#94A3B8] mt-1">PDF, JPG, or PNG up to 10MB</div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[13px] text-[#16A34A]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    VAT-AE-100567892.pdf uploaded
                  </div>
                </div>

                {/* Business category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Business Category</label>
                  <select className="border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] bg-white outline-none focus:border-[#1B2332] min-h-[46px]">
                    <option>Medical Equipment Distributor</option>
                    <option>Safety Equipment Distributor</option>
                    <option>Hospital / Clinic</option>
                    <option>Government / Public Sector</option>
                    <option>Training Institution</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Btn variant="secondary" size="lg" onClick={() => setStep(1)}><ChevronLeft className="w-4 h-4" /> Back</Btn>
                <Btn size="lg" onClick={() => setStep(3)}>Continue <ArrowRight className="w-4 h-4" /></Btn>
              </div>
            </div>
          )}

          {/* Step 3: Account Setup */}
          {step === 3 && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1B2332] mb-5">Account Setup</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldInput label="Desired Username" placeholder="desertrainllc" className="sm:col-span-2" />
                <FieldInput label="Password" type="password" placeholder="••••••••" />
                <FieldInput label="Confirm Password" type="password" placeholder="••••••••" />
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Preferred Payment Terms</label>
                  <select className="border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] bg-white outline-none focus:border-[#1B2332] min-h-[46px]">
                    <option>Net 30</option>
                    <option>Net 60</option>
                    <option>Letter of Credit</option>
                    <option>Advance Payment</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1B2332]">Estimated Monthly Order Volume</label>
                  <select className="border border-[#E5E7EB] rounded-[6px] px-3 py-2.5 text-[15px] bg-white outline-none focus:border-[#1B2332] min-h-[46px]">
                    <option>Under $5,000</option>
                    <option>$5,000 – $25,000</option>
                    <option>$25,000 – $100,000</option>
                    <option>$100,000+</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Btn variant="secondary" size="lg" onClick={() => setStep(2)}><ChevronLeft className="w-4 h-4" /> Back</Btn>
                <Btn size="lg" onClick={() => setStep(4)}>Review <ArrowRight className="w-4 h-4" /></Btn>
              </div>
            </div>
          )}

          {/* Step 4: Submit */}
          {step === 4 && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1B2332] mb-5">Review & Submit</h2>
              <div className="space-y-4 text-[14px]">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Company", "Desert Rain Trading LLC"],
                    ["Contact", "Mohammed Al-Farsi"],
                    ["Email", "m.alfarsi@desertrainllc.ae"],
                    ["Phone", "+971 4 XXX XXXX"],
                    ["City / Country", "Dubai, UAE"],
                    ["Category", "Medical Equipment Distributor"],
                    ["Payment Terms", "Net 30"],
                    ["Est. Volume", "$25,000 – $100,000"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="text-[13px] text-[#94A3B8]">{k}</div>
                      <div className="text-[#1B2332] font-medium">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#E5E7EB] pt-3">
                  <div className="text-[13px] text-[#94A3B8] mb-2">Documents Uploaded</div>
                  <div className="space-y-1.5">
                    {["TL-2025-DXB-00412.pdf (Trade License)", "VAT-AE-100567892.pdf (VAT Registration)"].map((d) => (
                      <div key={d} className="flex items-center gap-2 text-[14px] text-[#475569]">
                        <FileText className="w-3.5 h-3.5 text-[#94A3B8]" /> {d}
                      </div>
                    ))}
                  </div>
                </div>
                <label className="flex items-start gap-2.5 mt-2 cursor-pointer">
                  <div className="w-4 h-4 border border-[#E5E7EB] rounded-[3px] mt-0.5 shrink-0" />
                  <span className="text-[14px] text-[#475569] leading-relaxed">
                    I confirm that the information provided is accurate and agree to the <a href="#" className="text-[#1B2332] underline">Terms & Conditions</a> and <a href="#" className="text-[#1B2332] underline">Privacy Policy</a>.
                  </span>
                </label>
              </div>
              <div className="flex justify-between mt-6">
                <Btn variant="secondary" size="lg" onClick={() => setStep(3)}><ChevronLeft className="w-4 h-4" /> Back</Btn>
                <Btn size="lg" onClick={() => setSubmitted(true)}>
                  <Building className="w-4 h-4" /> Submit Application
                </Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
