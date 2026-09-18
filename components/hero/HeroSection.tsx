import React from "react";
import { HeroMedia } from "./HeroMedia";
import { HeroContent } from "./HeroContent";
import { HeroActions } from "./HeroActions";
import { HeroInfoRail } from "./HeroInfoRail";
import { ScrollIndicator } from "./ScrollIndicator";
import { cn } from "@/lib/utils/cn";

export interface HeroSectionProps {
  imageUrl?: string;
  videoUrl?: string;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  imageUrl,
  videoUrl,
  className,
}) => {
  return (
    <section
      aria-label="Light in Motion Immersive Experience"
      className={cn(
        "relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#070709]",
        className
      )}
    >
      {/* Background Cinematic Media Layer */}
      <HeroMedia imageUrl={imageUrl} videoUrl={videoUrl} />

      {/* Main Content Area (Upper/Center Zone) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-36 pb-6 sm:pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          <HeroContent />
          <HeroActions />
        </div>
      </div>

      {/* Bottom Grounded Telemetry Rail & Scroll Cue */}
      <div className="relative z-10 w-full pb-6 sm:pb-8 pt-2 bg-gradient-to-t from-[#070709] via-[#070709]/70 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-2 sm:gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400 select-none">
              SYSTEM STATUS // ONLINE
            </span>
            <ScrollIndicator targetId="hero-overview" />
          </div>
          <HeroInfoRail />
        </div>
      </div>

      {/* Target anchor for hero scroll actions */}
      <div id="hero-overview" className="w-full h-px opacity-0 pointer-events-none" />
    </section>
  );
};
