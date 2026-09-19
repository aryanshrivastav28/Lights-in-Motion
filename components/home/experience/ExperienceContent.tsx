import React from "react";
import { cn } from "@/lib/utils/cn";

export type EnvironmentMode = "gaming" | "cinema" | "desk";

export interface ExperienceContentProps {
  activeEnvironment: EnvironmentMode;
  className?: string;
}

export const ENVIRONMENT_DATA: Record<
  EnvironmentMode,
  {
    id: EnvironmentMode;
    index: string;
    label: string;
    shortName: string;
    tagline: string;
    description: string;
    badge: string;
    telemetry: Array<{ label: string; value: string }>;
  }
> = {
  gaming: {
    id: "gaming",
    index: "01",
    label: "GAMING",
    shortName: "GAMING SETUP",
    tagline: "Reactive ambient lighting designed around your display.",
    description:
      "Reactive ambient illumination synchronized directly at the optical layer. Zero-latency optical processing and high-gamut color reproduction engineered for high-refresh competitive displays and PC battle stations.",
    badge: "FPS SYNC // 240HZ OPTICAL CORE",
    telemetry: [
      { label: "LATENCY", value: "0.5MS OPTICAL" },
      { label: "SYNC ENGINE", value: "HDMI 2.1 48GBPS" },
      { label: "REFRESH", value: "UP TO 240HZ" },
      { label: "GAMUT", value: "100% DCI-P3" },
    ],
  },
  cinema: {
    id: "cinema",
    index: "02",
    label: "HOME CINEMA",
    shortName: "HOME THEATER",
    tagline: "Extend the atmosphere beyond the screen.",
    description:
      "Transform your living room into an authentic cinematic auditorium. Expansive room-scale ambient projection calibrated for true 24fps film cadence, high dynamic range color grading, and deep room immersion.",
    badge: "24FPS CADENCE // CINEMA MODE",
    telemetry: [
      { label: "COLOR FIELD", value: "360° PROJECTION" },
      { label: "DYNAMIC RANGE", value: "DOLBY VISION / HDR" },
      { label: "FILM CADENCE", value: "TRUE 24P CADENCE" },
      { label: "ARRAY ZONES", value: "INDEPENDENT RGBW" },
    ],
  },
  desk: {
    id: "desk",
    index: "03",
    label: "DESK",
    shortName: "DESK & STUDIO",
    tagline: "Turn your workspace into an immersive environment.",
    description:
      "Precision bias illumination engineered to eliminate eye fatigue during long sessions while framing your desk setup in architectural, calibrated light that follows natural circadian rhythm curves.",
    badge: "DAYLIGHT BIAS // 6500K CRI 96+",
    telemetry: [
      { label: "COLOR TEMP", value: "2700K - 6500K" },
      { label: "ACCURACY", value: "CRI 96+ SPECTRUM" },
      { label: "BIAS RATIO", value: "OPTIMAL 10:1" },
      { label: "CONTROLS", value: "DESKTOP & APP" },
    ],
  },
};

export interface ExperienceContentProps {
  activeEnvironment: EnvironmentMode;
  showDynamicDescription?: boolean;
  className?: string;
}

export const ExperienceNarrative: React.FC<{
  activeEnvironment: EnvironmentMode;
  className?: string;
}> = ({ activeEnvironment, className }) => {
  const current = ENVIRONMENT_DATA[activeEnvironment];

  return (
    <div
      className={cn(
        "space-y-2 pt-3 border-t border-[rgba(17,18,20,0.10)] max-w-xl transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-[#1687FF] font-semibold">
          {current.index} {"//"}
        </span>
        <h3 className="text-sm sm:text-base font-mono font-medium tracking-[0.16em] uppercase text-[#111214]">
          {current.tagline}
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-[#55575A] leading-relaxed font-sans">
        {current.description}
      </p>
    </div>
  );
};

export const ExperienceContent: React.FC<ExperienceContentProps> = ({
  activeEnvironment,
  showDynamicDescription = true,
  className,
}) => {
  return (
    <div className={cn("space-y-6 sm:space-y-8 select-none", className)}>
      {/* Small Technical Section Label */}
      <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm bg-[rgba(17,18,20,0.04)] border border-[rgba(17,18,20,0.10)] backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1687FF] shadow-[0_0_8px_rgba(22,135,255,0.6)]" />
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-[#6B6D70] font-medium">
          02 <span className="text-[#6B6D70]/60 mx-1">{"//"}</span> THE EXPERIENCE
        </span>
      </div>

      {/* Main Display Headline */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-[#111214] leading-[0.95] uppercase">
        THE LIGHTING
        <br />
        <span className="text-[#111214]">EXPERIENCE.</span>
      </h2>

      {/* Core Supporting Copy */}
      <p className="text-base sm:text-lg text-[#55575A] tracking-wide max-w-xl leading-relaxed">
        Your screen doesn&apos;t end at the display. Neither should your experience.
      </p>

      {/* Immersion Pipeline Flow Indicator */}
      <div className="pt-1 pb-1">
        <div className="inline-flex flex-wrap items-center gap-2 px-3 py-2 rounded-sm bg-[#ECE9E1] border border-[rgba(17,18,20,0.10)] text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase">
          <span className="text-[#111214] font-medium">SCREEN</span>
          <span className="text-[#1687FF] font-bold">→</span>
          <span className="text-[#111214] font-medium">LIGHT</span>
          <span className="text-[#1687FF] font-bold">→</span>
          <span className="text-[#111214] font-medium">ENVIRONMENT</span>
          <span className="text-[#1687FF] font-bold">→</span>
          <span className="text-[#1687FF] font-semibold tracking-widest">IMMERSION</span>
        </div>
      </div>

      {/* Dynamic Environment Narrative */}
      {showDynamicDescription && (
        <ExperienceNarrative activeEnvironment={activeEnvironment} />
      )}
    </div>
  );
};
