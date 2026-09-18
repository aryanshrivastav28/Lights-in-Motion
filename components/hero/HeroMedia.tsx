import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export interface HeroMediaProps {
  imageUrl?: string;
  videoUrl?: string;
  alt?: string;
  className?: string;
}

export const HeroMedia: React.FC<HeroMediaProps> = ({
  imageUrl,
  videoUrl,
  alt = "Light in Motion immersive ambient lighting setup",
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0",
        className
      )}
    >
      {/* 1. Media Layer (Static Image / Video / Architectural Setup Canvas) */}
      <div className="relative w-full h-full animate-hero-media motion-reduce:animate-none">
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          />
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          /* Realistic Physical Setup Ambient Lighting Canvas */
          <div
            data-hero-asset-slot="isolated"
            className="relative w-full h-full bg-[#050608] flex items-center justify-center overflow-hidden"
          >
            {/* Dark room wall texture */}
            <div className="absolute inset-0 bg-[#050608]" />

            {/* Ambient Lighting Cast: Realistic diffuse halo behind the screen */}
            <div className="absolute top-[26%] md:top-[28%] left-1/2 -translate-x-1/2 md:translate-x-[5%] lg:translate-x-[18%] xl:translate-x-[22%] w-[85vw] max-w-[960px] h-[52vh] max-h-[540px]">
              {/* Primary Cyan Ambient Backlight Bloom */}
              <div className="absolute inset-0 bg-cyan-400/[0.18] rounded-full blur-[100px] md:blur-[140px] transform scale-100" />
              {/* Secondary Deep Sky Diffuse Layer */}
              <div className="absolute inset-4 bg-sky-500/[0.12] rounded-full blur-[80px] md:blur-[110px]" />
              {/* Subtle Warm Amber Edge Accent (Dual-zone lighting simulation) */}
              <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-amber-500/[0.08] rounded-full blur-[70px]" />
            </div>

            {/* Cinema / Ultrawide Monitor Physical Silhouette */}
            <div className="relative z-10 top-[-3%] md:top-[-1%] left-0 md:left-[16%] lg:left-[24%] xl:left-[28%] flex flex-col items-center opacity-30 sm:opacity-80 md:opacity-90">
              {/* Ultrawide Display Panel Frame */}
              <div className="w-[82vw] max-w-[780px] h-[34vw] max-h-[350px] rounded-sm border border-white/[0.12] bg-[#090a0f] shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden flex items-center justify-center">
                {/* Screen Content Simulation: Deep black glass with subtle ambient reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900/50 to-neutral-950" />
                {/* Internal subtle display glow from ambient lighting sync */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/25 via-transparent to-transparent" />
                {/* Thin edge specular highlight on display bezel */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                {/* Hardware Spec Telemetry Line */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 opacity-40 select-none">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-medium">
                    CINEMA DISPLAY SYNC // 120HZ
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
                    ACTIVE AMBIENT FIELD
                  </span>
                </div>
                {/* Bottom micro-LED indicator */}
                <div className="absolute bottom-1.5 right-3 flex items-center gap-1 opacity-60 select-none">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00E5FF]" />
                  <span className="text-[8px] font-mono text-neutral-500 tracking-wider">SYNC</span>
                </div>
              </div>

              {/* Minimal Stand Base */}
              <div className="w-24 h-1.5 bg-neutral-800/80 rounded-b-sm border-t border-white/10 mt-0.5" />
            </div>

            {/* Desk Surface & Specular Falloff Horizon */}
            <div className="absolute bottom-0 inset-x-0 h-[28vh] bg-gradient-to-t from-[#070709] via-neutral-950/90 to-transparent border-t border-white/[0.03]">
              {/* Subtle ambient desk reflection */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 md:translate-x-[20%] lg:translate-x-[28%] w-[60vw] max-w-[600px] h-16 bg-cyan-400/[0.05] rounded-full blur-[45px]" />
            </div>
          </div>
        )}
      </div>

      {/* 2. Restrained Cinematic Overlays for Text Legibility */}
      {/* Left side soft gradient for crisp headline contrast */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-4/5 md:w-3/5 bg-gradient-to-r from-[#070709]/95 via-[#070709]/75 to-transparent pointer-events-none" />

      {/* Bottom vignette to ground the technical information rail */}
      <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-transparent pointer-events-none" />

      {/* Top subtle vignette for overlay header clarity */}
      <div className="absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-[#070709]/80 via-[#070709]/30 to-transparent pointer-events-none" />
    </div>
  );
};
