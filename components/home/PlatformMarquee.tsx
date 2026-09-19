import React from "react";

export type MarqueeItem = {
  label: string;
  index?: string;
};

const PLATFORMS_ROW: MarqueeItem[] = [
  { index: "01", label: "PLAYSTATION" },
  { index: "02", label: "XBOX" },
  { index: "03", label: "PC" },
  { index: "04", label: "STEAM" },
  { index: "05", label: "APPLE TV" },
  { index: "06", label: "ANDROID TV" },
  { index: "07", label: "SMART TV" },
  { index: "08", label: "GAMING SETUPS" },
];

const PROTOCOLS_ROW: MarqueeItem[] = [
  { index: "01", label: "HDMI 2.1" },
  { index: "02", label: "HDR" },
  { index: "03", label: "HDR10+" },
  { index: "04", label: "DOLBY VISION" },
  { index: "05", label: "120HZ" },
  { index: "06", label: "VRR" },
  { index: "07", label: "G-SYNC" },
  { index: "08", label: "ULTRAWIDE" },
  { index: "09", label: "HOME THEATER" },
];

/**
 * Renders a single sequence of marquee items.
 */
function MarqueeSequence({
  items,
  isAriaHidden = false,
}: {
  items: MarqueeItem[];
  isAriaHidden?: boolean;
}) {
  return (
    <ul
      className={`flex items-center shrink-0 list-none m-0 p-0 ${
        isAriaHidden ? "motion-reduce:hidden" : ""
      }`}
      aria-hidden={isAriaHidden ? "true" : undefined}
      role={isAriaHidden ? "presentation" : undefined}
    >
      {items.map((item, idx) => (
        <li
          key={`${item.label}-${idx}`}
          className="inline-flex items-center shrink-0"
        >
          <div className="inline-flex items-baseline gap-2.5 sm:gap-3.5">
            {item.index && (
              <span className="font-mono text-[10px] sm:text-xs text-[#6B6D70] tracking-widest font-medium select-none">
                {item.index}
              </span>
            )}
            <span className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[#111214] uppercase select-none transition-colors duration-200">
              {item.label}
            </span>
          </div>

          {/* Hairline 3px technical square separator */}
          <div
            className="mx-6 sm:mx-8 md:mx-12 select-none flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="inline-block w-1 h-1 bg-[rgba(17,18,20,0.20)] rotate-45" />
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * PlatformMarquee - Stage 5 Ecosystem Compatibility Section
 *
 * Communicates that Light in Motion integrates with existing hardware,
 * displays, and entertainment platforms without proprietary friction.
 *
 * Implemented as a 100% pure React Server Component with GPU-accelerated
 * CSS transforms, zero JavaScript runtime overhead, and full reduced-motion support.
 */
export function PlatformMarquee() {
  // Repeating the array creates sufficient track width (4,000px+) so there is
  // never a visual gap or seam on ultra-wide 4K or 5K display setups.
  const doubledPlatforms = [...PLATFORMS_ROW, ...PLATFORMS_ROW];
  const doubledProtocols = [...PROTOCOLS_ROW, ...PROTOCOLS_ROW];

  return (
    <section
      id="ecosystem-compatibility"
      aria-labelledby="ecosystem-heading"
      className="relative w-full bg-[#F4F1EA] py-24 sm:py-32 md:py-36 border-t border-[rgba(17,18,20,0.10)] overflow-hidden"
    >
      {/* 1. Header Container with Asymmetric Editorial Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Small Technical Section Identifier */}
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#6B6D70] mb-6 md:mb-8 flex items-center gap-2 select-none">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1687FF]" />
          <span>ECOSYSTEM // 01</span>
        </div>

        {/* Editorial Headline and Supporting Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <h2
              id="ecosystem-heading"
              className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] tracking-tight leading-[0.95] text-[#111214] uppercase"
            >
              BUILT FOR
              <br />
              YOUR ECOSYSTEM.
            </h2>
          </div>

          <div className="lg:col-span-4 pb-1 sm:pb-2">
            <p className="text-[#55575A] text-base sm:text-lg leading-relaxed font-normal">
              Light in Motion integrates into the hardware, displays, and
              entertainment systems already at the center of your setup.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Marquee Region (Bleeds Edge-to-Edge) */}
      <div className="relative w-full mt-16 sm:mt-20 md:mt-28 border-y border-[rgba(17,18,20,0.10)] bg-[#ECE9E1] group">
        {/* Subtle Edge Masks: left & right gradients smoothly dissolve into background */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 pointer-events-none bg-gradient-to-r from-[#ECE9E1] via-[#ECE9E1]/80 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 pointer-events-none bg-gradient-to-l from-[#ECE9E1] via-[#ECE9E1]/80 to-transparent"
          aria-hidden="true"
        />

        {/* TRACK 01: Platforms & Consoles (Moves Left -> Right) */}
        <div className="marquee-row relative w-full border-b border-[rgba(17,18,20,0.10)] overflow-hidden">
          {/* Subtle Technical Track Sub-Header */}
          <div className="px-6 sm:px-8 md:px-12 py-2.5 flex items-center justify-between font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-[#6B6D70] uppercase border-b border-[rgba(17,18,20,0.10)] select-none">
            <span>TRACK 01 // PLATFORMS &amp; CONSOLES</span>
            <span>DIRECTION: FORWARD &rarr;</span>
          </div>

          <div className="py-6 sm:py-8 md:py-9 overflow-hidden motion-reduce:overflow-x-auto">
            <div className="marquee-track flex w-fit whitespace-nowrap animate-marquee-right hover:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              {/* Primary sequence */}
              <MarqueeSequence items={doubledPlatforms} isAriaHidden={false} />
              {/* Duplicated sequence for seamless infinite loop */}
              <MarqueeSequence items={doubledPlatforms} isAriaHidden={true} />
            </div>
          </div>
        </div>

        {/* TRACK 02: Protocols & Architecture (Moves Right -> Left) */}
        <div className="marquee-row relative w-full overflow-hidden">
          {/* Subtle Technical Track Sub-Header */}
          <div className="px-6 sm:px-8 md:px-12 py-2.5 flex items-center justify-between font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-[#6B6D70] uppercase border-b border-[rgba(17,18,20,0.10)] select-none">
            <span>&larr; DIRECTION: REVERSE</span>
            <span>TRACK 02 // PROTOCOLS &amp; ARCHITECTURE</span>
          </div>

          <div className="py-6 sm:py-8 md:py-9 overflow-hidden motion-reduce:overflow-x-auto">
            <div className="marquee-track flex w-fit whitespace-nowrap animate-marquee-left hover:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              {/* Primary sequence */}
              <MarqueeSequence items={doubledProtocols} isAriaHidden={false} />
              {/* Duplicated sequence for seamless infinite loop */}
              <MarqueeSequence items={doubledProtocols} isAriaHidden={true} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Restrained Technical Footer / Telemetry Line */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 mt-16 sm:mt-20 md:mt-24">
        <div className="border-t border-[rgba(17,18,20,0.10)] pt-6 md:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] md:text-xs text-[#6B6D70] tracking-[0.2em] uppercase select-none">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1687FF]" />
            <span>SIGNAL / DISPLAY / ENTERTAINMENT</span>
          </div>
          <span>DESIGNED FOR MODERN SETUPS</span>
        </div>
      </div>
    </section>
  );
}
