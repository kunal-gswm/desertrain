import { Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import { Btn } from "../shared/Btn";
import type { Screen } from "../../types";

/**
 * SiteFooter — Charcoal background, clean layout.
 * Carries the long-tail Scope Correction IA: Legal (6 policies), Events, Resources, Careers, Sitemap, Locator.
 */
export function SiteFooter({ onNav }: { onNav?: (s: Screen) => void }) {
  const handleNav = (screen: Screen, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNav) onNav(screen);
  };

  return (
    <footer className="bg-[#1B2332] text-white mt-16">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[15px] font-medium">
              Stay informed on product updates, healthcare standards & industry events
            </div>
            <div className="text-[12px] text-white/50 mt-0.5">Subscribe to our B2B distributor newsletter</div>
          </div>
          <div className="flex gap-2">
            <input
              placeholder="Enter your corporate email"
              className="px-3 py-2 text-[14px] bg-white/10 border border-white/15 rounded-[6px] text-white placeholder:text-white/40 outline-none focus:border-white/40 w-64"
            />
            <Btn variant="secondary" size="sm" className="!bg-white !text-[#1B2332] !border-white">
              Subscribe
            </Btn>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-[1280px] mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand & Social */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img
              loading="lazy"
              src="https://desertrainllc.com/images/desertrain-logo.png"
              alt="Desert Rain Logo"
              className="h-8 w-auto bg-white p-1 rounded"
            />
          </div>
          <p className="text-[13px] text-white/50 leading-relaxed">
            Premium medical supply, EMS transport, and healthcare technology distributor. Serving GCC and global partners since 1998.
          </p>
          <div className="flex gap-2 mt-4">
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 bg-white/8 rounded-[6px] flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 1: Company & Scope Pages */}
        <div>
          <div className="text-[13px] font-semibold text-white/40 uppercase tracking-wide mb-4">
            Company & Structure
          </div>
          <ul className="space-y-2.5 text-[14px] text-white/60">
            <li><a href="#about" onClick={(e) => handleNav("about", e)} className="hover:text-white transition-colors">About Us (Vision & Mission)</a></li>
            <li><a href="#brands" onClick={(e) => handleNav("brands", e)} className="hover:text-white transition-colors">Our Brands</a></li>
            <li><a href="#source" onClick={(e) => handleNav("source-supply", e)} className="hover:text-white transition-colors">Source and Supply</a></li>
            <li><a href="#locator" onClick={(e) => handleNav("locator", e)} className="hover:text-white transition-colors">Distributor Locator</a></li>
            <li><a href="#careers" onClick={(e) => handleNav("career", e)} className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#sitemap" onClick={(e) => handleNav("sitemap", e)} className="hover:text-white transition-colors">Site Map</a></li>
          </ul>
        </div>

        {/* Column 2: Legal & Compliance (6 Required Policies) */}
        <div>
          <div className="text-[13px] font-semibold text-white/40 uppercase tracking-wide mb-4">
            Legal & Compliance
          </div>
          <ul className="space-y-2.5 text-[14px] text-white/60">
            <li><a href="#privacy" onClick={(e) => handleNav("legal", e)} className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#terms" onClick={(e) => handleNav("legal", e)} className="hover:text-white transition-colors">Terms & Conditions</a></li>
            <li><a href="#returns" onClick={(e) => handleNav("legal", e)} className="hover:text-white transition-colors">Return & Refund Policy</a></li>
            <li><a href="#warranty" onClick={(e) => handleNav("legal", e)} className="hover:text-white transition-colors">Warranty Policy</a></li>
            <li><a href="#cookie" onClick={(e) => handleNav("legal", e)} className="hover:text-white transition-colors">Cookie Policy</a></li>
            <li><a href="#disclaimer" onClick={(e) => handleNav("legal", e)} className="hover:text-white transition-colors">Disclaimer</a></li>
          </ul>
        </div>

        {/* Column 3: B2B Account Types & Resources */}
        <div>
          <div className="text-[13px] font-semibold text-white/40 uppercase tracking-wide mb-4">
            B2B & Partner Portal
          </div>
          <ul className="space-y-2.5 text-[14px] text-white/60">
            <li><a href="#distributor" onClick={(e) => handleNav("distributor-register", e)} className="hover:text-white transition-colors">Distributor Portal Login</a></li>
            <li><a href="#reseller" onClick={(e) => handleNav("distributor-register", e)} className="hover:text-white transition-colors">Reseller Partner Account</a></li>
            <li><a href="#enduser" onClick={(e) => handleNav("account", e)} className="hover:text-white transition-colors">End User Customer Login</a></li>
            <li><a href="#events" onClick={(e) => handleNav("events", e)} className="hover:text-white transition-colors">Events & Tradeshows</a></li>
            <li><a href="#resources" onClick={(e) => handleNav("resources", e)} className="hover:text-white transition-colors">Resource Center</a></li>
            <li><a href="#contact" onClick={(e) => handleNav("contact", e)} className="hover:text-white transition-colors">Contact Support</a></li>
          </ul>
        </div>

        {/* Column 4: Store & Catalog */}
        <div>
          <div className="text-[13px] font-semibold text-white/40 uppercase tracking-wide mb-4">
            MCR Medical Model
          </div>
          <ul className="space-y-2.5 text-[14px] text-white/60">
            <li><a href="#store" onClick={(e) => handleNav("store", e)} className="hover:text-white transition-colors">Store (Full Catalogue)</a></li>
            <li><a href="#search" onClick={(e) => handleNav("search", e)} className="hover:text-white transition-colors">Search & Filter Hub</a></li>
            <li><a href="#cpr" onClick={(e) => handleNav("category", e)} className="hover:text-white transition-colors">CPR & AED Training</a></li>
            <li><a href="#firstaid" onClick={(e) => handleNav("category", e)} className="hover:text-white transition-colors">First Aid Kits & Supplies</a></li>
            <li><a href="#airway" onClick={(e) => handleNav("category", e)} className="hover:text-white transition-colors">Airway & Resuscitation</a></li>
            <li><a href="#rfq" onClick={(e) => handleNav("rfq", e)} className="hover:text-white transition-colors">Bulk RFQ Quotes</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar — trust signals in ONE quiet line */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/35">
          <div>© 2025 Desert Rain LLC. All rights reserved. Official Scope Correction Architecture.</div>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Return Policy", "Cookie Policy", "Disclaimer"].map(
              (l) => (
                <a key={l} href="#legal" onClick={(e) => handleNav("legal", e)} className="hover:text-white/60 transition-colors">
                  {l}
                </a>
              )
            )}
          </div>
          {/* Trust signals — one quiet location, plain text, not repeated elsewhere */}
          <div className="flex items-center gap-3 text-white/30">
            <span>ISO 9001:2015</span>
            <span>·</span>
            <span>FDA Registered</span>
            <span>·</span>
            <span>SSL Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
