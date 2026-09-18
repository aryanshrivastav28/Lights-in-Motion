"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";
import { MenuIcon, CloseIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { CartTrigger } from "@/components/cart/CartTrigger";
import { AccountTrigger } from "@/components/account/AccountTrigger";
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

const DESKTOP_NAV = [
  { label: "HOME", href: "/" },
  { label: "STORE", href: "/store" },
  { label: "APP", href: "/app" },
];

const MOBILE_NAV = [
  { label: "HOME", href: "/" },
  { label: "STORE", href: "/store" },
  { label: "APP", href: "/app" },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  overlay = false,
  cartCount = 0,
  isLoggedIn = false,
  userName,
  onOpenCart,
  onOpenAccount,
}) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

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

  const isOverlay = overlay || pathname === "/";
  const isScrolledState = scrolled || !isOverlay;

  return (
    <>
      <header
        className={cn(
          "w-full transition-[background-color,border-color,box-shadow,padding] duration-300 ease-out select-none",
          isOverlay ? "fixed top-0 left-0 right-0 z-50" : "sticky top-0 z-50",
          isScrolledState
            ? "bg-[#070709]/[0.94] backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)] border-b border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.6)] py-3.5 sm:py-4"
            : "bg-transparent border-b border-transparent py-5 sm:py-6"
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between h-10">
            {/* Brand Mark */}
            <div className="flex items-baseline">
              <Link
                href="/"
                className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm"
              >
                <span className="text-sm sm:text-base font-semibold tracking-[0.24em] uppercase text-white group-hover:text-cyan-400 transition-colors">
                  LIGHT IN MOTION
                </span>
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-500 hidden sm:inline-block">
                  CINEMA AT HOME
                </span>
              </Link>
            </div>

            {/* Desktop Navigation (Strictly valid routes only) */}
            <nav
              aria-label="Main Navigation"
              className="hidden md:flex items-center space-x-8 lg:space-x-10"
            >
              {DESKTOP_NAV.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-150 py-1 relative",
                      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm",
                      isActive
                        ? "text-white"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cyan-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Utilities (Desktop) */}
            <div className="hidden md:flex items-center space-x-2">
              <AccountTrigger
                isLoggedIn={isLoggedIn}
                userName={userName}
                onClick={handleAccountClick}
              />
              <span className="w-px h-3.5 bg-white/10" />
              <CartTrigger
                itemCount={cartCount}
                onClick={handleCartClick}
              />
            </div>

            {/* Mobile Header Controls */}
            <div className="flex md:hidden items-center space-x-1 sm:space-x-2">
              <CartTrigger
                itemCount={cartCount}
                onClick={handleCartClick}
                className="px-2"
              />
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-sm text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              >
                {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 flex flex-col bg-[#070709]/98 backdrop-blur-xl md:hidden animate-in fade-in duration-200"
        >
          {/* Mobile Menu Top Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-[0.24em] text-white font-semibold">
              LIGHT IN MOTION
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          {/* Navigation Items (Touch targets > 48px) */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-3">
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-4 px-4 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 text-base font-medium tracking-[0.16em] uppercase text-white transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRightIcon size={16} className="text-neutral-500" />
              </Link>
            ))}

            {/* Mobile Account Trigger */}
            <div className="pt-6 border-t border-white/[0.08] mt-6">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAccountClick();
                }}
                className="w-full flex items-center justify-between py-4 px-4 rounded-sm border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white text-sm font-mono tracking-[0.16em] uppercase transition-colors"
              >
                <span>ACCOUNT</span>
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>

          {/* Mobile Footer note */}
          <div className="p-6 border-t border-white/[0.08] bg-white/[0.01]">
            <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest text-center">
              A CINEMA EXPERIENCE AT HOME.
            </p>
          </div>
        </div>
      )}

      {/* Cart Drawer and Auth Modal Instances (triggered only when user clicks CART or ACCOUNT) */}
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
