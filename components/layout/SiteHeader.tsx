"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";
import { MenuIcon, CloseIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AuthModal } from "@/components/account/AuthModal";
import { useCart } from "@/context/CartContext";
import {
  useLocalization,
  CURRENCIES,
  LANGUAGES,
  CurrencyCode,
  LanguageCode,
} from "@/context/LocalizationContext";

export interface SiteHeaderProps {
  overlay?: boolean;
  cartCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  onOpenCart?: () => void;
  onOpenAccount?: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  cartCount = 0,
  onOpenCart,
  onOpenAccount,
}) => {
  const pathname = usePathname();
  const { currency, setCurrency, language, setLanguage, t } = useLocalization();
  const { cartCount: liveCartCount, openCart } = useCart();
  const effectiveCartCount = cartCount || liveCartCount;

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = () => {
    if (onOpenCart) {
      onOpenCart();
    } else {
      openCart();
    }
  };

  const handleAccountClick = () => {
    if (onOpenAccount) {
      onOpenAccount();
    } else {
      setAuthModalOpen(true);
    }
  };

  const APP_URL = "https://lightinmotion-web.vercel.app/#downloads";

  const navItems = [
    { label: t("home"), href: "/", external: false },
    { label: t("store"), href: "/store", external: false },
    { label: t("app"), href: APP_URL, external: true },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 select-none",
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-3 sm:py-3.5"
            : "bg-white/40 backdrop-blur-sm border-b border-black/5 py-4 sm:py-4.5"
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between h-11">
            
            {/* Left: Brand Logo & Desktop Nav */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="group flex items-baseline gap-1 focus-visible:outline-none"
              >
                <span className="text-base sm:text-lg font-extrabold tracking-tight uppercase text-black transition-colors group-hover:text-neutral-700">
                  LIGHTINMOTION
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                {navItems.map((item) => {
                  if (item.external) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors py-1 text-neutral-600 hover:text-black"
                      >
                        <span>{item.label}</span>
                      </a>
                    );
                  }

                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors py-1 relative",
                        isActive ? "text-black font-bold" : "text-neutral-600 hover:text-black"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Action Utilities matching exact uploaded reference */}
            <div className="hidden md:flex items-center space-x-6 sm:space-x-7 text-sm font-medium text-black">
              
              {/* Country & Currency Selector Dropdown */}
              <div ref={currencyRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setCurrencyDropdownOpen(!currencyDropdownOpen);
                    setLanguageDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 hover:text-neutral-300 transition-colors cursor-pointer text-xs sm:text-sm font-sans tracking-wide py-1"
                >
                  <span>{currency.label}</span>
                  <svg
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      currencyDropdownOpen ? "rotate-180" : ""
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 border border-black/15 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] py-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-mono tracking-wider text-neutral-500 uppercase border-b border-black/10 mb-1">
                      Select Currency
                    </div>
                    {Object.values(CURRENCIES).map((curr) => {
                      const isSelected = currency.code === curr.code;
                      return (
                        <button
                          key={curr.code}
                          type="button"
                          onClick={() => {
                            setCurrency(curr.code as CurrencyCode);
                            setCurrencyDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-black/5 transition-colors cursor-pointer",
                            isSelected ? "text-black font-bold bg-black/5" : "text-neutral-700"
                          )}
                        >
                          <span>{curr.label}</span>
                          {isSelected && (
                            <span className="text-[#963b18] font-bold text-xs">✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Language Selector Dropdown */}
              <div ref={languageRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setLanguageDropdownOpen(!languageDropdownOpen);
                    setCurrencyDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 hover:text-neutral-600 transition-colors cursor-pointer text-xs sm:text-sm font-sans tracking-wide py-1 text-black"
                >
                  <span>{language.label}</span>
                  <svg
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      languageDropdownOpen ? "rotate-180" : ""
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {languageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 border border-black/15 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] py-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-mono tracking-wider text-neutral-500 uppercase border-b border-black/10 mb-1">
                      Select Language
                    </div>
                    {Object.values(LANGUAGES).map((lang) => {
                      const isSelected = language.code === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.code as LanguageCode);
                            setLanguageDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-black/5 transition-colors cursor-pointer",
                            isSelected ? "text-black font-bold bg-black/5" : "text-neutral-700"
                          )}
                        >
                          <span>{lang.label}</span>
                          {isSelected && (
                            <span className="text-[#963b18] font-bold text-xs">✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Search Icon */}
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1 text-black hover:text-neutral-600 transition-colors focus-visible:outline-none cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              {/* User Account Icon */}
              <button
                type="button"
                aria-label="Account"
                onClick={handleAccountClick}
                className="p-1 text-black hover:text-neutral-600 transition-colors focus-visible:outline-none cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {/* Shopping Bag Icon with Paper Aesthetic & Corner Accent */}
              <button
                type="button"
                aria-label="Shopping Bag"
                onClick={handleCartClick}
                className="relative bg-white/90 hover:bg-white p-2.5 rounded-xl border border-black/15 transition-colors focus-visible:outline-none group cursor-pointer shadow-xs text-black"
              >
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>

                {/* Corner Accent Indicator */}
                <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-black rounded-br-[4px] pointer-events-none" />

                {effectiveCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {effectiveCartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                type="button"
                aria-label="Shopping Bag"
                onClick={handleCartClick}
                className="relative bg-white/90 p-2 rounded-lg border border-black/15 text-black"
              >
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-black rounded-br-[3px]" />
                {effectiveCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {effectiveCartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label="Toggle Menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-black hover:text-neutral-700"
              >
                {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
              </button>
            </div>

          </div>
        </Container>
      </header>

      {/* Search Input Bar (Dropdown) */}
      {searchOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white/95 border-b border-black/10 py-4 px-6 backdrop-blur-md animate-in slide-in-from-top-2 shadow-lg">
          <div className="max-w-xl mx-auto flex items-center gap-3">
            <input
              type="text"
              autoFocus
              placeholder={t("searchPlaceholder")}
              className="w-full bg-[#F2F0EB] border border-black/15 rounded-xl px-4 py-2.5 text-black placeholder:text-neutral-500 outline-none text-sm focus:border-black/40"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-neutral-600 hover:text-black text-xs font-mono uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F7F7F7]/98 backdrop-blur-xl md:hidden animate-in fade-in duration-200 text-black">
          <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-black">
              LIGHTINMOTION
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-600 hover:text-black"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
            {navItems.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 px-4 rounded-xl border border-black/10 bg-black/[0.03] text-base font-semibold text-black tracking-wider hover:bg-black/[0.06] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronRightIcon size={16} className="text-neutral-500" />
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-4 rounded-xl border border-black/10 bg-black/[0.03] text-base font-semibold text-black tracking-wider hover:bg-black/[0.06]"
                >
                  <span>{item.label}</span>
                  <ChevronRightIcon size={16} className="text-neutral-500" />
                </Link>
              );
            })}

            <div className="pt-6 border-t border-black/10 space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-600 uppercase mb-1">
                  Region &amp; Currency
                </label>
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="w-full bg-white border border-black/15 rounded-lg px-3 py-2 text-black text-sm outline-none"
                >
                  {Object.values(CURRENCIES).map((curr) => (
                    <option key={curr.code} value={curr.code} className="bg-white text-black">
                      {curr.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-600 uppercase mb-1">
                  Language
                </label>
                <select
                  value={language.code}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  className="w-full bg-white border border-black/15 rounded-lg px-3 py-2 text-black text-sm outline-none"
                >
                  {Object.values(LANGUAGES).map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-white text-black">
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <CartDrawer />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default SiteHeader;
