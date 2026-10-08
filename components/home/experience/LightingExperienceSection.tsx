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
              className="w-full max-w-5xl mx-auto flex items-center justify-center transform-gpu"
            >
              {/* Centered Pure Media Showcase Stage */}
              <div className="relative w-full h-[65vh] sm:h-[72vh] lg:h-[80vh] rounded-[32px] overflow-hidden bg-neutral-950 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] group">
                
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
                    className="relative z-10 w-full h-full object-contain rounded-[32px] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <img
                    key={currentProduct.image}
                    src={currentProduct.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = currentProduct.fallbackImage;
                    }}
                    alt={currentProduct.name}
                    className="relative z-10 w-full h-full object-contain rounded-[32px] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>



      </div>
    </div>
  );
};

export default LightingExperienceSection;
