import React from "react";
import { cn } from "@/lib/utils/cn";

export interface HeroInfoRailProps {
  className?: string;
}

const VALUE_PROPS = [
  { index: "01", label: "PLUG & PLAY", spec: "HDMI 2.1 PASS-THROUGH" },
  { index: "02", label: "REAL-TIME SYNC", spec: "ZERO-LATENCY OPTICAL CORE" },
  { index: "03", label: "CUSTOMIZABLE RGB", spec: "FULL GAMUT REPRODUCTION" },
  { index: "04", label: "MADE FOR YOUR SETUP", spec: "MONITORS & HOME THEATERS" },
];

export const HeroInfoRail: React.FC<HeroInfoRailProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full py-4 border-t border-[rgba(17,18,20,0.10)] animate-hero-fade [animation-delay:800ms] motion-reduce:animate-none select-none",
        className
      )}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {VALUE_PROPS.map((item, idx) => (
          <div
            key={item.label}
            className={cn(
              "flex flex-col justify-center space-y-1",
              idx > 0 && "md:border-l md:border-[rgba(17,18,20,0.10)] md:pl-6 lg:pl-8"
            )}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] font-mono text-[#1687FF] font-semibold tracking-wider shrink-0">
                {item.index}
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.12em] sm:tracking-[0.18em] uppercase text-[#111214]">
                {item.label}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#6B6D70] tracking-wider uppercase">
              {item.spec}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
