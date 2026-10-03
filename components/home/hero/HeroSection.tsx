"use client";

import React from "react";
import { MotionValue } from "framer-motion";
import { SoScaleHero } from "./SoScaleHero";
import { cn } from "@/lib/utils/cn";

export interface HeroSectionProps {
  className?: string;
  scrollYProgress?: MotionValue<number>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className, scrollYProgress }) => {
  return (
    <section
      id="hero-experience-track"
      aria-label="LIGHTINMOTION Cinema Landing Experience"
      className={cn(
        "relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-black",
        className
      )}
    >
      <SoScaleHero scrollYProgress={scrollYProgress} />
    </section>
  );
};

export default HeroSection;
