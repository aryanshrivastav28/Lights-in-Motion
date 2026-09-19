import React from "react";
import { cn } from "@/lib/utils/cn";

export interface HeroContentProps {
  className?: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({ className }) => {
  return (
    <div className={cn("space-y-4 sm:space-y-6 max-w-3xl select-none", className)}>
      {/* Small Technical Label */}
      <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-sm bg-[rgba(17,18,20,0.04)] border border-[rgba(17,18,20,0.10)] backdrop-blur-sm animate-hero-fade [animation-delay:150ms] motion-reduce:animate-none max-w-full">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1687FF] shadow-[0_0_8px_rgba(22,135,255,0.6)] shrink-0" />
        <span className="text-[9px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.22em] uppercase text-[#6B6D70] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          LIGHT IN MOTION <span className="text-[rgba(17,18,20,0.25)] mx-0.5 sm:mx-1">/</span> IMMERSIVE AMBIENT LIGHTING
        </span>
      </div>

      {/* Main Display Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.25rem] xl:text-[6.25rem] font-bold tracking-tight text-[#111214] leading-[0.95] sm:leading-[0.92] uppercase animate-hero-fade [animation-delay:300ms] motion-reduce:animate-none">
        THE ENVIRONMENT
        <br />
        <span className="text-[#111214]">CHANGES.</span>
      </h1>

      {/* Secondary Tagline */}
      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-sans text-[#55575A] tracking-wide max-w-xl leading-relaxed animate-hero-fade [animation-delay:450ms] motion-reduce:animate-none">
        A cinema experience at home.
      </p>
    </div>
  );
};
