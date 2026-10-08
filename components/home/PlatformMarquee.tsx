import React from "react";

export type MarqueeItem = {
  label: string;
  index?: string;
};

const PLATFORMS_ROW: MarqueeItem[] = [
  { index: "01", label: "WIFI CONTROLLED" },
  { index: "02", label: "APP CONTROL" },
  { index: "03", label: "SCREEN SYNC" },
  { index: "04", label: "MOBILE CONTROL" },
  { index: "05", label: "SOUND REACTIVE" },
  { index: "06", label: "MUSIC REACTIVE" },
  { index: "07", label: "14M+ COLOURS" },
  { index: "08", label: "180+ EFFECTS" },
];

const PROTOCOLS_ROW: MarqueeItem[] = [
  { index: "01", label: "ANDROID TV" },
  { index: "02", label: "PLAYSTORE" },
  { index: "03", label: "WIFI CONTROLLED" },
  { index: "04", label: "APP CONTROL" },
  { index: "05", label: "SCREEN SYNC" },
  { index: "06", label: "MOBILE CONTROL" },
  { index: "07", label: "SOUND REACTIVE" },
  { index: "08", label: "MUSIC REACTIVE" },
  { index: "09", label: "14M+ COLOURS" },
  { index: "10", label: "180+ EFFECTS" },
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
              <span className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-widest font-medium select-none">
                {item.index}
              </span>
            )}
            <span className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white uppercase select-none transition-colors duration-200">
              {item.label}
            </span>
          </div>

          {/* Hairline 3px technical square separator */}
          <div
            className="mx-6 sm:mx-8 md:mx-12 select-none flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="inline-block w-1 h-1 bg-white/20 rotate-45" />
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
      className="relative w-full bg-black py-24 sm:py-32 md:py-36 border-t border-white/10 overflow-hidden"
    >
      {/* 1. Header Container with Asymmetric Editorial Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Small Technical Section Identifier */}
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6 md:mb-8 flex items-center gap-2 select-none">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1687FF]" />
          <span>ECOSYSTEM // 01</span>
        </div>

        {/* Editorial Headline and Supporting Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <h2
              id="ecosystem-heading"
              className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] tracking-tight leading-[0.95] text-white uppercase"
            >
              BUILT FOR
              <br />
              YOUR ECOSYSTEM.
            </h2>
          </div>

          <div className="lg:col-span-4 pb-1 sm:pb-2">
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
              Light in Motion integrates into the hardware, displays, and
              entertainment systems already at the center of your setup.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Marquee Region (Bleeds Edge-to-Edge) */}
      <div className="relative w-full mt-16 sm:mt-20 md:mt-28 border-y border-white/10 bg-[#0A0A0A] group">
        {/* Subtle Edge Masks: left & right gradients smoothly dissolve into background */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 pointer-events-none bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 pointer-events-none bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"
          aria-hidden="true"
        />

        {/* TRACK 01: Features & Control (Moves Left -> Right) */}
        <div className="marquee-row relative w-full border-b border-white/10 overflow-hidden">
          {/* Subtle Technical Track Sub-Header */}
          <div className="px-6 sm:px-8 md:px-12 py-2.5 flex items-center justify-between font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-neutral-400 uppercase border-b border-white/10 select-none">
            <span>TRACK 01 // FEATURES &amp; CONTROL</span>
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

        {/* TRACK 02: Platforms & Ecosystem (Moves Right -> Left) */}
        <div className="marquee-row relative w-full overflow-hidden">
          {/* Subtle Technical Track Sub-Header */}
          <div className="px-6 sm:px-8 md:px-12 py-2.5 flex items-center justify-between font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-neutral-400 uppercase border-b border-white/10 select-none">
            <span>&larr; DIRECTION: REVERSE</span>
            <span>TRACK 02 // PLATFORMS &amp; ECOSYSTEM</span>
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


    </section>
  );
}
