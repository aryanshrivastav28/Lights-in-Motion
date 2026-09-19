"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HERO_STATES, SAFETY_VIDEO_URL } from "./heroSequence";
import { cn } from "@/lib/utils/cn";

export interface HeroTextProps {
  currentIndex: number;
  nextIndex: number;
  blend: number; // 0 to 1 during transition
  isTransitioning: boolean;
  className?: string;
}

export const HeroText: React.FC<HeroTextProps> = ({
  currentIndex,
  nextIndex,
  blend,
  isTransitioning,
  className,
}) => {
  return (
    <div className={cn("relative w-full max-w-xl min-h-[260px] sm:min-h-[290px] md:min-h-[340px] flex flex-col justify-center select-none", className)}>
      {HERO_STATES.map((state, idx) => {
        // Determine opacity and translateY for this state
        let opacity = 0;
        let translateY = 0;
        let pointerEvents: "auto" | "none" = "none";

        if (!isTransitioning) {
          if (idx === currentIndex) {
            opacity = 1;
            translateY = 0;
            pointerEvents = "auto";
          }
        } else {
          if (idx === currentIndex) {
            // Exiting state: fades out and lifts up slightly
            opacity = Math.max(0, 1 - blend * 1.4);
            translateY = -blend * 20;
            pointerEvents = blend < 0.5 ? "auto" : "none";
          } else if (idx === nextIndex) {
            // Entering state: fades in and settles down from below
            opacity = Math.max(0, Math.min(1, (blend - 0.15) * 1.4));
            translateY = (1 - blend) * 20;
            pointerEvents = blend >= 0.5 ? "auto" : "none";
          }
        }

        const isFinalState = idx === 5;

        return (
          <div
            key={state.id}
            aria-hidden={opacity < 0.1}
            style={{
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              pointerEvents,
              visibility: opacity > 0 ? "visible" : "hidden",
            }}
            className="absolute inset-x-0 top-0 flex flex-col justify-center will-change-transform transition-[visibility] duration-75"
          >
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[rgba(17,18,20,0.04)] border border-[rgba(17,18,20,0.10)] w-fit mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1687FF]" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#6B6D70]">
                {state.badge}
              </span>
            </div>

            {/* Editorial Headline */}
            {idx === 0 ? (
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#111214] uppercase leading-[1.04] mb-4 sm:mb-5 whitespace-pre-line">
                {state.title}
              </h1>
            ) : (
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#111214] uppercase leading-[1.04] mb-4 sm:mb-5 whitespace-pre-line">
                {state.title}
              </h2>
            )}

            {/* Subtitle / Narrative Copy */}
            <p className="text-sm sm:text-base md:text-lg text-[#55575A] font-normal leading-relaxed max-w-lg mb-6 sm:mb-8">
              {state.subtitle}
            </p>

            {/* Reassurance Safety CTA (Exclusively at State 6 Payoff) */}
            {isFinalState && (
              <div
                style={{
                  opacity: idx === currentIndex && !isTransitioning ? 1 : Math.max(0, (blend - 0.4) * 1.6),
                }}
                className="pt-4 border-t border-[rgba(17,18,20,0.10)] mt-2 flex items-center justify-between transition-opacity duration-300"
              >
                <Link
                  href={SAFETY_VIDEO_URL}
                  aria-label="View safety overview and reassurance video"
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-[#55575A] hover:text-[#1687FF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF] rounded-sm py-1"
                >
                  <span className="underline decoration-[rgba(17,18,20,0.20)] underline-offset-4 group-hover:decoration-[#1687FF]">
                    STILL CONCERNED?
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#6B6D70] group-hover:text-[#1687FF]"
                  />
                </Link>

                <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B6D70]">
                  SYSTEM SECURE
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
