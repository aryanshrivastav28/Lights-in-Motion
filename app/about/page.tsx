"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export default function AboutPage() {
  return (
    <div className="w-full pt-28 sm:pt-32 pb-24 text-black min-h-screen">
      <Container size="wide">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black font-bold">About Us</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-neutral-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span>The Ambient Hardware Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black font-sans leading-tight">
            We Build Cinema-Grade Immersion for Your Living Space.
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 mt-6 leading-relaxed font-sans font-medium">
            LIGHTINMOTION was founded on a simple observation: conventional monitors and high-end televisions trap entertainment inside rectangular borders. We engineer real-time optical sync hardware to dissolve those edges into ambient reality.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl">
          <div className="bg-white/80 p-8 rounded-2xl border border-black/10 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h2 className="text-xl font-black text-black">Microsecond Real-Time Sync</h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              We developed custom hardware DSP firmware that samples frame buffers with sub-5ms latency. No lag, no distracting color ghosting—just buttery smooth illumination synchronized with every frame.
            </p>
          </div>

          <div className="bg-white/80 p-8 rounded-2xl border border-black/10 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h2 className="text-xl font-black text-black">Tailored Display Geometry</h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              Unlike generic, one-size-fits-all LED strips that bend awkwardly at the corners, every LIGHTINMOTION kit is precision-calibrated to exact screen sizes from 21.5&quot; eSports panels up to 65&quot; 4K OLED home theaters.
            </p>
          </div>

          <div className="bg-white/80 p-8 rounded-2xl border border-black/10 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h2 className="text-xl font-black text-black">Complete Software Control</h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              Our open ecosystem spans cross-platform native software: Windows, macOS, Android TV, and Web controls. Customize ambient color profiles, dynamic music visualization, or steady studio illumination with one tap.
            </p>
          </div>
        </div>

        {/* Engineering Philosophy */}
        <div className="bg-white/90 rounded-3xl p-8 sm:p-12 border border-black/15 shadow-[0_4px_30px_rgba(0,0,0,0.06)] max-w-5xl mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
                Hardware Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-black leading-tight">
                Designed & Built with Pure Precision in India
              </h2>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                From high-density 60 LEDs/m circuits to double-layered pure copper PCB backings that dissipate heat efficiently, our products are engineered to outlast typical gaming RGB accessories by years.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full bg-black/5 text-xs font-semibold text-black border border-black/10">
                  Sub-5ms Latency
                </span>
                <span className="px-3 py-1 rounded-full bg-black/5 text-xs font-semibold text-black border border-black/10">
                  True 16.8M RGB
                </span>
                <span className="px-3 py-1 rounded-full bg-black/5 text-xs font-semibold text-black border border-black/10">
                  Zero Glare Calibration
                </span>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 border border-black/10 shadow-inner">
              <Image
                src="/images/products/sync-controller-1.png"
                alt="LIGHTINMOTION Sync Hardware"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl">
          <div className="space-y-2">
            <h2 className="text-2xl font-black">Experience the immersion firsthand</h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Browse our display-matched kits and upgrade your gaming desk or television setup today.
            </p>
          </div>
          <Link
            href="/store"
            className="px-8 py-3.5 bg-white hover:bg-neutral-200 text-black font-extrabold text-sm rounded-full transition-colors shrink-0 shadow-lg"
          >
            Explore Store Catalog
          </Link>
        </div>
      </Container>
    </div>
  );
}
