"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";
import { MenuIcon, CloseIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AuthModal } from "@/components/account/AuthModal";

export interface SiteHeaderProps {
  overlay?: boolean;
  cartCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  onOpenCart?: () => void;
  onOpenAccount?: () => void;
}

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "STORE", href: "/store" },
  { label: "APP", href: "/app" },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  cartCount = 0,
  onOpenCart,
  onOpenAccount,
}) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
      setCartDrawerOpen(true);
    }
  };

  const handleAccountClick = () => {
    if (onOpenAccount) {
      onOpenAccount();
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 select-none",
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3 sm:py-3.5"
            : "bg-black/60 backdrop-blur-sm border-b border-white/5 py-4 sm:py-4.5"
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between h-11">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="group flex items-baseline gap-1 focus-visible:outline-none"
              >
                <span className="text-base sm:text-lg font-black tracking-[0.22em] uppercase text-white transition-colors group-hover:text-neutral-200">
                  LIGHTINMOTION
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "text-xs font-mono font-bold tracking-[0.18em] uppercase transition-colors py-1 relative",
                        isActive ? "text-white" : "text-neutral-400 hover:text-white"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#963b18] rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Action Utilities matching exact uploaded reference */}
            <div className="hidden md:flex items-center space-x-6 sm:space-x-7 text-sm font-medium text-white">
              {/* Country & Currency */}
              <button
                type="button"
                className="hover:text-neutral-300 transition-colors cursor-pointer text-xs sm:text-sm font-sans tracking-wide"
              >
                India (USD $)
              </button>

              {/* Language */}
              <button
                type="button"
                className="hover:text-neutral-300 transition-colors cursor-pointer text-xs sm:text-sm font-sans tracking-wide"
              >
                English
              </button>

              {/* Search Icon */}
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1 hover:text-neutral-300 transition-colors focus-visible:outline-none cursor-pointer"
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
                className="p-1 hover:text-neutral-300 transition-colors focus-visible:outline-none cursor-pointer"
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

              {/* Shopping Bag Icon with Dark Rounded Square & Orange-Red Neon Corner Accent */}
              <button
                type="button"
                aria-label="Shopping Bag"
                onClick={handleCartClick}
                className="relative bg-[#1A1B1E] hover:bg-[#24252A] p-2.5 rounded-xl border border-white/10 transition-colors focus-visible:outline-none group cursor-pointer shadow-md"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>

                {/* Orange-Red Corner Accent Indicator */}
                <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF3823] rounded-br-[4px] pointer-events-none" />

                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FF3823] text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
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
                className="relative bg-[#1A1B1E] p-2 rounded-lg border border-white/10"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-[#FF3823] rounded-br-[3px]" />
              </button>

              <button
                type="button"
                aria-label="Toggle Menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-white hover:text-neutral-300"
              >
                {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
              </button>
            </div>

          </div>
        </Container>
      </header>

      {/* Search Input Bar (Dropdown) */}
      {searchOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-black/95 border-b border-white/10 py-4 px-6 backdrop-blur-md animate-in slide-in-from-top-2">
          <div className="max-w-xl mx-auto flex items-center gap-3">
            <input
              type="text"
              autoFocus
              placeholder="Search products, lighting systems..."
              className="w-full bg-[#111214] border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder:text-neutral-500 outline-none text-sm focus:border-white/40"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-neutral-400 hover:text-white text-xs font-mono uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl md:hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
              LIGHTINMOTION
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3.5 px-4 rounded-xl border border-white/10 bg-white/[0.02] text-base font-semibold text-white tracking-wider"
              >
                <span>{item.label}</span>
                <ChevronRightIcon size={16} className="text-neutral-500" />
              </Link>
            ))}

            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-neutral-400 text-sm py-2">
                <span>Region &amp; Currency</span>
                <span className="text-white font-medium">India (USD $)</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400 text-sm py-2">
                <span>Language</span>
                <span className="text-white font-medium">English</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        itemCount={cartCount}
      />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default SiteHeader;
