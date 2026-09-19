"use client";

import React from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils/cn";

export interface ScrollIndicatorProps {
  className?: string;
  targetId?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  className,
  targetId = "hero-overview",
}) => {
  const handleScroll = () => {
    const target = document.getElementById(targetId) || document.querySelector("footer");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      aria-label="Scroll to content"
      className={cn(
        "group flex items-center gap-2 text-[#6B6D70] hover:text-[#111214] transition-colors duration-200 select-none py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF]",
        "animate-hero-fade [animation-delay:900ms] motion-reduce:animate-none",
        className
      )}
    >
      <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-medium">
        SCROLL
      </span>
      <ChevronDownIcon
        size={14}
        className="text-[#6B6D70] group-hover:text-[#1687FF] transition-colors duration-200 animate-bounce motion-reduce:animate-none"
        strokeWidth={2}
      />
    </button>
  );
};
