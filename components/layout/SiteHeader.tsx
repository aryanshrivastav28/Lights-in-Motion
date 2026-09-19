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
  const isLightHeader = true;

  return (
    <>
      <header
        className={cn(
          "w-full transition-[background-color,border-color,box-shadow,padding] duration-300 ease-out select-none",
          isOverlay ? "fixed top-0 left-0 right-0 z-50" : "sticky top-0 z-50",
          isScrolledState
            ? "bg-[#F4F1EA]/[0.92] backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)] border-b border-[rgba(17,18,20,0.10)] shadow-[0_1px_0_rgba(17,18,20,0.05),0_4px_24px_rgba(17,18,20,0.04)] py-3.5 sm:py-4"
            : "bg-transparent border-b border-transparent py-5 sm:py-6"
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between h-10">
            {/* Brand Mark */}
            <div className="flex items-baseline">
              <Link
                href="/"
                className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF] rounded-sm"
              >
                <span
                  className="text-sm sm:text-base font-semibold tracking-[0.24em] uppercase transition-colors text-[#111214] group-hover:text-[#1687FF]"
                >
                  LIGHT IN MOTION
                </span>
                <span
                  className="text-[9px] font-mono tracking-[0.2em] uppercase hidden sm:inline-block text-[#6B6D70]"
                >
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
                      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF] rounded-sm",
                      isActive
                        ? "text-[#111214]"
                        : "text-[#55575A] hover:text-[#111214]"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1687FF] rounded-full" />
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
                light={isLightHeader}
              />
              <span
                className="w-px h-3.5 bg-[rgba(17,18,20,0.10)]"
              />
              <CartTrigger
                itemCount={cartCount}
                onClick={handleCartClick}
                light={isLightHeader}
              />
            </div>

            {/* Mobile Header Controls */}
            <div className="flex md:hidden items-center space-x-1 sm:space-x-2">
              <CartTrigger
                itemCount={cartCount}
                onClick={handleCartClick}
                className="px-2"
                light={isLightHeader}
              />
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF] text-[#111214] hover:text-[#1687FF] hover:bg-[rgba(17,18,20,0.04)]"
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
          className="fixed inset-0 z-50 flex flex-col bg-[#F4F1EA]/98 backdrop-blur-xl md:hidden animate-in fade-in duration-200"
        >
          {/* Mobile Menu Top Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(17,18,20,0.08)]">
            <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#111214] font-semibold">
              LIGHT IN MOTION
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#55575A] hover:text-[#111214] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF] rounded-sm"
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
                className="flex items-center justify-between py-4 px-4 rounded-sm border border-[rgba(17,18,20,0.10)] bg-[rgba(17,18,20,0.02)] hover:bg-[rgba(17,18,20,0.05)] hover:border-[rgba(17,18,20,0.16)] text-base font-medium tracking-[0.16em] uppercase text-[#111214] transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRightIcon size={16} className="text-[#6B6D70]" />
              </Link>
            ))}

            {/* Mobile Account Trigger */}
            <div className="pt-6 border-t border-[rgba(17,18,20,0.10)] mt-6">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAccountClick();
                }}
                className="w-full flex items-center justify-between py-4 px-4 rounded-sm border border-[rgba(17,18,20,0.10)] bg-[rgba(17,18,20,0.02)] hover:bg-[rgba(17,18,20,0.05)] text-[#111214] text-sm font-mono tracking-[0.16em] uppercase transition-colors"
              >
                <span>ACCOUNT</span>
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>

          {/* Mobile Footer note */}
          <div className="p-6 border-t border-[rgba(17,18,20,0.10)] bg-[rgba(17,18,20,0.02)]">
            <p className="text-[11px] font-mono text-[#6B6D70] uppercase tracking-widest text-center">
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
