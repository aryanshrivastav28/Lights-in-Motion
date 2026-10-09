"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  useLocalization,
  CURRENCIES,
  LANGUAGES,
  CurrencyCode,
  LanguageCode,
} from "@/context/LocalizationContext";
import { cn } from "@/lib/utils/cn";

export const SiteFooter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const { currency, setCurrency, language, setLanguage, t } = useLocalization();

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node)
      ) {
        setCurrencyDropdownOpen(false);
      }
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="relative w-full bg-black text-white select-none overflow-hidden border-t border-white/10">
      {/* Radiant Crimson-Red Ambient Underglow Shade matching reference image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 130% 70% at 50% 100%, #E01B05 0%, #850B00 32%, #220300 60%, #000000 95%)",
          opacity: 0.95,
        }}
      />
      {/* Luminous Red Baseline Glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none bg-gradient-to-t from-[#E51B05]/60 via-[#A01000]/30 to-transparent blur-2xl"
      />

      <div className="relative z-10 pt-20 sm:pt-28 pb-12">
        <Container size="wide">
          {/* Top Newsletter Subscription Section */}
          <div className="max-w-2xl mx-auto text-center mb-24 sm:mb-28">
            <p className="text-xs sm:text-sm font-sans font-medium text-neutral-300 mb-3 tracking-wide">
              {t("subscribeEmails")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-8 leading-tight">
              {t("subscribeHeading")}
            </h2>

            <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
              <div className="relative flex items-center bg-[#0C0D10]/90 backdrop-blur-md border border-white/20 rounded-full p-1.5 focus-within:border-white/50 transition-colors shadow-2xl">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("enterEmail")}
                  className="w-full bg-transparent px-5 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-neutral-500 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:bg-neutral-200 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
              {subscribed && (
                <p className="absolute -bottom-7 left-0 right-0 text-xs text-emerald-400 font-medium animate-in fade-in">
                  {t("thankYouSubscribe")}
                </p>
              )}
            </form>
          </div>

          {/* Links & Brand Architecture Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16 items-start">
            {/* Left: Brand Identity */}
            <div className="md:col-span-4 space-y-3">
              <Link href="/" className="inline-block">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase text-white">
                  LIGHTINMOTION
                </span>
              </Link>
            </div>

            {/* Right: Categorized Links */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              {/* Programs */}
              <div>
                <span className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-4">
                  {t("programs")}
                </span>
                <ul className="space-y-3 font-bold text-white text-sm">
                  <li>
                    <Link
                      href="/store"
                      className="hover:text-neutral-200 transition-colors"
                    >
                      {t("affiliateProgram")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Explore */}
              <div>
                <span className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-4">
                  {t("explore")}
                </span>
                <ul className="space-y-3 font-bold text-white text-sm">
                  <li>
                    <Link
                      href="/store"
                      className="hover:text-neutral-200 transition-colors"
                    >
                      {t("officialOnlineStore")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/store"
                      className="hover:text-neutral-200 transition-colors"
                    >
                      {t("onlineReseller")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/store"
                      className="hover:text-neutral-200 transition-colors"
                    >
                      {t("aboutUs")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Policy */}
              <div>
                <span className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-4">
                  {t("policy")}
                </span>
                <ul className="space-y-3 font-bold text-white text-sm">
                  <li>
                    <span className="hover:text-neutral-200 transition-colors cursor-pointer">
                      {t("shippingPolicy")}
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-neutral-200 transition-colors cursor-pointer">
                      {t("returnPolicy")}
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-neutral-200 transition-colors cursor-pointer">
                      {t("warrantyPolicy")}
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-neutral-200 transition-colors cursor-pointer">
                      {t("privacyPolicy")}
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-neutral-200 transition-colors cursor-pointer">
                      {t("termsOfService")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Legal, Regional & Social Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-300">
            {/* Region / Currency / Language with active dropups */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Language Selector Dropup */}
              <div ref={languageRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setLanguageDropdownOpen(!languageDropdownOpen);
                    setCurrencyDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {languageDropdownOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-[#0E0F12] border border-white/15 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.95)] py-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-mono tracking-wider text-neutral-400 uppercase border-b border-white/10 mb-1">
                      Language
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
                            "w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer",
                            isSelected
                              ? "text-white font-bold bg-white/5"
                              : "text-neutral-300"
                          )}
                        >
                          <span>{lang.label}</span>
                          {isSelected && (
                            <span className="text-[#963b18] font-bold text-xs">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Currency Selector Dropup */}
              <div ref={currencyRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setCurrencyDropdownOpen(!currencyDropdownOpen);
                    setLanguageDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-56 bg-[#0E0F12] border border-white/15 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.95)] py-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-mono tracking-wider text-neutral-400 uppercase border-b border-white/10 mb-1">
                      Currency
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
                            "w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer",
                            isSelected
                              ? "text-white font-bold bg-white/5"
                              : "text-neutral-300"
                          )}
                        >
                          <span>{curr.label}</span>
                          {isSelected && (
                            <span className="text-[#963b18] font-bold text-xs">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Copyright Statement */}
            <p className="text-center text-neutral-300 font-sans tracking-wide">
              {t("copyright")}
            </p>

            {/* Social Media Icons matching reference image */}
            <div className="flex items-center space-x-4 sm:space-x-5 text-white">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-neutral-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-neutral-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-neutral-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:text-neutral-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-neutral-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="hover:text-neutral-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default SiteFooter;
