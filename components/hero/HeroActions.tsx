"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils/cn";

export interface HeroActionsProps {
  className?: string;
}

export const HeroActions: React.FC<HeroActionsProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4 animate-hero-fade [animation-delay:600ms] motion-reduce:animate-none",
        className
      )}
    >
      {/* Primary CTA */}
      <Link href="/store" className="w-full sm:w-auto">
        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRightIcon size={16} />}
          className="w-full sm:w-auto sm:min-w-[200px] px-5 sm:px-7 justify-between whitespace-nowrap text-xs sm:text-sm bg-[#111214] text-[#F4F1EA] border border-[#111214] hover:bg-[#1687FF] hover:border-[#1687FF] hover:text-[#F4F1EA] shadow-none"
        >
          <span>EXPLORE PRODUCTS</span>
        </Button>
      </Link>

      {/* Secondary CTA */}
      <Button
        variant="secondary"
        size="lg"
        onClick={() => {
          const target = document.getElementById("hero-overview") || document.querySelector("footer");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="w-full sm:w-auto sm:min-w-[190px] px-5 sm:px-7 justify-center text-xs sm:text-sm whitespace-nowrap bg-transparent border border-[rgba(17,18,20,0.16)] text-[#111214] hover:border-[rgba(17,18,20,0.30)] hover:bg-[rgba(17,18,20,0.04)] shadow-none"
      >
        <span>SEE HOW IT WORKS</span>
      </Button>
    </div>
  );
};
