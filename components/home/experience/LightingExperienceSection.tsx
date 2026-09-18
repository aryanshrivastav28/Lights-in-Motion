"use client";

import React, { useState } from "react";
import {
  ExperienceContent,
  ExperienceNarrative,
  EnvironmentMode,
} from "./ExperienceContent";
import { ExperienceSelector } from "./ExperienceSelector";
import { ExperienceVisual } from "./ExperienceVisual";
import { ExperienceTelemetry } from "./ExperienceTelemetry";
import { cn } from "@/lib/utils/cn";

export interface LightingExperienceSectionProps {
  className?: string;
}

export const LightingExperienceSection: React.FC<
  LightingExperienceSectionProps
> = ({ className }) => {
  const [activeEnvironment, setActiveEnvironment] =
    useState<EnvironmentMode>("gaming");

  return (
    <section
      id="lighting-experience"
      aria-label="The Lighting Experience"
      className={cn(
        "relative w-full bg-[#070709] py-20 sm:py-28 md:py-32 lg:py-36 border-t border-white/[0.06] overflow-hidden select-none",
        className
      )}
    >
      {/* Background Subtle Ambient Aura */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1200px] h-[60vh] bg-cyan-950/[0.06] rounded-full blur-[140px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Composition (lg+) */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column (5 cols = ~41%) */}
          <div className="lg:col-span-5 space-y-8">
            <ExperienceContent
              activeEnvironment={activeEnvironment}
              showDynamicDescription={true}
            />

            <div className="pt-2">
              <span className="block text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase mb-2.5">
                SELECT ENVIRONMENT {"//"}
              </span>
              <ExperienceSelector
                activeEnvironment={activeEnvironment}
                onSelect={setActiveEnvironment}
              />
            </div>
          </div>

          {/* Right Column (7 cols = ~59%) */}
          <div className="lg:col-span-7 space-y-6">
            <ExperienceVisual activeEnvironment={activeEnvironment} />
            <ExperienceTelemetry activeEnvironment={activeEnvironment} />
          </div>
        </div>

        {/* Mobile / Tablet Composition (< lg) in strict sequential order */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:hidden">
          {/* 1. Section Label, 2. Headline, 3. Supporting Copy */}
          <ExperienceContent
            activeEnvironment={activeEnvironment}
            showDynamicDescription={false}
          />

          {/* 4. Visual Setup */}
          <div className="w-full">
            <ExperienceVisual activeEnvironment={activeEnvironment} />
          </div>

          {/* 5. Environment Selector */}
          <div className="w-full space-y-2.5">
            <span className="block text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
              SELECT ENVIRONMENT {"//"}
            </span>
            <ExperienceSelector
              activeEnvironment={activeEnvironment}
              onSelect={setActiveEnvironment}
            />
            {/* Dynamic Environment Narrative under active selector */}
            <ExperienceNarrative activeEnvironment={activeEnvironment} />
          </div>

          {/* 6. Technical Information Strip */}
          <ExperienceTelemetry activeEnvironment={activeEnvironment} />
        </div>
      </div>
    </section>
  );
};
