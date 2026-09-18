import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { PlatformMarquee } from "@/components/home/PlatformMarquee";
import { SyncEngineTimeline } from "@/components/home/SyncEngineTimeline";
import { HardwareBentoGrid } from "@/components/home/HardwareBentoGrid";
import { ImmersionShowcase } from "@/components/home/ImmersionShowcase";
import { LightingExperienceSection } from "@/components/home/experience/LightingExperienceSection";

export const metadata = {
  title: "Light in Motion | Immersive Ambient Lighting for Gaming & Cinema",
  description:
    "A cinema experience at home. Premium ambient RGB lighting engineered for gaming setups, PC monitors, TVs, and home theaters with real-time zero-latency sync.",
};

export default function HomePage() {
  return (
    <div id="homepage-canvas" className="w-full min-h-screen bg-[#070709]">
      <HeroSection />
      <LightingExperienceSection />
      <PlatformMarquee />
      <SyncEngineTimeline />
      <HardwareBentoGrid />
      <ImmersionShowcase />
    </div>
  );
}
