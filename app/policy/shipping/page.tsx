"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function ShippingPolicyPage() {
  const [trackInput, setTrackInput] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackingError, setTrackingError] = useState("");

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;

    setTrackingLoading(true);
    setTrackingError("");
    setTrackingResult(null);

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: trackInput.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setTrackingResult(data.data);
      } else {
        setTrackingError(data.error || "Order not found. Please verify your tracking number.");
      }
    } catch {
      setTrackingError("Failed to fetch tracking data. Please try again.");
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="w-full pt-28 sm:pt-32 pb-24 text-black min-h-screen">
      <Container size="wide">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/store" className="hover:text-black transition-colors">Store</Link>
          <span>/</span>
          <span className="text-black font-bold">Shipping Policy</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-neutral-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span>Fulfilment & Delivery</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black font-sans leading-tight">
            Shipping & Delivery Policy
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-4 leading-relaxed font-sans font-medium">
            Fast, insured, and bench-tested delivery across India and international destinations. Every LIGHTINMOTION ambient unit is hand-inspected before dispatch.
          </p>
        </div>

        {/* Live Tracking Interactive Box (Connected to Backend) */}
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-black/15 shadow-[0_4px_25px_rgba(0,0,0,0.06)] mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-black text-black">Track Your Shipment Live</h2>
              <p className="text-xs text-neutral-600">Enter your LIGHTINMOTION Order ID (e.g. LIM-94821) or Courier AWB number.</p>
            </div>
          </div>

          <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              placeholder="e.g. LIM-94821 or 1482049102"
              className="flex-1 bg-[#ECEAE4]/70 border border-black/20 rounded-xl px-4 py-3 text-sm text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
            />
            <button
              type="submit"
              disabled={trackingLoading}
              className="px-6 py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {trackingLoading ? "Locating..." : "Track Order"}
            </button>
          </form>

          {trackingError && (
            <p className="text-xs text-red-600 font-bold mt-3 animate-in fade-in">{trackingError}</p>
          )}

          {trackingResult && (
            <div className="mt-6 pt-6 border-t border-black/10 space-y-4 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-neutral-500 uppercase">Status</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-extrabold text-sm sm:text-base text-black">{trackingResult.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-500 uppercase">Carrier</span>
                  <p className="font-bold text-sm text-black">{trackingResult.carrier}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-500 uppercase">ETA</span>
                  <p className="font-bold text-sm text-emerald-800">{trackingResult.estimatedDelivery}</p>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-2.5 pt-3">
                {trackingResult.steps.map((st: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        st.done ? "bg-black text-white" : "bg-neutral-200 text-neutral-400"
                      }`}>
                        {st.done ? "✓" : "○"}
                      </span>
                      <span className={st.done ? "text-black font-semibold" : "text-neutral-400"}>
                        {st.title}
                      </span>
                    </span>
                    <span className="text-neutral-500 font-mono text-xs">{st.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Policy Details Accordions & Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {/* Dispatch Timeline */}
          <div className="bg-white/70 p-6 sm:p-7 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black font-mono font-bold text-sm">
              01
            </div>
            <h2 className="text-lg font-black text-black">Dispatch Timelines & Bench-Testing</h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              Every LIGHTINMOTION sync controller and LED array undergoes a 2-hour color temperature benchmark test before packaging. Orders placed before <strong>2:00 PM IST (Mon-Fri)</strong> are dispatched on the same business day. Orders placed on weekends are processed on the next business day.
            </p>
          </div>

          {/* Transit Times */}
          <div className="bg-white/70 p-6 sm:p-7 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black font-mono font-bold text-sm">
              02
            </div>
            <h2 className="text-lg font-black text-black">Delivery Times by Region</h2>
            <ul className="text-xs sm:text-sm text-neutral-700 space-y-2 list-none">
              <li className="flex items-center justify-between border-b border-black/5 pb-1">
                <span>Metro Cities (Bengaluru, Mumbai, Delhi-NCR, Hyderabad)</span>
                <strong className="text-black font-mono">1 – 3 Days</strong>
              </li>
              <li className="flex items-center justify-between border-b border-black/5 pb-1">
                <span>Tier 1 & Tier 2 Cities Across India</span>
                <strong className="text-black font-mono">2 – 4 Days</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Rest of India & Northeast</span>
                <strong className="text-black font-mono">3 – 6 Days</strong>
              </li>
            </ul>
          </div>

          {/* Courier Partners */}
          <div className="bg-white/70 p-6 sm:p-7 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black font-mono font-bold text-sm">
              03
            </div>
            <h2 className="text-lg font-black text-black">Tier-1 Air Courier Logistics</h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              We partner exclusively with <strong>BlueDart Express, Delhivery Air, and DTDC Air Express</strong>. All shipments are packed in tamper-proof bubble mailers with custom shock-absorption foam to safeguard high-density LEDs and microchips.
            </p>
          </div>

          {/* Shipping Rates */}
          <div className="bg-white/70 p-6 sm:p-7 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black font-mono font-bold text-sm">
              04
            </div>
            <h2 className="text-lg font-black text-black">Free Shipping & Insurance</h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              We offer <strong>Free Standard Express Shipping</strong> on all orders across India above ₹999. Every single shipment includes 100% transit insurance against theft or accidental transit damage at no extra cost to you.
            </p>
          </div>
        </div>

        {/* Need Help CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl">
          <div>
            <h2 className="text-xl font-black">Need custom shipping or urgent expedited dispatch?</h2>
            <p className="text-xs text-neutral-400 mt-1">Contact our fulfilment desk for same-day courier dispatch or bulk shipment logistics.</p>
          </div>
          <Link
            href="/reseller"
            className="px-6 py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-neutral-200 transition-colors shrink-0"
          >
            Contact Fulfilment Desk
          </Link>
        </div>
      </Container>
    </div>
  );
}
