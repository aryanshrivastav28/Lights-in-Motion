"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { CartIcon } from "@/components/ui/Icons";

export interface CartTriggerProps {
  itemCount?: number;
  onClick?: () => void;
  className?: string;
  light?: boolean;
}

export const CartTrigger: React.FC<CartTriggerProps> = ({
  itemCount = 0,
  onClick,
  className,
  light = false,
}) => {
  const formattedCount =
    itemCount > 0 ? (itemCount < 10 ? `0${itemCount}` : `${itemCount}`) : null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Cart, ${itemCount} items`}
      className={cn(
        "group inline-flex items-center gap-2 px-3 py-1.5 rounded-sm transition-colors duration-150 cursor-pointer select-none",
        light
          ? "text-[#111214] hover:text-[#1687FF] hover:bg-[rgba(17,18,20,0.04)]"
          : "text-neutral-400 hover:text-white hover:bg-white/[0.04]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF]",
        className
      )}
    >
      <CartIcon
        size={16}
        className="transition-colors group-hover:text-[#1687FF]"
      />
      <span className="text-xs font-mono tracking-[0.18em] uppercase font-medium">
        CART
      </span>
      {formattedCount && (
        <span className="text-[11px] font-mono font-semibold text-[#1687FF] bg-[#1687FF]/10 border border-[#1687FF]/30 px-1.5 py-0.5 rounded-sm">
          {formattedCount}
        </span>
      )}
    </button>
  );
};
