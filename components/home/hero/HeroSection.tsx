"use client";

import React, { useRef } from "react";
import { HeroScrollExperience } from "./HeroScrollExperience";
import { cn } from "@/lib/utils/cn";

export interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero-experience-track"
      aria-label="Light in Motion Cinematic Scroll Experience"
      className={cn(
        "relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-[#F4F1EA]",
        className
      )}
    >
      {/* Cinematic Viewport Stage */}
      <HeroScrollExperience containerRef={containerRef} />
    </section>
  );
};

export default HeroSection;
