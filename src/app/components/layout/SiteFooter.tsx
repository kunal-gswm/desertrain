import { Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import { Btn } from "../shared/Btn";

/**
 * SiteFooter — Charcoal background, clean layout.
 *
 * Trust signals: one quiet line at the very bottom only.
 * No "Join 12,000+ professionals" filler.
 * No repeated badges.
 */
export function SiteFooter() {
  return (
    <footer className="bg-[#1B2332] text-white mt-16">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[15px] font-medium">
              Stay informed on product updates & industry news
            </div>
          </div>
          <div className="flex gap-2">
            <input
              placeholder="Enter your email"
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
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img
              loading="lazy"
              src="/images/desertrain-logo.png"
              alt="Desert Rain Logo"
              className="h-8 w-auto bg-white p-1 rounded"
            />
          </div>
          <p className="text-[13px] text-white/50 leading-relaxed">
            Medical, EMS, and industrial safety equipment distributor. Serving
            healthcare and industry since 1998.
          </p>
          <div className="flex gap-2 mt-4">
            {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-7 h-7 bg-white/8 rounded-[6px] flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {[
          {
            title: "Products",
            links: [
              "CPR & AED",
              "First Aid",
              "PPE & Safety",
              "Airway Management",
              "Patient Transport",
              "Diagnostics",
            ],
          },
          {
            title: "Company",
            links: ["About Us", "Careers", "Press", "Partners", "Blog", "Contact"],
          },
          {
            title: "Account",
            links: [
              "My Account",
              "Order History",
              "Track Order",
              "Request Quote",
              "Reorder Lists",
              "Net 30 Terms",
            ],
          },
          {
            title: "Support",
            links: [
              "Help Center",
              "Shipping Policy",
              "Returns & Exchanges",
              "Product Recalls",
              "Compliance Docs",
              "MSDS Sheets",
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-[13px] font-semibold text-white/40 uppercase tracking-wide mb-4">
              {col.title}
            </div>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[14px] text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar — trust signals in ONE quiet line */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/35">
          <div>© 2025 Desert Rain LLC. All rights reserved.</div>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map(
              (l) => (
                <a key={l} href="#" className="hover:text-white/60 transition-colors">
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
