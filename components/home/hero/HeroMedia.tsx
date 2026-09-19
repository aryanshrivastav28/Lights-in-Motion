"use client";

import React from "react";
import Image from "next/image";
import { HERO_STATES, HeroState } from "./heroSequence";
import { cn } from "@/lib/utils/cn";

export interface HeroMediaProps {
  currentIndex: number;
  nextIndex: number;
  blend: number; // 0 to 1 during transition
  isTransitioning: boolean;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
  className?: string;
}

export const HeroMedia: React.FC<HeroMediaProps> = ({
  currentIndex,
  nextIndex,
  blend,
  isTransitioning,
  isMobile = false,
  prefersReducedMotion = false,
  className,
}) => {
  // Mobile factor: scale translations and rotations down so visual planes stay within viewport
  const motionFactor = isMobile ? 0.45 : 1.0;
  const rotFactor = isMobile ? 0.4 : 1.0;

  const computeTransform = (state: HeroState, idx: number): { transform: string; opacity: number; zIndex: number } => {
    // If reduced motion is requested, disable 3D movement completely
    if (prefersReducedMotion) {
      if (!isTransitioning) {
        return {
          transform: "none",
          opacity: idx === currentIndex ? 1 : 0,
          zIndex: idx === currentIndex ? 10 : 0,
        };
      }
      if (idx === currentIndex) {
        return {
          transform: "none",
          opacity: Math.max(0, 1 - blend),
          zIndex: 5,
        };
      }
      if (idx === nextIndex) {
        return {
          transform: "none",
          opacity: Math.min(1, blend),
          zIndex: 10,
        };
      }
      return { transform: "none", opacity: 0, zIndex: 0 };
    }

    // Settled active state
    if (!isTransitioning) {
      if (idx === currentIndex) {
        return {
          transform: "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1)",
          opacity: 1,
          zIndex: 10,
        };
      }
      return {
        transform: "translate3d(0, 0, 0) scale(0.95)",
        opacity: 0,
        zIndex: 0,
      };
    }

    // Active transition between currentIndex and nextIndex
    if (idx === currentIndex) {
      // Exiting current image: interpolates from 0 to exit target
      const t = blend;
      const xVal = state.exit.x * t * motionFactor;
      const xUnit = state.exit.xUnit || "%";
      const yVal = state.exit.y * t * motionFactor;
      const yUnit = state.exit.yUnit || "%";
      const zVal = state.exit.z * t * motionFactor;
      const rotX = state.exit.rotateX * t * rotFactor;
      const rotY = state.exit.rotateY * t * rotFactor;
      const scale = 1 + (state.exit.scale - 1) * t;
      const opacity = Math.max(0, 1 - t * 1.35);

      return {
        transform: `translate3d(${xVal}${xUnit}, ${yVal}${yUnit}, ${zVal}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`,
        opacity,
        zIndex: 5,
      };
    }

    if (idx === nextIndex) {
      // Entering new image: interpolates from entry target to 0
      const remain = 1 - blend;
      const xVal = state.entry.x * remain * motionFactor;
      const xUnit = state.entry.xUnit || "%";
      const yVal = state.entry.y * remain * motionFactor;
      const yUnit = state.entry.yUnit || "%";
      const zVal = state.entry.z * remain * motionFactor;
      const rotX = state.entry.rotateX * remain * rotFactor;
      const rotY = state.entry.rotateY * remain * rotFactor;
      const scale = 1 + (state.entry.scale - 1) * remain;
      const opacity = Math.max(0, Math.min(1, blend * 1.5));

      return {
        transform: `translate3d(${xVal}${xUnit}, ${yVal}${yUnit}, ${zVal}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`,
        opacity,
        zIndex: 10,
      };
    }

    return {
      transform: "translate3d(0, 0, 0) scale(0.95)",
      opacity: 0,
      zIndex: 0,
    };
  };

  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center select-none overflow-visible",
        className
      )}
      style={{
        perspective: isMobile ? "1000px" : "1400px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {HERO_STATES.map((state, idx) => {
          const { transform, opacity, zIndex } = computeTransform(state, idx);
          const isVisible = opacity > 0.005;

          return (
            <div
              key={state.id}
              aria-hidden={!isVisible}
              className="absolute flex items-center justify-center max-w-full max-h-full will-change-transform pointer-events-none"
              style={{
                transform,
                opacity,
                zIndex,
                visibility: isVisible ? "visible" : "hidden",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {/* Image Frame with Subtle Elevation & Frame Shadow */}
              <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(17,18,20,0.18),0_0_0_1px_rgba(17,18,20,0.08)] bg-[#090a0f]">
                <Image
                  src={state.image}
                  alt={state.alt}
                  width={1400}
                  height={1100}
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="max-h-[46svh] sm:max-h-[55svh] md:max-h-[64svh] lg:max-h-[70svh] w-auto h-auto object-contain block"
                  sizes="(max-width: 768px) 90vw, (max-width: 1280px) 55vw, 750px"
                />

                {/* Subtle Edge Dissolve - Preserves imagery without heavy overlays */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-lg sm:rounded-xl ring-1 ring-inset ring-[rgba(17,18,20,0.10)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
