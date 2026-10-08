"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroSection } from "@/components/home/hero/HeroSection";
import { HoverExpandGallery } from "@/components/home/HoverExpandGallery";
import { PlatformMarquee } from "@/components/home/PlatformMarquee";
import { LightingExperienceSection } from "@/components/home/experience/LightingExperienceSection";
import { ProductCollectionGrid } from "@/components/home/ProductCollectionGrid";

export const StackingHomeWrapper: React.FC = () => {
  const heroTrackRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the 200vh hero-gallery stacking track
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  // Scale down & dim Page 1 (Hero) as Page 2 (Gallery) glides over it
  const heroScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.88]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.25]);

  return (
    <div id="homepage-canvas" className="w-full min-h-screen bg-black text-[#111214] select-none">
      
      {/* 200vh Stacking Track for Page 1 & Page 2 Overlap Animation */}
      <div ref={heroTrackRef} className="relative w-full h-[200vh]">
        
        {/* Sticky Page 1 (Hero) - Remains Pinned at Top */}
        <div className="sticky top-0 w-full h-screen z-10 overflow-hidden">
          <motion.div
            style={{
              scale: heroScale,
              opacity: heroOpacity,
            }}
            className="w-full h-full transform-gpu"
          >
            <HeroSection scrollYProgress={scrollYProgress} />
          </motion.div>
        </div>

        {/* Page 2 (Gallery) - Positioned at 100vh so it glides OVER Page 1 on scroll */}
        <div className="absolute top-[100vh] left-0 right-0 z-20 w-full min-h-screen bg-black shadow-[0_-40px_90px_rgba(0,0,0,1)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-white/20 overflow-hidden">
          <HoverExpandGallery />
        </div>
      </div>

      {/* SUBSEQUENT SECTIONS (Follow Page 2 naturally) */}
      <div className="relative z-20 w-full bg-black text-white">
        <LightingExperienceSection />
        <PlatformMarquee />
        <ProductCollectionGrid />
      </div>
    </div>
  );
};

export default StackingHomeWrapper;
