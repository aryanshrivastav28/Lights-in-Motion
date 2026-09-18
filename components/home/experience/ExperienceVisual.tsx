import React from "react";
import Image from "next/image";
import { EnvironmentMode } from "./ExperienceContent";
import { cn } from "@/lib/utils/cn";

export interface ExperienceVisualProps {
  activeEnvironment: EnvironmentMode;
  mediaOverrides?: Partial<
    Record<EnvironmentMode, { imageUrl?: string; videoUrl?: string; alt?: string }>
  >;
  className?: string;
}

interface SetupAtmosphereConfig {
  mode: EnvironmentMode;
  aspectClass: string;
  glowLayers: React.ReactNode;
  screenHud: React.ReactNode;
  surfaceReflection: React.ReactNode;
}

const ATMOSPHERE_CONFIGS: Record<EnvironmentMode, SetupAtmosphereConfig> = {
  gaming: {
    mode: "gaming",
    aspectClass: "w-[90%] max-w-[680px] h-[48%] max-h-[260px] sm:max-h-[300px]",
    glowLayers: (
      <>
        {/* Intense Cyan Ambient Backlight Bloom */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[95%] max-w-[760px] h-[75%] rounded-full bg-cyan-400/[0.22] blur-[80px] sm:blur-[120px]" />
        {/* Cobalt Deep Field Core */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[80%] max-w-[620px] h-[65%] rounded-full bg-blue-600/[0.16] blur-[60px] sm:blur-[95px]" />
      </>
    ),
    screenHud: (
      <div className="relative z-10 flex flex-col items-center gap-1.5 opacity-60 select-none">
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
          CINEMA OPTICAL SYNC // 240HZ
        </span>
        <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
          ACTIVE GAMING FIELD
        </span>
        <div className="flex items-center gap-1 mt-1">
          <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00E5FF]" />
          <span className="text-[8px] font-mono text-cyan-400/80 tracking-widest">
            0.5MS CORE
          </span>
        </div>
      </div>
    ),
    surfaceReflection: (
      <div className="absolute bottom-0 inset-x-0 h-[24%] bg-gradient-to-t from-[#070709] via-neutral-950/80 to-transparent border-t border-white/[0.04]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-[500px] h-12 bg-cyan-400/[0.08] rounded-full blur-[35px]" />
      </div>
    ),
  },
  cinema: {
    mode: "cinema",
    aspectClass: "w-[85%] max-w-[640px] h-[52%] max-h-[290px] sm:max-h-[330px]",
    glowLayers: (
      <>
        {/* Warm Golden Amber Wall Projection */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[98%] max-w-[820px] h-[80%] rounded-full bg-amber-500/[0.22] blur-[85px] sm:blur-[130px]" />
        {/* Deep Sunset Ember Core */}
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[85%] max-w-[680px] h-[70%] rounded-full bg-orange-600/[0.14] blur-[65px] sm:blur-[100px]" />
      </>
    ),
    screenHud: (
      <div className="relative z-10 flex flex-col items-center gap-1.5 opacity-60 select-none">
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase font-semibold">
          TRUE 24P CADENCE // CINEMA MODE
        </span>
        <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
          HDR10+ / DOLBY VISION PASS
        </span>
        <div className="flex items-center gap-1 mt-1">
          <span className="w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_4px_#FF9500]" />
          <span className="text-[8px] font-mono text-amber-400/80 tracking-widest">
            360° PROJECTION
          </span>
        </div>
      </div>
    ),
    surfaceReflection: (
      <div className="absolute bottom-0 inset-x-0 h-[24%] bg-gradient-to-t from-[#070709] via-neutral-950/80 to-transparent border-t border-white/[0.04]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-[540px] h-14 bg-amber-500/[0.08] rounded-full blur-[40px]" />
      </div>
    ),
  },
  desk: {
    mode: "desk",
    aspectClass: "w-[88%] max-w-[660px] h-[50%] max-h-[270px] sm:max-h-[310px]",
    glowLayers: (
      <>
        {/* Neutral 6500K Daylight Bias Wash */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[92%] max-w-[740px] h-[75%] rounded-full bg-white/[0.18] blur-[75px] sm:blur-[115px]" />
        {/* Cool Focus Perimeter Hue */}
        <div className="absolute top-[24%] left-1/2 -translate-x-1/2 w-[80%] max-w-[600px] h-[65%] rounded-full bg-cyan-200/[0.10] blur-[60px] sm:blur-[90px]" />
      </>
    ),
    screenHud: (
      <div className="relative z-10 flex flex-col items-center gap-1.5 opacity-60 select-none">
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-neutral-200 uppercase font-semibold">
          DAYLIGHT BIAS // 6500K CALIBRATED
        </span>
        <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
          CRI 96+ NATURAL SPECTRUM
        </span>
        <div className="flex items-center gap-1 mt-1">
          <span className="w-1 h-1 rounded-full bg-neutral-200 shadow-[0_0_4px_#ffffff]" />
          <span className="text-[8px] font-mono text-neutral-300 tracking-widest">
            ZERO FATIGUE
          </span>
        </div>
      </div>
    ),
    surfaceReflection: (
      <div className="absolute bottom-0 inset-x-0 h-[24%] bg-gradient-to-t from-[#070709] via-neutral-950/80 to-transparent border-t border-white/[0.04]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-[480px] h-12 bg-white/[0.06] rounded-full blur-[35px]" />
      </div>
    ),
  },
};

const ALL_MODES: EnvironmentMode[] = ["gaming", "cinema", "desk"];

export const ExperienceVisual: React.FC<ExperienceVisualProps> = ({
  activeEnvironment,
  mediaOverrides,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/11] lg:aspect-[16/10] rounded-sm border border-white/[0.08] bg-[#050608] overflow-hidden shadow-2xl select-none",
        className
      )}
    >
      {ALL_MODES.map((mode) => {
        const isActive = activeEnvironment === mode;
        const config = ATMOSPHERE_CONFIGS[mode];
        const media = mediaOverrides?.[mode];

        return (
          <div
            key={mode}
            role="tabpanel"
            id={`experience-panel-${mode}`}
            aria-labelledby={`experience-tab-${mode}`}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-500 ease-out motion-reduce:transition-none flex items-center justify-center overflow-hidden",
              isActive
                ? "opacity-100 pointer-events-auto z-10"
                : "opacity-0 pointer-events-none z-0"
            )}
          >
            {media?.videoUrl ? (
              <video
                src={media.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : media?.imageUrl ? (
              <Image
                src={media.imageUrl}
                alt={media.alt ?? `Light in Motion ${mode} ambient lighting experience`}
                fill
                quality={90}
                className="object-cover"
              />
            ) : (
              /* Isolated Physical Setup Ambient Simulation Canvas */
              <div
                data-experience-asset-slot="isolated"
                className="relative w-full h-full bg-[#050608] flex items-center justify-center"
              >
                {/* Wall Base Plane */}
                <div className="absolute inset-0 bg-[#050608]" />

                {/* Atmospheric Ambient Lighting Cast Behind Display */}
                {config.glowLayers}

                {/* Cinema Display Silhouette */}
                <div
                  className={cn(
                    "relative z-10 flex flex-col items-center shadow-[0_20px_60px_rgba(0,0,0,0.9)]",
                    config.aspectClass
                  )}
                >
                  {/* Display Bezel Frame */}
                  <div className="w-full h-full rounded-sm border border-white/[0.14] bg-[#090a0f] relative overflow-hidden flex items-center justify-center">
                    {/* Screen Glass Depth */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900/60 to-neutral-950" />
                    {/* Bezel Top Specular Highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    {/* Screen Telemetry */}
                    {config.screenHud}
                  </div>

                  {/* Display Stand Base */}
                  <div className="w-20 h-1.5 bg-neutral-800/80 rounded-b-sm border-t border-white/10 mt-0.5" />
                </div>

                {/* Desk / Credenza Surface & Ambient Reflection */}
                {config.surfaceReflection}

                {/* Subtle Edge Vignettes */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06] pointer-events-none" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
