"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { PRODUCTS_SHOWCASE, ProductShowcaseItem } from "@/lib/config/site-images";
import { cn } from "@/lib/utils/cn";

// Rotational (Clockwise / Anti-clockwise) Motion Variants
const rotationalVariants = {
  enter: (direction: number) => ({
    rotate: direction > 0 ? 12 : -12,
    scale: 0.90,
    opacity: 0,
    x: direction > 0 ? 60 : -60,
  }),
  center: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 220,
      damping: 22,
      mass: 0.8,
    },
  },
  exit: (direction: number) => ({
    rotate: direction > 0 ? -12 : 12,
    scale: 0.90,
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    transition: {
      duration: 0.38,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

export const LightingExperienceSection: React.FC<{ className?: string }> = ({
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [videoError, setVideoError] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = PRODUCTS_SHOWCASE.length;
    const computedIndex = Math.min(
      total - 1,
      Math.max(0, Math.floor(latest * total))
    );
    if (computedIndex !== activeIdx) {
      setDirection(computedIndex > activeIdx ? 1 : -1);
      setActiveIdx(computedIndex);
      setVideoError(false);
    }
  });

  const handleStepClick = (targetIndex: number) => {
    if (targetIndex !== activeIdx) {
      setDirection(targetIndex > activeIdx ? 1 : -1);
      setActiveIdx(targetIndex);
      setVideoError(false);
    }
  };

  const currentProduct: ProductShowcaseItem = PRODUCTS_SHOWCASE[activeIdx];

  return (
    <div
      ref={containerRef}
      id="lighting-experience"
      className={cn(
        "relative w-full h-[400vh] bg-[#050505] text-white select-none font-sans border-t border-white/10",
        className
      )}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between py-6 lg:py-8 overflow-hidden px-6 sm:px-10 max-w-7xl mx-auto">
        


        {/* Main Content Showcase Stage */}
        <div className="w-full my-auto py-2 perspective-[1200px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentProduct.id}
              custom={direction}
              variants={rotationalVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full transform-gpu"
            >
              {/* Left Column: Typography matching uploaded reference image */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4 lg:pr-2">
                <div>
                  {/* Eyebrow: 01 —— MONITOR-BACKLIGHT */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-sans font-bold text-white tracking-tight">
                      {currentProduct.code}
                    </span>
                    <span className="w-8 h-[1px] bg-neutral-600" />
                    <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase font-semibold">
                      {currentProduct.id.toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Giant Stacked Block Headline matching reference image 100% */}
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-black font-sans text-white tracking-tighter uppercase leading-[0.84] mb-4">
                    {currentProduct.name.split(" ").map((word, idx, arr) => (
                      <span key={idx} className="block">
                        {word}{idx === arr.length - 1 ? "." : ""}
                      </span>
                    ))}
                  </h2>
                  
                  {/* Tagline */}
                  <p className="text-xs font-mono tracking-[0.2em] text-neutral-300 font-semibold uppercase leading-relaxed mb-3">
                    {currentProduct.tagline}
                  </p>
                  
                  {/* Description Paragraph */}
                  <p className="text-base sm:text-lg font-sans text-neutral-300 leading-relaxed max-w-xl">
                    {currentProduct.description}
                  </p>
                </div>

                {/* Key Hardware Features with Cyan Dots */}
                <div className="pt-3 border-t border-neutral-800 space-y-2.5">
                  <span className="text-[11px] font-mono tracking-[0.22em] text-neutral-400 uppercase font-bold block">
                    KEY HIGHLIGHTS:
                  </span>
                  <div className="space-y-2">
                    {currentProduct.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-sans text-white">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00b4d8] shrink-0" />
                        <span className="font-normal leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dual Buttons CTA */}
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <Link
                    href={`/store?product=${currentProduct.slug}`}
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-neutral-200 text-black text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-200 rounded-sm shadow-xl group"
                  >
                    <span>EXPLORE THIS PRODUCT</span>
                    <svg
                      className="w-4 h-4 ml-2.5 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>

                  <Link
                    href="/store"
                    className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-white hover:text-[#00b4d8] underline underline-offset-4 transition-colors"
                  >
                    EXPLORE MORE
                  </Link>
                </div>
              </div>

              {/* Right Column: Dark Theme Full-Bleed Media Stage Box */}
              <div className="lg:col-span-7 relative w-full">
                <div className="relative w-full h-[50vh] sm:h-[58vh] lg:h-[64vh] rounded-[28px] overflow-hidden bg-neutral-950 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
                  
                  {/* Ambient Backdrop Blur */}
                  {!videoError ? (
                    <video
                      key={`bg-${currentProduct.video}`}
                      src={currentProduct.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110 pointer-events-none"
                    />
                  ) : (
                    <img
                      key={`bg-${currentProduct.image}`}
                      src={currentProduct.image}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = currentProduct.fallbackImage;
                      }}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110 pointer-events-none"
                    />
                  )}

                  {/* Main Foreground Media Display - Full Bleed Uncropped Card Fill */}
                  {!videoError ? (
                    <video
                      key={currentProduct.video}
                      src={currentProduct.video}
                      onError={() => setVideoError(true)}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="relative z-10 w-full h-full object-contain rounded-[28px] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      key={currentProduct.image}
                      src={currentProduct.image}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = currentProduct.fallbackImage;
                      }}
                      alt={currentProduct.name}
                      className="relative z-10 w-full h-full object-contain rounded-[28px] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>



      </div>
    </div>
  );
};

export default LightingExperienceSection;
