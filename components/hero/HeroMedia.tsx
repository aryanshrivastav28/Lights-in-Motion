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
            className="relative w-full h-full bg-[#F4F1EA] flex items-center justify-center overflow-hidden"
          >
            {/* Ambient canvas surface */}
            <div className="absolute inset-0 bg-[#F4F1EA]" />

            {/* Ambient Lighting Cast: Realistic diffuse halo behind the screen */}
            <div className="absolute top-[26%] md:top-[28%] left-1/2 -translate-x-1/2 md:translate-x-[5%] lg:translate-x-[18%] xl:translate-x-[22%] w-[85vw] max-w-[960px] h-[52vh] max-h-[540px]">
              {/* Primary Electric Blue Ambient Backlight Bloom */}
              <div className="absolute inset-0 bg-[#1687FF]/[0.22] rounded-full blur-[100px] md:blur-[140px] transform scale-100" />
              {/* Secondary Deep Sky Diffuse Layer */}
              <div className="absolute inset-4 bg-[#0757B8]/[0.15] rounded-full blur-[80px] md:blur-[110px]" />
              {/* Subtle Warm Amber Edge Accent (Dual-zone lighting simulation) */}
              <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-amber-500/[0.10] rounded-full blur-[70px]" />
            </div>

            {/* Cinema / Ultrawide Monitor Physical Silhouette (Intentional Dark Product Media) */}
            <div className="relative z-10 top-[-3%] md:top-[-1%] left-0 md:left-[16%] lg:left-[24%] xl:left-[28%] flex flex-col items-center opacity-90 sm:opacity-95 md:opacity-100">
              {/* Ultrawide Display Panel Frame */}
              <div className="w-[82vw] max-w-[780px] h-[34vw] max-h-[350px] rounded-sm border border-[rgba(17,18,20,0.20)] bg-[#090a0f] shadow-[0_20px_60px_rgba(17,18,20,0.18)] relative overflow-hidden flex items-center justify-center">
                {/* Screen Content Simulation: Deep black glass with subtle ambient reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900/50 to-neutral-950" />
                {/* Internal subtle display glow from ambient lighting sync */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/25 via-transparent to-transparent" />
                {/* Thin edge specular highlight on display bezel */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                {/* Hardware Spec Telemetry Line */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 opacity-60 select-none">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#1687FF] uppercase font-medium">
                    CINEMA DISPLAY SYNC // 120HZ
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
                    ACTIVE AMBIENT FIELD
                  </span>
                </div>
                {/* Bottom micro-LED indicator */}
                <div className="absolute bottom-1.5 right-3 flex items-center gap-1 opacity-70 select-none">
                  <span className="w-1 h-1 rounded-full bg-[#1687FF] shadow-[0_0_4px_#1687FF]" />
                  <span className="text-[8px] font-mono text-neutral-400 tracking-wider">SYNC</span>
                </div>
              </div>

              {/* Minimal Stand Base */}
              <div className="w-24 h-1.5 bg-neutral-800/90 rounded-b-sm border-t border-[rgba(17,18,20,0.2)] mt-0.5" />
            </div>

            {/* Desk Surface & Specular Falloff Horizon */}
            <div className="absolute bottom-0 inset-x-0 h-[28vh] bg-gradient-to-t from-[#ECE9E1] via-[#F4F1EA]/80 to-transparent border-t border-[rgba(17,18,20,0.08)]">
              {/* Subtle ambient desk reflection */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 md:translate-x-[20%] lg:translate-x-[28%] w-[60vw] max-w-[600px] h-16 bg-[#1687FF]/[0.06] rounded-full blur-[45px]" />
            </div>
          </div>
        )}
      </div>

      {/* 2. Restrained Light Cinematic Overlays for Text Legibility */}
      {/* Left side soft gradient for crisp headline contrast on ivory canvas */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-4/5 md:w-3/5 bg-gradient-to-r from-[#F4F1EA] via-[#F4F1EA]/85 to-transparent pointer-events-none" />

      {/* Bottom vignette to ground the technical information rail */}
      <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-[#F4F1EA] via-[#F4F1EA]/80 to-transparent pointer-events-none" />

      {/* Top subtle vignette for overlay header clarity */}
      <div className="absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-[#F4F1EA]/90 via-[#F4F1EA]/40 to-transparent pointer-events-none" />
    </div>
  );
};
