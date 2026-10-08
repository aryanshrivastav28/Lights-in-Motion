"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useLocalization } from "@/context/LocalizationContext";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils/cn";

export default function AppDownloadPage() {
  const { formatPrice } = useLocalization();
  const [activeTab, setActiveTab] = useState<"plans" | "code">("plans");
  const [productCode, setProductCode] = useState<string>("");
  const [codeVerified, setCodeVerified] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<string>("");

  const TRIAL_DOWNLOAD_URL =
    "https://website-x8xr.onrender.com/api/download/335c5865-59fa-4d66-995e-a643cf6a01da";

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productCode.trim()) {
      setCodeError("Please enter a valid product code.");
      return;
    }
    setCodeError("");
    setCodeVerified(true);
  };

  const plans = [
    {
      id: "desktop",
      title: "Desktop App Plan",
      description: "Essential plan designed exclusively for computer users.",
      priceInINR: 99,
      badge: "ESSENTIAL",
      features: [
        "Access to Desktop App",
        "Windows, macOS, Linux",
        "Zero-latency screen sampling engine",
        "Regular software & driver updates",
      ],
      platforms: ["Windows 10/11", "macOS", "Linux"],
      cta: "Download Desktop App",
    },
    {
      id: "mobile-desktop",
      title: "Mobile & Desktop Plan",
      description: "Dual access plan for both mobile and desktop convenience.",
      priceInINR: 399,
      badge: "POPULAR",
      features: [
        "Access to Android Mobile App",
        "Access to Desktop App (PC & Mac)",
        "Bluetooth & Wi-Fi device pairing",
        "Regular software updates",
      ],
      platforms: ["Android APK", "Windows", "macOS"],
      cta: "Get Mobile & Desktop",
    },
    {
      id: "lifetime",
      title: "All Apps Lifetime Plan",
      description: "All-inclusive lifetime access for every device & TV setup.",
      priceInINR: 599,
      badge: "LIFETIME VALUE",
      highlight: true,
      features: [
        "Access to Android Mobile App",
        "Access to Desktop App (Windows, macOS)",
        "Access to TV App (Android TV, Fire TV)",
        "Priority VIP customer support",
        "Lifetime regular software updates",
      ],
      platforms: ["All Platforms Included", "Android TV", "Fire TV"],
      cta: "Unlock All Platforms",
    },
  ];

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Optimised sub-millisecond sync performance across all platforms with under 1% CPU utilization.",
    },
    {
      icon: "🔒",
      title: "Secure by Design",
      description:
        "End-to-end encrypted local network communication and verified safe executable binaries.",
    },
    {
      icon: "🌐",
      title: "Cross Platform",
      description:
        "One unified, seamless experience across mobile phones, smart TVs, and PC/Mac workstations.",
    },
  ];

  const verifiedReviews = [
    {
      author: "Gaurav",
      date: "October 2, 2026",
      comment:
        "The team is very supportive and light is looking very cool after installing. Setup was effortless with the companion app and full instructions.",
      avatar: "GA",
    },
    {
      author: "Sreevatsa P",
      date: "October 1, 2026",
      comment:
        "Best sync lights in the market. Working fantastic with the desktop app, zero latency while gaming.",
      avatar: "SR",
    },
    {
      author: "Chirag Ackerman",
      date: "September 29, 2026",
      comment:
        "Honestly loving the RGB screen sync software! 🔥 The lighting is smooth, bright, and adds a really clean vibe to the desk. Definitely a favorite addition.",
      avatar: "CH",
    },
  ];

  return (
    <div className="w-full py-12 sm:py-20 min-h-screen bg-black text-white selection:bg-[#963b18] selection:text-white">
      <Container size="wide">
        
        {/* Navigation Return Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 transition-colors cursor-pointer"
          >
            <ArrowLeftIcon size={12} />
            <span>RETURN HOME</span>
          </Link>
        </div>

        {/* Hero Section matching official portal */}
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)] animate-pulse" />
            <span>AVAILABLE ON ALL PLATFORMS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase text-white font-sans leading-tight">
            Choose Your Platform & Download Apps
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-sans">
            Your content, everywhere you need it. Download our companion software for PC, Mac, Android mobile, and smart TVs — engineered for zero-latency screen synchronization.
          </p>

          {/* Quick Trial Download Link */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={TRIAL_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#963b18] hover:bg-[#b0451c] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(150,59,24,0.4)] cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              <span>Download Free Trial App</span>
            </a>
            <a
              href="https://lightinmotion-web.vercel.app/#downloads"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-neutral-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>Open Vercel Portal ↗</span>
            </a>
          </div>
        </div>

        {/* Tab Switcher: Plans vs Product Code */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full bg-[#0E1014] border border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab("plans")}
              className={cn(
                "px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer",
                activeTab === "plans"
                  ? "bg-[#963b18] text-white shadow-md"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              Software Plans
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={cn(
                "px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer",
                activeTab === "code"
                  ? "bg-[#963b18] text-white shadow-md"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              Have a Hardware Code?
            </button>
          </div>
        </div>

        {/* Tab 1: Software Plans */}
        {activeTab === "plans" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-20">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border shadow-2xl",
                  plan.highlight
                    ? "bg-[#0E1015] border-[#963b18] shadow-[0_0_35px_rgba(150,59,24,0.3)] ring-1 ring-[#963b18]"
                    : "bg-[#090A0D] border-white/10 hover:border-white/25"
                )}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={cn(
                        "text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full",
                        plan.highlight
                          ? "bg-[#963b18] text-white"
                          : "bg-white/10 text-neutral-300"
                      )}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-white/10 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      {formatPrice(plan.priceInINR)}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      / one-time
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 text-xs sm:text-sm text-neutral-300">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="text-emerald-400 font-bold shrink-0">
                          ✓
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Download Buttons */}
                <div className="space-y-2 pt-2">
                  <a
                    href={TRIAL_DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg text-center",
                      plan.highlight
                        ? "bg-[#963b18] hover:bg-[#b0451c] text-white"
                        : "bg-white hover:bg-neutral-200 text-black"
                    )}
                  >
                    <span>{plan.cta}</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Tab 2: Product Code Unlock */
          <div className="max-w-xl mx-auto bg-[#0C0D11] border border-white/15 rounded-3xl p-8 sm:p-10 mb-20 shadow-2xl text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400 text-xl font-bold font-mono">
              ★
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Already Own a LightinMotion Product?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
                All LightinMotion hardware owners receive complimentary lifetime companion app access. Enter the product authentication code found inside your packaging box.
              </p>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-4 max-w-sm mx-auto">
              <input
                type="text"
                required
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                placeholder="Enter Product Code (e.g. LIM-SYNC-2026)"
                className="w-full bg-[#14161C] border border-white/20 rounded-xl px-4 py-3 text-sm text-center text-white placeholder:text-neutral-600 outline-none focus:border-white/50 font-mono uppercase tracking-wider transition-colors"
              />

              {codeError && (
                <p className="text-xs text-rose-400 font-medium">{codeError}</p>
              )}

              {codeVerified ? (
                <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 rounded-xl p-4 text-xs space-y-2 animate-in fade-in">
                  <p className="font-bold">✓ Code Verified Successfully!</p>
                  <p>All download channels are unlocked for your hardware.</p>
                  <a
                    href={TRIAL_DOWNLOAD_URL}
                    className="inline-block mt-2 px-5 py-2 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors"
                  >
                    Download Software Now
                  </a>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#963b18] hover:bg-[#b0451c] text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 cursor-pointer shadow-lg"
                >
                  Verify & Unlock Downloads
                </button>
              )}
            </form>
          </div>
        )}

        {/* Why Choose Lightinmotion Section */}
        <div className="pt-16 border-t border-white/10 mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#963b18] block mb-2">
              CORE ADVANTAGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Choose Lightinmotion Software
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Built with performance, security, and low-overhead user experience at the core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-3 hover:border-white/20 transition-colors shadow-lg"
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Feedback from Official Portal */}
        <div className="pt-16 border-t border-white/10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-2">
              COMMUNITY VOICES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Customer Feedback
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              See what users say about their Lightinmotion experience. Real reviews from verified setups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verifiedReviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-[#0B0C0E] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-lg space-y-4"
              >
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans italic">
                  "{rev.comment}"
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white font-mono">
                    {rev.avatar}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">
                      {rev.author}
                    </span>
                    <span className="block text-[10px] text-neutral-500">
                      {rev.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </div>
  );
}
