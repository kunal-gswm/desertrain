import { useState } from "react";
import {
  Menu, Search, ShoppingCart, User, ChevronDown, ChevronRight,
  X, Phone, FileText,
} from "lucide-react";
import type { Screen } from "../../types";
import { CATEGORIES } from "../../data/mockData";
import { Btn } from "../shared/Btn";

/**
 * SiteHeader — Redesigned per client prompt.
 *
 * Structure (top to bottom — max 3 bars on desktop, 1 on mobile):
 * 1. Utility bar: plain white bar with 1px border, light text (hidden on mobile).
 * 2. Main header: logo + wide search + account/cart + "Request Quote" CTA.
 * 3. Unified Navigation Row: "All Categories ↓" mega-menu trigger + individual category links.
 */
export function SiteHeader({ onNav, showCategories = false }: { onNav: (s: Screen) => void; showCategories?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 bg-white">
      {/* ── Bar 1: Light Utility Bar (Desktop only) ── */}
      <div className="hidden md:flex bg-white border-b border-[#E5E7EB] text-[#64748B] text-[13px] py-1.5 px-6 items-center justify-between">
        <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#475569]">
              <Phone className="w-3.5 h-3.5 text-[#94A3B8]" />
              1-800-MCR-4321
            </span>
            <span className="text-[#E5E7EB]">|</span>
            <span>Mon–Fri 7 AM – 7 PM EST</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              className="text-[#475569] hover:text-[#1B2332] font-medium transition-colors"
              onClick={() => onNav("distributor-register")}
            >
              Login for distributor pricing
            </button>
            <span className="text-[#E5E7EB]">|</span>
            <select className="bg-transparent text-[#475569] font-medium text-[13px] outline-none cursor-pointer hover:text-[#1B2332]">
              <option value="USD">USD ($)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Bar 2: Main Header ── */}
      <header className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-16 flex items-center gap-4 justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -ml-2 text-[#475569] hover:text-[#1B2332]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div
            className="flex items-center gap-2.5 shrink-0 cursor-pointer"
            onClick={() => onNav("home")}
          >
            <img
              src="https://desertrainllc.com/images/desertrain-logo.png"
              alt="Desert Rain LLC"
              className="h-9 md:h-10 w-auto"
            />
          </div>

          {/* Search — desktop */}
          <div className="hidden md:block flex-1 max-w-xl mx-6">
            <div className="flex items-center border border-[#E5E7EB] rounded-[6px] bg-[#FAFBFC] focus-within:border-[#1B2332] focus-within:bg-white transition-colors shadow-2xs">
              <Search className="w-4 h-4 text-[#94A3B8] ml-3.5 shrink-0" />
              <input
                placeholder="Search products, SKUs, or brands..."
                className="flex-1 px-3 py-2.5 text-[14px] text-[#1B2332] bg-transparent outline-none placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Mobile search */}
            <button className="md:hidden p-2 text-[#475569] hover:text-[#1B2332]" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <button
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-[#475569] hover:text-[#1B2332] transition-colors rounded-[6px] hover:bg-[#F1F3F5]"
              onClick={() => onNav("account")}
            >
              <User className="w-5 h-5" />
              <span className="text-[13px] font-medium hidden lg:block">Account</span>
            </button>

            {/* Cart */}
            <button
              className="flex items-center gap-1.5 p-2 md:px-3 md:py-2 text-[#475569] hover:text-[#1B2332] transition-colors rounded-[6px] hover:bg-[#F1F3F5] relative"
              onClick={() => onNav("cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-[13px] font-medium hidden lg:block">Cart</span>
              <span className="absolute top-1 right-0 md:top-1 md:right-1 w-4 h-4 bg-[#1B2332] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Divider */}
            <div className="hidden md:block h-7 w-px bg-[#E5E7EB] mx-2" />

            {/* Request Quote CTA */}
            <div className="hidden md:block">
              <Btn size="sm" onClick={() => onNav("rfq")}>
                Request Quote
              </Btn>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center border border-[#E5E7EB] rounded-[6px] bg-[#F1F3F5] focus-within:bg-white focus-within:border-[#1B2332] transition-colors">
            <Search className="w-4 h-4 text-[#94A3B8] ml-3 shrink-0" />
            <input
              placeholder="Search products, SKUs..."
              className="flex-1 px-3 py-2 text-[14px] text-[#1B2332] bg-transparent outline-none placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        {/* ── Bar 3: Unified Primary Navigation Row — desktop ── */}
        {showCategories && (
          <div className="hidden md:block border-t border-[#E5E7EB] bg-white relative">
            <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
              {/* All Categories Mega-Menu Trigger */}
              <div className="relative group shrink-0 border-r border-[#E5E7EB] pr-6 mr-3">
                <button
                  className="flex items-center gap-1.5 py-3 text-[14px] font-semibold text-[#1B2332] hover:text-[#475569] transition-colors"
                  onClick={() => onNav("category")}
                >
                  All Categories <ChevronDown className="w-4 h-4 text-[#94A3B8] group-hover:rotate-180 transition-transform" />
                </button>
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-0 w-[600px] bg-white border border-[#E5E7EB] rounded-b-[8px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 p-6 grid grid-cols-2 gap-x-8 gap-y-2">
                  <div className="col-span-2 pb-2 mb-2 border-b border-[#E5E7EB] flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">Medical & Safety Catalog</span>
                    <span className="text-[12px] font-medium text-[#1B2332] hover:underline cursor-pointer flex items-center gap-1" onClick={() => onNav("category")}>View full catalog <ChevronRight className="w-3 h-3" /></span>
                  </div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      className="flex items-center justify-between text-left group/item py-2 px-3 -mx-3 rounded-[6px] hover:bg-[#F8FAFC] transition-colors"
                      onClick={() => onNav("category")}
                    >
                      <span className="text-[14px] font-medium text-[#475569] group-hover/item:text-[#1B2332] transition-colors">
                        {cat.label}
                      </span>
                      <span className="text-[12px] text-[#94A3B8] group-hover/item:text-[#475569]">{cat.count} items</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual Category Links */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className="px-3.5 py-3 text-[13.5px] font-medium text-[#475569] hover:text-[#1B2332] whitespace-nowrap border-b-2 border-transparent hover:border-[#1B2332] transition-colors"
                    onClick={() => onNav("category")}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile Menu Drawer (375px collapsed state) ── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[85%] max-w-sm bg-white h-full flex flex-col shadow-2xl animate-[slideInRight_0.2s_ease-out]">
            <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
              <img
                src="https://desertrainllc.com/images/desertrain-logo.png"
                alt="Logo"
                className="h-7 w-auto"
              />
              <button
                className="p-2 -mr-2 text-[#475569] hover:text-[#1B2332]"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {/* Category Navigation */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-medium text-[#1B2332] hover:bg-[#F1F3F5] transition-colors"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  <span>Shop Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#94A3B8] transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {categoriesOpen && (
                  <div className="bg-[#F8FAFC] py-1 border-y border-[#E5E7EB]/50">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        className="w-full flex items-center justify-between px-8 py-2.5 text-[14px] text-[#475569] hover:text-[#1B2332] hover:bg-[#F1F3F5] transition-colors"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onNav("category");
                        }}
                      >
                        <span>{cat.label}</span>
                        <span className="text-[12px] text-[#94A3B8]">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="border-t border-[#E5E7EB] mt-2 pt-2">
                <button
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-[15px] font-medium text-[#1B2332] hover:bg-[#F1F3F5] transition-colors"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNav("account");
                  }}
                >
                  <User className="w-4 h-4 text-[#64748B]" /> My Account
                </button>
                <button
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-[15px] font-medium text-[#1B2332] hover:bg-[#F1F3F5] transition-colors"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNav("rfq");
                  }}
                >
                  <FileText className="w-4 h-4 text-[#64748B]" /> Request Quote
                </button>
                <button
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-[14px] font-medium text-[#16A34A] hover:bg-[#F0FDF4] transition-colors"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNav("distributor-register");
                  }}
                >
                  Login for distributor pricing →
                </button>
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 border-t border-[#E5E7EB] bg-[#FAFBFC] text-[12px] text-[#94A3B8] space-y-1">
              <div className="flex items-center justify-between">
                <span>Support:</span>
                <span className="font-medium text-[#475569]">1-800-MCR-4321</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Hours:</span>
                <span>Mon–Fri 7am–7pm EST</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
